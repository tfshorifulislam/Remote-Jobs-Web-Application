import React from 'react';
import Link from 'next/link';

const DesktopNavItems = ({ navItems, pathname, user, userInitial, isProfileDropdownOpen, toggleProfileDropdown, dropdownRef, handleSignOut }) => {
    return (
        <>
            <div className="hidden sm:flex items-center gap-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>


            <div className="hidden sm:block h-5 w-[1px] bg-gray-200" />


            <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                    onClick={toggleProfileDropdown}
                    className="cursor-pointer"
                >
                    {user &&
                        (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                {userInitial}
                            </div>
                        )
                    }
                </button>


                {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                        <div className="px-4 py-2 border-b border-gray-50">
                            <p className="text-xs text-gray-400">Signed in as</p>
                            <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                        </div>
                        <Link href="/profile" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                            Profile
                        </Link>
                        <Link href="/dashboard" onClick={() => setIsProfileDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                            Dashboard
                        </Link>
                        <hr className="my-1.5 border-gray-100" />
                        <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/60 font-medium transition"
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