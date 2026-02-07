"use client";

import { usePatients } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Activity, Stethoscope } from "lucide-react";

export function FloatingNav() {
    const { role, setRole, activeTab, setActiveTab } = usePatients();

    const toggleRole = () => {
        setRole(role === "Rural Worker" ? "Urban Doctor" : "Rural Worker");
        setActiveTab("View All"); // Default to View All on toggle
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto">
            <div className="glass-panel p-1.5 rounded-full flex items-center gap-4 transition-all hover:scale-105">

                {/* Navigation Tabs */}
                <div className="flex items-center gap-1 bg-black/5 rounded-full p-1">
                    {role === "Rural Worker" && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveTab("Add Patient")}
                            className={`rounded-full px-4 h-9 transition-all duration-300 ${activeTab === "Add Patient" ? "bg-rural-primary text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-black/5"}`}
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab("View All")}
                        className={`rounded-full px-4 h-9 transition-all duration-300 ${activeTab === "View All" ? (role === "Rural Worker" ? "bg-rural-primary" : "bg-urban-primary") + " text-white shadow-md" : "text-slate-500 hover:text-slate-900 hover:bg-black/5"}`}
                    >
                        <Users className="h-4 w-4 mr-2" />
                        Queue
                    </Button>
                </div>

                {/* Role Toggle */}
                <div className="pl-4 border-l border-black/10 pr-2">
                    <Button
                        onClick={toggleRole}
                        size="sm"
                        className={`text-xs font-bold rounded-full transition-all duration-500 h-9 px-4 ${role === "Rural Worker"
                            ? "bg-rural-secondary hover:bg-rural-primary text-white shadow-md"
                            : "bg-urban-secondary hover:bg-urban-primary text-white shadow-md"
                            }`}
                    >
                        {role === "Rural Worker" ? (
                            <><Activity className="h-3 w-3 mr-2" /> WORKER</>
                        ) : (
                            <><Stethoscope className="h-3 w-3 mr-2" /> DOCTOR</>
                        )}
                    </Button>
                </div>

            </div>
        </div>
    );
}
