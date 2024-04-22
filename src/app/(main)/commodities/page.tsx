"use client";

import { CommodityForm } from "@/components/commodity/select-form";

import { useState } from "react";

export default function CommoditiesPage() {
    return (
        <main className="items-center p-12">
            <CommodityForm />
        </main>
    );
}
