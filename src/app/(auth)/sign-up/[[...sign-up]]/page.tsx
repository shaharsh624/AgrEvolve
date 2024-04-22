import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return (
        <div className="signin-container flex flex-col items-center justify-center h-screen">
            <div className="logo-container mb-8">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={250} // Adjust width as needed
                    height={250} // Adjust height as needed
                    layout="fixed" // Maintain aspect ratio
                    className="rounded-sm shadow-md" // Add styling
                />
            </div>
            <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
            <SignUp className="w-full max-w-sm bg-white shadow-md rounded-md py-6" />
        </div>
    );
}
