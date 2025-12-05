// components/section/DashboardSection.tsx
"use client"; // <--- Crucial: This makes the UI interactive

import { Users, DollarSign, ShoppingBag, Store, Flame, TrendingUp} from "lucide-react";
import { ListBox, Select } from "@heroui/react";
import { Card } from "@heroui/react";
import TopSellerChart from "@/components/admin/ui/TopSellerChart";
import RevenueChart from "@/components/admin/ui/RevenueChart"; 
import StatCard from "@/components/admin/ui/StatCard";
import { ChartDataPoint, RevenueDataPoint } from "@/types/dashboard";

// Define what data this component expects to receive from the server
interface DashboardSectionProps {
  topSellerData: ChartDataPoint[];
  revenueData: RevenueDataPoint[]; 
}

export default function DashboardSection({ topSellerData, revenueData }: DashboardSectionProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4">

        <StatCard
            title="Total Products"
            icon={<Store className="text-blue-500 size-6" />}
            value={0}
            analysisvalue={"0"}
            shortdesc={" new from last week"}
        />
       
        <StatCard
            title="Total Sales"
            icon={<Users className="text-violet-500 size-6" />}
            value={0}
            analysisvalue={"+0%"}
            shortdesc={" from last week"}
        />
  
        <StatCard  
            title="Pending Orders"
            icon={<ShoppingBag className="text-amber-500 size-6" />}
            value={0}
            analysisvalue={"0"}
            shortdesc={" new from last week"}
        />

        <StatCard
            title="Confirmed Orders"
            icon={<DollarSign className="text-green-500 size-6" />}
            value={0}
            analysisvalue={"0"}
            shortdesc={" new from last week"}
        />
    
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <Card className="rounded-lg">
            <Card.Content>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-50 rounded-md p-2 h-fit">
                        <TrendingUp className="text-emerald-500 size-6" />
                      </div>
                      <div className="text-slate-600 text-lg">Revenue Analytics</div>
                    </div>
                    <Select
                      className="w-[180px]"
                      placeholder="Select one"
                      defaultValue="week"
                      aria-label="Select time"
                    >
                      <Select.Trigger className="bg-indigo-50 rounded-md">
                        <Select.Value className="text-indigo-700" />
                        <Select.Indicator className="text-indigo-700" />
                      </Select.Trigger>
                      <Select.Popover className="rounded-md">
                        <ListBox>
                          <ListBox.Item
                            id="week"
                            textValue="7"
                            className="text-slate-900 hover:rounded-md"
                          >
                            Last 7 Days
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item
                            id="half"
                            textValue="15"
                            className="text-slate-900 hover:rounded-md"
                          >
                            Last 15 Days
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item
                            id="month"
                            textValue="30"
                            className="text-slate-900 hover:rounded-md"
                          >
                            Last 30 Days
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                </div>
                <div className="revenueBox h-[350px] w-full">
                    <RevenueChart data={revenueData} />
                </div>
            </Card.Content>
          </Card>
        </div>
        <div className="col-span-2">
          <Card className="rounded-lg">
            <Card.Content>
              <div className="flex items-center gap-2">
                <div className="bg-red-50 rounded-md p-2 h-fit">
                  <Flame className="text-red-500 size-6" />
                </div>
                <div className="text-slate-600 text-lg">Top Seller</div>
              </div>
              <div className="topseller-box h-min-[350px] w-full">
                {/* Render the chart with the data passed from props */}
                <TopSellerChart data={topSellerData} />
              </div>
              <div className="text-slate-500 text-sm text-center mt-10">
                See All
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}