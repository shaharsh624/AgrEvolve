import Image from "next/image";
import Link from 'next/link'; //
import { Button } from "../ui/button";
import { About } from "./about";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between py-4 px-8 shadow shadow-md border-b">
            <Image
                className="m-0 p-0"
                src="/logo.png"
                alt="Logo"
                width={150}
                height={100}
            />
            <div className="flex items-center gap-4">
                <Link href="/"><Button variant="default">Home</Button></Link>
                <Link href="/commodities"><Button variant="outline">Commodities</Button></Link>
                <About />
                <Button variant="outline">Contact</Button>
                <ModeToggle />
            </div>
        </nav>
    );
}