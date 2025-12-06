import DashboardSection from "@/components/admin/section/DashboardSection";

export default function AdminDashboardPage() {
  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Overview</h1>
      <DashboardSection />
    </div>
  );
}