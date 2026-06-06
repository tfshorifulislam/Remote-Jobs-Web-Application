'use client'
import React from 'react';
import { useSession } from '@/lib/auth-client';
// react-icons থেকে প্রিমিয়াম আইকনগুলো নেওয়া হয়েছে
import { 
  FiUsers, 
  FiUserCheck, 
  FiBriefcase, 
  FiFileText, 
  FiDollarSign, 
  FiCalendar, 
  FiDownload,
  FiArrowUpRight,
  FiMinus
} from 'react-icons/fi';

const DashboardOverview = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;

    
    const stats = [
        {
            title: "Total Users",
            value: "124,892",
            change: "+12%",
            isPositive: true,
            icon: FiUsers,
        },
        {
            title: "Total Recruiters",
            value: "12,405",
            change: "+8%",
            isPositive: true,
            icon: FiUserCheck,
        },
        {
            title: "Total Companies",
            value: "4,281",
            change: "0%",
            isPositive: false,
            isNeutral: true,
            icon: FiBriefcase,
        },
        {
            title: "Jobs Posted",
            value: "8,920",
            change: "+24%",
            isPositive: true,
            icon: FiFileText,
        },
        {
            title: "Platform Revenue",
            value: "$245,800",
            change: "+18.5%",
            isPositive: true,
            icon: FiDollarSign,
        },
    ];

    return (
        <div className="p-4 sm:p-6 md:p-8 mx-auto w-full bg-gray-50/30 min-h-screen">
            
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">Real-time platform performance and growth metrics.</p>
                </div>
                

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        Last 30 Days
                    </button>
                    <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-95 transition cursor-pointer shadow-sm shadow-[#0A65CC]/20" style={{ backgroundColor: '#0A65CC' }}>
                        <FiDownload className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {stats.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between group hover:border-[#0A65CC]/30 transition-all duration-300"
                    >
                      
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#0A65CC]/5 text-[#0A65CC] transition-colors">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            
                        
                            <div className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-lg text-xs font-bold ${
                                stat.isNeutral 
                                    ? "bg-gray-50 text-gray-400"
                                    : stat.isPositive 
                                        ? "bg-emerald-50 text-emerald-600" 
                                        : "bg-rose-50 text-rose-600"
                            }`}>
                                {stat.isPositive && !stat.isNeutral && <FiArrowUpRight className="w-3 h-3" />}
                                {stat.isNeutral && <FiMinus className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">
                                {stat.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardOverview;