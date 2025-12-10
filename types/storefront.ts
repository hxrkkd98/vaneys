export interface Product {
  id: number;
  name: string;
  price: number;
  /* originalPrice: number | null;
  rating: number | null;
  reviews: number | null; */
  image: string;
  /* tag: string | null; */
  category: string;
  description: string;
}

export interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  desc: string;
  btn: string;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface CartItem extends Product {
  quantity: number;
}