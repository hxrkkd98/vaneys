// components/ProductTable.tsx
"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { TableColumn } from "react-data-table-component";
import { Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { Product } from "@/types/product";
import AppTable from "@/components/admin/ui/AppTable"; // <--- Import your new wrapper

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

  // 1. Data Fetching (Kept in Parent)
  const { data, isLoading } = useSWR<{ data: Product[], total: number }>(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}/products?page=${page}&limit=${perPage}&search=${debouncedSearch}&category=${category}`,
    fetcher,
    { keepPreviousData: true }
  );

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
    setPage(1); // Reset to page 1 when filtering
  };

  // 3. Columns (Specific to Products)
  const columns: TableColumn<Product>[] = [
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          <div className="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
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
        <span className="font-semibold text-slate-700 text-sm">${row.price.toLocaleString()}</span>
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
          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><Eye size={16} /></button>
          <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"><Edit size={16} /></button>
          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
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
    </div>
  );
}