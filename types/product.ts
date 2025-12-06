// types/product.ts
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  status: "active" | "draft" | "out_of_stock";
}