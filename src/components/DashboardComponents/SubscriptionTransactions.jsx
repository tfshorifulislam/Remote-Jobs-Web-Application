import React, { useState } from 'react';

// Expanded Mock data to demonstrate pagination functioning properly across pages
const transactionsData = [
    // Page 1 Items (from image_01bde5.png)
    { id: '#TXN-902341', user: 'marcus.k@techcorp.io', company: 'TechCorp Inc.', initials: 'MK', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 24, 2023, 14:20', status: 'Success' },
    { id: '#TXN-882103', user: 'sarah.l@creativestudio.com', company: 'Creative Studio', initials: 'SL', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 24, 2023, 11:05', status: 'Success' },
    { id: '#TXN-774129', user: 'j.doe@freelance.org', company: 'Independent', initials: 'JD', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 23, 2023, 16:45', status: 'Pending' },
    { id: '#TXN-552014', user: 'admin@retailglobal.net', company: 'Retail Global', initials: 'AR', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 23, 2023, 09:12', status: 'Failed' },
    
    // Page 2 Items
    { id: '#TXN-441092', user: 'alex.m@devstack.io', company: 'DevStack Tech', initials: 'AM', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 22, 2023, 18:30', status: 'Success' },
    { id: '#TXN-339821', user: 'emily.w@designco.com', company: 'DesignCo Labs', initials: 'EW', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 22, 2023, 15:10', status: 'Success' },
    { id: '#TXN-228104', user: 'brian.t@logistics.net', company: 'Global Logistics', initials: 'BT', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 21, 2023, 11:15', status: 'Pending' },
    { id: '#TXN-117293', user: 'clara.p@fintech.org', company: 'FinTech Secure', initials: 'CP', planType: 'Professional Annual', amount: '$499.00', date: 'Oct 21, 2023, 08:45', status: 'Success' },
    
    // Page 3 Items
    { id: '#TXN-005192', user: 'david.k@cloudscale.io', company: 'CloudScale Inc.', initials: 'DK', planType: 'Starter Monthly', amount: '$49.00', date: 'Oct 20, 2023, 17:05', status: 'Success' },
    { id: '#TXN-994182', user: 'fiona.g@marketing.com', company: 'Growth Marketing', initials: 'FG', planType: 'Enterprise Monthly', amount: '$1,299.00', date: 'Oct 20, 2023, 13:22', status: 'Failed' }
];

const SubscriptionTransactions = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = 3;

    // Calculate indexes for slicing data dynamically
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = transactionsData.slice(indexOfFirstItem, indexOfLastItem);

    // Navigation handlers
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="bg-white mt-8 text-gray-900 p-6 rounded-xl border border-gray-200 shadow-sm mx-auto font-sans">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold tracking-wide text-gray-900">Recent Subscription Transactions</h2>
                <a href="#activity" className="text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors duration-200">
                    View All Activity
                </a>
            </div>

            {/* Table Layout */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 text-[10px] tracking-wider text-gray-400 uppercase font-semibold">
                            <th className="py-3 px-4">User/Recruiter</th>
                            <th className="py-3 px-4">Plan Type</th>
                            <th className="py-3 px-4">Transaction ID</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {currentTransactions.map((tx, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/70 transition-colors duration-150">
                                {/* User Info */}
                                <td className="py-4 px-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-600 font-semibold uppercase border border-gray-200">
                                        {tx.initials}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-800">{tx.user}</div>
                                        <div className="text-xs text-gray-400">{tx.company}</div>
                                    </div>
                                </td>

                                {/* Plan Type Badge */}
                                <td className="py-4 px-4">
                                    <span className="inline-block text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-200 font-medium">
                                        {tx.planType}
                                    </span>
                                </td>

                                {/* Transaction ID */}
                                <td className="py-4 px-4 text-xs font-mono text-gray-400">
                                    {tx.id}
                                </td>

                                {/* Amount */}
                                <td className="py-4 px-4 text-sm font-bold tracking-tight text-gray-900">
                                    {tx.amount}
                                </td>

                                {/* Date */}
                                <td className="py-4 px-4 text-xs text-gray-500">
                                    {tx.date}
                                </td>

                                {/* Status Pillar */}
                                <td className="py-4 px-4 text-xs font-semibold">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            tx.status === 'Success' ? 'bg-emerald-500' :
                                            tx.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                                        }`} />
                                        <span className={
                                            tx.status === 'Success' ? 'text-emerald-600' :
                                            tx.status === 'Pending' ? 'text-amber-600' : 'text-rose-600'
                                        }>
                                            {tx.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-1.5 mt-6 pt-4 border-t border-gray-100">
                {/* Previous Button */}
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-md transition duration-150 text-xs font-bold"
                >
                    &lt;
                </button>

                {/* Page Numbers */}
                {[1, 2, 3].map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition duration-150 ${
                            currentPage === pageNum
                                ? 'bg-gray-900 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* Next Button */}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent rounded-md transition duration-150 text-xs font-bold"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default SubscriptionTransactions;