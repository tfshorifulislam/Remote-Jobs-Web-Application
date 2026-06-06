import { DashboardSidebar } from '@/components/DashboardComponents/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#131314]">

            {/* Sidebar */}
            <div className="
                hidden sm:fixed sm:top-0 sm:left-0 sm:h-full sm:w-64 sm:block z-9999
            ">
                <DashboardSidebar />
            </div>

            {/* Main Content */}
            <div className="
                p-4
                sm:ml-64
            ">
                {children}
            </div>

        </div>
    );
};

export default DashboardLayout;