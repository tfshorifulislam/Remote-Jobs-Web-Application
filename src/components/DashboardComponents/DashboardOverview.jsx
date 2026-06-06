"use client";

import React from "react";
import {
    FiUsers,
    FiUserCheck,
    FiBriefcase,
    FiFileText,
    FiDollarSign,
    FiCalendar,
    FiDownload,
    FiArrowUpRight,
    FiMinus,
} from "react-icons/fi";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";
import JobPostsByCategory from "./JobPostsByCategory";
import NewUser from "./NewUser";
import SubscriptionTransactions from "./SubscriptionTransactions";

const DashboardOverview = () => {
    const stats = [
        {
            title: "Total Users",
            value: "124,892",
            change: "+12%",
            isPositive: true,
            icon: FiUsers,
            data: [
                { value: 10 },
                { value: 30 },
                { value: 20 },
                { value: 50 },
                { value: 40 },
                { value: 70 },
            ],
        },
        {
            title: "Total Recruiters",
            value: "12,405",
            change: "+8%",
            isPositive: true,
            icon: FiUserCheck,
            data: [
                { value: 5 },
                { value: 15 },
                { value: 10 },
                { value: 25 },
                { value: 20 },
            ],
        },
        {
            title: "Companies",
            value: "4,281",
            change: "0%",
            isNeutral: true,
            icon: FiBriefcase,
            data: [
                { value: 8 },
                { value: 8 },
                { value: 9 },
                { value: 8 },
                { value: 8 },
            ],
        },
        {
            title: "Jobs Posted",
            value: "8,920",
            change: "+24%",
            isPositive: true,
            icon: FiFileText,
            data: [
                { value: 15 },
                { value: 35 },
                { value: 25 },
                { value: 60 },
                { value: 80 },
            ],
        },
        {
            title: "Revenue",
            value: "$245,800",
            change: "+18.5%",
            isPositive: true,
            icon: FiDollarSign,
            data: [
                { value: 20 },
                { value: 40 },
                { value: 30 },
                { value: 70 },
                { value: 90 },
            ],
        },
    ];

    return (
     
        <div className="p-4 sm:p-6 md:p-8 w-full min-h-screen ">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-800 pb-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#E5E2E3]">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-[#C4C7C8]">
                        Real-time analytics & platform growth
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm font-semibold text-[#C4C7C8] hover:bg-zinc-700 transition">
                        <FiCalendar />
                        Last 30 Days
                    </button>

                    <button
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#E5E2E3] text-[#1B1B1C] rounded-xl text-sm font-semibold hover:bg-white transition"
                    >
                        <FiDownload />
                        Export
                    </button>
                </div>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

                {stats.map((stat, index) => (
                    <div
                        key={index}
                     
                        className="bg-[#1B1B1C] border border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                    >

                        {/* TOP */}
                        <div className="flex items-center justify-between">
                           
                            <div className="w-10 h-10 rounded-xl bg-[#E2E2E2]/10 flex items-center justify-center text-[#FFFFFF]">
                                <stat.icon className="w-5 h-5" />
                            </div>

                            <div
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${stat.isNeutral
                                    ? "bg-zinc-800 text-zinc-400"
                                    : stat.isPositive
                                        ? "bg-[#22C55E]/10 text-[#22C55E]"
                                        : "bg-rose-500/10 text-rose-400"
                                    }`}
                            >
                                {stat.isPositive && !stat.isNeutral && (
                                    <FiArrowUpRight />
                                )}
                                {stat.isNeutral && <FiMinus />}
                                {stat.change}
                            </div>
                        </div>

                        {/* TEXT */}
                        <div className="mt-3">
                          
                            <p className="text-xs text-[#C4C7C8] uppercase tracking-wider">
                                {stat.title}
                            </p>
                         
                            <h2 className="text-2xl font-bold text-[#E5E2E3]">
                                {stat.value}
                            </h2>
                        </div>

                        {/* PREMIUM AREA CHART */}
                        <div className="h-16 mt-3">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stat.data}>
                                    <defs>
                                        <linearGradient
                                            id={`color-${index}`}
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

                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#1B1B1C', borderColor: '#zinc-800', borderRadius: '8px' }}
                                        labelStyle={{ color: '#C4C7C8' }}
                                        itemStyle={{ color: '#E5E2E3' }}
                                    />

                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#E5E2E3"
                                        strokeWidth={2}
                                        fill={`url(#color-${index})`}
                                        fillOpacity={1}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                ))}
            </div>

        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <JobPostsByCategory />
                <NewUser />
            </div>
            <div className="mt-8">
                <SubscriptionTransactions />
            </div>
        </div>
    );
};

export default DashboardOverview;