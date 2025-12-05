"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/stores/useUIStore";
import { ChevronDown, X } from "lucide-react"; 
import { ADMIN_MENU_ITEMS, MenuItem } from "@/config/admin-menu";

export default function AdminSidebar() {
  const { isSidebarOpen, closeSidebar } = useUIStore();
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // 1. SMART CLICK HANDLER: Only close sidebar on mobile (< 1024px)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  // 2. AUTO-OPEN/CLOSE DROPDOWN
  useEffect(() => {
    // Find the parent item that owns the current URL (if any)
    const currentParent = ADMIN_MENU_ITEMS.find((item) => 
      item.children?.some((child) => child.path === pathname)
    );

    if (currentParent) {
      setActiveDropdown(currentParent.title);
    } else {
      // If on a single link (e.g. Dashboard), close all dropdowns
      setActiveDropdown(null);
    }
  }, [pathname]);

  const toggleDropdown = (menuTitle: string) => {
    setActiveDropdown(activeDropdown === menuTitle ? null : menuTitle);
  };

  const isLinkActive = (path?: string) => pathname === path;
  
  const getLinkClass = (isActive: boolean) => 
    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
      isActive 
        ? "bg-gray-100 text-slate-900" 
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}
        
      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 
          ${isSidebarOpen ? "lg:w-64" : "lg:w-0 lg:overflow-hidden"}
        `}
      >
        <div className="w-64 h-full flex flex-col bg-white border-r border-gray-200">
          
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b flex-shrink-0 border-gray-200">
            <span className="text-xl font-bold text-gray-900 font-sans">LOGO</span>
            <button onClick={closeSidebar} className="lg:hidden text-gray-500">
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            
            {ADMIN_MENU_ITEMS.map((item: MenuItem, index) => {
              const Icon = item.icon;
              const hasChildren = !!item.children;
              const isParentActive = item.children?.some(child => child.path === pathname);

              if (hasChildren) {
                return (
                  <div key={index}>
                    {/* Dropdown Toggle */}
                    <button
                      onClick={() => toggleDropdown(item.title)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg hover:bg-gray-100 text-gray-600`}>
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <Icon size={20} className="flex-shrink-0" />
                        {item.title}
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${activeDropdown === item.title ? "rotate-180" : ""}`} 
                      />
                    </button>
                    
                    {/* Dropdown Items */}
                    <div className={`overflow-hidden transition-all duration-200 ${activeDropdown === item.title ? "max-h-96" : "max-h-0"}`}>
                      <div className="pl-1 pr-1 space-y-1 mt-1">
                        {item.children?.map((subItem, subIndex) => (
                          <Link 
                            key={subIndex}
                            href={subItem.path} 
                            onClick={handleLinkClick} 
                            className={`block px-4 py-3 text-sm rounded-md transition-colors ${
                                isLinkActive(subItem.path) 
                                    ? "bg-gray-100 text-slate-900 font-medium"
                                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Single Link
              return (
                <Link 
                  key={index}
                  href={item.path || "#"} 
                  onClick={handleLinkClick} 
                  className={getLinkClass(isLinkActive(item.path))}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {item.title}
                </Link>
              );
            })}

          </div>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-400 text-center">
            v1.2.0
          </div>
          
        </div>
      </aside>
    </>
  );
}