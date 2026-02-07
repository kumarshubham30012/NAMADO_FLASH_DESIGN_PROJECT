import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface EmergencyButtonProps {
    onActivate: () => void;
}

export function EmergencyButton({ onActivate }: EmergencyButtonProps) {
    return (
        <Button
            onClick={onActivate}
            className="bg-destructive hover:bg-red-600 text-white font-bold py-6 px-8 rounded-full shadow-lg border-4 border-red-200 animate-pulse flex items-center gap-2 text-xl w-full justify-center md:w-auto"
        >
            <AlertTriangle className="h-8 w-8" />
            EMERGENCY SOS
        </Button>
    );
}
