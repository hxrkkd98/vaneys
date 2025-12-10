import { Product, Slide } from "@/types/storefront";

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Signature Heong Peah (8pcs)", 
    price: 13.80, 
    originalPrice: null, 
    rating: 5, 
    reviews: 342,
    image: "https://placehold.co/600x600/FCD34D/78350F?text=Heong+Peah",
    tag: "Signature",
    category: "Pastries",
    description: "Our signature Heong Peah (Fragrant Pastry) features a flaky outer layer and a sticky, sweet maltose filling with a hint of shallots. Baked fresh daily."
  },
  { 
    id: 2, 
    name: "Original Tambun Biscuit", 
    price: 18.80, 
    originalPrice: 20.00, 
    rating: 4.8, 
    reviews: 156,
    image: "https://placehold.co/600x600/FEF3C7/92400E?text=Tambun+Biscuit",
    tag: "Hot",
    category: "Pastries",
    description: "Also known as Dragon Balls, these bite-sized treats are filled with savory mung bean paste."
  },
  { 
    id: 3, 
    name: "Ming Ang Instant White Coffee", 
    price: 19.80, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 89,
    image: "https://placehold.co/600x600/78350F/FEF3C7?text=White+Coffee",
    tag: null,
    category: "Beverages",
    description: "Aromatic and smooth, our Instant White Coffee brings the authentic Ipoh coffee shop experience to your home."
  },
  { 
    id: 4, 
    name: "Pineapple Cake (10pcs)", 
    price: 24.00, 
    originalPrice: 28.00, 
    rating: 5, 
    reviews: 210,
    image: "https://placehold.co/600x600/F59E0B/FFFBEB?text=Pineapple+Cake",
    tag: "CNY Special",
    category: "Cakes",
    description: "Buttery pastry filled with premium pineapple jam. A must-have for Chinese New Year to welcome prosperity."
  },
  { 
    id: 5, 
    name: "Spicy Chicken Floss Puff", 
    price: 11.30, 
    originalPrice: null, 
    rating: 4.7, 
    reviews: 112,
    image: "https://placehold.co/600x600/DC2626/FEF2F2?text=Floss+Puff",
    tag: "Promo",
    category: "Pastries",
    description: "A savory delight! Crispy puff pastry filled with spicy chicken floss."
  },
  { 
    id: 6, 
    name: "Honey Lime Juice 600g", 
    price: 18.90, 
    originalPrice: null, 
    rating: 4.8, 
    reviews: 56,
    image: "https://placehold.co/600x600/65A30D/ECFCCB?text=Honey+Lime",
    tag: null,
    category: "Beverages",
    description: "Refreshing and soothing. Made with real limes and honey. Perfect for hot days."
  },
  { 
    id: 7, 
    name: "Ipoh Salted Chicken Spices", 
    price: 8.00, 
    originalPrice: null, 
    rating: 4.9, 
    reviews: 430,
    image: "https://placehold.co/600x600/E5E5E5/404040?text=Spices",
    tag: "Hot Product",
    category: "Sauces",
    description: "Authentic herb and spice mix to make the famous Ipoh Salted Chicken at home."
  },
  { 
    id: 8, 
    name: "Traditional Wife Cake", 
    price: 17.90, 
    originalPrice: null, 
    rating: 4.6, 
    reviews: 98,
    image: "https://placehold.co/600x600/FDE68A/92400E?text=Wife+Cake",
    tag: null,
    category: "Pastries",
    description: "A classic Cantonese pastry with a thin crust and a chewy, sweet winter melon filling."
  },
];

export const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://placehold.co/1920x800/7f1d1d/fef2f2?text=Chinese+New+Year+Sale",
    subtitle: "Authentic Taste",
    title: "Prosperity Delivered",
    desc: "Celebrate the Lunar New Year with authentic handcrafted pastries delivered to your doorstep.",
    btn: "Shop CNY Collection"
  },
  {
    id: 2,
    image: "https://placehold.co/1920x800/991b1b/fef2f2?text=Freshly+Baked+Daily",
    subtitle: "Fresh From The Oven",
    title: "Signature Feng Li Su",
    desc: "Baked fresh daily using traditional recipes passed down through generations.",
    btn: "Order Fresh Now"
  },
  {
    id: 3,
    image: "https://placehold.co/1920x800/b45309/fffbeb?text=Premium+Gift+Sets",
    subtitle: "The Perfect Gift",
    title: "Share The Joy",
    desc: "Send your warm wishes with our elegantly packaged premium gift sets.",
    btn: "View Our Products"
  }
];