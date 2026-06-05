"use client";

import {
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AsidebarDrawer from "./AsidebarDrawer";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      icon: House,
      href: "/dashboard/recruiter",
      label: "Dashboard",
    },
    {
      icon: Magnifier,
      href: "/dashboard/recruiter/jobs",
      label: "Jobs",
    },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post a Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    {
      icon: Envelope,
      href: "/messages",
      label: "Messages",
    },
    {
      icon: Person,
      href: "/profile",
      label: "Profile",
    },
    {
      icon: Gear,
      href: "/settings",
      label: "Settings",
    },
  ];

  const isActive = (href) => {
    if (href === "/dashboard/recruiter") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  const navContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white shadow-sm">
            M
          </div>

          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              Mentora
            </h2>
            <p className="text-xs text-zinc-500">
              Recruiter Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-3 px-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Navigation
        </p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-violet-50 text-violet-700"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              }`}
            >
              <item.icon
                className={`size-5 ${
                  active
                    ? "text-violet-600"
                    : "text-zinc-400 group-hover:text-zinc-600"
                }`}
              />

              <span>{item.label}</span>

              {active && (
                <div className="ml-auto h-2 w-2 rounded-full bg-violet-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="mt-auto pt-6">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
              <Briefcase className="size-5 text-violet-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-900">
                Recruiter Pro
              </h3>
              <p className="text-xs text-zinc-500">
                Unlock premium features
              </p>
            </div>
          </div>

          <button className="mt-4 w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-700">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 border-r border-zinc-200 bg-white p-5 lg:block">
        {navContent}
      </aside>

      <AsidebarDrawer navContent={navContent} />
    </>
  );
}