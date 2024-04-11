"use client";

import React, { FC, useEffect, useState } from "react";
import {
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
    const [data, setData] = useState<any[]>([]);
    const [apiname, setApiname] = useState("");
    const [apidesc, setApidesc] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/user/apikeys",
                    {
                        headers: {
                            "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                        },
                    }
                );
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [isLoading]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            description: "API key Copied to clipboard",
        });
    };

    const handleSave = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `http://localhost:8080/api/user/createapikey?name=${apiname}&desc=${apidesc}`,
                {
                    headers: {
                        "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
                    },
                }
            );
            const apidata = await response.json();

            if (response.ok) {
                console.log("API key added successfully:", apidata);
            } else {
                console.error("Failed to add API key:", data);
            }
        } catch (error) {
            console.error("Error adding API key:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex max-h-screen w-full justify-center mt-10">
            <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="flex items-center">
                        <h1 className="font-semibold text-lg md:text-2xl">
                            API Keys
                        </h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="default"
                                    className="ml-auto"
                                    size="sm"
                                >
                                    Add api key
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Create API Key</DialogTitle>
                                    <DialogDescription>
                                        Enter Name and Description
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid items-center gap-4">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter name"
                                            onChange={(e) => {
                                                setApiname(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="grid items-center gap-4">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            placeholder="Enter description"
                                            onChange={(e) => {
                                                setApidesc(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={handleSave}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Saving..." : "Save"}
                                        </Button>
                                    </DialogClose>
                                    <div>
                                        <DialogClose asChild>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="border shadow-sm rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[150px]">
                                        Name
                                    </TableHead>
                                    <TableHead className="w-[250px]">
                                        Description
                                    </TableHead>
                                    <TableHead className="w-[100px]">
                                        Key
                                    </TableHead>
                                    <TableHead className="w-[100px] text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="line-clamp-2">
                                            {item.desc}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.apiKey}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                className="w-6 h-6"
                                                size="icon"
                                                variant="ghost"
                                                onClick={() =>
                                                    copyToClipboard(item.apiKey)
                                                }
                                            >
                                                <CopyIcon className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Copy
                                                </span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
};

// const ApiDialog: FC = () => {
//     const [apiname, setApiname] = useState("");
//     const [apidesc, setApidesc] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     const handleSave = async () => {
//         setIsLoading(true);

//         try {
//             const response = await fetch(
//                 `http://localhost:8080/api/user/createapikey?name=${apiname}&desc=${apidesc}`,
//                 {
//                     headers: {
//                         "api-key": process.env.NEXT_PUBLIC_API_KEY || "",
//                     },
//                 }
//             );
//             const data = await response.json();

//             if (response.ok) {
//                 console.log("API key added successfully:", data);
//             } else {
//                 console.error("Failed to add API key:", data);
//             }
//         } catch (error) {
//             console.error("Error adding API key:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <Button variant="default" className="ml-auto" size="sm">
//                     Add api key
//                 </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//                 <DialogHeader>
//                     <DialogTitle>Create API Key</DialogTitle>
//                     <DialogDescription>
//                         Enter Name and Description
//                     </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid items-center gap-4">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                             id="name"
//                             placeholder="Enter name"
//                             onChange={(e) => {
//                                 setApiname(e.target.value);
//                             }}
//                         />
//                     </div>
//                     <div className="grid items-center gap-4">
//                         <Label htmlFor="description">Description</Label>
//                         <Input
//                             id="description"
//                             placeholder="Enter description"
//                             onChange={(e) => {
//                                 setApidesc(e.target.value);
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <DialogFooter>
//                     <DialogClose asChild>
//                         <Button
//                             type="submit"
//                             onClick={handleSave}
//                             disabled={isLoading}
//                         >
//                             {isLoading ? "Saving..." : "Save"}
//                         </Button>
//                     </DialogClose>
//                     <div>
//                         <DialogClose asChild>
//                             <Button variant="outline">Cancel</Button>
//                         </DialogClose>
//                     </div>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// };

interface CopyIconProps {
    className: string;
}

const CopyIcon: FC<CopyIconProps> = (props) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    );
};

export default Profile;
