"use client";

import * as React from "react";
import Link from "next/link";
import { usePatients } from "@/lib/context";
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Wifi, Battery, Activity, Stethoscope, Menu, UserCircle, LogOut, Settings, Search, Bell, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
    const { role, setRole, setActiveTab } = usePatients();
    const [isSyncing, setIsSyncing] = React.useState(false);

    const toggleRole = () => {
        setRole(role === "Rural Worker" ? "Urban Doctor" : "Rural Worker");
        setActiveTab("View All");
    };

    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => setIsSyncing(false), 2000);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
            <div className="max-w-[1400px] mx-auto px-4 py-4">
                <div className="glass-panel rounded-full px-6 py-2 flex items-center justify-between transition-all duration-500">

                    {/* Left: Brand */}
                    <div className="flex items-center gap-4 shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-colors duration-500
                            ${role === "Rural Worker" ? "bg-rural-primary shadow-rural-primary/20" : "bg-urban-primary shadow-urban-primary/20"}`}>
                            S
                        </div>
                        <div className="hidden md:block">
                            <h1 className="text-lg font-bold leading-none tracking-tight text-foreground">Sehat Setu</h1>
                            <p className="text-[10px] font-medium tracking-[0.2em] uppercase opacity-70">Medical Network</p>
                        </div>
                    </div>

                    {/* Center: Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Patient by ID or Name..."
                            className="w-full bg-black/5 hover:bg-black/10 focus:bg-white border-0 rounded-full py-2.5 pl-10 pr-4 text-sm transition-all outline-none ring-2 ring-transparent focus:ring-primary/20 placeholder:text-slate-500 text-foreground"
                        />
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3 shrink-0">

                        {/* Sync Button */}
                        <button
                            onClick={handleSync}
                            className={`hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full border transition-all duration-300 group
                                ${role === "Rural Worker"
                                    ? "bg-white border-slate-200 hover:border-rural-primary/50 text-slate-600"
                                    : "bg-slate-800 border-slate-700 hover:border-urban-primary/50 text-slate-300"
                                }`}
                        >
                            <div className="relative">
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${isSyncing ? "bg-green-500" : "bg-primary"}`}></div>
                                <div className={`h-2.5 w-2.5 rounded-full relative z-10 ${isSyncing ? "bg-green-500" : "bg-primary"}`}></div>
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    {isSyncing ? "Syncing..." : "Sync Activity"}
                                </span>
                                <span className="text-[10px] opacity-60">Last Synced: Just Now</span>
                            </div>
                            <RotateCcw className={`h-3.5 w-3.5 ml-1 transition-transform duration-1000 ${isSyncing ? "animate-spin" : "group-hover:rotate-180"}`} />
                        </button>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-black/5 text-foreground">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2.5 h-2 w-2 bg-alert-red rounded-full border-2 border-white"></span>
                        </Button>

                        <div className="h-6 w-px bg-black/10 mx-1"></div>

                        {/* Role Switcher */}
                        <Button
                            onClick={toggleRole}
                            size="sm"
                            className={`h-9 px-4 rounded-full font-bold text-xs ring-2 ring-offset-1 ring-offset-transparent transition-all duration-300
                                ${role === "Rural Worker"
                                    ? "bg-rural-primary hover:bg-rural-secondary ring-rural-primary/20 text-white"
                                    : "bg-urban-primary hover:bg-urban-secondary ring-urban-primary/20 text-white"
                                }`}
                        >
                            {role === "Rural Worker" ? "View as Doctor" : "View as Worker"}
                        </Button>

                        {/* Profile Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-white/50 hover:ring-primary/50 transition-all p-0">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 glass-panel border-white/20 bg-white/95" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Dr. Aditi Sharma</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            aditi@sehatsetu.org
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <UserCircle className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-alert-red focus:text-alert-red focus:bg-alert-red/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] glass-panel bg-white/95 backdrop-blur-2xl">
                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">S</div>
                                        <div>
                                            <h2 className="text-lg font-bold">Sehat Setu</h2>
                                            <p className="text-xs text-slate-500">Mobile Access</p>
                                        </div>
                                    </div>
                                    <nav className="flex flex-col gap-2">
                                        <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("View All")}>
                                            <Activity className="h-4 w-4" /> Dashboard
                                        </Button>
                                        <Button variant="ghost" className="justify-start gap-2" onClick={() => setActiveTab("Add Patient")}>
                                            <Stethoscope className="h-4 w-4" /> New Patient
                                        </Button>
                                        <Button variant="ghost" className="justify-start gap-2">
                                            <UserCircle className="h-4 w-4" /> Profile
                                        </Button>
                                    </nav>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
