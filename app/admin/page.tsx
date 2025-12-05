import { TopSellerItem, ChartDataPoint, RevenueDataPoint} from "@/types/dashboard";
import DashboardSection from "@/components/admin/section/DashboardSection";// Import the new component


/* const CHART_COLORS = ["#4f39f5", "#615fff", "#7c86ff", "#a3b4ff", "#c7d2ff"]; */
const CHART_COLORS = ["#F97316", "#faa64bff", "#f7c183ff", "#f7d8aeff", "#f9e0bbff"]; 

async function getDashboardData() {
  // 1. Simulate Top Seller Data
  const topSellersRaw: TopSellerItem[] = [
    { id: "1", category: "Electronics", totalSales: 1200000 },
    { id: "2", category: "Fashion", totalSales: 950000 },
    { id: "3", category: "Home & Kitchen", totalSales: 750000 },
    { id: "4", category: "Beauty", totalSales: 500000 },
  ];

  const topSellerData: ChartDataPoint[] = topSellersRaw.map((item, index) => ({
    name: item.category,
    value: item.totalSales,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // 2. Simulate Revenue Data (Matches your graph screenshot)
  const revenueData: RevenueDataPoint[] = [
    { date: "12 Aug", revenue: 8200, orders: 4800 },
    { date: "13 Aug", revenue: 10000, orders: 3200 },
    { date: "14 Aug", revenue: 9500, orders: 6000 },
    { date: "15 Aug", revenue: 11500, orders: 4000 },
    { date: "16 Aug", revenue: 11000, orders: 6000 },
    { date: "17 Aug", revenue: 14521, orders: 8500 }, // Peak
    { date: "18 Aug", revenue: 12000, orders: 6000 },
    { date: "19 Aug", revenue: 10000, orders: 3500 },
    { date: "20 Aug", revenue: 12500, orders: 5500 },
  ];

  return { topSellerData, revenueData };
}

// 2. This component remains "async" because it is a Server Component
export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardSection 
        topSellerData={data.topSellerData} 
        revenueData={data.revenueData} 
    />
  );
}