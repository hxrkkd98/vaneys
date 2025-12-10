// components/ProductTable.tsx
"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { TableColumn } from "react-data-table-component";
import { Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { Product } from "@/types/product";
import AppTable from "@/components/admin/ui/AppTable"; 
import {Modal, useOverlayState} from "@heroui/react";
import { supabase } from "@/lib/supabaseClient"; // 1. Import Supabase
import Link from "next/link";

// --- Helpers ---
const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error("API Error");
    return res.json();
});

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  draft: "bg-amber-100 text-amber-700 border-amber-200",
  out_of_stock: "bg-red-100 text-red-700 border-red-200",
};

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebounce(search, 500);

  // 2. Add Lightbox State
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");

  const handleModal = (image: string, name:string) => () => {
    setIsOpen(true);
    setSelectedImage(image); 
    setSelectedProductName(name); 
  }

  // 1. Data Fetching (Get mutate from SWR)
  const { data, isLoading, mutate } = useSWR<{ data: Product[], total: number }>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/products?page=${page}&limit=${perPage}&search=${debouncedSearch}&category=${category}`,
    fetcher,
    { keepPreviousData: true }
  );

  // 3. Handle Delete Function
  // --- DELETE FUNCTION WITH IMAGE REMOVAL ---
  const handleDelete = async (id: string | number, imageUrl: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      try {
        // 1. Remove Image from Storage (if it exists)
        if (imageUrl) {
          // Extract the file path from the full public URL
          // Example URL: .../storage/v1/object/public/product-images/1765162.png
          // We need: 1765162.png
          const filePath = imageUrl.split('product-images/').pop();

          if (filePath) {
            const { error: storageError } = await supabase.storage
              .from('product-images')
              .remove([filePath]);

            if (storageError) {
              console.warn("Could not delete image file:", storageError.message);
              // We usually continue to delete the record even if image delete fails
            }
          }
        }

        // 2. Delete Record from Database
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;

        mutate(); // Refresh table
        alert("Product deleted successfully.");
        
      } catch (error: any) {
        console.error("Delete Error:", error);
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  // 2. Handlers (Kept in Parent)
  const handlePageChange = (page: number) => setPage(page);
  const handlePerRowsChange = (newPerPage: number, page: number) => {
      setPerPage(newPerPage);
      setPage(page);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1); 
  };

  // 3. Columns (Specific to Products)
  const columns: TableColumn<Product>[] = [
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2" onClick={handleModal(row.image, row.name)} style={{cursor: 'pointer'}}>
          <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden" >
            <img src={row.image} alt={row.name} className="h-full w-full object-cover"/>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-700 text-sm">{row.name}</span>
          </div>
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      cell: (row) => <span className="text-slate-600 text-sm">{row.category}</span>,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-slate-700 text-sm">RM{Number(row.price).toFixed(2)}</span>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border uppercase tracking-wide ${STATUS_STYLES[row.status]}`}>
          {row.status.replaceAll("_", " ")}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-1">
          <Link 
            href={`/admin/products/edit/${row.id}`}
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
          >
            <Edit size={16} />
          </Link>
          
          {/* Update: Pass row.image to handleDelete */}
          <button 
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            onClick={() => handleDelete(row.id, row.image)} 
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      width: "140px",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar (Kept Here because it controls API URL) */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full max-w-xs">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           <input 
             type="text"
             placeholder="Search by product name..."
             className="w-full text-slate-900 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
             value={search}
             onChange={handleSearch}
           />
        </div>
        <div className="relative w-full sm:w-auto min-w-[180px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <select 
            value={category} 
            onChange={handleCategoryChange}
            className="w-full pl-9 pr-8 py-2 appearance-none rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Bottle">Bottle</option>
            <option value="Giftset">Giftset</option>
          </select>
          {/* Custom Arrow for select */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {/* 4. Use the Reusable Table Component */}
      <AppTable 
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        totalRows={data?.total || 0}
        perPage={perPage}
        onPageChange={handlePageChange}
        onPerRowsChange={handlePerRowsChange}
      />

       <Modal>
        <Modal.Container isOpen={isOpen} onOpenChange={setIsOpen}>
          <Modal.Dialog className="sm:max-w-[1400px]">
            {({close}) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading className="text-slate-700">{selectedProductName}</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  {selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt={selectedProductName} 
                    className="max-h-[60vh] w-auto object-contain rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="h-64 w-full flex items-center justify-center bg-gray-50 text-gray-400 rounded-lg">
                    No Image Available
                  </div>
                )}
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </div>
  );
}