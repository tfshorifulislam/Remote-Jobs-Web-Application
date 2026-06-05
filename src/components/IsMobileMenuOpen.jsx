import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

const IsMobileMenuOpen = ( { user, userInitial, navItems, handleSignOut, setIsMobileMenuOpen } ) => {
    return (
        <>
            <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-gray-50 rounded-xl">
                {user.image ? (
                    <img src={user.image} alt="User" className="h-10 w-10 rounded-full object-cover" />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-base">
                        {userInitial}
                    </div>
                )}
                <div className="truncate">
                    <p className="font-semibold text-sm text-gray-900 truncate">{user.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
            </div>

            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition font-medium"
                >
                    {item.name}
                </Link>
            ))}
            <hr className="my-1 border-gray-100" />

            <button
                onClick={handleSignOut}
                className="block px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full text-left transition"
            >
                Sign Out
            </button>
        </>
    );
};

export default IsMobileMenuOpen;