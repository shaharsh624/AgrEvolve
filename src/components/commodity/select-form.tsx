"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "./date-range-picker";
import React, { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Example from "./graph";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { TableDemo } from "./table";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const graphData = [
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "January 1, 2001",
    },
    {
        Arrivals: 0.25,
        ModalPrice: 130,
        ReportedDate: "February 2, 2002",
    },
    {
        Arrivals: 0.65,
        ModalPrice: 140,
        ReportedDate: "March 3, 2003",
    },
    {
        Arrivals: 0.33,
        ModalPrice: 155,
        ReportedDate: "April 4, 2004",
    },
    {
        Arrivals: 0.27,
        ModalPrice: 125,
        ReportedDate: "May 5, 2005",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "June 6, 2006",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "July 7, 2007",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "August 8, 2008",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 150,
        ReportedDate: "September 9, 2009",
    },
    {
        Arrivals: 0.3,
        ModalPrice: 125,
        ReportedDate: "October 10, 2010",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 135,
        ReportedDate: "November 11, 2011",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 165,
        ReportedDate: "December 12, 2012",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 110,
        ReportedDate: "January 1, 2013",
    },
    {
        Arrivals: 0.25,
        ModalPrice: 130,
        ReportedDate: "February 2, 2014",
    },
    {
        Arrivals: 0.65,
        ModalPrice: 140,
        ReportedDate: "March 3, 2015",
    },
    {
        Arrivals: 0.33,
        ModalPrice: 255,
        ReportedDate: "April 4, 2016",
    },
    {
        Arrivals: 0.27,
        ModalPrice: 205,
        ReportedDate: "May 5, 2017",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 185,
        ReportedDate: "June 6, 2018",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "July 7, 2019",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "August 8, 2020",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 95,
        ReportedDate: "September 9, 2021",
    },
    {
        Arrivals: 0.3,
        ModalPrice: 125,
        ReportedDate: "October 10, 2022",
    },
    {
        Arrivals: 0.15,
        ModalPrice: 125,
        ReportedDate: "November 11, 2023",
    },
];

const FormSchema = z.object({
    commodity: z.string({
        required_error: "Please select a Commodity",
    }),
    state: z.string({
        required_error: "Please select a State",
    }),
    district: z.string().optional(),
    market: z.string().optional(),
});

