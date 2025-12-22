
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CalendarDays, Compass, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ItineraryPlanner } from '@/components/itinerary/itinerary-planner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { WandSparkles } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/map', label: 'Map', icon: Compass },
  { href: '/contact', label: 'Contact', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm h-20 bg-background/80 backdrop-blur-xl border border-border/50 z-50 rounded-2xl shadow-lg md:hidden">
      <div className="flex justify-around items-center h-full">
        {navItems.slice(0, 2).map(({ href, label, icon: Icon }) => {
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
                  'p-3 rounded-full transition-colors',
                  isActive ? 'bg-primary/10' : 'bg-transparent'
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

        <Sheet>
            <SheetTrigger asChild>
                <div className='-mt-16'>
                    <Button size="icon" className='w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/30'>
                        <WandSparkles className="w-7 h-7" />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
                <SheetHeader>
                    <SheetTitle className="font-headline text-2xl text-center pt-4">AI Itinerary Planner</SheetTitle>
                </SheetHeader>
                <div className="p-4 overflow-y-auto pb-24 scrollbar-hide">
                    <ItineraryPlanner />
                </div>
            </SheetContent>
        </Sheet>
        
        {navItems.slice(2, 4).map(({ href, label, icon: Icon }) => {
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
                  'p-3 rounded-full transition-colors',
                  isActive ? 'bg-primary/10' : 'bg-transparent'
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
