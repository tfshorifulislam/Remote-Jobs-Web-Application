import React from 'react';

const PremiumAlertBanner = () => {
    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 box-border">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-indigo-950 to-slate-900 p-5 sm:p-6 shadow-xl border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Background Decorative Glow */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                {/* Left Side: Badge & Content */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 flex-1">
                    
                    {/* PREMIUM BADGE */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-xs font-bold uppercase tracking-wider shadow-md shadow-amber-500/20 shrink-0">
                        {/* Crown Icon */}
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M2 19h20v2H2v-2zm2-2h16l-3-7-3 4-2-6-2 6-3-4-3 7z" />
                        </svg>
                        Premium
                    </div>

                    {/* Banner Text */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-white text-sm sm:text-base font-semibold tracking-tight">
                            Unlock Unlimited Job Postings & Advanced Candidate Filtering!
                        </h3>
                        <p className="text-indigo-200/70 text-xs mt-1 leading-relaxed">
                            Upgrade to Premium today to fetch top talents faster, view detailed analytics, and enjoy priority support.
                        </p>
                    </div>
                </div>

                {/* Right Side: CTA Button */}
                <div className="shrink-0 flex items-center">
                    <button className="w-full sm:w-auto px-5 py-2.5 bg-white text-gray-900 hover:bg-indigo-50 font-semibold text-sm rounded-xl transition-all shadow-lg active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 group">
                        Upgrade Now
                        {/* Arrow Icon */}
                        <svg 
                            className="w-4 h-4 text-gray-700 group-hover:translate-x-0.5 transition-transform" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PremiumAlertBanner;