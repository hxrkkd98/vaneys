import ProductTable from "@/components/admin/section/ProductTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your inventory, prices, and visibility.
          </p>
        </div>
        
        <Link href="/admin/products/add" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm active:transform active:scale-95">
          <Plus size={18} />
           New Product
        </Link>
      </div>

      {/* Table Section */}
      <ProductTable />
    </div>
  );
}