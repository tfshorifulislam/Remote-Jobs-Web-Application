"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const categoryData = [
  { name: "Engineering", posts: 95 },
  { name: "Design", posts: 65 },
  { name: "Marketing", posts: 48 },
  // { name: "Programming", posts: 90 },
  { name: "Sales", posts: 78 },
  { name: "Operations", posts: 32 },
];

const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

const JobPostsByCategory = () => {
  return (
  
    <div className="w-full mt-8 bg-[#1B1B1C] border border-zinc-800 rounded-2xl p-3 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
        
          <h3 className="text-lg font-bold text-[#E5E2E3]">
            Job Posts by Category
          </h3>
         
          <p className="text-xs text-[#C4C7C8] mt-0.5">
            Distribution of current openings
          </p>
        </div>

        <div className="flex items-center gap-2">
         
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E2E3]" />
          <span className="text-xs font-semibold text-[#C4C7C8]">
            Active Listings
          </span>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
           
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#27272A" 
            />

            
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={!isMobile ? { fill: "#C4C7C8", fontSize: 10 } : false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#C4C7C8", fontSize: 10 }}
            />


            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={{
                backgroundColor: "#1B1B1C",
                border: "1px solid #27272A",
                borderRadius: "12px",
              }}
              labelStyle={{ color: "#C4C7C8" }}
              itemStyle={{ color: "#E5E2E3" }}
            />

           
            <Bar
              dataKey="posts"
              fill="#ffffff33"
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobPostsByCategory