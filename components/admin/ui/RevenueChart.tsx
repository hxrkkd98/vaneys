"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RevenueDataPoint } from "@/types/dashboard";

// --- Tooltip Setup ---
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // We map the data to find Revenue vs Orders regardless of order
    const revenueItem = payload.find((p) => p.dataKey === "revenue");
    const orderItem = payload.find((p) => p.dataKey === "orders");

    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 min-w-[150px]">
        <p className="text-slate-400 text-xs font-medium mb-2">{label}</p>
        
        {/* Revenue Value */}
        <div className="mb-2">
            <p className="text-slate-500 text-xs font-medium">Revenue</p>
            <p className="text-slate-800 text-lg font-bold">
            ${revenueItem?.value?.toLocaleString()}
            </p>
        </div>

        {/* Orders Value */}
        <div>
            <p className="text-slate-500 text-xs font-medium">Orders</p>
            <p className="text-amber-500 text-lg font-bold">
            {orderItem?.value?.toLocaleString()}
            </p>
        </div>
      </div>
    );
  }
  return null;
};

const formatYAxis = (tickItem: number) => {
  if (tickItem === 0) return "0";
  return `${tickItem / 1000}K`;
};

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748B', fontSize: 12 }} 
            tickFormatter={formatYAxis} 
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#CBD5E1', strokeWidth: 1 }} />
          
          {/* --- LINE 1: ORDERS (DOTTED) --- */}
          {/* strokeDasharray="4 4" creates the dotted/dashed effect */}
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#FDBA74" 
            strokeWidth={3}
            strokeDasharray="4 4" 
            dot={false}
            activeDot={false}
          />

          {/* --- LINE 2: REVENUE (SOLID) --- */}
          {/* No strokeDasharray means it renders as a solid line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F97316" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: "#fff", stroke: "#F97316", strokeWidth: 3 }} 
          />
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}