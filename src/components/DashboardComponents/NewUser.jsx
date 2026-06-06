"use client";

import React, { useState, useEffect } from "react";
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
  { day: "Day 28", users: 1450 }, // Peak Point
  { day: "Day 30", users: 1100 },
];

export default function NewUser() {
  const [mounted, setMounted] = useState(false);

  // Next.js (SSR) এ উইডথ ক্র্যাশ এবং চার্ট হাইড হওয়া রোধ করার জন্য
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[400px] bg-white rounded-2xl border border-gray-100 animate-pulse" />;
  }

  return (
    <div className="w-full mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            New Users (30d)
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            User registration trajectory
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-xs font-bold">
          +2,410
        </div>
      </div>

      {/* CHART AREA WITH PROPER CONFIG */}
      <div className="w-full h-[320px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 15, left: 15, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A65CC" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0A65CC" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* FIX: ticks={[]} অপশনটি সরিয়ে interval দেওয়া হয়েছে, যাতে ডাটা হাইড না হয় */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontWeight: 500 }}
              minTickGap={30} 
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />

            {/* মেইন ডাটা এরিয়া কার্ভ লাইন */}
            <Area
              type="monotone"
              dataKey="users"
              stroke="#0A65CC"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />

            {/* পিক পয়েন্ট ইন্ডিকেটর ডট */}
            <ReferenceDot
              x="Day 28"
              y={1450}
              r={5}
              fill="#fff"
              stroke="#0A65CC"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* 'Peak Growth' টেক্সট লেবেল */}
        <div className="absolute top-[16%] right-[18%] bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none z-10">
          Peak Growth
        </div>
      </div>
    </div>
  );
}