"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle, XCircle, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; 
import { 
  Card, Form, TextField, Label, Input, FieldError, Button, ListBox, Select, TextArea 
} from "@heroui/react";

export default function CreateProductsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  
  // State for Alert Notification
  const [alert, setAlert] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({ show: false, type: "success", message: "" });

  // --- CONFIGURATION ---
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

  // Helper to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ show: false, type: "success", message: "" }); // Clear previous alerts

    const formData = new FormData(e.currentTarget);
    
    // Extract values matching your form names
    const productName = formData.get("productName") as string;
    const category = formData.get("productCategory") as string;
    const price = formData.get("productPrice");
    const description = formData.get("productDescription") as string;
    const imageFile = formData.get("productImage") as File;

    try {
      let imageUrl = "";

      // 1. VALIDATE IMAGE
      if (imageFile && imageFile.size > 0) {
        
        // Check File Size (Max 2MB)
        if (imageFile.size > MAX_FILE_SIZE) {
            throw new Error(`File is too large (${(imageFile.size / 1024 / 1024).toFixed(2)}MB). Max limit is 2MB.`);
        }

        // Check File Type (PNG, JPG, JPEG)
        if (!ALLOWED_FILE_TYPES.includes(imageFile.type)) {
            throw new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
        }

        // 2. UPLOAD IMAGE
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images') // Ensure this bucket exists and is set to Public
          .upload(filePath, imageFile);

        if (uploadError) throw new Error("Image upload failed: " + uploadError.message);

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
      }

      // 3. INSERT INTO DATABASE
      const { error: insertError } = await supabase
        .from('products')
        .insert([
          {
            product_name: productName,
            product_price: Number(price),
            product_image: imageUrl,
            product_category: category,
            product_description: description,
            product_status: 'active',
            // created_at is automatic
          },
        ]);

      if (insertError) throw insertError;

      // 4. SUCCESS HANDLER
      setAlert({
        show: true,
        type: "success",
        message: "Product added successfully!"
      });
      
      // Reset the form
      formRef.current?.reset();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error("Error:", error);
      // 5. ERROR HANDLER
      setAlert({
        show: true,
        type: "error",
        message: error.message || "Failed to add product."
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Product</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add New Product Information.
          </p>
        </div>
        
        <Link 
          href="/admin/products" 
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm active:transform active:scale-95"
        >
          <ChevronLeft size={18} />
           Back
        </Link>
      </div>

      {/* ALERT SECTION */}
      {alert.show && (
        <div className={`p-4 rounded-lg flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 ${
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {alert.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            <span className="font-medium text-sm">{alert.message}</span>
          </div>
          <button onClick={() => setAlert({ ...alert, show: false })} className="hover:opacity-70">
            <X size={18} />
          </button>
        </div>
      )}

      <Card className="rounded-lg">
        <Card.Content>
          <Form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="w-full space-y-4 rounded-lg border bg-surface p-2"
          >
            <TextField isRequired name="productName" type="text">
              <Label className="text-sm font-medium text-slate-700">Product Name</Label>
              <Input className="rounded-lg border border-slate-300" placeholder="Enter Product Name" />
              <FieldError className="text-xs" />
            </TextField>

            <Select 
              className="w-full" 
              placeholder="Select Product Category" 
              isRequired 
              name="productCategory"
            >
              <Label className="text-slate-700">Product Category</Label>
              <Select.Trigger className="rounded-lg border border-slate-300">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item id="Bottle" textValue="Bottle" className="text-slate-700 hover:rounded-lg">
                    Bottle
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Giftset" textValue="Giftset" className="text-slate-700 hover:rounded-lg">
                    Giftset
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField isRequired name="productPrice" type="number">
              <Label className="text-sm font-medium text-slate-700">Product Price</Label>
              <Input className="rounded-lg border border-slate-300" placeholder="Enter Product Price" />
              <FieldError className="text-xs" />
            </TextField>

            <div className="flex flex-col gap-2">
                <label htmlFor="productImage" className="text-sm font-medium text-slate-700">
                    Product Image <span className="text-danger">*</span>
                </label>
                <input 
                    type="file" 
                    id="productImage"
                    name="productImage"
                    required
                    accept="image/png, image/jpeg, image/jpg"
                    className="
                        block w-full text-sm text-slate-500
                        border border-slate-300 rounded-lg cursor-pointer bg-white
                        focus:outline-none
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-l-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100
                    "
                />
                <p className="text-xs text-slate-400">
                    Only <strong>PNG, JPG, JPEG</strong> allowed. Max size <strong>2MB</strong>.
                </p>
            </div>

            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">Product Description</Label>
              <TextArea
                required
                name="productDescription"
                aria-label="description"
                className="rounded-lg border border-slate-300 w-full"
                placeholder="Enter Product Description..."
                rows={4}
              />
            </div>

            <Button 
                type="submit" 
                isLoading={loading}
                className="w-fit rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 text-sm font-medium shadow-sm transition-colors"
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </Form>
        </Card.Content>
        <Card.Footer />
      </Card>
    </div>
  );
}