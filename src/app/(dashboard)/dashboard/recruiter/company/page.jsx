'use client'
import CompanyProfile from '@/components/DashboardComponents/CompanyProfile';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const RecruiterCompanyPage = () => {

    const { data: userData, isPending } = useSession();
    const user = userData?.user;


    return (
        <div>
            <CompanyProfile
                recruiter={user}
                isPending={isPending}
            />
        </div>
    );
};

export default RecruiterCompanyPage;