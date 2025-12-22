
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

const HotelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10 22v-6.57"/>
        <path d="M12 11h.01"/>
        <path d="M12 7h.01"/>
        <path d="M14 15.43V22"/>
        <path d="M15 16a5 5 0 0 0-6 0"/>
        <path d="M16 11h.01"/>
        <path d="M16 7h.01"/>
        <path d="M8 11h.01"/>
        <path d="M8 7h.01"/>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
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
  { href: '/map', label: 'Explore', icon: HotelIcon },
  { href: '/contact', label: 'Guide', icon: HeadsetIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50 md:hidden">
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
