import React from 'react';
import Link from 'next/link';

const Logo = () => {
    return (
        <div className="shrink-0">
            <Link 
                href="/" 
                className="font-bold text-2xl text-zinc-200 hover:text-white transition-colors tracking-tight"
            >
                Remote
            </Link>
        </div>
    );
};

export default Logo;