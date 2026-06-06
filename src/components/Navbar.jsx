'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import LoadingSpinner from './Spinner';
import Logo from './Logo';
import DesktopNavItems from './DesktopNavItems';
import IsMobileMenuOpen from './IsMobileMenuOpen';
import GetLoginUser from '@/lib/utility/GetLoginUser';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();


  const dropdownRef = useRef(null);

  const userData = GetLoginUser();
  const user = userData?.session?.user;
  const isPending = userData?.isPending;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleSignOut = async () => {
    await signOut()
    redirect('/authentication/signin')
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);


  const userInitial = user?.image ? user.image : user?.name?.charAt(0).toUpperCase();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <div className="flex items-center gap-6">
            {
              isPending ? (
                <div
                  className="hidden sm:block h-9 w-20 bg-gray-100 animate-pulse rounded-xl" />)
                : user ? (
                  <DesktopNavItems
                    navItems={navItems}
                    pathname={pathname}
                    user={user}
                    userInitial={userInitial}
                    isProfileDropdownOpen={isProfileDropdownOpen}
                    toggleProfileDropdown={toggleProfileDropdown}
                    dropdownRef={dropdownRef}
                    handleSignOut={handleSignOut}
                  />)
                  : (
                    <div className="hidden sm:block">
                      <Link
                        href="/authentication/signin"
                        className="bg-linear-to-r from-[#0A65CC] to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:opacity-95 transition shadow-sm font-semibold text-sm shadow-blue-100"
                      >
                        Sign In
                      </Link>
                    </div>
                  )}


            <button
              onClick={toggleMobileMenu}
              className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors w-9 h-9 flex flex-col justify-center items-center gap-1.5"
            >
              {isMobileMenuOpen ? (
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute w-5 h-0.5 bg-gray-600 rotate-45" />
                  <span className="absolute w-5 h-0.5 bg-gray-600 -rotate-45" />
                </div>
              ) : (
                <>
                  <span className="w-5 h-0.5 bg-gray-600" />
                  <span className="w-5 h-0.5 bg-gray-600" />
                  <span className="w-5 h-0.5 bg-gray-600" />
                </>
              )}
            </button>
          </div>
        </div>


        {isMobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {isPending ? (
                <div
                  className="hidden sm:block h-9 w-20 bg-gray-100 animate-pulse rounded-xl" />)
                : user ? (
                  <IsMobileMenuOpen
                    user={user}
                    navItems={navItems}
                    userInitial={userInitial}
                    handleSignOut={handleSignOut}
                    closeMenu={() => setIsMobileMenuOpen(false)}
                  />
                ) : (
                  <div className="px-2 py-1 text-center">
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      You are not signed in.
                    </p>
                    <Link
                      href="/authentication/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center px-4 py-2.5 bg-linear-to-r from-[#0A65CC] to-indigo-600 text-white rounded-xl font-semibold text-sm shadow-sm active:scale-[0.98] transition-transform"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;