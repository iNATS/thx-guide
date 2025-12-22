
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventsView } from './events-view';
import { CalendarDays } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-primary" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EventsView />
        </CardContent>
      </Card>
    </div>
  );
}
