import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const layout = ({ children }) => {

    return (
        <div className="min-h-full flex flex-col">
            <Navbar />
            <main className="max-w-7xl mx-auto w-full">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default layout;