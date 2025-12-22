
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const MapPinnedIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"/>
        <circle cx="12" cy="8" r="2"/>
        <path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"/>
    </svg>
)

const HeadsetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
        <path d="M21 16v2a4 4 0 0 1-4 4h-5"/>
    </svg>
)

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/scan', label: 'Scan', icon: QrCode },
  { href: '/map', label: 'Map', icon: MapPinnedIcon },
  { href: '/contact', label: 'Contact', icon: HeadsetIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm h-20 bg-background/80 backdrop-blur-xl border border-border/50 z-50 rounded-2xl shadow-lg md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
               <div className={cn(
                  'p-3 transition-colors',
                  isActive ? 'bg-primary/10 rounded-lg' : 'bg-transparent'
               )}>
                <Icon className="w-6 h-6" />
               </div>
              <span className={cn(
                  "text-xs mt-1",
                  isActive ? 'font-bold' : 'font-medium'
              )}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
