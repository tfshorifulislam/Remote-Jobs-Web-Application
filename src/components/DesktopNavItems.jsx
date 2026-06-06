import React from 'react';
import Link from 'next/link';

const DesktopNavItems = ({ navItems, pathname, user, userInitial, isProfileDropdownOpen, toggleProfileDropdown, dropdownRef, handleSignOut }) => {
    return (
        <>
            {/* NAVIGATION LINKS */}
            <div className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive
                                ? 'bg-zinc-800 text-white'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* SEPARATOR */}
            <div className="hidden sm:block h-5 w-[1px] bg-zinc-800" />

            {/* PROFILE DROPDOWN */}
            <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                    onClick={toggleProfileDropdown}
                    className="cursor-pointer focus:outline-none"
                >
                    {user && (
                        <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center justify-center font-semibold text-sm transition hover:border-zinc-500">
                            {userInitial}
                        </div>
                    )}
                </button>

                {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#1B1B1C] rounded-xl shadow-2xl border border-zinc-800 py-1.5 z-50">
                        {/* Signed In Details */}
                        <div className="px-4 py-2 border-b border-zinc-800">
                            <p className="text-[11px] text-zinc-500 uppercase tracking-wider">Signed in as</p>
                            <p className="text-sm font-semibold text-zinc-300 truncate mt-0.5">{user.email}</p>
                        </div>
                        
                        {/* Links */}
                        <Link 
                            href="/profile" 
                            onClick={() => toggleProfileDropdown(false)} 
                            className="block px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition cursor-pointer"
                        >
                            Profile
                        </Link>
                        
                        <Link 
                            href="/dashboard/recruiter" 
                            onClick={() => toggleProfileDropdown(false)} 
                            className="block px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition cursor-pointer"
                        >
                            Dashboard
                        </Link>
                        
                        <hr className="my-1.5 border-zinc-800" />
                        
                        {/* Sign Out Button */}
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 font-medium transition cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default DesktopNavItems;