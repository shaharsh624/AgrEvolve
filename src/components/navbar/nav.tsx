import Image from "next/image";
import Link from "next/link"; //
import { Button } from "../ui/button";
import { About } from "./about";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import logo from "../../../public/logo.png";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4 px-8 shadow shadow-md border-b">
            <Link href="/">
                <Image
                    className="m-0 p-0"
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={100}
                    priority={true}
                />
            </Link>
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="default">Home</Button>
                </Link>
                <Link href="/commodities">
                    <Button variant="outline">Commodities</Button>
                </Link>
                <About />
                <Link href="/contact">
                    <Button variant="outline">Contact</Button>
                </Link>
                <Link href="/profile">
                    <Button variant="outline">API Keys</Button>
                </Link>
                <ModeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </nav>
    );
}
