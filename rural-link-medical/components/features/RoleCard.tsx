import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

interface RoleCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    colorClass: string;
}

export function RoleCard({ title, description, icon: Icon, href, colorClass }: RoleCardProps) {
    return (
        <Link href={href} className="block group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-slate-200 overflow-hidden">
                <div className={`h-2 w-full ${colorClass}`} />
                <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${colorClass.replace("bg-", "bg-").replace("500", "100")} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${colorClass.replace("bg-", "text-")}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {title}
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        {description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-teal-600 transition-colors">
                        Enter Portal <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
