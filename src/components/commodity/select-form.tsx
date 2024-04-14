"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DateRangePicker } from "./date-range-picker"
import React, { useEffect } from "react"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Example from "./graph"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { TableDemo } from "./table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const FormSchema = z.object({
    commodity: z
        .string({
        required_error: "Please select a Commodity",
    }),
    state: z
        .string({
        required_error: "Please select a State",
    }),
    district: z.string().optional(),
    market: z.string().optional(),
})

export function CommodityForm() {
    type DataType = {
        commodity: string;
        state: string;
        district: string | undefined;
        market: string | undefined;
    };

    let globalData: DataType | null = null;

    const toast = useToast();
    const [stateSelected, setStateSelected] = React.useState(false)
    const [districtSelected, setDistrictSelected] = React.useState(false)
    const [isSubmitted, setIsSubmitted] = React.useState(false)

    // Selected values
    const [selectedState, setSelectedState] = React.useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(null);

    // API Data arrays
    const [commodityItems, setCommodityItems] = React.useState<string[]>([]);
    const [states, setStates] = React.useState<string[]>([]);
    const [districts, setDistricts] = React.useState<string[]>([]);
    const [markets, setMarkets] = React.useState<string[]>([]);

    interface DateRange {
        from: Date | undefined;
        to: Date | undefined;
    }

    const [dateRange, setDateRange] = React.useState<DateRange>({ from: undefined, to: undefined });


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        globalData = {
            commodity: data.commodity,
            state: data.state,
            district: data.district,
            market: data.market,
        };
        console.log(data)
        console.log(dateRange)

        if((dateRange.from && dateRange.from > new Date(2024, 1, 1)) || (dateRange.from && dateRange.to > new Date(2024, 1, 1))) {
            toast.toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Data available only till Feb 1, 2024. Please select a date range within the specified limit.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
        } else {
            setIsSubmitted(true);
        }
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
              const response = await fetch(`http://localhost:5000/api/districts/${selectedState}`, {
                headers: {
                  "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                },
              });
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
              const response = await fetch(`http://localhost:5000/api/markets/${selectedState}/${selectedDistrict}`, {
                headers: {
                  "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                },
              });
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

    const [selectedDataKey, setSelectedDataKey] = React.useState('pv');

    const colors = {
        primary: '#16A34A',
        secondary: '#888888',

        // Add more colors as needed
    };

    const CustomTooltip = () => {
        return (
            <div className="bg-background border p-4 flex gap-x-6">
                <div className='flex flex-col'>
                    <Label className="text-sm">Quantity</Label>
                    <Label className="text-lg font-bold">{"10,000"} Kg</Label>
                </div>
                <div className='flex flex-col'>
                    <Label className="text-sm">Price</Label>
                    <Label className="text-lg font-bold">Rs. {"1,200"}</Label>
                </div>
            </div>
        );
    }

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
                        <CardDescription>Select a commodity to view details</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                        <div className="flex justify-between">
                        <div>
                            <FormField
                            control={form.control}
                            name="commodity"
                            render={({ field }) => (
                                <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Commodity" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {commodityItems.map(commodityItem => (
                                        <SelectItem key={commodityItem} value={commodityItem}>
                                            {commodityItem}
                                        </SelectItem>
                                        ))}
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
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setSelectedState(value); // store the selected state
                                        setStateSelected(true); // set stateSelected to true when a value is selected
                                    }} 
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select State" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {states.map(state => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                        ))}
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
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setDistrictSelected(true);
                                                setSelectedDistrict(value); // store the selected district
                                            }}
                                            defaultValue={field.value}
                                            disabled={!stateSelected} // disable the Select if no state is selected
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {districts.map(district => (
                                                <SelectItem key={district} value={district}>
                                                    {district}
                                                </SelectItem>
                                                ))}
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
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                            disabled={!districtSelected} // disable the Select if no state is selected
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select Market" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {markets.map(market => (
                                                    <SelectItem key={market} value={market}>
                                                        {market}
                                                    </SelectItem>
                                                    ))}
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
                                        setDateRange({ from: values.range.from, to: values.range.to });
                                    }}
                                    showCompare={false}
                                    initialDateTo={new Date(2024, 1, 1)}
                                    initialDateFrom={new Date(2024, 0, 1)}
                                />
                                <FormMessage />
                            </FormItem>
                        </div>
                        <div>
                            <FormItem>
                                <div>
                                    <Button type="submit">Submit</Button>
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
                                    <div className='flex justify-between'>
                                    <CardTitle className="text-2xl">{"Item Name"}</CardTitle>
                                    <Select onValueChange={handleSelectChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="pv" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pv">pv</SelectItem>
                                        <SelectItem value="uv">uv</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-center items-center mt-4">
                                    <LineChart width={800} height={250} data={data}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis dataKey="name" hide/>
                                    <YAxis />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line connectNulls type="monotone" dataKey={selectedDataKey} stroke={colors.primary} />
                                    </LineChart>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div>
                        <Card className="p-4">
                        <CardHeader>
                            <CardTitle className="text-2xl">Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                            <Label className="text-sm text-accent-foreground">Total Value</Label>
                            <Label className="text-xl font-bold text-primary">Rs. 10,00,00,000</Label>
                            <Separator className="my-3"/>
                            <Label className="text-sm text-accent-foreground">Total Quantity</Label>
                            <Label className="text-xl font-bold text-primary">10,00,00,000 Kg</Label>
                            <Separator className="my-3"/>
                            <Label className="text-sm text-accent-foreground">Avg. Price</Label>
                            <Label className="text-xl font-bold text-primary">Rs. 2,000 / Kg</Label>
                            <Separator className="my-3"/>
                            <Label className="text-sm text-accent-foreground">Max. Price</Label>
                            <Label className="text-xl font-bold text-primary">Rs. 5,000 / Kg</Label>
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vw' }}>
                    <p>Please Select Item</p>
                </div>
            )}
        </div>
    )
}
