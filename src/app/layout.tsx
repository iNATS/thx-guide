import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import BottomNav from '@/app/bottom-nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Timimoun Oasis Guide',
  description: 'Your personal AI guide to the Red Oasis of Timimoun, Algeria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'font-body antialiased min-h-screen bg-background',
          'flex flex-col scrollbar-hide'
        )}
      >
        <main className="flex-grow">{children}</main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
