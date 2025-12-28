
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

const QrCodeSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25" className="w-64 h-64">
        <path d="M4 4h7v7H4zM5 5v5h5V5zm8 0h7v7h-7zM14 5v5h5V5zM4 14h7v7H4zm1 1v5h5v-5z" fill="hsl(var(--foreground))" />
        <path d="M14.5 14.25h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M14.5 14.25h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M16 14h1v1h-1z" fill="hsl(var(--foreground))" />
        <path d="M17.5 14.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M19 14h1v1h-1z" fill="hsl(var(--foreground))" />
        <path d="M20.5 14.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M14.5 16h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M16 16.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M17.5 16h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M19 16.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M20.5 16h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M14 17.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M15.5 17.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M17 17.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M18.5 17.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M20 17.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M14.5 19h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M16 19h1v1h-1z" fill="hsl(var(--foreground))" />
        <path d="M17.5 19.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M19 19h1v1h-1z" fill="hsl(var(--foreground))" />
        <path d="M20.5 19.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M14.5 20.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M16 20.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M17.5 20.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
        <path d="M19 20.5h1v.75h-1z" fill="hsl(var(--foreground))" />
        <path d="M20.5 20.5h.75v.75h-.75z" fill="hsl(var(--foreground))" />
    </svg>
);

export default function QrTestPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <QrCode className="w-6 h-6 text-primary"/>
                    Test QR Code
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <p className="text-muted-foreground text-center">
                    This QR code is for testing purposes. It contains the text "Grand Ksar". You can save this page as an image or scan it from another device.
                </p>
                <div className="p-4 bg-white rounded-lg">
                    <QrCodeSvg />
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