export function CommodityForm() {
    type DataType = {
        commodity: string;
        state: string;
        district: string | undefined;
        market: string | undefined;
    };

    let globalData: DataType | null = null;

    const toast = useToast();

    const [stateSelected, setStateSelected] = React.useState(false);
    const [districtSelected, setDistrictSelected] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    // Selected values
    const [selectedState, setSelectedState] = React.useState<string | null>(
        null
    );
    const [selectedDistrict, setSelectedDistrict] = React.useState<
        string | null
    >(null);

    // API Data arrays
    const [commodityItems, setCommodityItems] = React.useState<string[]>([]);
    const [states, setStates] = React.useState<string[]>([]);
    const [districts, setDistricts] = React.useState<string[]>([]);
    const [markets, setMarkets] = React.useState<string[]>([]);

    interface DateRange {
        from: Date | undefined;
        to: Date | undefined;
    }

    const [dateRange, setDateRange] = React.useState<DateRange>({
        from: undefined,
        to: undefined,
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    async function onSubmition(data: z.infer<typeof FormSchema>) {
        console.log(data);

        var startDateOld = new Date(dateRange.from);
        var startDate = startDateOld.toISOString();

        var endDateOld = new Date(dateRange.to);
        var endDate = endDateOld.toISOString();
        console.log(graphData);

        try {
            const response = await fetch(
                "http://localhost:5000/api/commodity",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                    },
                    body: JSON.stringify({
                        stateName: data.state,
                        districtName: data.district,
                        marketName: data.market,
                        commodity: data.commodity,
                        startDate: startDate,
                        endDate: endDate,
                    }),
                }
            );
            const resData = await response.json();
            console.log(graphData);
            console.log(resData);
            // const jsonData = data.sort((a, b) => a.localeCompare(b));
            // setCommodityItems(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        if (
            (dateRange.from && dateRange.from > new Date(2024, 1, 1)) ||
            (dateRange.from && dateRange.to > new Date(2024, 1, 1))
        ) {
            toast.toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:
                    "Data available only till Feb 1, 2024. Please select a date range within the specified limit.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
        } else {
        }
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsSubmitted(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/commodities",
                    {
                        headers: {
                            "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                        },
                    }
                );
                const data = await response.json();
                const jsonData = data.sort((a, b) => a.localeCompare(b));
                setCommodityItems(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/states",
                    {
                        headers: {
                            "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                        },
                    }
                );
                const data = await response.json();
                const jsonData = data.sort((a, b) => a.localeCompare(b));
                setStates(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    });

    useEffect(() => {
        if (selectedState) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/districts/${selectedState}`,
                        {
                            headers: {
                                "api-key":
                                    process.env.NEXT_PUBLIC_API_KEY || "",
                            },
                        }
                    );
                    const data = await response.json();
                    const jsonData = data.sort((a, b) => a.localeCompare(b));
                    setDistricts(jsonData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [selectedState]);

    useEffect(() => {
        if (selectedDistrict) {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/markets/${selectedState}/${selectedDistrict}`,
                        {
                            headers: {
                                "api-key":
                                    process.env.NEXT_PUBLIC_API_KEY || "",
                            },
                        }
                    );
                    const data = await response.json();
                    const jsonData = data.sort((a, b) => a.localeCompare(b));
                    setMarkets(jsonData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [selectedDistrict, selectedState]);

    const [selectedDataKey, setSelectedDataKey] = React.useState("ModalPrice");

    const colors = {
        primary: "#16A34A",
        secondary: "#888888",

        // Add more colors as needed
    };

    const [hoveredData, setHoveredData] = React.useState(null);

    const handleMouseEnter = (data) => {
        setHoveredData(data);
    };

    const handleMouseLeave = () => {
        setHoveredData(null);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background border p-4 flex gap-x-6">
                    <div className="flex flex-col">
                        <Label className="text-sm">Date</Label>
                        <Label className="text-lg font-bold">
                            {data.ReportedDate}
                        </Label>
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm">Quantity</Label>
                        <Label className="text-lg font-bold">
                            {data.Arrivals} Kg
                        </Label>
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm">Price</Label>
                        <Label className="text-lg font-bold">
                            Rs. {data.ModalPrice}
                        </Label>
                    </div>
                </div>
            );
        }
        return null;
    };

    const handleSelectChange = (value) => {
        setSelectedDataKey(value);
    };

    // Body of the project
    return (
        <div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Select Item</CardTitle>
                        <CardDescription>
                            Select a commodity to view details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="w-full"
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="commodity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select Commodity" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {commodityItems.map(
                                                                (
                                                                    commodityItem
                                                                ) => (
                                                                    <SelectItem
                                                                        key={
                                                                            commodityItem
                                                                        }
                                                                        value={
                                                                            commodityItem
                                                                        }
                                                                    >
                                                                        {
                                                                            commodityItem
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="state"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            field.onChange(
                                                                value
                                                            );
                                                            setSelectedState(
                                                                value
                                                            ); // store the selected state
                                                            setStateSelected(
                                                                true
                                                            ); // set stateSelected to true when a value is selected
                                                            setMarkets([]);
                                                        }}
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select State" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {states.map(
                                                                (state) => (
                                                                    <SelectItem
                                                                        key={
                                                                            state
                                                                        }
                                                                        value={
                                                                            state
                                                                        }
                                                                    >
                                                                        {state}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="district"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            field.onChange(
                                                                value
                                                            );
                                                            setDistrictSelected(
                                                                true
                                                            );
                                                            setSelectedDistrict(
                                                                value
                                                            ); // store the selected district
                                                        }}
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        disabled={
                                                            !stateSelected
                                                        } // disable the Select if no state is selected
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select District" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {districts.map(
                                                                (district) => (
                                                                    <SelectItem
                                                                        key={
                                                                            district
                                                                        }
                                                                        value={
                                                                            district
                                                                        }
                                                                    >
                                                                        {
                                                                            district
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="market"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            field.onChange(
                                                                value
                                                            );
                                                        }}
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        disabled={
                                                            !districtSelected
                                                        } // disable the Select if no state is selected
                                                    >
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select Market" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {markets.map(
                                                                (market) => (
                                                                    <SelectItem
                                                                        key={
                                                                            market
                                                                        }
                                                                        value={
                                                                            market
                                                                        }
                                                                    >
                                                                        {market}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormItem>
                                            <DateRangePicker
                                                onUpdate={(values) => {
                                                    setDateRange({
                                                        from: values.range.from,
                                                        to: values.range.to,
                                                    });
                                                }}
                                                showCompare={false}
                                                initialDateTo={
                                                    new Date(2023, 11, 31)
                                                }
                                                initialDateFrom={
                                                    new Date(2001, 0, 1)
                                                }
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                    <div>
                                        <FormItem>
                                            <div>
                                                <Button type="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {isSubmitted ? (
                <div>
                    <div className="mt-12 flex gap-x-12">
                        <div className="flex-grow">
                            <div>
                                <Card className="p-4">
                                    <CardHeader>
                                        <div className="flex justify-between">
                                            <CardTitle className="text-2xl">
                                                {"Item Name"}
                                            </CardTitle>
                                            <Select
                                                onValueChange={
                                                    handleSelectChange
                                                }
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Modal Price" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ModalPrice">
                                                        Modal Price
                                                    </SelectItem>
                                                    <SelectItem value="Arrivals">
                                                        Arrivals
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-center items-center mt-4">
                                            <LineChart
                                                width={1200}
                                                height={250}
                                                data={graphData}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <XAxis
                                                    dataKey="ReportedDate"
                                                    tick={{ fontSize: 12 }}
                                                />
                                                <YAxis />
                                                <Tooltip
                                                    content={<CustomTooltip />}
                                                />
                                                <Legend />
                                                <Line
                                                    connectNulls
                                                    type="monotone"
                                                    dataKey={selectedDataKey}
                                                    stroke={colors.primary}
                                                />
                                            </LineChart>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div>
                            <Card className="p-4">
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col">
                                        <Label className="text-sm text-accent-foreground">
                                            Total Value
                                        </Label>
                                        <Label className="text-xl font-bold text-primary">
                                            Rs. 10,00,00,000
                                        </Label>
                                        <Separator className="my-3" />
                                        <Label className="text-sm text-accent-foreground">
                                            Total Quantity
                                        </Label>
                                        <Label className="text-xl font-bold text-primary">
                                            10,00,00,000 Kg
                                        </Label>
                                        <Separator className="my-3" />
                                        <Label className="text-sm text-accent-foreground">
                                            Avg. Price
                                        </Label>
                                        <Label className="text-xl font-bold text-primary">
                                            Rs. 2,000 / Kg
                                        </Label>
                                        <Separator className="my-3" />
                                        <Label className="text-sm text-accent-foreground">
                                            Max. Price
                                        </Label>
                                        <Label className="text-xl font-bold text-primary">
                                            Rs. 5,000 / Kg
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-12">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="text-2xl">Data</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TableDemo />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30vw",
                    }}
                >
                    <p>Please Select Item</p>
                </div>
            )}
        </div>
    );
}
