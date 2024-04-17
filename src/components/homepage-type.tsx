"use client";
import { TypewriterEffect } from "@/components/aceternity/typewriter-effect";
import { Button } from "./ui/button";
import Link from "next/link";

export function TypewriterEffectDemo() {
  const words = [
    {
      text: "Market",
    },
    {
      text: "Data",
    },
    {
      text: "Simplified",
    },
    {
      text: "with",
    },
    {
      text: "AgrEvolve.",
      className: "text-green-500 dark:text-green-500",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        One stop solution for all Information related to Agriculture
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
      </div>
    </div>
  );
}
