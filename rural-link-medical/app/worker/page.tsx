"use client";

import { EmergencyButton } from "@/components/features/EmergencyButton";
import { PatientCard } from "@/components/features/PatientCard";
import { CaptureOverlay } from "@/components/features/CaptureOverlay";
import { Button } from "@/components/ui/button";
import { Signal, Wifi, Battery, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function WorkerDashboard() {
  const [showCapture, setShowCapture] = useState(false);

  // Mock Data
  const patients = [
    { name: "Aarav Patel", age: 45, condition: "Laceration (Left Arm)", lastVisit: "2d ago", status: "Synced" as const, location: "Sector 4" },
    { name: "Priya Sharma", age: 28, condition: "High Fever (103°F)", lastVisit: "4h ago", status: "Critical" as const, location: "Sector 2" },
    { name: "Rohan Gupta", age: 62, condition: "Diabetic Ulcer", lastVisit: "1w ago", status: "Offline" as const, location: "Sector 9" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Sehat Setu</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wider">MEDICAL</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600">
              <Wifi className="h-3 w-3 text-emerald-500" />
              <span>Online</span>
              <span className="text-slate-300">|</span>
              <Battery className="h-3 w-3 text-slate-600" />
              <span>84%</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-200">
              DK
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Emergency Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-4 bg-red-50 p-4 rounded-2xl border border-red-100">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-red-900">Emergency Mode</h2>
            <p className="text-sm text-red-700">Press if you need immediate specialist support.</p>
          </div>
          <EmergencyButton onActivate={() => alert("SOS Triggered: Alerting Specialists...")} />
        </section>

        {/* Action Bar */}
        <section className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Patient Queue ({patients.length})</h2>
          <div className="flex gap-3">
            <Link href="/worker/add-patient">
              <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Profile
              </Button>
            </Link>
            <Button
              onClick={() => setShowCapture(!showCapture)}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 shadow-md shadow-teal-600/20"
            >
              <Plus className="h-4 w-4 mr-2" />
              Quick Capture
            </Button>
          </div>
        </section>

        {/* Capture Demo (Expandable) */}
        {showCapture && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wide">Intelligent Capture</h3>
            <CaptureOverlay />
          </section>
        )}

        {/* Patient Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient, i) => (
            <PatientCard key={i} {...patient} />
          ))}
        </section>
      </main>

      {/* Floating Network Status (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <div className="bg-slate-900 text-white p-3 rounded-full shadow-xl flex items-center justify-center">
          <Signal className="h-5 w-5 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}
