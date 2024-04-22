import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const invoices = [
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

export function TableDemo() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/commodity",
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
    }, []);
    return (
        <Table>
            <TableHeader className="bg-accent text-accent-foreground">
                <TableRow>
                    <TableHead className="w-[300px]">Date</TableHead>
                    <TableHead className="w-[200px]">
                        Arrivale (Tonnes)
                    </TableHead>
                    <TableHead className="w-[200px]">
                        Price (Rs./Quintal)
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.ReportedDate}>
                        <TableCell>{invoice.ReportedDate}</TableCell>
                        <TableCell>{invoice.Arrivals}</TableCell>
                        <TableCell>{invoice.ModalPrice}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={1}>Total</TableCell>
                    <TableCell>1.352</TableCell>
                    <TableCell>2,500</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
