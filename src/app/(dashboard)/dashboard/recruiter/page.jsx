import DashboardNavBar from '@/components/DashboardComponents/DashboardNavBar';
import DashboardOverview from '@/components/DashboardComponents/DashboardOverview';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <DashboardNavBar />
            <DashboardOverview />
        </div>
    );
};

export default DashboardPage;