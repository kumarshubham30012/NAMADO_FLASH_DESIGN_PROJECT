"use client";

import { usePatients } from "@/lib/context";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { PatientKanban } from "@/components/features/PatientKanban";
import { AddPatientForm } from "@/components/features/AddPatientForm";
import { ClinicStats } from "@/components/features/ClinicStats";
import { Wifi, Battery } from "lucide-react";

export default function AppContainer() {
  const { activeTab, role, setRole } = usePatients();

  return (
    <div className={`min-h-screen animate-mesh pb-32 relative text-slate-100 selection:bg-teal-500/30 transition-colors duration-500 ${role === 'Rural Worker' ? 'theme-rural' : 'theme-urban'
      }`}>
      {/* Background Overlay */}
      {/* Ambient Light Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))] mix-blend-screen pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="relative z-10">

        <Navbar />

        {/* Spacer for fixed header */}
        <div className="h-28"></div>


        {/* Sidebar (Rural Only) */}
        {role === "Rural Worker" && <Sidebar />}

        <main className={`max-w-[1600px] mx-auto px-4 py-6 space-y-8 transition-all duration-500
            ${role === "Rural Worker" ? "lg:pl-72" : ""}
        `}>

          {/* Dynamic Content based on Tab */}
          {(activeTab === "Add Patient" || activeTab === "New Patient") && role === "Rural Worker" && (
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <AddPatientForm />
            </div>
          )}

          {/* Clinic Stats (Rural Only) */}
          {activeTab === "Stats" && role === "Rural Worker" && (
            <div className="animate-in zoom-in-95 duration-500">
              <ClinicStats />
            </div>
          )}

          {(activeTab === "View All" || activeTab === "Dashboard") && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    {role === 'Rural Worker' ? 'Urgency Board' : 'Patient Triage'}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {role === 'Rural Worker' ? 'Prioritize care based on severity' : 'Review and resolve escalated cases'}
                  </p>
                </div>

                {role === 'Urban Doctor' && (
                  <div className="flex gap-2">
                    <button className="bg-urban-primary/10 text-urban-primary px-4 py-2 rounded-lg text-xs font-bold hover:bg-urban-primary/20 transition">
                      + Override Triage
                    </button>
                  </div>
                )}
              </div>
              <PatientKanban />
            </div>
          )}

        </main>
      </div> {/* End of Main Content Wrapper */}

      {/* Mobile Nav Only */}
      <div className="lg:hidden">
        <FloatingNav />
      </div>
    </div>
  );
}
