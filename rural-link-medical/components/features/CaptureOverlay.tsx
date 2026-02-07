"use client";

import { useState } from "react";
import { Camera, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CaptureOverlay() {
    const [level, setLevel] = useState(true); // Mock level indicator

    return (
        <div className="relative h-96 w-full bg-slate-900 rounded-xl overflow-hidden shadow-inner flex flex-col items-center justify-center">
            {/* Camera Feed Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-60">
                {/* In real app, this is <video> */}
                <div className="w-full h-full flex items-center justify-center text-white/20">
                    [Camera Feed]
                </div>
            </div>

            {/* Ghost Frame */}
            <div className={`relative w-64 h-64 border-2 rounded-lg z-10 transition-colors duration-300 ${level ? "border-emerald-400" : "border-white/50"}`}>
                {/* Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-400 -mt-0.5 -ml-0.5"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-400 -mt-0.5 -mr-0.5"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-400 -mb-0.5 -ml-0.5"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-400 -mb-0.5 -mr-0.5"></div>

                {/* Level Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center">
                    {level && <div className="bg-emerald-500/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-md">Level Perfect</div>}
                </div>
            </div>

            <div className="absolute bottom-6 z-20 flex items-center gap-8">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Switch Camera">
                    <RefreshCw className="h-6 w-6" />
                </Button>
                <Button size="icon" className="h-16 w-16 rounded-full bg-white border-4 border-slate-300 hover:bg-slate-100 hover:scale-105 transition-all" aria-label="Take Photo">
                    <Camera className="h-8 w-8 text-slate-900" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" aria-label="Confirm Capture">
                    <Check className="h-6 w-6" />
                </Button>
            </div>

            <div className="absolute top-4 left-0 w-full text-center z-20">
                <p className="text-white font-medium drop-shadow-md bg-black/30 inline-block px-3 py-1 rounded-full text-sm">Align wound in box</p>
            </div>
        </div>
    );
}
