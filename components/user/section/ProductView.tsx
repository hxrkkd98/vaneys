"use client"; // This component handles state, so it must be a Client Component

import { useState } from 'react';
import { ShoppingBag, Star, Heart, ChevronRight, Minus, Plus } from 'lucide-react';
import { Product } from '@/types/storefront'; // Ensure you have this type defined or import from where it exists

interface ProductViewProps {
  product: Product; // Receives the resolved product data as a prop
}

export default function ProductView({ product }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
        <div className="bg-white min-h-screen py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
                    <button className="hover:text-[#8B1E1E]">Home</button>
                    <ChevronRight size={12} />
                    <button className="hover:text-[#8B1E1E]">Products</button>
                    <ChevronRight size={12} />
                    <span className="text-gray-900 font-bold">{product.name}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Product Images */}
                    <div className="w-full md:w-1/2">
                        <div className="aspect-square bg-gray-50 border border-gray-100 mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        {/* <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-50 border border-gray-100 cursor-pointer hover:border-[#8B1E1E]">
                                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        </div> */}
                    </div>

                    {/* Product Info */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
                        
                        {/* <div className="flex items-center gap-4 mb-6">
                        <div className="flex text-yellow-400">
                            {product.rating != null && (
                                <div className="mb-2 text-yellow-400 flex justify-center text-[10px] gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={10} 
                                        fill={i < Math.floor(product.rating!) ? "currentColor" : "none"} 
                                        className={i < Math.floor(product.rating!) ? "" : "text-gray-200"} 
                                    />
                                    ))}
                                    <span className="text-gray-300 ml-1">({product.reviews})</span>
                                </div>
                            )}
                        </div>
                        <span className="text-sm text-gray-500 border-l border-gray-200 pl-4">{product.reviews} Customer Reviews</span>
                        </div> */}

                        {/* <div className="flex items-center gap-4 mb-8">
                        <span className="text-3xl font-bold text-[#8B1E1E]">RM {product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-400 line-through">RM {product.originalPrice?.toFixed(2)}</span>
                        )}
                        </div> */}

                        <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
                        {/* description isn't in your mock data type yet, so we use a fallback */}
                        Enjoy the authentic taste of tradition with this handcrafted delight. Perfect for sharing with family or as a gift.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="flex items-center border border-gray-200 w-fit h-12">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"><Minus size={16} /></button>
                            <span className="w-12 text-center font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center hover:bg-gray-50 text-gray-500"><Plus size={16} /></button>
                        </div>
                        <button className="flex-1 bg-[#8B1E1E] text-white h-12 font-bold uppercase tracking-widest hover:bg-[#6b1616] transition-colors flex items-center justify-center gap-2 px-8">
                            <ShoppingBag size={18} /> Add to Cart
                        </button>
                        {/* <button className="w-12 h-12 border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#8B1E1E] hover:border-[#8B1E1E] transition-colors">
                            <Heart size={20} />
                        </button> */}
                        </div>

                        <div className="space-y-3 text-sm text-gray-500">
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-900 w-24">SKU:</span>
                            <span>MA-2026-{product.id}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-bold text-gray-900 w-24">Category:</span>
                            <span>{product.category || "Pastries"}</span>
                        </div>
                        {/* <div className="flex gap-2">
                            <span className="font-bold text-gray-900 w-24">Tags:</span>
                            <span>{product.tag || "CNY 2026"}</span>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}