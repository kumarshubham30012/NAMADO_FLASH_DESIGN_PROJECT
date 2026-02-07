"use client";

import { usePatients, Patient, Severity } from "@/lib/context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, AlertCircle, User, Activity, Thermometer, Heart, ArrowRight } from "lucide-react";
import { DoctorModal } from "./DoctorModal";
import { useState } from "react";

export function PatientKanban() {
    const { patients, role, deletePatient, updatePatientConfig } = usePatients();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const getSeverityColor = (severity: Severity) => {
        switch (severity) {
            case "High": return "bg-alert-red shadow-alert-red/50";
            case "Medium": return "bg-alert-yellow shadow-alert-yellow/50";
            case "Low": return "bg-success-green shadow-success-green/50";
        }
    };

    const handleAction = (e: React.MouseEvent, patient: Patient) => {
        e.stopPropagation();
        if (role === "Rural Worker") {
            setConfirmDeleteId(patient.id);
        } else {
            updatePatientConfig(patient.id, { doctorAdvice: patient.doctorAdvice ? patient.doctorAdvice + " [RESOLVED]" : "[RESOLVED]" });
        }
    };

    const confirmDischarge = () => {
        if (confirmDeleteId) {
            deletePatient(confirmDeleteId);
            setConfirmDeleteId(null);
        }
    };

    const renderColumn = (title: string, severity: Severity, items: Patient[]) => (
        <div className="flex-1 min-w-[350px] flex flex-col h-full group/column">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 px-2">
                <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-full shadow-lg ${getSeverityColor(severity)} ring-2 ring-white/20`} />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">{title}</h3>
                </div>
                <span className="text-xs font-bold bg-foreground/5 text-foreground/60 px-2.5 py-1 rounded-full border border-foreground/5">
                    {items.length}
                </span>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-20">
                {items.length === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200/50 rounded-3xl bg-slate-50/10">
                        <User className="h-10 w-10 mb-3 opacity-20" />
                        <p className="text-xs font-medium tracking-wide opacity-60">NO PATIENTS</p>
                    </div>
                ) : items.map((patient, index) => (
                    <div
                        key={patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        style={{ animationDelay: `${index * 100}ms` }}
                        className={`
                            group relative overflow-hidden rounded-2xl p-0 cursor-pointer 
                            transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                            animate-enter min-h-[220px] flex flex-col
                            ${role === "Rural Worker"
                                ? "bg-white border border-slate-100 shadow-sm"  // Rural Layout
                                : "glass-panel border-white/10 bg-white/5"     // Urban Layout
                            }
                        `}
                    >
                        {/* Top Status Bar */}
                        <div className={`h-1.5 w-full ${getSeverityColor(patient.severity).split(' ')[0]}`} />

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start gap-4">
                                <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 ring-1 ring-black/5 shadow-sm bg-slate-100">
                                    {patient.image ? (
                                        <img src={patient.image} alt="Patient" className="h-full w-full object-cover blur-[2px] hover:blur-none transition-all duration-500 scale-110" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center text-slate-300">
                                            <User className="h-8 w-8" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 pt-0.5">
                                    <h4 className={`font-bold text-lg leading-tight truncate ${role === 'Urban Doctor' ? 'text-slate-100' : 'text-slate-900'}`}>{patient.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-1.5 flex items-center gap-2">
                                        <span className="bg-black/5 px-2 py-0.5 rounded-md">{patient.age} Yrs</span>
                                        <span>•</span>
                                        <span className="truncate">{patient.location}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Vitals Grid */}
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className={`rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 border
                                    ${role === 'Rural Worker' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'}`}>
                                    <Activity className={`h-4 w-4 ${role === 'Rural Worker' ? 'text-slate-400' : 'text-indigo-400'}`} />
                                    <span className={`text-sm font-bold ${role === 'Rural Worker' ? 'text-slate-700' : 'text-slate-300'}`}>{patient.vitals.bp}</span>
                                </div>
                                <div className={`rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 border
                                    ${role === 'Rural Worker' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'}`}>
                                    <Thermometer className={`h-4 w-4 ${role === 'Rural Worker' ? 'text-slate-400' : 'text-orange-400'}`} />
                                    <span className={`text-sm font-bold ${role === 'Rural Worker' ? 'text-slate-700' : 'text-slate-300'}`}>{patient.vitals.temp}°</span>
                                </div>
                                <div className={`rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 border
                                    ${role === 'Rural Worker' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/5'}`}>
                                    <Heart className={`h-4 w-4 ${role === 'Rural Worker' ? 'text-slate-400' : 'text-rose-400'}`} />
                                    <span className={`text-sm font-bold ${role === 'Rural Worker' ? 'text-slate-700' : 'text-slate-300'}`}>{patient.vitals.pulse}</span>
                                </div>
                            </div>

                            {/* Doctor Advice / Condition Preview */}
                            <div className={`mt-auto pt-4 border-t ${role === 'Rural Worker' ? 'border-slate-100' : 'border-white/5'}`}>
                                <p className={`text-xs line-clamp-2 leading-relaxed ${role === 'Urban Doctor' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {patient.condition}
                                </p>
                            </div>
                        </div>

                        {/* Action Footer (Only visible on Hover or if Critical) */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 bg-gradient-to-t from-black/80 to-transparent pt-12 flex justify-end">
                            <Button
                                size="sm"
                                onClick={(e) => handleAction(e, patient)}
                                className={`
                                    h-9 px-4 rounded-full font-bold text-xs shadow-lg backdrop-blur-md
                                    ${role === "Rural Worker"
                                        ? "bg-white text-destructive hover:bg-red-50"
                                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                                    }
                                `}
                            >
                                {role === "Rural Worker" ? "Discharge Patient" : "Resolve Case"}
                                <ArrowRight className="h-3.5 w-3.5 ml-2" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            <div className="flex gap-8 overflow-x-auto pb-8 min-h-[calc(100vh-200px)] snap-x px-4 lg:px-0">
                {renderColumn("Critical Attention", "High", patients.filter(p => p.severity === "High"))}
                {renderColumn("Under Observation", "Medium", patients.filter(p => p.severity === "Medium"))}
                {renderColumn("Stable Condition", "Low", patients.filter(p => p.severity === "Low"))}
            </div>

            {selectedPatient && (
                <DoctorModal
                    patient={selectedPatient}
                    isOpen={!!selectedPatient}
                    onClose={() => setSelectedPatient(null)}
                />
            )}

            {/* Confirmation Modal */}
            <Dialog open={!!confirmDeleteId} onOpenChange={() => setConfirmDeleteId(null)}>
                <DialogContent className="glass-panel border-white/10 text-white bg-slate-900/95">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-400">
                            <AlertCircle className="h-5 w-5" />
                            Confirm Discharge
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Are you sure you want to discharge this patient? This action will permanently remove their profile from the local system.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setConfirmDeleteId(null)} className="text-slate-300 hover:text-white hover:bg-white/10">Cancel</Button>
                        <Button
                            onClick={confirmDischarge}
                            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Confirm Discharge
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
