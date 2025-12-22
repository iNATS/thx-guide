
'use server';

import { z } from 'zod';
import { suggestItinerary } from '@/ai/flows/suggest-itinerary';
import type { ItineraryState } from '@/lib/types';

const ItinerarySchema = z.object({
  interests: z.string().min(10, { message: 'Please describe your interests in a bit more detail.' }),
  duration: z.coerce.number().min(1, { message: 'Duration must be at least 1 day.' }).max(14, { message: 'Duration cannot exceed 14 days.' }),
});

export async function generateItineraryAction(
  prevState: ItineraryState,
  formData: FormData
): Promise<ItineraryState> {
  const validatedFields = ItinerarySchema.safeParse({
    interests: formData.get('interests'),
    duration: formData.get('duration'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      itinerary: null,
      error: 'Invalid input. Please check the form fields.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await suggestItinerary(validatedFields.data);
    return {
      ...prevState,
      itinerary: result.itinerary,
      error: null,
      fieldErrors: {},
    };
  } catch (error) {
    console.error(error);
    return {
      ...prevState,
      itinerary: null,
      error: 'An unexpected error occurred. Please try again later.',
      fieldErrors: {},
    };
  }
}
