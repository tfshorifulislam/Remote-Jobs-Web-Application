'use client'
import DashboardNavBar from '@/components/DashboardComponents/DashboardNavBar';
import { useState } from 'react';

// Mock Data for Design Purpose
const MOCK_JOBS = [
    { id: '1', jobTitle: 'Senior Frontend Engineer', jobType: 'Full-time', jobCategory: 'Engineering', location: 'Dhaka, Bangladesh', isRemote: false, status: 'Active' },
    { id: '2', jobTitle: 'UI/UX Product Designer', jobType: 'Contract', jobCategory: 'Design', location: 'Remote', isRemote: true, status: 'Active' },
    { id: '3', jobTitle: 'Backend Developer (Node.js)', jobType: 'Full-time', jobCategory: 'Engineering', location: 'Sylhet', isRemote: false, status: 'Inactive' },
    { id: '4', jobTitle: 'Technical Content Writer', jobType: 'Part-time', jobCategory: 'Marketing', location: 'Remote', isRemote: true, status: 'Draft' },
];

const JobsPage = () => {
    const [jobs] = useState(MOCK_JOBS);

    // Helper for Status Badge Styling
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return { dot: 'bg-emerald-500', text: 'text-emerald-600 bg-emerald-50 border-emerald-100' };
            case 'inactive':
                return { dot: 'bg-rose-500', text: 'text-rose-600 bg-rose-50 border-rose-100' };
            default:
                return { dot: 'bg-amber-500', text: 'text-amber-600 bg-amber-50 border-amber-100' };
        }
    };

    return (
        <div className="w-full overflow-hidden box-border bg-gray-50/50 min-h-screen">
            {/* Navigation Bar */}
            <DashboardNavBar />

            {/* Main Content Area */}
            <div className="w-full max-w-full mx-auto p-4 sm:p-6 box-border mt-4">
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden box-border">

                    {/* HEADER */}
                    <div className="flex flex-col gap-1 mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                            Manage All Jobs
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            View, update, and manage your current job postings.
                        </p>
                    </div>

                    {/* TABLE & CARD WRAPPER */}
                    <div className="w-full overflow-hidden">

                        {/* DESKTOP VIEW */}
                        <div className="hidden md:block w-full">
                            {/* Table Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-gray-400 px-4 w-full box-border">
                                <div className="w-[35%] min-w-0">Job Title</div>
                                <div className="w-[25%] min-w-0">Type / Category</div>
                                <div className="w-[18%] min-w-0">Location</div>
                                <div className="w-[12%] min-w-0">Status</div>
                                <div className="w-[10%] min-w-0 text-right">Actions</div>
                            </div>

                            {/* Table Body */}
                            <div className="divide-y divide-gray-50 w-full box-border">
                                {jobs.map((job) => {
                                    const statusStyle = getStatusStyle(job.status);
                                    return (
                                        <div
                                            key={job.id}
                                            className="flex items-center justify-between py-3.5 px-4 hover:bg-gray-50/50 transition-colors w-full box-border min-w-0"
                                        >
                                            {/* Job Title */}
                                            <div className="w-[35%] min-w-0 pr-2">
                                                <p className="truncate text-sm font-semibold text-gray-800" title={job.jobTitle}>
                                                    {job.jobTitle}
                                                </p>
                                            </div>

                                            {/* Type / Category */}
                                            <div className="w-[25%] min-w-0 pr-2">
                                                <div className="flex flex-col min-w-0">
                                                    <span className="truncate text-xs font-medium text-gray-700 capitalize">{job.jobType}</span>
                                                    <span className="truncate text-[11px] text-gray-400 capitalize mt-0.5">{job.jobCategory}</span>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="w-[18%] min-w-0 pr-2">
                                                <p className="truncate text-xs text-gray-600">
                                                    {job.isRemote ? "Remote" : job.location}
                                                </p>
                                            </div>

                                            {/* Status */}
                                            <div className="w-[12%] min-w-0 pr-2">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusStyle.text}`}>
                                                    <span className={`w-1 h-1 rounded-full shrink-0 ${statusStyle.dot}`} />
                                                    <span className="truncate">{job.status}</span>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="w-[10%] min-w-0 flex justify-end items-center gap-2">
                                                <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer" title="View Details">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                                <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer" title="Edit Job">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                                <button className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer" title="Delete Job">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* MOBILE CARD VIEW */}
                        <div className="md:hidden space-y-3">
                            {jobs.map((job) => {
                                const statusStyle = getStatusStyle(job.status);
                                return (
                                    <div key={job.id} className="border border-gray-100 rounded-xl p-4 bg-white shadow-xs">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{job.jobTitle}</p>
                                                <p className="text-xs text-gray-400 truncate mt-0.5">{job.jobCategory}</p>
                                            </div>
                                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border shrink-0 ${statusStyle.text}`}>
                                                <span className={`w-1 h-1 rounded-full ${statusStyle.dot}`} />
                                                <span>{job.status}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center mt-4 pt-2.5 border-t border-gray-50 gap-2">
                                            <div className="flex flex-col text-xs text-gray-500 min-w-0">
                                                <span className="truncate font-medium">{job.jobType}</span>
                                                <span className="truncate text-gray-400 text-[11px] mt-0.5">{job.isRemote ? "Remote" : job.location}</span>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button className="p-1.5 bg-gray-50 text-gray-500 rounded-lg active:bg-gray-100" aria-label="View">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                                <button className="p-1.5 bg-gray-50 text-gray-500 rounded-lg active:bg-gray-100" aria-label="Edit">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                                <button className="p-1.5 bg-rose-50 text-rose-600 rounded-lg active:bg-rose-100" aria-label="Delete">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;