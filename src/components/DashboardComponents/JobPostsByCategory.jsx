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

// আপনার ইমেজ (image_10c61e.png) অনুযায়ী ডাটা স্ট্রাকচার
const categoryData = [
  { name: "Engineering", posts: 95 },
  { name: "Design", posts: 65 },
  { name: "Marketing", posts: 48 },
  { name: "Sales", posts: 78 },
  { name: "Operations", posts: 32 },
];

const JobPostsByCategory = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-xs">
      {/* হেডার পার্ট */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Job Posts by Category</h3>
          <p className="text-xs text-gray-400 mt-0.5">Distribution of current openings</p>
        </div>
        {/* একটিভ লিস্টিং ইন্ডিকেটর লেজেন্ড */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#0A65CC" }} />
          <span className="text-xs font-semibold text-gray-500">Active Listings</span>
        </div>
      </div>

      {/* রেসপন্সিভ চার্ট কন্টেইনার */}
      <div className="w-full h-64 sm:h-72 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontWeight: 500 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF" }} />
            <Tooltip
              cursor={{ fill: "#F9FAFB" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />
            {/* আপনার ব্র্যান্ড কালার থিম এবং স্মুথ রাউন্ডেড কর্নার বার */}
            <Bar
              dataKey="posts"
              fill="#0A65CC"
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobPostsByCategory;