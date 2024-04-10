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
import React from "react"
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

        if((dateRange.from && dateRange.from > new Date(2024, 1, 1)) || (dateRange.to && dateRange.to > new Date(2024, 1, 1))) {
            toast.toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Data available only till Feb 1, 2024. Please select a date range within the specified limit.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
        }
    }

    return (
        <div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Item Select</CardTitle>
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
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                            }}
                                            defaultValue={field.value}
                                            disabled={!stateSelected} // disable the Select if no state is selected
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                                <SelectItem value="apple">Apple</SelectItem>
                                                <SelectItem value="banana">Banana</SelectItem>
                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                <SelectItem value="pineapple">Pineapple</SelectItem>
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

            <div className="mt-12 flex gap-x-12">
                <div className="flex-grow">
                    <Example />
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
    )
}
