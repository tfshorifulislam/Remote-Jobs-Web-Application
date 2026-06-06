"use client";

import React, { useState, useEffect } from "react";
// Next.js এর dynamic import ব্যবহার করে SSR বন্ধ করা হয়েছে
import dynamic from "next/dynamic";

// Recharts কম্পোনেন্টগুলোকে ডাইনামিকালি লোড করা হচ্ছে যাতে SSR ক্র্যাশ না করে
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });
const ReferenceDot = dynamic(() => import("recharts").then((mod) => mod.ReferenceDot), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ব্রাউজারে মাউন্ট হওয়ার আগ পর্যন্ত একটি সুন্দর স্কেলিটন বা ব্ল্যাঙ্ক বক্স দেখাবে, পেজ ভাঙবে না
  if (!mounted) {
    return (
      <div className="w-full mt-8 bg-white border border-gray-100 rounded-2xl p-6 h-[424px] animate-pulse flex items-center justify-center">
        <p className="text-sm text-gray-400">Loading Chart...</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-8 bg-white border border-gray-100 rounded-2xl p-3 sm:p-6 shadow-xs">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">New Users (30d)</h3>
          <p className="text-xs text-gray-400 mt-0.5">User registration trajectory</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl text-xs font-bold">
          +2,410
        </div>
      </div>

      {/* CHART AREA */}
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

            {/* XAxis এর ইন্টারভাল ফিক্স */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontWeight: 500 }}
              minTickGap={20}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#0A65CC"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />

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

        {/* Peak Growth Floating Label */}
        <div className="absolute top-[16%] right-[18%] bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none z-10">
          Peak Growth
        </div>
      </div>
    </div>
  );
} 