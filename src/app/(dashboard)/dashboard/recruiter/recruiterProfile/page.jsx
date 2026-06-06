'use client';

import { useSession } from '@/lib/auth-client';
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiMapPin,
  FiEdit3,
} from 'react-icons/fi';

const RecruiterProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

        {/* Header */}
        <div className="bg-[#0A65CC] h-32 relative">

          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#0A65CC] text-3xl font-bold">
              {user?.name?.charAt(0) || 'R'}
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="pt-16 px-8 pb-8">

          {/* Name + Role */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.name || 'Recruiter Name'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Recruiter • Job Posting Manager
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium">
              <FiEdit3 />
              Edit Profile
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

            {/* Email */}
            <div className="p-4 rounded-2xl border bg-gray-50 flex items-center gap-3">
              <FiMail className="text-[#0A65CC]" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800">
                  {user?.email }
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="p-4 rounded-2xl border bg-gray-50 flex items-center gap-3">
              <FiBriefcase className="text-[#0A65CC]" />
              <div>
                <p className="text-xs text-gray-500">Account Type</p>
                <p className="text-sm font-medium text-gray-800">
                  Recruiter
                </p>
              </div>
            </div>

           
            <div className="p-4 rounded-2xl border bg-gray-50 flex items-center gap-3">
              <FiMapPin className="text-[#0A65CC]" />
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-800">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>

           
            <div className="p-4 rounded-2xl border bg-gray-50 flex items-center gap-3">
              <FiUser className="text-[#0A65CC]" />
              <div>
                <p className="text-xs text-gray-500">User ID</p>
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user?.id }
                </p>
              </div>
            </div>

          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

            <div className="p-5 rounded-2xl bg-blue-50 border">
              <p className="text-sm text-gray-500">Jobs Posted</p>
              <h2 className="text-2xl font-bold text-[#0A65CC] mt-1">12</h2>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border">
              <p className="text-sm text-gray-500">Active Jobs</p>
              <h2 className="text-2xl font-bold text-[#0A65CC] mt-1">5</h2>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border">
              <p className="text-sm text-gray-500">Applications</p>
              <h2 className="text-2xl font-bold text-[#0A65CC] mt-1">48</h2>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RecruiterProfilePage;