"use client";

import { CommodityForm } from "@/components/commodity/select-form";

import { useState } from "react";

export default function CommoditiesPage() {
    const [selectedCommodity, setSelectedCommodity] = useState<string | null>(
        null
    );

    return (
        <main className="items-center p-12">
            <CommodityForm />
        </main>
    );
}
