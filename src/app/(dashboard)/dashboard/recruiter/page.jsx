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
            <div className='flex gap-10 flex-col sm:flex-row'>
                <JobPostsByCategory />
                <NewUser />
            </div>
        </div>
    );
};

export default DashboardPage;