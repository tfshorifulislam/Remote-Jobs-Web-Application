"use client";

import React, { useState } from "react";

const TRANSACTIONS_DATA = [
    { id: '#TXN-902341', user: 'marcus.k@techcorp.io', company: 'TechCorp Inc.', initials: 'MK', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 24, 2023, 14:20', status: 'Success' },
    { id: '#TXN-882103', user: 'sarah.l@creativestudio.com', company: 'Creative Studio', initials: 'SL', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 24, 2023, 11:05', status: 'Success' },
    { id: '#TXN-774129', user: 'j.doe@freelance.org', company: 'Independent', initials: 'JD', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 23, 2023, 16:45', status: 'Pending' },
    { id: '#TXN-552014', user: 'admin@retailglobal.net', company: 'Retail Global', initials: 'AR', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 23, 2023, 09:12', status: 'Failed' },
    { id: '#TXN-441092', user: 'alex.m@devstack.io', company: 'DevStack Tech', initials: 'AM', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 22, 2023, 18:30', status: 'Success' },
    { id: '#TXN-339821', user: 'emily.w@designco.com', company: 'DesignCo Labs', initials: 'EW', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 22, 2023, 15:10', status: 'Success' },
    { id: '#TXN-228104', user: 'brian.t@logistics.net', company: 'Global Logistics', initials: 'BT', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 21, 2023, 11:15', status: 'Pending' },
    { id: '#TXN-117293', user: 'clara.p@fintech.org', company: 'FinTech Secure', initials: 'CP', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 21, 2023, 08:45', status: 'Success' },
    { id: '#TXN-005192', user: 'david.k@cloudscale.io', company: 'CloudScale Inc.', initials: 'DK', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 20, 2023, 17:05', status: 'Success' },
    { id: '#TXN-994182', user: 'fiona.g@marketing.com', company: 'Growth Marketing', initials: 'FG', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 20, 2023, 13:22', status: 'Failed' }
];

const ITEMS_PER_PAGE = 4;

export default function SubscriptionTransactions() {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(TRANSACTIONS_DATA.length / ITEMS_PER_PAGE);
    const start = (page - 1) * ITEMS_PER_PAGE;

    const currentData = TRANSACTIONS_DATA.slice(start, start + ITEMS_PER_PAGE);

    // স্ট্যাটাস কালার হ্যান্ডলার (Success এর জন্য #22C55E)
    const getStatus = (status) => {
        if (status === "Success") return "text-[#22C55E]";
        if (status === "Pending") return "text-amber-500";
        return "text-rose-500";
    };

    return (
        // ব্যাকগ্রাউন্ড #1B1B1C এবং বর্ডার মডিফাই করা হয়েছে
        <div className="w-full mt-8 bg-[#1B1B1C] border border-zinc-800 rounded-xl p-4 sm:p-6🍎">

            {/* HEADER */}
            <div className="flex justify-between mb-5">
                {/* টেক্সট কালার #E5E2E3 */}
                <h2 className="font-semibold text-sm sm:text-lg text-[#E5E2E3]">
                    Recent Subscription Transactions
                </h2>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
                <table className="w-full table-fixed">
                    <thead>
                        {/* টেবিল হেডার বর্ডার এবং টেক্সট কালার #C4C7C8 */}
                        <tr className="text-xs text-[#C4C7C8] border-b border-zinc-800">
                            <th className="w-[35%] text-left py-2">User</th>
                            <th className="w-[20%] text-left">Plan</th>
                            <th className="w-[15%] text-left">Amount</th>
                            <th className="w-[20%] text-left">Date</th>
                            <th className="w-[10%] text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentData.map((tx) => (
                            <tr key={tx.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/20 transition">
                                <td className="py-3 flex gap-2 min-w-0">
                                    {/* ইনিশিয়ালস বা অ্যাভাটার ব্যাকগ্রাউন্ড #E2E2E2 এবং আইকন/টেক্সট #FFFFFF */}
                                    <div className="w-8 h-8 rounded-full bg-[#E2E2E2]/10 text-[#FFFFFF] flex items-center justify-center shrink-0 text-xs font-semibold">
                                        {tx.initials}
                                    </div>

                                    <div className="min-w-0">
                                        {/* ইউজার নেম #E5E2E3 */}
                                        <p className="truncate text-sm font-medium text-[#E5E2E3]">
                                            {tx.user}
                                        </p>
                                        {/* কোম্পানি নেম #C4C7C8 */}
                                        <p className="truncate text-xs text-[#C4C7C8]">
                                            {tx.company}
                                        </p>
                                    </div>
                                </td>

                                {/* প্ল্যান টাইপ #C4C7C8 */}
                                <td className="text-xs text-[#C4C7C8] truncate pr-2">
                                    {tx.planType}
                                </td>

                                {/* অ্যামাউন্ট টেক্সট #E5E2E3 */}
                                <td className="text-sm font-semibold text-[#E5E2E3] whitespace-nowrap">
                                    {tx.amount}
                                </td>

                                {/* ডেট টেক্সট #C4C7C8 */}
                                <td className="text-xs text-[#C4C7C8] whitespace-nowrap">
                                    {tx.date}
                                </td>

                                <td className={`text-xs font-semibold ${getStatus(tx.status)}`}>
                                    {tx.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE LIST */}
            <div className="md:hidden space-y-3">
                {currentData.map((tx) => (
                    <div key={tx.id} className="border border-zinc-800 rounded-lg p-3 bg-zinc-800/10">

                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#E2E2E2]/10 text-[#FFFFFF] flex items-center justify-center font-semibold text-xs">
                                    {tx.initials}
                                </div>
                            </div>

                            <span className="font-semibold text-[#E5E2E3]">
                                {tx.amount}
                            </span>
                        </div>

                        <div className="flex justify-between mt-2 text-xs">
                            <span className="text-[#C4C7C8] truncate max-w-[60%]">
                                {tx.user}
                            </span>

                            <span className={getStatus(tx.status)}>
                                {tx.status}
                            </span>
                        </div>

                        <div className="text-[10px] text-[#C4C7C8]/60 mt-2">
                            {tx.id} • {tx.date}
                        </div>
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-5 pt-3 border-t border-zinc-800">
                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    // অ্যাক্টিভ কালার হিসেবে টেক্সট এবং বর্ডার গাইডলাইন মেলানো হয়েছে
                    className="px-2 py-1 text-[#E5E2E3] disabled:opacity-30 text-lg line-none"
                >
                    ‹
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${page === i + 1
                                ? "bg-[#E5E2E3] text-[#1B1B1C]"
                                : "text-[#C4C7C8] hover:bg-zinc-800"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-2 py-1 text-[#E5E2E3] disabled:opacity-30 text-lg line-none"
                >
                    ›
                </button>
            </div>

        </div>
    );
}