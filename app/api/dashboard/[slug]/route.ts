import { NextResponse } from "next/server";

// --- Types ---
type DashboardStats = {
  totalProducts: number;
  totalSales: number;
  pendingOrders: number;
  confirmedOrders: number;
};

type TopSellerItem = {
  id: string;
  category: string;
  totalSales: number;
};

// --- Helper: Generate Date Data ---
const generateRevenueData = (days: number) => {
  if (!days || days <= 0) return [];

  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Format: "05 Dec"
    const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    data.push({
      date: dateStr,
      revenue: Math.floor(Math.random() * 5000) + 2000, 
      orders: Math.floor(Math.random() * 50) + 10,     
    });
  }
  return data;
};

// --- Main Handler ---
export async function GET(
  request: Request,
  // 1. UPDATE: Define params as a Promise
  { params }: { params: Promise<{ slug: string }> } 
) {
  // 2. UPDATE: Await the params
  const { slug } = await params; 
  
  const { searchParams } = new URL(request.url);

  // Simulate Network Delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  switch (slug) {
    case "stats":
      const stats: DashboardStats = {
        totalProducts: 156,
        totalSales: 4250000,
        pendingOrders: 8,
        confirmedOrders: 1042,
      };
      return NextResponse.json(stats);

    case "top-sellers":
      const topSellers: TopSellerItem[] = [
        { id: "1", category: "Electronics", totalSales: 1500000 },
        { id: "2", category: "Fashion", totalSales: 1100000 },
        { id: "3", category: "Home & Living", totalSales: 950000 },
        { id: "4", category: "Beauty", totalSales: 600000 },
        { id: "5", category: "Automotive", totalSales: 300000 },
      ];
      return NextResponse.json(topSellers);

    case "revenue":
      const daysParam = searchParams.get("days");
      const days = parseInt(daysParam || "7", 10);
      const revenueData = generateRevenueData(days);
      return NextResponse.json(revenueData);

    default:
      return NextResponse.json({ error: "Endpoint not found" }, { status: 404 });
  }
}
