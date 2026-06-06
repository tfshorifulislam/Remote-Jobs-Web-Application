import DashboardNavBar from '@/components/DashboardComponents/DashboardNavBar';
import DashboardOverview from '@/components/DashboardComponents/DashboardOverview';
import JobPostsByCategory from '@/components/DashboardComponents/JobPostsByCategory';
import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <DashboardNavBar />
            <DashboardOverview />
            <div>
                <JobPostsByCategory />
            </div>
        </div>
    );
};

export default DashboardPage;