import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import Link from 'next/link';

const IsMobileMenuOpen = () => {
    return (
        <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
                <Link
                    href="/authentication/signin"
                    className="flex cursor-pointer items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
                >
                    <FaSignInAlt className="text-sm" />
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default IsMobileMenuOpen;