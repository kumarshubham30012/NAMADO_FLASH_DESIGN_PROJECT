"use client";

import { AddPatientForm } from "@/components/features/AddPatientForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddPatientPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/worker">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5 text-slate-600" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900">Add Patient</h1>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <AddPatientForm />
            </main>
        </div>
    );
}
