
'use client';

import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { ItineraryState } from '@/lib/types';
import { WandSparkles } from 'lucide-react';

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function ItineraryResult({ state }: { state: ItineraryState }) {
  const { pending } = useFormStatus();

  if (pending) {
    return (
        <Card className="mt-8 bg-card/50">
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <WandSparkles className="w-5 h-5 text-primary" />
                    Crafting Your Adventure...
                </CardTitle>
            </CardHeader>
            <CardContent>
                <LoadingSkeleton />
            </CardContent>
        </Card>
    );
  }

  if (state.itinerary) {
    return (
      <Card className="mt-8 animate-fade-in-up border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary flex items-center gap-2">
            <WandSparkles className="w-5 h-5" />
            Your Personalized Itinerary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground">
            {state.itinerary.split('\n').map((line, index) => {
              if (line.trim().startsWith('**Day')) {
                return <h3 key={index} className="font-headline font-bold mt-4">{line.replace(/\*\*/g, '')}</h3>;
              }
              if (line.trim().startsWith('*')) {
                 return <p key={index} className="ml-4">{line}</p>;
              }
              return <p key={index}>{line}</p>;
            })}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!state.itinerary && !state.error) {
     return (
        <div className="text-center text-muted-foreground mt-8 py-8 border-2 border-dashed rounded-lg">
            <p>Your adventure awaits!</p>
            <p>Fill out the form above to get started.</p>
        </div>
     );
  }

  return null;
}
