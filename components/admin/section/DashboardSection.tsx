"use client";

import { useState } from "react";
import useSWR from "swr";
import { Users, DollarSign, ShoppingBag, Store, Flame, TrendingUp } from "lucide-react";
import { Select, Card, ListBox } from "@heroui/react"; // Adjusted imports for standard HeroUI
import type { Key } from '@heroui/react';
import TopSellerChart from "@/components/admin/ui/TopSellerChart";
import RevenueChart from "@/components/admin/ui/RevenueChart";
import StatCard from "@/components/admin/ui/StatCard";
import { ChartDataPoint, RevenueDataPoint, DashboardStats, TopSellerItem } from "@/types/dashboard";

// --- HELPERS ---

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
});

const SWR_OPTIONS = {
  revalidateOnFocus: false,      // Stop refetching when you switch tabs
  revalidateOnReconnect: false,  // Stop refetching on network reconnect
  refreshInterval: 0,            // Ensure polling is off
  keepPreviousData: true,        // Show old data while fetching new data
  dedupingInterval: 60000,       // (Optional) Don't refetch same key within 1 minute
};

const CHART_COLORS = ["#F97316", "#faa64bff", "#f7c183ff", "#f7d8aeff", "#f9e0bbff"];

const STATS_CONFIG = [
  { key: "totalProducts", title: "Total Products", icon: Store, color: "text-blue-500", iconcolor: "bg-blue-50", desc: "new from last week" },
  { key: "totalSales", title: "Total Sales", icon: Users, color: "text-violet-500", iconcolor: "bg-violet-50", desc: "from last week", prefix: "$" },
  { key: "pendingOrders", title: "Pending Orders", icon: ShoppingBag, color: "text-red-500", iconcolor: "bg-red-50", desc: "new from last week" },
  { key: "confirmedOrders", title: "Confirmed Orders", icon: DollarSign, color: "text-green-500", iconcolor: "bg-green-50",desc: "new from last week" },
];

export default function DashboardSection() {
  const [selectedDays, setSelectedDays] = useState<Key | null>("10");

  // --- 1. Fetch Stats ---
  const { data: stats, isLoading: statsLoading } = useSWR<DashboardStats>(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/dashboard/stats`,
    fetcher,
    SWR_OPTIONS
  );

  // --- 2. Fetch Top Sellers ---
  const { data: topSellersRaw, isLoading: sellersLoading } = useSWR<TopSellerItem[]>(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/dashboard/top-sellers`,
    fetcher,
    SWR_OPTIONS
  );

  // --- 3. Fetch Revenue (Dynamic based on selectedDays) ---
  const { data: revenueData, isLoading: revenueLoading } = useSWR<RevenueDataPoint[]>(
    `${process.env.NEXT_PUBLIC_API_URL || ''}/dashboard/revenue?days=${selectedDays}`,
    fetcher,
    SWR_OPTIONS
  );

  // Prepare Chart Data
  const topSellerData: ChartDataPoint[] = topSellersRaw 
    ? topSellersRaw.map((item, index) => ({
        name: item.category,
        value: item.totalSales,
        color: CHART_COLORS[index % CHART_COLORS.length],
      })) 
    : [];

  return (
    <div className="space-y-6">
      
      {/* 1. Stats Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CONFIG.map((conf, idx) => {
          const rawValue = stats ? stats[conf.key as keyof DashboardStats] : 0;
          const value = conf.prefix 
            ? `${conf.prefix}${rawValue?.toLocaleString()}` 
            : rawValue?.toLocaleString();

          return (
            <StatCard
              key={idx}
              title={conf.title}
              // Show skeleton or spinner if loading
              icon={statsLoading 
                ? <div className="animate-pulse w-6 h-6 bg-slate-200 rounded-full"/> 
                : <conf.icon className={`${conf.color} size-6`} />
              }
              value={statsLoading ? "..." : value}
              analysisvalue={statsLoading ? "..." : (rawValue > 0 ? "+10%" : "0%")} 
              shortdesc={conf.desc}
              iconcolor =  {conf.iconcolor}
            />
          );
        })}
      </div>

      {/* 2. Charts Grid */}
      <div className="grid grid-cols-6 gap-4">
        
        {/* Revenue Chart */}
        <div className="col-span-6 lg:col-span-4">
          <Card className="rounded-lg min-h-[500px] h-full">
            <Card.Content className="flex flex-col justify-between p-2">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="bg-indigo-50 rounded-md p-2 h-fit">
                        <TrendingUp className="text-indigo-500 size-6" />
                      </div>
                      <div className="text-slate-600 text-lg font-medium">Revenue Analytics</div>
                    </div>
                    
                    
                    <Select
                      className="w-[180px]"
                      aria-label="Select time range"
                      defaultValue="10"
                      onChange={setSelectedDays}
                    >
                        
                        <Select.Trigger className="bg-indigo-50 rounded-lg">
                          <Select.Value className="text-indigo-700"/>
                          <Select.Indicator className="text-indigo-700"/>
                        </Select.Trigger>
                        <Select.Popover className="rounded-lg">
                          <ListBox>
                            <ListBox.Item id="3" textValue="3" className="text-slate-700 hover:rounded-lg">
                              Last 3 Days
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="5" textValue="5" className="text-slate-700 hover:rounded-lg">
                              Last 5 Days
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="7" textValue="7" className="text-slate-700 hover:rounded-lg">
                              Last 7 Days
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="10" textValue="10" className="text-slate-700 hover:rounded-lg">
                              Last 10 Days
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                {/* Chart Area */}
                <div className={`w-full h-full flex flex-col justify-end transition-opacity duration-300 ${revenueLoading ? 'opacity-50' : 'opacity-100'}`}>
                    {revenueLoading ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-20"></div>
                    ) : (
                        revenueData && revenueData.length > 0 ? (
                            <RevenueChart data={revenueData} />
                        ) : (
                            <div className="text-slate-400 mb-20">No revenue data available</div>
                        )
                    )}
                </div>
            </Card.Content>
          </Card>
        </div>

        {/* Top Seller Chart */}
        <div className="col-span-6 lg:col-span-2">
          <Card className="rounded-lg">
            <Card.Content className="p-2">
              <div className="flex items-center gap-2">
                <div className="bg-amber-50 rounded-md p-2 h-fit">
                  <Flame className="text-amber-500 size-6" />
                </div>
                <div className="text-slate-600 text-lg font-medium">Top Seller</div>
              </div>
              
              <div className="w-full flex items-center justify-center">
                {sellersLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                ) : (
                    topSellerData.length > 0 ? (
                       <TopSellerChart data={topSellerData} />
                    ) : (
                       <div className="text-slate-400">No sales data</div>
                    )
                )}
              </div>
              
              <div className="text-slate-500 text-sm text-center mt-auto pt-6 cursor-pointer hover:text-indigo-600 transition-colors">
                See All
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}