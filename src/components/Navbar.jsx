'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { signOut, useSession } from '@/lib/auth-client';
import Logo from './Logo';
import DesktopNavItems from './DesktopNavItems';
import IsMobileMenuOpen from './IsMobileMenuOpen';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef(null);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleSignOut = async () => {
    await signOut();
    redirect('/authentication/signin');
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
    <nav className="bg-[#1B1B1C] sticky top-0 z-50 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO AREA */}
          <div className="text-zinc-200 hover:text-white transition-colors">
            <Logo />
          </div>

          <div className="flex items-center gap-6">
            {isPending ? (
              <div className="hidden sm:block h-9 w-20 bg-zinc-800 animate-pulse rounded-xl" />
            ) : user ? (
              <DesktopNavItems
                navItems={navItems}
                pathname={pathname}
                user={user}
                userInitial={userInitial}
                isProfileDropdownOpen={isProfileDropdownOpen}
                toggleProfileDropdown={toggleProfileDropdown}
                dropdownRef={dropdownRef}
                handleSignOut={handleSignOut}
              />
            ) : (
              <div className="hidden sm:block">
                <Link
                  href="/authentication/signin"
                  className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[#E5E2E3] px-5 py-2.5 rounded-xl transition font-medium text-sm cursor-pointer block"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* NEUTRAL MOBILE MENU BUTTON */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 focus:outline-none transition-all w-9 h-9 flex flex-col justify-center items-center gap-1.5 cursor-pointer border border-transparent hover:border-zinc-800"
            >
              {isMobileMenuOpen ? (
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <span className="absolute w-5 h-0.5 bg-zinc-400 rotate-45" />
                  <span className="absolute w-5 h-0.5 bg-zinc-400 -rotate-45" />
                </div>
              ) : (
                <>
                  <span className="w-5 h-0.5 bg-zinc-400" />
                  <span className="w-5 h-0.5 bg-zinc-400" />
                  <span className="w-5 h-0.5 bg-zinc-400" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-zinc-800 bg-[#1B1B1C] animate-fadeIn">
            <div className="flex flex-col space-y-3">
              {isPending ? (
                <div className="h-9 w-full bg-zinc-800 animate-pulse rounded-xl" />
              ) : user ? (
                <IsMobileMenuOpen
                  user={user}
                  navItems={navItems}
                  userInitial={userInitial}
                  handleSignOut={handleSignOut}
                  closeMenu={() => setIsMobileMenuOpen(false)}
                />
              ) : (
                <div className="px-2 py-1 text-center">
                  <p className="text-sm text-zinc-500 mb-3 font-medium">
                    You are not signed in.
                  </p>
                  <Link
                    href="/authentication/signin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-[#E5E2E3] border border-zinc-700 rounded-xl font-medium text-sm active:scale-[0.98] transition-all cursor-pointer"
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