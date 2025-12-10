"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabaseClient'; // Uses the BROWSER client
import { User } from '@supabase/supabase-js';
import { logout } from '@/lib/auth/action';
import { useUserStore } from '@/stores/useUserStore';


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
 
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path ? "text-[#8B1E1E]" : "hover:text-[#8B1E1E]";

  // Fetch User Data on Mount
  const { user, setUser } = useUserStore();

  // Keep the listener to sync updates (Login/Logout)
  useEffect(() => {
    const supabase = createClient();    
    // Listen for changes (Login, Logout, Auto-refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Update the global store whenever Supabase detects a change
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

 /*  useEffect(() => {
    console.log("Current User State:", user);
  }, [user]);
 */
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex space-x-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <Link href="/" className={`${isActive('/')} transition-colors`}>Home</Link>
                <Link href="/shop" className={`${isActive('/shop')} transition-colors`}>Products</Link>
                {user && (
                  <button 
                    onClick={async () => {
                      setUser(null); // <--- 1. Clear the UI state immediately
                      await logout(); // <--- 2. Then call the server action
                    }}
                    className="hover:text-[#8B1E1E] transition-colors text-left cusror-pointer"
                  >
                    LOGOUT
                  </button>
                )}
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

             {/* 2. Desktop Login/Profile Logic */}
             {user ? (
               <Link 
                 href="/profile" 
                 className={`hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#8B1E1E] ${isActive('/profile')}`}
                 title="My Profile"
               >
                  <UserIcon size={20} strokeWidth={2} />
               </Link>
             ) : (
               <Link 
                 href="/login" 
                 className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-800 hover:text-[#8B1E1E]"
                 title="Login"
               >
                  <UserIcon size={20} strokeWidth={2} />
               </Link>
             )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-6 px-6 shadow-xl absolute w-full left-0 top-full animate-in slide-in-from-top-2 duration-200 h-screen">
           <div className="flex flex-col space-y-6 text-base font-medium text-gray-800 items-center text-center">
             <Link href="/" onClick={() => setIsOpen(false)} className={isActive('/')}>Home</Link>
             <Link href="/shop" onClick={() => setIsOpen(false)} className={isActive('/shop')}>Products</Link>
             
             {/* 3. Mobile Login/Profile Logic */}
             {user ? (
              <>
                 <Link href="/profile" onClick={() => setIsOpen(false)} className={isActive('/profile')}>Profile</Link>
                 
                 {/* 4. The Logout Button */}
                 <button 
                   onClick={async () => {
                     setIsOpen(false);
                     setUser(null);
                     await logout(); // Calls the Server Action
                   }} 
                   className="text-gray-500 hover:text-red-600 flex items-center gap-2"
                 >
                   Logout <LogOut size={16} />
                 </button>
              </>
             ) : (
                <Link href="/login" onClick={() => setIsOpen(false)} className={isActive('/login')}>Login</Link>
             )}

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