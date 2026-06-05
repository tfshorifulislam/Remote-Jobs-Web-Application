import React from 'react';
import Link from 'next/link';
const Logo = () => {
    return (
        <div className="shrink-0">
            <Link href="/" className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                Remote
            </Link>
        </div>
    );
};

export default Logo;