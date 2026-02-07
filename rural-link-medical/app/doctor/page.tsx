import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function DoctorDashboard() {
    const criticalCases = [
        { id: 1, name: "Priya Sharma", age: 28, condition: "High Fever (103°F)", location: "Sector 2", time: "10m ago" },
        { id: 4, name: "Rajesh Kumar", age: 55, condition: "Chest Pain", location: "Sector 5", time: "25m ago" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 leading-none">Specialist Portal</h1>
                            <p className="text-xs text-slate-500 font-medium tracking-wider">SEHAT SETU</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">Dr. Anjali Desai</span>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm border border-indigo-200">AD</div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="text-red-500 h-5 w-5" />
                        Critical Review Needed ({criticalCases.length})
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {criticalCases.map((patient) => (
                            <Card key={patient.id} className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-start justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-lg font-bold text-slate-900">{patient.name}</CardTitle>
                                        <p className="text-sm text-slate-500">{patient.age} Yrs • {patient.location}</p>
                                    </div>
                                    <Badge variant="destructive" className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {patient.time}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="font-medium text-red-700 bg-red-50 px-2 py-1 rounded text-sm">{patient.condition}</span>
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Review Case</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="text-emerald-500 h-5 w-5" />
                        Recent Consultations
                    </h2>
                    <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                        No recent completed reviews today.
                    </div>
                </section>
            </main>
        </div>
    );
}
