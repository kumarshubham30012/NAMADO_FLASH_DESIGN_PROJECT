"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, AlertCircle, CheckCircle2, TrendingUp, Clock, Calendar, Activity } from "lucide-react";

// Fallback visual if recharts isn't available or for simplicity in this swift implementation
// We will stick to pure Tailwind/CSS visuals for reliability as I cannot verify recharts installation right now without checking package.json
// But the user asked for "good ai" information, implies professional data presentation.

export function ClinicStats() {
    // Dummy Data
    const stats = [
        {
            title: "Total Patients Treated",
            value: "1,284",
            change: "+12% from last month",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Resolved Cases",
            value: "1,156",
            change: "90% resolution rate",
            icon: CheckCircle2,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Critical Referrals",
            value: "42",
            change: "3 pending transfer",
            icon: AlertCircle,
            color: "text-red-600",
            bg: "bg-red-100",
        },
        {
            title: "Avg. Triage Time",
            value: "8m 30s",
            change: "-2m from avg",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-100",
        },
    ];

    const recentResolutions = [
        { name: "Ramesh Gupta", issue: "Hypertension Crisis", date: "Today, 10:30 AM", status: "Referred" },
        { name: "Sita Devi", issue: "Viral Fever", date: "Today, 09:15 AM", status: "Discharged" },
        { name: "Aarav Patel", issue: "Minor Injury", date: "Yesterday, 04:45 PM", status: "Discharged" },
        { name: "Vihaan Kumar", issue: "Dehydration", date: "Yesterday, 02:20 PM", status: "Stabilized" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Clinic Analytics</h2>
                    <p className="text-slate-500">Real-time performance metrics and patient outcomes.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border shadow-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Last 30 Days</span>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                                <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    {stat.change}
                                </p>
                            </div>
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Area (Simulated with CSS bars for visuals) */}
                <Card className="lg:col-span-2 border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-rural-primary" />
                            Patient Influx Trends
                        </CardTitle>
                        <CardDescription>Daily patient visits over the last week.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] w-full flex items-end justify-between gap-2 px-2">
                            {[45, 62, 38, 75, 50, 88, 65].map((h, i) => (
                                <div key={i} className="flex-1 group relative flex flex-col justify-end items-center gap-2">
                                    <div
                                        className="w-full bg-rural-primary/80 rounded-t-lg transition-all duration-500 group-hover:bg-rural-primary group-hover:scale-y-105"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                    <span className="text-xs text-slate-400 font-medium lowercase">
                                        {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'][i]}
                                    </span>
                                    {/* Tooltip */}
                                    <div className="absolute -top-8 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        {Math.floor(h * 1.5)} Patients
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity List */}
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-slate-800">Recent Resolutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentResolutions.map((item, i) => (
                                <div key={i} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{item.name}</p>
                                        <p className="text-xs text-slate-500">{item.issue}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
                                            ${item.status === 'Referred' ? 'bg-red-100 text-red-600' :
                                                item.status === 'Discharged' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {item.status}
                                        </span>
                                        <p className="text-[10px] text-slate-400 mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
