'use client';

import { useSession } from '@/lib/auth-client';
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiEdit3,
  FiTrendingUp,
  FiCheckCircle,
  FiUsers,
} from 'react-icons/fi';

const RecruiterProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-6 lg:px-10 py-6 flex justify-center">
      
      <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-md border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#0A65CC] to-[#0A65CC]/80 h-24 sm:h-32 relative">
          
          <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 sm:left-8 -translate-x-1/2 sm:translate-x-0">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center text-[#0A65CC] text-xl sm:text-3xl font-bold border-4 border-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'R'}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-12 sm:pt-16 px-4 sm:px-8 pb-6 sm:pb-10">

          {/* NAME + BUTTON */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                {user?.name || 'Recruiter Name'}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1">
                <FiBriefcase className="text-xs" />
                Recruiter • Job Posting Manager
              </p>
            </div>

            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium transition w-full sm:w-auto">
              <FiEdit3 size={16} />
              Edit Profile
            </button>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">

            {/* EMAIL */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border bg-white flex items-center gap-3">
              <div className="p-2 bg-[#0A65CC]/10 rounded-xl">
                <FiMail className="text-[#0A65CC]" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase">Email</p>
                <p className="text-sm font-medium text-gray-800 break-all">
                  {user?.email || 'Not provided'}
                </p>
              </div>
            </div>

            {/* ACCOUNT TYPE */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border bg-white flex items-center gap-3">
              <div className="p-2 bg-[#0A65CC]/10 rounded-xl">
                <FiBriefcase className="text-[#0A65CC]" size={18} />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase">Account</p>
                <p className="text-sm font-medium">Recruiter</p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border bg-white flex items-center gap-3">
              <div className="p-2 bg-[#0A65CC]/10 rounded-xl">
                <FiMapPin className="text-[#0A65CC]" size={18} />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase">Location</p>
                <p className="text-sm font-medium">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* USER ID */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border bg-white flex items-center gap-3">
              <div className="p-2 bg-[#0A65CC]/10 rounded-xl">
                <FiUser className="text-[#0A65CC]" size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase">User ID</p>
                <p className="text-sm font-medium truncate">
                  {user?.id || 'N/A'}
                </p>
              </div>
            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-blue-50 border">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-500">Jobs Posted</p>
                <FiTrendingUp className="text-[#0A65CC]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A65CC] mt-2">
                12
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-blue-50 border">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-500">Active Jobs</p>
                <FiCheckCircle className="text-[#0A65CC]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A65CC] mt-2">
                5
              </h2>
            </div>

            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-blue-50 border">
              <div className="flex justify-between items-center">
                <p className="text-xs sm:text-sm text-gray-500">Applications</p>
                <FiUsers className="text-[#0A65CC]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0A65CC] mt-2">
                48
              </h2>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RecruiterProfilePage;