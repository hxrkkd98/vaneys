import { 
    LayoutDashboard, 
    Box, 
    Users, 
    Settings, 
    ShoppingCart,
    FileText 
  } from "lucide-react";
  
  // Define the shape of a menu item
  export type MenuItem = {
    title: string;
    path?: string; // Optional because parents might just be toggles
    icon: any;     // The Lucide Icon component
    children?: {   // Optional: If this exists, it's a Dropdown
      title: string;
      path: string;
    }[];
  };
  
  export const ADMIN_MENU_ITEMS: MenuItem[] = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      icon: Box,
      children: [
        { title: "All Products", path: "/admin/products" },
        { title: "Add New", path: "/admin/products/add" },
        { title: "Categories", path: "/admin/products/categories" },
      ],
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      title: "Users",
      icon: Users,
      children: [
        { title: "User List", path: "/admin/users" },
        { title: "Roles & Permissions", path: "/admin/users/roles" },
      ],
    },
    {
      title: "Reports",
      path: "/admin/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];