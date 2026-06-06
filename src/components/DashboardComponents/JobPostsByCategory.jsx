"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const categoryData = [
  { name: "Engineering", posts: 95 },
  { name: "Design", posts: 65 },
  { name: "Marketing", posts: 48 },
  { name: "Sales", posts: 78 },
  { name: "Operations", posts: 32 },
];

const JobPostsByCategory = () => {
  const [mounted, setMounted] = useState(false);
  const [chartWidth, setChartWidth] = useState(950);

  // উইন্ডো সাইজ ট্র্যাক করে চার্টের উইডথ ডাইনামিক করার জন্য (ResponsiveContainer এর বিকল্প)
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const container = document.getElementById("category-chart-box");
      if (container) {
        setChartWidth(container.offsetWidth - 20);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return <div className="w-full h-[360px] bg-white rounded-2xl border border-gray-100 animate-pulse" />;

  return (
    <div className="w-full mt-8 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Job Posts by Category</h3>
          <p className="text-xs text-gray-400 mt-0.5">Distribution of current openings</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0A65CC]" />
          <span className="text-xs font-semibold text-gray-500">Active Listings</span>
        </div>
      </div>

      {/* এই ডিভটির উইডথ জাভাস্ক্রিপ্ট ট্র্যাক করছে */}
      <div id="category-chart-box" className="w-full h-[280px] text-xs block clearfix">
        <BarChart
          width={chartWidth}
          height={280}
          data={categoryData}
          margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
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
            }}
          />
          <Bar
            dataKey="posts"
            fill="#0A65CC"
            radius={[6, 6, 0, 0]}
            maxBarSize={45}
          />
        </BarChart>
      </div>
    </div>
  );
};

export default JobPostsByCategory;