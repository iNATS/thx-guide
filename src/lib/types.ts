
export type ItineraryState = {
  itinerary: string | null;
  error: string | null;
  fieldErrors?: {
    interests?: string[];
    duration?: string[];
  };
};
