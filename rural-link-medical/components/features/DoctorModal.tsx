"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { usePatients, Patient } from "@/lib/context";
import { useState, useEffect } from "react";
import { Stethoscope, Clock, Activity, Thermometer, Heart } from "lucide-react";

interface DoctorModalProps {
    patient: Patient;
    isOpen: boolean;
    onClose: () => void;
}

export function DoctorModal({ patient, isOpen, onClose }: DoctorModalProps) {
    const { role, updatePatientConfig } = usePatients();
    const [advice, setAdvice] = useState(patient.doctorAdvice || "");

    // Update local state when patient changes
    useEffect(() => {
        setAdvice(patient.doctorAdvice || "");
    }, [patient]);

    const handleSave = () => {
        updatePatientConfig(patient.id, { doctorAdvice: advice });
        onClose();
        // In a real app, maybe show a toast
    };

    const isDoctor = role === "Urban Doctor";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-xl bg-white/95 backdrop-blur-xl border-slate-200 sm:rounded-2xl shadow-2xl">
                <DialogHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            {patient.image && (
                                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-md">
                                    <img src={patient.image} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <div>
                                <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    {patient.name}
                                    <Badge variant={patient.severity === 'High' ? 'destructive' : 'secondary'}>
                                        {patient.severity}
                                    </Badge>
                                </DialogTitle>
                                <DialogDescription className="text-base">
                                    {patient.age} Yrs • {patient.location}
                                </DialogDescription>
                            </div>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                            <Clock className="h-3 w-3" />
                            {new Date(patient.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-3 py-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                        <div className="text-slate-400 text-xs uppercase font-bold mb-1 flex items-center justify-center gap-1"><Activity className="h-3 w-3" /> BP</div>
                        <div className="text-lg font-bold text-slate-700">{patient.vitals.bp}</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                        <div className="text-slate-400 text-xs uppercase font-bold mb-1 flex items-center justify-center gap-1"><Thermometer className="h-3 w-3" /> Temp</div>
                        <div className="text-lg font-bold text-slate-700">{patient.vitals.temp}°</div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                        <div className="text-slate-400 text-xs uppercase font-bold mb-1 flex items-center justify-center gap-1"><Heart className="h-3 w-3" /> Pulse</div>
                        <div className="text-lg font-bold text-slate-700">{patient.vitals.pulse}</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-900">Symptoms</label>
                        <p className="text-slate-600 bg-slate-50 p-3 rounded-lg mt-1 text-sm leading-relaxed border border-slate-100">
                            {patient.condition}
                        </p>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-indigo-600" />
                            Specialist Advice
                        </label>
                        {isDoctor ? (
                            <Textarea
                                value={advice}
                                onChange={(e) => setAdvice(e.target.value)}
                                placeholder="Enter diagnosis and treatment plan..."
                                className="mt-2 min-h-[100px] bg-white border-indigo-100 focus:border-indigo-400 focus:ring-indigo-100"
                            />
                        ) : (
                            <div className="mt-2 min-h-[80px] bg-indigo-50/50 p-3 rounded-lg border-2 border-dashed border-indigo-100 text-sm text-indigo-800">
                                {advice || "Pending review from specialist..."}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                    {isDoctor && (
                        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Save Advice
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
