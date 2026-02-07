"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { PatientCard } from "@/components/features/PatientCard";

export default function PatientCaseHistory({ params }: { params: { id: string } }) {
    // Mock Data (In reality, fetch using params.id)
    const patient = {
        name: "Aarav Patel",
        age: 45,
        condition: "Laceration (Left Arm)",
        lastVisit: "2d ago",
        status: "Synced" as const,
        location: "Sector 4"
    };

    const history = [
        { date: "Oct 24, 2025", type: "Visit", notes: "Patient reported sharp pain. 5cm laceration cleaned and sutured.", doctor: "Dr. K. Singh" },
        { date: "Oct 24, 2025", type: "Prescription", notes: "Amoxicillin 500mg, Paracetamol", doctor: "Dr. K. Singh" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900">Case History</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {/* Patient Summary */}
                <section>
                    <PatientCard {...patient} />
                </section>



                {/* History Timeline */}
                <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-teal-600" />
                        Medical Journey
                    </h2>

                    <div className="relative border-l-2 border-slate-200 pl-6 space-y-8">
                        {history.map((event, i) => (
                            <div key={i} className="relative">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white shadow-sm bg-teal-500`}></div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-fit bg-teal-50 text-teal-700`}>
                                            {event.type}
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">{event.date}</span>
                                    </div>
                                    <p className="text-slate-800 font-medium mt-1">{event.notes}</p>
                                    {event.doctor && <p className="text-xs text-slate-500">By {event.doctor}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
