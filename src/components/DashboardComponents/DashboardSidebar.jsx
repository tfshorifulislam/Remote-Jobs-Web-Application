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
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    const user = session?.user;

    const userInitial =
        user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job" },
        { icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/messages", label: "Messages" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const isActive = (href) => {
        if (href === "/dashboard/recruiter") {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    const navContent = (
        <div className="flex h-full flex-col">
            {/* User Card */}
            <div className="mb-8 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A65CC] text-base font-bold text-white">
                        {isPending ? "..." : userInitial}
                    </div>

                    <div className="min-w-0">
                        {isPending ? (
                            <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
                        ) : (
                            <h2 className="truncate text-sm font-semibold text-zinc-900">
                                {user?.name}
                            </h2>
                        )}

                        <p className="text-xs text-zinc-500">
                            Recruiter Dashboard
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu Label */}
            <div className="mb-3 px-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    Menu
                </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={active ? "page" : undefined}
                            className={[
                                "group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                active
                                    ? "bg-[#0A65CC]/10 text-[#0A65CC]"
                                    : "text-zinc-600 hover:bg-white hover:text-zinc-900 hover:translate-x-1",
                            ].join(" ")}
                        >
                            {/* Active indicator */}
                            {active && (
                                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#0A65CC]" />
                            )}

                            <Icon
                                className={[
                                    "size-5 transition-colors",
                                    active
                                        ? "text-[#0A65CC]"
                                        : "text-zinc-400 group-hover:text-zinc-700",
                                ].join(" ")}
                            />

                            <span>{item.label}</span>

                            {active && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-[#0A65CC]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Upgrade Card */}
            <div className="mt-auto pt-6">
                <div className="rounded-3xl bg-gradient-to-br from-[#0A65CC] to-[#084EA3] p-5 text-white shadow-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                            <Briefcase className="size-5" />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold">
                                Recruiter Pro
                            </h3>
                            <p className="text-xs text-blue-100">
                                Unlock advanced hiring tools
                            </p>
                        </div>
                    </div>

                    <button className="mt-5 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0A65CC] transition hover:bg-zinc-100">
                        Upgrade Plan
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop */}
            <aside className="hidden h-screen w-72 shrink-0 border-r border-zinc-200 bg-[#F8FAFC] p-5 lg:block">
                {navContent}
            </aside>

            {/* Mobile Drawer */}
            <AsidebarDrawer navContent={navContent} />
        </>
    );
}