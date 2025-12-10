"use client";
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { Product } from "@/types/storefront";

interface ProductCardProps {
  product: Product;
   onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <div onClick={onClick} className="bg-white group relative flex flex-col h-full">
    {/* Image Area */}
    <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
      {/* {product.tag && (
         <span className="absolute top-0 left-0 bg-[#8B1E1E] text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider z-10">
           {product.tag}
         </span>
      )} */}
      {/* <button className="absolute top-3 right-3 z-10 text-gray-400 hover:text-red-600 md:opacity-0 md:group-hover:opacity-100 transition-opacity transform md:translate-x-2 md:group-hover:translate-x-0">
        <Heart size={20} />
      </button> */}
      
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      {/* Quick Add Button (Desktop) */}
      <button className="cursor-pointer hidden md:flex absolute bottom-0 left-0 w-full bg-white/95 text-[#8B1E1E] py-3 text-xs font-bold uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-red-100 hover:bg-[#8B1E1E] hover:text-white items-center justify-center gap-2">
        <ShoppingBag size={14} /> Add to Cart
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 text-center px-2">
       {/* {product.rating != null && (
          <div className="mb-2 text-yellow-400 flex justify-center text-[10px] gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={10} 
                fill={i < Math.floor(product.rating!) ? "currentColor" : "none"} // The '!' asserts it's not null here
                className={i < Math.floor(product.rating!) ? "" : "text-gray-200"} 
              />
            ))}
            <span className="text-gray-300 ml-1">({product.reviews})</span>
          </div>
        )} */}
       <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-[#8B1E1E] transition-colors cursor-pointer leading-relaxed">
         {product.name}
       </h3>
       
       <div className="mt-auto pb-4">
         <div className="flex justify-center items-baseline gap-2">
            <span className="text-lg font-bold text-[#8B1E1E]">RM {product.price.toFixed(2)}</span>
            {/* {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">RM {product.originalPrice.toFixed(2)}</span>
            )} */}
         </div>
         {/* Mobile Add Button */}
         <button className="md:hidden w-full mt-2 border border-[#8B1E1E] text-[#8B1E1E] py-2 text-[10px] font-bold uppercase">
            Add
         </button>
       </div>
    </div>
  </div>
);