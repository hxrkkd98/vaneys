"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import  Link  from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Get the current path
  const pathname = usePathname();

  // 3. Helper to determine active class
  const isActive = (path: string) => pathname === path ? "text-[#8B1E1E]" : "hover:text-[#8B1E1E]";

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center relative">
          
          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hover:text-[#8B1E1E] transition-colors p-1">
               {isOpen ? <X /> : <Menu />}
             </button>
          </div>
            
          {/* Logo */}
          <Link href="/" className="flex flex-col items-center group cursor-pointer md:items-start shrink-0">
              <h1 className="text-2xl md:text-3xl font-serif font-black text-[#8B1E1E] tracking-wider group-hover:opacity-90 transition-opacity">Vaneys</h1>
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] text-gray-500 uppercase font-medium group-hover:text-[#8B1E1E] transition-colors">Online Store</span>
          </Link>

          {/* Center Navigation - ABSOLUTE POSITIONED */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex space-x-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <Link href="/" className={`${isActive('/')} transition-colors`}>Home</Link>
                <Link href="/shop" className={`${isActive('/shop')} transition-colors`}>Products</Link>
                {/* <Link href="/about" className={`${isActive('/about')} transition-colors`}>About</Link> */}
             </div>
          </div>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
             <div className="flex items-center gap-3 cursor-pointer group">
                <Link href="/cart" className="relative p-2 rounded-full group-hover:bg-red-50 transition-colors">
                  <ShoppingBag size={20} className="text-gray-800 group-hover:text-[#8B1E1E] transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-[#8B1E1E] text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center border-2 border-white">
                    0
                  </span>
                </Link>
             </div>
             <Link href="/login" className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#8B1E1E]">
                <User size={20} strokeWidth={2} />
             </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 shadow-xl absolute w-full left-0 top-full animate-in slide-in-from-top-2 duration-200 h-screen">
           <div className="flex flex-col space-y-6 text-base font-medium text-gray-800 items-center text-center">
            <Link href="/" onClick={() => setIsOpen(false)} className={isActive('/')}>Home</Link>
             <Link href="/shop" onClick={() => setIsOpen(false)} className={isActive('/shop')}>Products</Link>
             {/* <Link href="/about" onClick={() => setIsOpen(false)} className={isActive('/about')}>About</Link> */}
             <div className="pt-8 border-t border-gray-100 w-full">
                <p className="text-xs text-gray-400 mb-2">Need Help?</p>
                <p className="text-[#8B1E1E] font-bold">012-718 8122</p>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
};