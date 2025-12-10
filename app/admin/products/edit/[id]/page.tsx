"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; 
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; 

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const formRef = useRef<HTMLFormElement>(null);
  
  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

  // 1. FETCH DATA
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (error) throw error;

        setProduct(data);
        setPreviewImage(data.product_image); 
      } catch (err: any) {
        console.error("Fetch error:", err);
        setAlert({ show: true, type: "error", message: "Failed to load product data." });
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
  }, [productId]);

  // 2. IMAGE HANDLER
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setAlert({ show: true, type: "error", message: "File too large (Max 2MB)" });
        return;
      }
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setAlert({ show: true, type: "error", message: "Invalid file type. Only PNG, JPG allowed." });
        return;
      }
      setNewImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); 
    }
  };

  // 3. SUBMIT HANDLER
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setAlert({ show: false, type: "success", message: "" });

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName") as string;
    const category = formData.get("productCategory") as string;
    const price = formData.get("productPrice");
    const description = formData.get("productDescription") as string;
    const status = formData.get("productStatus") as string;

    try {
      let finalImageUrl = product.product_image; 

      // Upload New Image Logic
      if (newImageFile) {
        const fileExt = newImageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, newImageFile);

        if (uploadError) throw new Error("Image upload failed: " + uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        finalImageUrl = publicUrl;

        // Cleanup Old Image
        if (product.product_image) {
          const oldPath = product.product_image.split('product-images/').pop();
          if (oldPath) await supabase.storage.from('product-images').remove([oldPath]);
        }
      }

      // Update Database
      const { error: updateError } = await supabase
        .from('products')
        .update({
          product_name: productName,
          product_price: Number(price),
          product_category: category,
          product_description: description,
          product_status: status,
          product_image: finalImageUrl, 
        })
        .eq('id', productId);

      if (updateError) throw updateError;

      setAlert({ show: true, type: "success", message: "Product updated successfully!" });
      window.scrollTo({ top: 0, behavior: 'smooth' });
 

    } catch (error: any) {
      console.error("Update Error:", error);
      setAlert({ show: true, type: "error", message: error.message || "Failed to update." });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-500">Loading product...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-sm text-slate-500 mt-1">Update product details.</p>
        </div>
        <Link 
          href="/admin/products" 
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm active:transform active:scale-95"
        >
          <ChevronLeft size={18} /> Back
        </Link>
      </div>

      {/* Alert Banner */}
      {alert.show && (
        <div className={`p-4 rounded-lg flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 ${
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span className="font-medium text-sm">{alert.message}</span>
          </div>
        </div>
      )}

      {/* Main Form Container (Replaced Card with div) */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="p-6">
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="w-full space-y-5"
          >
            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="productName" className="text-sm font-medium text-slate-700">Product Name</label>
              <input 
                id="productName"
                name="productName" 
                type="text" 
                defaultValue={product.product_name}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm text-slate-900"
                placeholder="Enter Product Name" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Select */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="productCategory" className="text-sm font-medium text-slate-700">Product Category</label>
                    <div className="relative">
                        <select 
                            id="productCategory"
                            name="productCategory"
                            defaultValue={product.product_category}
                            required
                            className="text-slate-900 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                        >
                            <option value="Bottle">Bottle</option>
                            <option value="Giftset">Giftset</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Status Select */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="productStatus" className="text-sm font-medium text-slate-700">Product Status</label>
                    <div className="relative">
                        <select 
                            id="productStatus"
                            name="productStatus"
                            defaultValue={product.product_status || 'active'}
                            required
                            className="text-slate-900 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm appearance-none cursor-pointer"
                        >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="productPrice" className="text-sm font-medium text-slate-700">Product Price (RM)</label>
              <input 
                id="productPrice"
                name="productPrice" 
                type="number" 
                step="0.01"
                defaultValue={product.product_price}
                required
                className="text-slate-900 w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                placeholder="0.00" 
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col gap-3 border p-4 rounded-lg border-slate-200 bg-slate-50/50">
                <label className="text-sm font-medium text-slate-700">Product Image</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-lg border border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                        type="file" 
                        name="productImage" 
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageChange}
                        className="text-slate-900 block w-full text-sm  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                        {newImageFile ? "New image selected." : "Leave empty to keep existing."}
                    </p>
                  </div>
                </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="productDescription" className="text-sm font-medium text-slate-700">Product Description</label>
              <textarea
                id="productDescription"
                name="productDescription"
                required
                defaultValue={product.product_description}
                rows={4}
                className="text-slate-900 w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                placeholder="Enter Product Description..."
              />
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={saving}
                className={`w-fit rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 text-sm font-medium shadow-sm transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}