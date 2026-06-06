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
import { useSession } from "@/lib/auth-client";


export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const userInitial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company" },
        // { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/dashboard/recruiter/recruiterProfile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];



    const isActive = (href) => {
        return pathname === href;
    };

    const navContent = (
        <div className="flex h-full flex-col">
            {/* User Card */}
            <div
                className="mb-8 rounded-3xl  bg-[#474746] p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#0B0B14]">
                        {isPending ? "..." : userInitial}
                    </div>

                    <div className="min-w-0 flex-1">
                        {isPending ? (
                            <div className="h-5 w-28 animate-pulse rounded bg-[#474746]" />
                        ) : (
                            <h2 className="truncate text-sm font-semibold text-[#C4C7C8]">
                                {user?.name}
                            </h2>
                        )}
                        <p className="text-xs text-[#C4C7C8]">Recruiter</p>
                    </div>
                </div>
            </div>

            <div
                className="mb-3 px-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                    MENU
                </p>
            </div>

            <nav
                className="space-y-1 flex-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`group relative flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${active
                                ? "bg-[#474746] text-[#B7B5B4] "
                                : "text-[#C4C7C8] hover:bg-white/20"
                                }`}
                        >

                            {active && (
                                <div className="absolute right-0 top-0 h-full w-0.75  bg-white" />
                            )}

                            <Icon className={`size-5 ${active ? "text-[#B7B5B4]" : "text-[#C4C7C8]group-hover:text-zinc-600"}`} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Card */}
            <div
                className="mt-auto pt-6">
                <div className="rounded-3xl bg-[#474746] p-5 text-white shadow">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Briefcase className="size-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Recruiter Pro</h3>
                            <p className="text-xs text-blue-100">Advanced hiring tools</p>
                        </div>
                    </div>
                    <button className="mt-5 w-full rounded-2xl bg-white py-2.5 text-sm font-semibold text-[#0B0B14] hover:bg-zinc-100 transition">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <aside
                className="hidden lg:flex h-screen w-72 shrink-0 border-r border-zinc-200 bg-[#0B0B14] p-5 flex-col">
                {navContent}
            </aside>
        </>
    );
}