"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Severity = "Low" | "Medium" | "High";
export type UserRole = "Rural Worker" | "Urban Doctor";

export interface Patient {
    id: string;
    name: string;
    age: number;
    location: string;
    condition: string; // "Symptoms"
    severity: Severity;
    vitals: {
        bp: string;
        temp: string;
        pulse: string;
    };
    image?: string; // Data URL
    doctorAdvice?: string;
    timestamp: number;
}

interface PatientContextType {
    patients: Patient[];
    addPatient: (patient: Omit<Patient, "id" | "timestamp">) => void;
    updatePatientConfig: (id: string, updates: Partial<Patient>) => void;
    deletePatient: (id: string) => void;
    role: UserRole;
    setRole: (role: UserRole) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: React.ReactNode }) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [role, setRole] = useState<UserRole>("Rural Worker");
    const [activeTab, setActiveTab] = useState("View All");

    // Load from LocalStorage
    useEffect(() => {
        const savedPatients = localStorage.getItem("sehat_setu_patients");
        if (savedPatients) {
            setPatients(JSON.parse(savedPatients));
        } else {
            // Initialize with default mock data if empty
            const initialData: Patient[] = [
                {
                    id: "1", name: "Aarav Patel", age: 45, location: "Sector 4", condition: "Deep Laceration (Left Arm)", severity: "Medium",
                    vitals: { bp: "120/80", temp: "98.6", pulse: "88" }, timestamp: Date.now()
                },
                {
                    id: "2", name: "Priya Sharma", age: 28, location: "Sector 2", condition: "High Fever (103°F) & Shivering", severity: "High",
                    vitals: { bp: "110/70", temp: "103.2", pulse: "102" }, timestamp: Date.now() - 10000
                },
                {
                    id: "3", name: "Rohan Gupta", age: 62, location: "Sector 9", condition: "Diabetic Ulcer checkup", severity: "Low",
                    vitals: { bp: "140/90", temp: "97.8", pulse: "76" }, timestamp: Date.now() - 20000
                },
            ];
            setPatients(initialData);
            localStorage.setItem("sehat_setu_patients", JSON.stringify(initialData));
        }
    }, []);

    const addPatient = (patientData: Omit<Patient, "id" | "timestamp">) => {
        const newPatient: Patient = {
            ...patientData,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
        };
        const updated = [newPatient, ...patients];
        setPatients(updated);
        localStorage.setItem("sehat_setu_patients", JSON.stringify(updated));
    };

    const updatePatientConfig = (id: string, updates: Partial<Patient>) => {
        const updated = patients.map((p) => (p.id === id ? { ...p, ...updates } : p));
        setPatients(updated);
        localStorage.setItem("sehat_setu_patients", JSON.stringify(updated));
    };

    const deletePatient = (id: string) => {
        const updated = patients.filter((p) => p.id !== id);
        setPatients(updated);
        localStorage.setItem("sehat_setu_patients", JSON.stringify(updated));
    };

    return (
        <PatientContext.Provider value={{ patients, addPatient, updatePatientConfig, deletePatient, role, setRole, activeTab, setActiveTab }}>
            {children}
        </PatientContext.Provider>
    );
}

export const usePatients = () => {
    const context = useContext(PatientContext);
    if (!context) throw new Error("usePatients must be used within a PatientProvider");
    return context;
};
