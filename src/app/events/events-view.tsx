
'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';

const mockEvents = [
  {
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    title: 'Berber Music Festival',
    description: 'Experience traditional Berber music under the stars.',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    title: 'Local Market Day',
    description: 'Explore the vibrant weekly market for local crafts and produce.',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    title: 'Guided Ksar Tour',
    description: 'A historical tour of the ancient Ksar ruins.',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    title: 'Saharan Gastronomy Workshop',
    description: 'Learn to cook traditional desert dishes with local chefs.',
  },
];

export function EventsView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayEvents = date
    ? mockEvents.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex justify-center w-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow-sm w-full"
        />
      </div>
      <div className="space-y-4">
        <h3 className="font-headline text-xl font-semibold">
          Events for {date ? format(date, 'PPP') : '...'}
        </h3>
        {selectedDayEvents.length > 0 ? (
          <ul className="space-y-4">
            {selectedDayEvents.map((event, index) => (
              <li key={index}>
                <Card className="bg-card/80 hover:bg-card transition-colors shadow-sm">
                  <div className="p-4">
                    <CardTitle className="text-base font-bold">{event.title}</CardTitle>
                    <CardDescription className="text-sm mt-1 text-muted-foreground">{event.description}</CardDescription>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground py-12 border-2 border-dashed rounded-lg">
            <p>No events scheduled for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
}
