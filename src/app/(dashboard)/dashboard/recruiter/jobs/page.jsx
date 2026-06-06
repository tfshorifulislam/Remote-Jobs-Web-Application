'use client'
import DashboardNavBar from '@/components/DashboardComponents/DashboardNavBar';
import PremiumAlertBanner from '@/components/DashboardComponents/PremiumAllertBanner';
import { useState } from 'react';
import { FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

const MOCK_JOBS = [
    { id: '1', jobTitle: 'Senior Frontend Engineer', jobType: 'Full-time', jobCategory: 'Engineering', location: 'Dhaka, Bangladesh', isRemote: false, status: 'Active' },
    { id: '2', jobTitle: 'UI/UX Product Designer', jobType: 'Contract', jobCategory: 'Design', location: 'Remote', isRemote: true, status: 'Active' },
    { id: '3', jobTitle: 'Backend Developer (Node.js)', jobType: 'Full-time', jobCategory: 'Engineering', location: 'Sylhet', isRemote: false, status: 'Inactive' },
    { id: '4', jobTitle: 'Technical Content Writer', jobType: 'Part-time', jobCategory: 'Marketing', location: 'Remote', isRemote: true, status: 'Draft' },
];

export default function JobsPage() {
    const [jobs] = useState(MOCK_JOBS);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return {
                    dot: 'bg-[#22C55E]',
                    text: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20'
                };
            case 'inactive':
                return {
                    dot: 'bg-rose-500',
                    text: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                };
            default: // Draft
                return {
                    dot: 'bg-amber-500',
                    text: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                };
        }
    };

    return (
        <div className="w-full min-h-screen">

            <DashboardNavBar />

            <div className="p-4 sm:p-6">


                <div className="bg-[#1B1B1C] rounded-2xl border border-zinc-800 shadow-sm p-4 sm:p-6">

                    {/* HEADER */}
                    <div className="mb-6">

                        <h2 className="text-lg sm:text-xl font-semibold text-[#E5E2E3]">
                            Manage All Jobs
                        </h2>

                        <p className="text-sm text-[#C4C7C8] mt-1">
                            Manage and track your job postings easily
                        </p>
                    </div>

                    {/* HEADER ROW */}

                    <div className="hidden md:flex text-xs font-semibold text-[#C4C7C8] uppercase border-b border-zinc-800 pb-3">
                        <div className="w-[35%]">Job Title</div>
                        <div className="w-[25%]">Type</div>
                        <div className="w-[20%]">Location</div>
                        <div className="w-[10%]">Status</div>
                        <div className="w-[10%] text-right">Action</div>
                    </div>

                    {/* ROWS */}
                    <div className="divide-y divide-zinc-800/60">

                        {jobs.map((job) => {
                            const status = getStatusStyle(job.status);
                            return (
                                <div
                                    key={job.id}
                                    className="group flex flex-col md:flex-row md:items-center py-4 gap-3 md:gap-0 transition-all hover:bg-zinc-800/20">
                                    {/* TITLE */}
                                    <div className="md:w-[35%]">

                                        <p className="font-semibold text-[#E5E2E3] group-hover:text-white transition">
                                            {job.jobTitle}
                                        </p>

                                        <p className="text-xs text-[#C4C7C8]">
                                            {job.jobCategory}
                                        </p>
                                    </div>
                                    <div className="md:w-[25%] text-sm text-[#C4C7C8]">
                                        {job.jobType}
                                    </div>

                                    {/* LOCATION */}
                                    <div className="md:w-[20%] text-sm text-[#C4C7C8]/80">
                                        {job.isRemote ? 'Remote' : job.location}
                                    </div>

                                    {/* STATUS */}
                                    <div className="md:w-[10%]">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${status.text}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                            {job.status}
                                        </span>
                                    </div>

                                    {/* ACTIONS BUTTONS */}
                                    <div className="md:w-[10%] flex md:justify-end gap-2 text-zinc-500">

                                        <button className="p-2 rounded-lg hover:bg-zinc-800 hover:text-[#E5E2E3] transition cursor-pointer opacity-70 group-hover:opacity-100" title="View">
                                            <FiEye size={16} />
                                        </button>

                                        <button className="p-2 rounded-lg hover:bg-zinc-800 hover:text-[#E5E2E3] transition cursor-pointer opacity-70 group-hover:opacity-100" title="Edit">
                                            <FiEdit size={16} />
                                        </button>

                                        <button className="p-2 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition cursor-pointer opacity-70 group-hover:opacity-100" title="Delete">
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                </div>
            </div>

            <PremiumAlertBanner />
        </div>
    );
}