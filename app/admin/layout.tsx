import AdminSidebar from "@/components/admin/ui/AdminSidebar";
import AdminHeader from "@/components/admin/ui/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1. Outer Container: Full Screen height, gray background
    <div className="flex h-screen w-full bg-indigo-50">
      
      {/* 2. Sidebar Component (Handles its own fixed/responsive logic) */}
      <AdminSidebar />

      {/* 3. Main Content Wrapper: Flex Column */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        {/* 4. Header: It lives inside the column, at the top */}
        <AdminHeader />

        {/* 5. The Page Content: This is the ONLY thing that scrolls */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="w-full mx-auto">
             {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}