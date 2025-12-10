"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, ChevronRight } from 'lucide-react';  
import { ProductCard } from '@/components/user/ui/ProductCard';
import { Product } from '@/types/storefront';

// --- 1. NEW COMPONENT: SKELETON LOADER ---
// This mimics the shape of your ProductCard
const ProductSkeleton = () => (
  <div className="bg-white border border-gray-100 rounded-lg p-4 animate-pulse">
    {/* Image Placeholder */}
    <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
    
    {/* Category Tag Placeholder */}
    <div className="h-3 bg-gray-200 rounded w-1/4 mb-3"></div>
    
    {/* Title Placeholder */}
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    
    {/* Price Placeholder */}
    <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
  </div>
);

export default function ShopPage() {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('latest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // --- FETCH DATA FUNCTION ---
  // --- FETCH DATA FUNCTION WITH 2s DELAY ---
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (activeCategory !== 'All') {
          params.append('category', activeCategory);
        }
        if (minPrice) params.append('min', minPrice);
        if (maxPrice) params.append('max', maxPrice);
        params.append('sort', sortOption);

        // 1. Create a timer promise that waits for 2 seconds (2000ms)
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

        // 2. Create the actual API fetch promise
        const apiPromise = fetch(`/api/shop/products?${params.toString()}`).then((res) => res.json());

        // 3. await Promise.all() waits for the SLOWEST of the two to finish
        // This means it will always take at least 2 seconds
        const [_, data] = await Promise.all([delayPromise, apiPromise]);
        
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce remains the same
    const timer = setTimeout(() => {
        fetchProducts();
    }, 500); 

    return () => clearTimeout(timer);
  }, [activeCategory, sortOption, minPrice, maxPrice]);

  // --- HANDLERS ---
  const handleProductClick = (productId: number) => {
    router.push(`/shop/${productId}`); 
  };

  const categories = [
    { name: 'All Products', value: 'All' },
    { name: 'Bottle', value: 'bottle' }, 
    { name: 'Giftset', value: 'giftset' },
  ];

  return (
    <div className="bg-white font-sans text-gray-800 selection:bg-[#8B1E1E] selection:text-white">
        <div className="bg-gray-50 min-h-screen py-12 animate-in fade-in duration-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* --- SIDEBAR FILTERS --- */}
                    <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-6 shadow-sm border border-gray-100 sticky top-4">
                        <div className="flex items-center gap-2 mb-6 text-[#8B1E1E]">
                            <Filter size={18} />
                            <h3 className="font-bold uppercase tracking-widest text-sm">Filters</h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-sm mb-3">Categories</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {categories.map((cat) => (
                                        <li 
                                            key={cat.value}
                                            onClick={() => setActiveCategory(cat.value)}
                                            className={`flex items-center gap-2 cursor-pointer transition-colors ${
                                                activeCategory === cat.value 
                                                ? 'text-[#8B1E1E] font-bold' 
                                                : 'hover:text-[#8B1E1E]'
                                            }`}
                                        >
                                            <ChevronRight size={14} className={activeCategory === cat.value ? "opacity-100" : "opacity-0"}/> 
                                            {cat.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="border-t border-gray-100 pt-6">
                                <h4 className="font-bold text-sm mb-3">Price Range (RM)</h4>
                                <div className="flex gap-2 items-center">
                                <input 
                                    type="number" 
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="Min" 
                                    className="w-full border border-slate-200 p-2 text-xs rounded focus:outline-[#8B1E1E]" 
                                />
                                <span className="text-gray-400">-</span>
                                <input 
                                    type="number" 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Max" 
                                    className="w-full border border-slate-200  p-2 text-xs rounded focus:outline-[#8B1E1E]" 
                                />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* --- PRODUCT GRID --- */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-500 text-sm">
                                {loading ? 'Loading...' : `Showing ${products.length} results`}
                            </p>
                            
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="border border-gray-200 p-2 text-sm focus:outline-none rounded"
                            >
                                <option value="latest">Sort by Latest</option>
                                <option value="price_asc">Sort by Price: Low to High</option>
                                <option value="price_desc">Sort by Price: High to Low</option>
                            </select>
                        </div>
                        
                        {/* --- 2. UPDATED LOGIC: SHOW GRID OF SKELETONS WHEN LOADING --- */}
                        {loading ? (
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {/* We map an array of 6 items to create a nice grid of placeholders */}
                                {[...Array(6)].map((_, index) => (
                                    <ProductSkeleton key={index} />
                                ))}
                             </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onClick={() => handleProductClick(product.id)} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-lg">
                                <p className="text-gray-500">No products found for this category.</p>
                                <button 
                                    onClick={() => {setActiveCategory('All'); setMinPrice(''); setMaxPrice('');}}
                                    className="mt-4 text-[#8B1E1E] underline text-sm"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}