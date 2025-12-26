
import type { Metadata, Viewport } from 'next';
import { manifest } from 'next/dist/lib/metadata/manifest';
import './globals.css';
import { cn } from '@/lib/utils';
import BottomNav from '@/app/bottom-nav';
import { Toaster } from '@/components/ui/toaster';
import { PwaRegistration } from '@/components/pwa-registration';

export const metadata: Metadata = {
  title: 'Timimoun Oasis Guide',
  description: 'Your personal AI guide to the Red Oasis of Timimoun, Algeria.',
  manifest: '/manifest.ts'
};

export const viewport: Viewport = {
  themeColor: '#F9F8F5',
  viewportFit: 'cover',
}

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
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossOrigin=""></script>
      </head>
      <body
        className={cn(
          'font-body antialiased min-h-screen bg-background',
          'flex flex-col'
        )}
      >
        <main className="flex-grow">{children}</main>
        <BottomNav />
        <Toaster />
        <PwaRegistration />
      </body>
    </html>
  );
}
