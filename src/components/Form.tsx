"use client"

// Modules for Form Handling and Validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import * as React from "react"

// Modules for UI Components from ShadCN
import { Icons } from "@/components/icons"
import { Label } from "@/components/ui/label";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner"
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
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"

// Define a schema for form validation.
const formSchema = z.object({
    firstname: z.string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .refine(value => /^[a-zA-Z0-9]+$/.test(value), {
            message: "Username must not contain special characters.",
        }),
    lastname: z.string()
        .min(2, {
            message: "Lastname must be at least 2 characters.",
        })
        .refine(value => /^[a-zA-Z0-9]+$/.test(value), {
            message: "Lastname must not contain special characters.",
        }),
    email: z.string().email("Please enter a valid email address"),
    code: z.coerce.number().int().gt(0, {
        message: "Please select a Country Code",
    }),
    number: z.string()
        .length(10, {
            message: "Phone number must be 10 digits.",
        })
        .regex(/^\d+$/, "Phone number must be numeric"),
    msg: z.string().min(1,{
        message: "Please enter your query",
    }),
    checkbox: z.boolean().refine(value => value === true, {
        message: "Please agree to the terms and conditions.",
    }),
})

// Define the props for the form.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Define the ContactForm component.
export function ContactForm({ className, ...props }: CardProps) {

    //Define a state for loading.
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    //Define a submit handler.
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        setIsLoading(true)

        //Fetch the SheetsDB API and submit the form data.
        fetch('https://sheetdb.io/api/v1/tx10gd0prktp3', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'First Name': values.firstname,
                        'Last Name': values.lastname,
                        'Email': values.email,
                        'Country Code': values.code,
                        'Phone Number': values.number,
                        'Message': values.msg,
                    }
                ]
            })
        })
        .then((response) => response.json())
        .then( () => toast("Message Submitted", { //Show a toast message on successful submission.
                description: "Sit tight, we will get back to you soon.",
                action: {
                  label: "Done",
                  onClick: () => {
                    window.location.reload();
                  }
                },
              })
        );
        
        //Simulate a loading state for 3 seconds.
        setTimeout(() => {
            setIsLoading(false);
        }, 3000)
    }
    
    //Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        firstname: "",
        lastname: "",
        email: "",
        code: 0,
        number: "",
        msg: "",
        checkbox: false,
        },
    })
    

    //Render the form inside a Card component.
    return (
        <Card className={cn("sm:w-[80vw] md:w-[70vw] lg:w-[60vw]", className)} {...props}>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                        <div className="w-full flex flex-col">
                            <FormField
                            control={form.control}
                            name="firstname"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>First Name <sup>*</sup></FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter First Name"
                                        className="w-full my-2"
                                        disabled={isLoading} 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Last Name <sup>*</sup></FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter Last Name" 
                                            className="w-full my-2"
                                            disabled={isLoading} 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email ID <sup>*</sup></FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter Email ID"
                                            type="email"
                                            className="w-full my-2"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row w-full justify-between gap-x-2">
                            <div className="w-full sm:w-[185px]">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Phone No. <sup>*</sup></FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value.toString()} disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Code"/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="33">{"France (+33)"}</SelectItem>
                                                    <SelectItem value="91">{"India (+91)"}</SelectItem>
                                                    <SelectItem value="7">{"Russia (+7)"}</SelectItem>
                                                    <SelectItem value="1">{"USA (+1)"}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel className="invisible">.</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter Phone Number"
                                                type="tel"
                                                className="w-full my-2"
                                                autoCapitalize="none"
                                                autoComplete="tel"
                                                autoCorrect="off"
                                                disabled={isLoading}
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="w-full flex flex-col">
                            <FormField
                                control={form.control}
                                name="msg"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Your Message <sup>*</sup></FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter Your Message"
                                            className="w-full my-2"
                                            disabled={isLoading}
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full">
                        <FormField
                            control={form.control}
                            name="checkbox"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-start mb-4 sm:mb-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <Label htmlFor="terms" className="text-sm font-light mx-2 whitespace-nowrap">
                                            I agree to the <span className="text-primary">terms and conditions</span>.
                                        </Label>
                                    </div>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <Button type="submit" disabled={isLoading} className="px-8 py-4 w-full sm:w-auto">
                            {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Submit
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    )
}
