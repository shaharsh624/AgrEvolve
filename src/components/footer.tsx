import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-background border-t-2 position-absolute b-0 bm-0 mx-0 w-full px-32 py-8 flex flex-cols items-center justify-between">
                <Image src="/logo.png" alt="logo" width={200} height={100} />
                <div className="flex flex-cols jutstify-between gap-x-8">
                    <Link href="/">Home</Link>
                    <Link href="/commoditiy">Commodities</Link>
                    <Link href="/profile">API</Link>
                    <Link href="/contact">Contact Us</Link>
                </div>
            </div>
            <div>
                <p className="text-neutral-500 dark:text-neutral-300 text-sm">
                    © 2024 AgrEvolve. All rights reserved.
                </p>
            </div>
        </div>
    );
}
