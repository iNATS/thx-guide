'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting a personalized itinerary of points of interest in Timimoun based on user interests.
 *
 * @exports suggestItinerary - The main function to generate itinerary suggestions.
 * @exports SuggestItineraryInput - The input type for the suggestItinerary function.
 * @exports SuggestItineraryOutput - The output type for the suggestItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestItineraryInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'A comma-separated list of the user\s interests, such as historical sites, natural wonders, and cultural experiences.'
    ),
  duration: z
    .number()
    .describe('The number of days for which to suggest an itinerary.'),
});
export type SuggestItineraryInput = z.infer<typeof SuggestItineraryInputSchema>;

const SuggestItineraryOutputSchema = z.object({
  itinerary: z.string().describe('A detailed itinerary of points of interest in Timimoun, tailored to the user\s interests, including estimated visit times and brief descriptions.'),
});
export type SuggestItineraryOutput = z.infer<typeof SuggestItineraryOutputSchema>;

export async function suggestItinerary(input: SuggestItineraryInput): Promise<SuggestItineraryOutput> {
  return suggestItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItineraryPrompt',
  input: {schema: SuggestItineraryInputSchema},
  output: {schema: SuggestItineraryOutputSchema},
  prompt: `You are an expert travel guide for Timimoun, Algeria. A user is planning a trip and wants a personalized itinerary based on their interests and the duration of their stay.

  Interests: {{{interests}}}
  Duration (days): {{{duration}}}

  Suggest a daily itinerary that includes specific points of interest, estimated visit times, and a short description of each location. The itinerary should maximize the user's experience based on their interests.
  Return the itinerary as a single, well-formatted string.
`,
});

const suggestItineraryFlow = ai.defineFlow(
  {
    name: 'suggestItineraryFlow',
    inputSchema: SuggestItineraryInputSchema,
    outputSchema: SuggestItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
