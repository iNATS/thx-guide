
'use client';

import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { generateItineraryAction } from '@/lib/actions';
import { ItineraryForm } from '@/components/itinerary/itinerary-form';
import { ItineraryResult } from '@/components/itinerary/itinerary-result';
import type { ItineraryState } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const initialState: ItineraryState = {
  itinerary: null,
  error: null,
  fieldErrors: {},
};

export function ItineraryPlanner() {
  const [state, formAction] = useFormState(generateItineraryAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error && !state.fieldErrors) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state.error, state.fieldErrors, toast]);

  return (
    <div className="space-y-8">
      <form action={formAction}>
        <ItineraryForm fieldErrors={state.fieldErrors} />
      </form>
      <ItineraryResult state={state} />
    </div>
  );
}
