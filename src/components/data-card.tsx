"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3d-card";
import Link from "next/link";
import { Button } from "./ui/button";

export function ThreeDCardDemo() {
  return (
    <div className="flex flex-cols items-center gap-x-24">
        <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
            >
            Detailed Insights
            </CardItem>
            <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
            Get genuine data and insights about the market and commodities.
            </CardItem>
            <CardItem
            translateZ="100"
            rotateX={10}
            rotateZ={-5}
            className="w-full mt-4"
            >
            <Image
                src="/data.png"
                height="500"
                width="500"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
            />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
                <Link href="/commodities">
                    <Button variant="outline" className="transition duration-300 hover:bg-primary hover:text-primary-foreground">Get Started</Button>
                </Link>
            </div>
        </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
            >
            Real Time Data
            </CardItem>
            <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
            Utilise our powerful API to get real time data about the market.
            </CardItem>
            <CardItem
            translateZ="100"
            rotateX={10}
            rotateZ={-5}
            className="w-full mt-4"
            >
            <Image
                src="/api.png"
                height="500"
                width="500"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
            />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
                <Link href="/profile">
                    <Button variant="outline" className="transition duration-300 hover:bg-primary hover:text-primary-foreground">Get API</Button>
                </Link>
            </div>
        </CardBody>
        </CardContainer>
    </div>
  );
}
