"use client";

import { usePatients } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, UserPlus, FileBarChart, HardDrive } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const { activeTab, setActiveTab } = usePatients();

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, tab: "View All" },
        { name: "New Patient", icon: UserPlus, tab: "Add Patient" },
        { name: "Clinic Stats", icon: FileBarChart, tab: "Stats" },
        { name: "Local Storage", icon: HardDrive, tab: "Storage" },
    ];

    return (
        <aside className="fixed left-0 top-24 bottom-0 w-64 bg-white/50 backdrop-blur-xl border-r border-slate-200 p-6 hidden lg:flex flex-col z-40">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">
                Clinic Controls
            </h3>

            <nav className="space-y-2">
                {navItems.map((item) => {
                    const isActive = activeTab === item.tab || (item.tab === "View All" && activeTab === "Dashboard");
                    return (
                        <Button
                            key={item.name}
                            variant="ghost"
                            onClick={() => setActiveTab(item.tab)}
                            className={cn(
                                "w-full justify-start gap-4 h-12 text-slate-600 hover:text-rural-primary hover:bg-rural-primary/5 transition-all text-sm font-medium rounded-xl",
                                isActive && "bg-rural-primary/10 text-rural-primary shadow-sm ring-1 ring-rural-primary/20"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-rural-primary" : "text-slate-400")} />
                            {item.name}
                        </Button>
                    );
                })}
            </nav>

            <div className="mt-auto">
                <div className="bg-rural-primary/5 rounded-2xl p-4 border border-rural-primary/10">
                    <p className="text-xs font-bold text-rural-primary mb-1">Clinic Status</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Online & Synced
                    </div>
                </div>
            </div>
        </aside>
    );
}
