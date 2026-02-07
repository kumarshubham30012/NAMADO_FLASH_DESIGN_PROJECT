import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Activity, MapPin } from "lucide-react";
import Link from "next/link";

interface PatientCardProps {
    name: string;
    age: number;
    condition: string;
    lastVisit: string;
    status: "Synced" | "Offline" | "Critical";
    location: string;
}

export function PatientCard({ name, age, condition, lastVisit, status, location }: PatientCardProps) {
    const statusColor = status === "Critical" ? "bg-red-500" : status === "Offline" ? "bg-gray-500" : "bg-emerald-500";

    return (
        <Card className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-bold text-slate-900">{name}, {age}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-xs">
                            <MapPin className="h-3 w-3" /> {location}
                        </CardDescription>
                    </div>
                </div>
                <Badge className={`${statusColor} text-white hover:${statusColor} border-none`}>{status}</Badge>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-slate-500 text-xs">Condition</p>
                        <p className="font-medium text-slate-800">{condition}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-xs">Last Visit</p>
                        <p className="font-medium text-slate-800">{lastVisit}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-0">
                <Link href={`/patient/1`} className="w-full">
                    <Button variant="outline" className="w-full text-teal-700 border-teal-200 hover:bg-teal-50">View Case History</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
