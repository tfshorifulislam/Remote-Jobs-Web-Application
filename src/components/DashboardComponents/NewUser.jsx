"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { day: "Day 1", users: 300 },
  { day: "Day 5", users: 550 },
  { day: "Day 10", users: 850 },
  { day: "Day 15", users: 700 },
  { day: "Day 20", users: 500 },
  { day: "Day 25", users: 1200 },
  { day: "Day 28", users: 1450 },
  { day: "Day 30", users: 1100 },
];

export default function NewUser() {
  return (
  
    <div className="w-full mt-8 bg-[#1B1B1C] border border-zinc-800 rounded-2xl p-3 sm:p-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
        
          <h3 className="text-lg font-bold text-[#E5E2E3]">
            New Users (30d)
          </h3>
        
          <p className="text-xs text-[#C4C7C8] mt-0.5">
            User registration trajectory
          </p>
        </div>

       
        <div className="bg-[#22C55E]/10 text-[#22C55E] px-3 py-1 rounded-xl text-xs font-bold">
          +2,410
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[320px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 15, left: 15, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="colorUsers"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
             
                <stop
                  offset="5%"
                  stopColor="#E5E2E3"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="#E5E2E3"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

         
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#C4C7C8", fontWeight: 500, fontSize: 12 }}
              minTickGap={20}
            />

          
            <Tooltip
              contentStyle={{
                backgroundColor: "#1B1B1C",
                border: "1px solid #27272A",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.2)",
              }}
              labelStyle={{ color: "#C4C7C8" }}
              itemStyle={{ color: "#E5E2E3" }}
            />

          
            <Area
              type="monotone"
              dataKey="users"
              stroke="#E5E2E3"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />

           
            <ReferenceDot
              x="Day 28"
              y={1450}
              r={5}
              fill="#1B1B1C"
              stroke="#E5E2E3"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>

   
        <div className="absolute top-[16%] right-[18%] bg-zinc-800 border border-zinc-700 text-[#E5E2E3] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none z-10">
          Peak Growth
        </div>
      </div>
    </div>
  );
}