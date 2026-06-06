"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { FiTrendingUp } from "react-icons/fi";

// ৩০ দিনের ট্রেন্ডিং কার্ভ তৈরির জন্য ডামি ওয়েভ ডাটা
const monthlyData = [
  { day: "Day 1", users: 300 },
  { day: "Day 5", users: 500 },
  { day: "Day 10", users: 850 },
  { day: "Day 15", users: 700 },
  { day: "Day 20", users: 450 },
  { day: "Day 25", users: 1100 },
  { day: "Day 28", users: 1450 }, // Peak Growth Point
  { day: "Day 30", users: 1200 },
];

const NewUser = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
      {/* হেডার পার্ট */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">New Users (30d)</h3>
          <p className="text-xs text-gray-400 mt-0.5">User registration trajectory</p>
        </div>
        {/* গ্রিন গ্রোথ ইন্ডিকেটর ব্যাজ (ইমেজ অনুযায়ী) */}
        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-xl text-xs font-bold">
          <FiTrendingUp className="w-3.5 h-3.5" />
          +2,410
        </div>
      </div>

      {/* রেসপন্সিভ এরিয়া কার্ভ চার্ট */}
      <div className="w-full h-64 sm:h-72 text-xs relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 5, left: 5, bottom: 0 }}
          >
            <defs>
              {/* মডার্ন ব্যাকগ্রাউন্ড গ্রাডিয়েন্ট (ব্র্যান্ড কালার থেকে ট্রান্সপারেন্ট) */}
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A65CC" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0A65CC" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {/* এক্স-অক্ষ সুনির্দিষ্ট ৩টি লেবেল দেখানোর জন্য (Day 1, Day 15, Day 30) */}
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              ticks={["Day 1", "Day 15", "Day 30"]}
              tick={{ fill: "#9CA3AF", fontWeight: 500 }}
              padding={{ left: 10, right: 10 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />

            {/* কার্ভ এরিয়া এবং স্ট্রোক লাইন */}
            <Area
              type="monotone"
              dataKey="users"
              stroke="#0A65CC"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#userGradient)"
            />

            {/* ইমেজ অনুযায়ী 'Peak Growth' পয়েন্টে কাস্টম হোয়াইট ডট ইন্ডিকেটর */}
            <ReferenceDot
              x="Day 28"
              y={1450}
              r={5}
              fill="#FFFFFF"
              stroke="#0A65CC"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* 'Peak Growth' কাস্টম ফ্লোটিং ব্যাজ */}
        <div className="absolute top-[12%] right-[15%] bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none tracking-wide">
          Peak Growth
        </div>
      </div>
    </div>
  );
};

export default NewUser;