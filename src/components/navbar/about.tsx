import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function About() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-accent-foreground">
                    About
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">
                        About Us
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <div style={{ whiteSpace: "pre-line" }}>
                            {`AgrEvolve is a platform that provides real-time as well historic information on agricultural commodities and their prices. We aim to help farmers and traders make informed decisions and improve their livelihoods.\n\nWe are a team of passionate individuals who believe in the power of technology to transform the agricultural sector. We are committed to providing accurate and reliable information to our users.\n\nWe are constantly working to improve our platform and add new features to make it more useful for our users. We welcome feedback and suggestions from our users to help us improve our platform.\n\nThank you for using AgrEvolve!`}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
