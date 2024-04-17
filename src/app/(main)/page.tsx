import React from "react";
import { TypewriterEffectDemo } from "@/components/homepage-type";
import { ThreeDCardDemo } from "@/components/data-card";
export default function Home() {
    return (
        <main className="flex flex-col items-center p-24">
            <TypewriterEffectDemo />
            <ThreeDCardDemo />
        </main>
    );
}
