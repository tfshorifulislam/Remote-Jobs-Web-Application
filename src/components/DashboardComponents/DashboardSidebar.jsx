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
        { icon: Envelope, href: "/messages", label: "Messages" },
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
                className="mb-8 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A65CC] text-lg font-bold text-white">
                        {isPending ? "..." : userInitial}
                    </div>

                    <div className="min-w-0 flex-1">
                        {isPending ? (
                            <div className="h-5 w-28 animate-pulse rounded bg-zinc-200" />
                        ) : (
                            <h2 className="truncate text-sm font-semibold text-zinc-900">
                                {user?.name}
                            </h2>
                        )}
                        <p className="text-xs text-zinc-500">Recruiter</p>
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
                                ? "bg-[#0A65CC]/10 text-[#0A65CC] "
                                : "text-zinc-600 hover:bg-white hover:text-zinc-900"
                                }`}
                        >

                            {active && (
                                <div className="absolute right-0 top-0 h-full w-0.75 rounded-lg bg-[#0A65CC]" />
                            )}

                            <Icon className={`size-5 ${active ? "text-[#0A65CC]" : "text-zinc-400 group-hover:text-zinc-600"}`} />
                            <span>{item.label}</span>
                            {active && <div className="ml-auto h-2 w-2 rounded-full bg-[#0A65CC]" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Pro Card */}
            <div
                className="mt-auto pt-6">
                <div className="rounded-3xl bg-gradient-to-br from-[#0A65CC] to-[#084EA3] p-5 text-white shadow">
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Briefcase className="size-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Recruiter Pro</h3>
                            <p className="text-xs text-blue-100">Advanced hiring tools</p>
                        </div>
                    </div>
                    <button className="mt-5 w-full rounded-2xl bg-white py-2.5 text-sm font-semibold text-[#0A65CC] hover:bg-zinc-100 transition">
                        Upgrade Now
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <aside
                className="hidden lg:flex h-screen w-72 shrink-0 border-r border-zinc-200 bg-[#F8FAFC] p-5 flex-col">
                {navContent}
            </aside>
        </>
    );
}