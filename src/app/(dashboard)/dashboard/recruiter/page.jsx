import DashboardNavBar from '@/components/DashboardComponents/DashboardNavBar';
import DashboardOverview from '@/components/DashboardComponents/DashboardOverview';
import JobPostsByCategory from '@/components/DashboardComponents/JobPostsByCategory';
import NewUser from '@/components/DashboardComponents/NewUser';
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