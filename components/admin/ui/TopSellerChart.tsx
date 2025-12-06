"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { ChartDataPoint } from "@/types/dashboard"; // Import your type

// Define the props this component accepts
interface TopSellerChartProps {
  data: ChartDataPoint[];
}

export default function TopSellerChart({ data }: TopSellerChartProps) {
  // Calculate total safely
  const totalSales = data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(totalSales);

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Chart Section */}
      <div className="w-full relative flex justify-center items-center">
 
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy - 20} className="fill-slate-500 text-sm font-medium">
                          Total Sales
                        </tspan>
                        <tspan x={viewBox.cx} y={viewBox.cy + 10} className="fill-slate-800 text-xl font-bold">
                          {formattedTotal}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>

      </div>

      {/* Legend Section */}
      <div className="w-full space-y-3 px-4 mt-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-slate-600 text-sm">{item.name}</span>
            </div>
            <span className="text-slate-800 font-semibold text-sm">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}