'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
// react-icons থেকে ক্লিন আইকনগুলো নেওয়া হয়েছে
import { FiSearch, FiBell, FiHelpCircle, FiUser, FiLogOut, FiLayout } from 'react-icons/fi';

const DashboardNavBar = ({ user = { email: "recruiter@example.com" }, userInitial = "R", handleSignOut }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ড্রপডাউনের বাইরে ক্লিক করলে তা অটো বন্ধ হওয়ার লজিক
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="w-full h-16 bg-white border-b border-gray-100 sticky top-0 z-50 px-4 sm:px-6 flex items-center justify-between">
            
            {/* ১. লেফট সাইড: গ্লোবাল সার্চ বার (স্ক্রিনশট অনুযায়ী পারফেক্ট স্পেসিং) */}
            <div className="w-full max-w-xs sm:max-w-sm relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-gray-400">
                    <FiSearch className="w-4 h-4" />
                </div>
                <input 
                    type="text" 
                    placeholder="Global search..." 
                    className="w-full bg-gray-50/60 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0A65CC]/20 focus:border-[#0A65CC] transition-all placeholder:text-gray-400"
                />
            </div>

            {/* ২. রাইট সাইড: নোটিফিকেশন, হেল্প এবং ইউজার প্রোফাইল ড্রপডাউন */}
            <div className="flex items-center gap-2 sm:gap-3.5">
                
                {/* নোটিফিকেশন বাটন (রেড ডট এলার্ট সহ) */}
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition relative cursor-pointer">
                    <FiBell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>

                {/* হেল্প বাটন */}
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition cursor-pointer">
                    <FiHelpCircle className="w-5 h-5" />
                </button>

                {/* ওয়ান পিক্সেল ডিভাইডার লাইন */}
                <div className="h-5 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

                {/* প্রোফাইল ড্রপডাউন কন্টেইনার */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        className="flex items-center gap-2 focus:outline-none cursor-pointer group"
                    >
                        {/* গ্রাডিয়েন্ট প্রোফাইল অ্যাভাটার */}
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0A65CC] to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-102 transition-transform">
                            {userInitial}
                        </div>
                    </button>

                    {/* ড্রপডাউন মেনু উইথ প্রিমিয়াম হোয়াইট লুক */}
                    {isProfileDropdownOpen && (
                        <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
                            {/* ইউজার ইনফো */}
                            <div className="px-4 py-2.5 border-b border-gray-50">
                                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Signed in as</p>
                                <p className="text-sm font-bold text-gray-800 truncate mt-0.5">{user?.email}</p>
                            </div>
                            
                            {/* মেনু লিংকসমূহ */}
                            <div className="p-1">
                                <Link 
                                    href="/profile" 
                                    onClick={() => setIsProfileDropdownOpen(false)} 
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition font-medium"
                                >
                                    <FiUser className="w-4 h-4 text-gray-400" />
                                    My Profile
                                </Link>
                                <Link 
                                    href="/dashboard" 
                                    onClick={() => setIsProfileDropdownOpen(false)} 
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition font-medium"
                                >
                                    <FiLayout className="w-4 h-4 text-gray-400" />
                                    Dashboard
                                </Link>
                            </div>

                            <div className="border-t border-gray-100 my-1" />
                            
                            {/* সাইন আউট বাটন */}
                            <div className="p-1">
                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50/60 rounded-xl font-semibold transition cursor-pointer"
                                >
                                    <FiLogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
};

export default DashboardNavBar;