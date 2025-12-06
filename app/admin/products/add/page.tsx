import Link from "next/link"; // <--- 1. Import Link
import { ChevronLeft } from "lucide-react";
import { Card, Form, Description , TextField, Label, Input, FieldError, Button, ListBox, Select} from "@heroui/react";

export default function CreateProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Product</h1>
          <p className="text-sm text-slate-500 mt-1">
            Add New Product Information.
          </p>
        </div>
        
        {/* 2. Use Link with href directly */}
        {/* Notice we removed <button> but kept the same className */}
        <Link 
          href="/admin/products" 
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm active:transform active:scale-95"
        >
          <ChevronLeft size={18} />
           Back
        </Link>
      </div>

      <Card className="rounded-lg">
        <Card.Content>
          <Form className="w-full space-y-4 rounded-lg border  bg-surface p-2">
            <TextField isRequired name="productName" type="text">
              <Label className="text-sm font-medium text-slate-700">Product Name</Label>
              <Input className="rounded-lg border border-slate-300" placeholder="Enter Product Name" />
              <FieldError className="text-xs" />
            </TextField>
            <Select className="w-full" placeholder="Select Product Category" isRequired name="productCategory">
              <Label className="text-slate-700">Product Category</Label>
              <Select.Trigger className="rounded-lg border border-slate-300">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="rounded-lg">
                <ListBox>
                  <ListBox.Item id="bottle" textValue="Bottle" className="text-slate-700 hover:rounded-lg">
                    Bottle
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="giftset" textValue="Giftset" className="text-slate-700 hover:rounded-lg">
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
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
            </div>
            <Button type="submit" className="w-fit rounded-lg bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-6 text-sm font-medium shadow-sm transition-colors">
              Submit
            </Button>
          </Form>
        </Card.Content>
        <Card.Footer />
      </Card>

    </div>
  );
}