"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
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

const NewUser = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-[360px] bg-white rounded-2xl border border-gray-100 animate-pulse" />;

  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-xs relative">
      {/* হেডার */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">New Users (30d)</h3>
          <p className="text-xs text-gray-400 mt-0.5">User registration trajectory</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-xl text-xs font-bold">
          +2,410
        </div>
      </div>

      {/* এরিয়া কার্ভ চার্ট */}
      <div className="w-full h-[280px] text-xs relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyData}
            margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A65CC" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0A65CC" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              ticks={["Day 1", "Day 15", "Day 30"]}
              tick={{ fill: "#9CA3AF", fontWeight: 500 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
              }}
            />

            {/* মেইন স্মুথ কার্ভ লাইন এবং শ্যাডো এরিয়া */}
            <Area
              type="monotone"
              dataKey="users"
              stroke="#0A65CC"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />

            {/* ইমেজের মতো পিক পয়েন্টে ডট ইন্ডিকেটর */}
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

        {/* 'Peak Growth' টেক্সট ব্যাজ */}
        <div className="absolute top-[15%] right-[18%] bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm pointer-events-none">
          Peak Growth
        </div>
      </div>
    </div>
  );
};

export default NewUser;