"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save, UserPlus, Upload, Activity, Calendar, Thermometer, Heart, MapPin, User, CheckCircle } from "lucide-react";
import Link from "next/link";
import { usePatients, Severity } from "@/lib/context";

export function AddPatientForm() {
    const { addPatient, setActiveTab } = usePatients();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        location: "",
        condition: "",
        severity: "Medium" as Severity,
        bp: "",
        temp: "",
        pulse: "",
        image: ""
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addPatient({
            name: `${formData.firstName} ${formData.lastName}`,
            age: parseInt(formData.age),
            location: formData.location,
            condition: formData.condition,
            severity: formData.severity,
            vitals: {
                bp: formData.bp || "N/A",
                temp: formData.temp || "N/A",
                pulse: formData.pulse || "N/A"
            },
            image: formData.image
        });

        alert(`Patient ${formData.firstName} saved to secure database.`);
        setActiveTab("View All");
    };

    return (
        <div className="flex justify-center p-4">
            <Card className="w-full max-w-5xl glass-panel bg-white/95 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-rural-primary to-rural-secondary" />

                <CardHeader className="pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
                                <div className="h-10 w-10 rounded-xl bg-rural-primary/10 flex items-center justify-center ring-1 ring-rural-primary/20">
                                    <UserPlus className="h-6 w-6 text-rural-primary" />
                                </div>
                                New Patient Profile
                            </CardTitle>
                            <CardDescription className="text-base text-slate-500 pl-14">
                                Securely onboard a new patient to the local clinic database.
                            </CardDescription>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            System Online
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Left Column: Basic Details */}
                            <div className="p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-900 text-white text-xs font-bold">1</span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Patient Identity</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">First Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-rural-primary transition-colors" />
                                            <Input
                                                required
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="pl-10 h-12 text-lg bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl text-slate-800 placeholder:text-slate-300 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Last Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-rural-primary transition-colors" />
                                            <Input
                                                required
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="pl-10 h-12 text-lg bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl text-slate-800 placeholder:text-slate-300 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Age</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-rural-primary transition-colors" />
                                            <Input
                                                required
                                                type="number"
                                                placeholder="Yrs"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="pl-10 h-12 text-lg bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl text-slate-800 placeholder:text-slate-300 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Sector</label>
                                        <div className="relative group">
                                            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-rural-primary transition-colors" />
                                            <Input
                                                required
                                                placeholder="Location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="pl-10 h-12 text-lg bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl text-slate-800 placeholder:text-slate-300 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                    <label className="text-sm font-bold text-slate-700">Medical Photo</label>
                                    <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${formData.image ? 'border-rural-primary bg-rural-primary/5' : 'border-slate-300 hover:border-rural-primary hover:bg-slate-50'}`}>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10 h-full"
                                        />
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${formData.image ? 'bg-white text-rural-primary shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                                                {formData.image ? <CheckCircle className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-bold ${formData.image ? 'text-rural-primary' : 'text-slate-600'}`}>
                                                    {formData.image ? "Photo Attached Successfully" : "Upload Patient Photo"}
                                                </p>
                                                <p className="text-xs text-slate-400">Tap to capture or select from gallery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Vitals & Details */}
                            <div className="p-8 space-y-6 bg-slate-50/50">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-rural-primary text-white text-xs font-bold">2</span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-rural-primary">Clinical Vitals & Condition</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
                                            <Activity className="h-3 w-3" /> BP
                                        </label>
                                        <Input
                                            placeholder="120/80"
                                            value={formData.bp}
                                            onChange={(e) => setFormData({ ...formData, bp: e.target.value })}
                                            className="h-12 text-center text-lg font-mono font-bold bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl"
                                        />
                                        <span className="text-[10px] text-center block text-slate-400">mmHg</span>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
                                            <Thermometer className="h-3 w-3" /> Temp
                                        </label>
                                        <Input
                                            placeholder="98.6"
                                            value={formData.temp}
                                            onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                                            className="h-12 text-center text-lg font-mono font-bold bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl"
                                        />
                                        <span className="text-[10px] text-center block text-slate-400">°F</span>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase">
                                            <Heart className="h-3 w-3" /> Pulse
                                        </label>
                                        <Input
                                            placeholder="72"
                                            value={formData.pulse}
                                            onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
                                            className="h-12 text-center text-lg font-mono font-bold bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl"
                                        />
                                        <span className="text-[10px] text-center block text-slate-400">bpm</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Triage Level</label>
                                    <Select
                                        value={formData.severity}
                                        onValueChange={(value: Severity) => setFormData({ ...formData, severity: value })}
                                    >
                                        <SelectTrigger className="h-12 bg-white border-2 border-slate-200 focus:ring-0 focus:border-rural-primary rounded-xl">
                                            <SelectValue placeholder="Select Severity" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low" className="text-emerald-600 font-medium">Low - Stable Condition</SelectItem>
                                            <SelectItem value="Medium" className="text-amber-600 font-medium">Medium - Under Observation</SelectItem>
                                            <SelectItem value="High" className="text-red-600 font-bold">High - Critical Attention</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Symptoms & Notes</label>
                                    <Textarea
                                        required
                                        placeholder="Describe detailed symptoms..."
                                        value={formData.condition}
                                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                        className="min-h-[140px] text-base bg-white border-2 border-slate-200 focus:border-rural-primary focus:ring-0 rounded-xl resize-none p-4 text-slate-800 placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-end">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => setActiveTab("Dashboard")}
                                className="w-full md:w-auto h-12 px-6 text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl font-medium"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="w-full md:w-auto h-12 px-12 bg-rural-primary hover:bg-rural-secondary text-white text-lg font-bold shadow-lg shadow-teal-700/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Save className="h-5 w-5 mr-2" />
                                Submit Patient Profile
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
