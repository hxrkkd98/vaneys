import { DashboardStats, ChartDataPoint, RevenueDataPoint, TopSellerItem } from "@/types/dashboard";
import DashboardSection from "@/components/admin/section/DashboardSection";

// --- CONSTANTS ---
const CHART_COLORS = ["#F97316", "#faa64bff", "#f7c183ff", "#f7d8aeff", "#f9e0bbff"];

// Dummy data to return if the API fails
const FALLBACK_STATS: DashboardStats = {
  totalProducts: 0,
  totalSales: 0,
  pendingOrders: 0,
  confirmedOrders: 0,
};

const FALLBACK_REVENUE: RevenueDataPoint[] = [
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

const FALLBACK_TOP_SELLERS_RAW: TopSellerItem[] = [
    { id: "1", category: "Electronics", totalSales: 1200000 },
    { id: "2", category: "Fashion", totalSales: 950000 },
    { id: "3", category: "Home & Kitchen", totalSales: 750000 },
    { id: "4", category: "Beauty", totalSales: 500000 },
];

// --- HELPERS ---
function formatTopSellerData(items: TopSellerItem[]): ChartDataPoint[] {
  return items.map((item, index) => ({
    name: item.category,
    value: item.totalSales,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));
}

// --- DATA FETCHING ---
async function getDashboardData() {
  // Replace with your actual backend URL
  const API_BASE_URL = "https://api.yourdomain.com";

  try {
    // 1. Attempt to fetch all data in parallel
    const [statsRes, topSellerRes, revenueRes] = await Promise.all([
      fetch(`${API_BASE_URL}/dashboard/stats`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/dashboard/top-sellers`, { cache: "no-store" }),
      fetch(`${API_BASE_URL}/dashboard/revenue`, { cache: "no-store" }),
    ]);

    // 2. Validation: If ANY request failed, throw error to trigger fallback
    if (!statsRes.ok || !topSellerRes.ok || !revenueRes.ok) {
      throw new Error("One or more API calls failed");
    }

    // 3. Parse JSON
    const stats: DashboardStats = await statsRes.json();
    const topSellersRaw: TopSellerItem[] = await topSellerRes.json();
    const revenueData: RevenueDataPoint[] = await revenueRes.json();

    // 4. Return Real Data
    return {
      stats: stats,
      topSellerData: formatTopSellerData(topSellersRaw),
      revenueData: revenueData,
    };

  } catch (error) {
    // 5. Error Handling: Log it and return dummy data
    console.error("⚠️ Error loading dashboard data. Using fallback.", error);
    
    return {
      stats: FALLBACK_STATS,
      topSellerData: formatTopSellerData(FALLBACK_TOP_SELLERS_RAW),
      revenueData: FALLBACK_REVENUE,
    };
  }
}

// --- MAIN PAGE COMPONENT ---
export default async function AdminDashboardPage() {
  const data = await getDashboardData();

  return (
    <DashboardSection 
        topSellerData={data.topSellerData} 
        revenueData={data.revenueData} 
        stats={data.stats}
    />
  );
}