// 1. Define the shape of a single item from your API
export interface TopSellerItem {
  id: string;      // APIs usually send an ID
  category: string; // e.g. "Electronics"
  totalSales: number; // e.g. 1200000
}

// 2. Define the shape of the data the Chart expects
// (Sometimes API data differs slightly from what Recharts needs)
export interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

export interface RevenueDataPoint {
  date: string;    // "12 Aug"
  revenue: number; // 12000
  orders: number;  // 400
  [key: string]: any;
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  pendingOrders: number;
  confirmedOrders: number;
}