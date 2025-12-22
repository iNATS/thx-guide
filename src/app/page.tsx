import { ItineraryPlanner } from '@/components/itinerary/itinerary-planner';
import { Logo } from '@/components/logo';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
      <div className="flex flex-col items-center text-center mb-8 animate-fade-in-down">
        <Logo className="w-20 h-20 md:w-24 md:h-24 mb-4 text-primary" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Timimoun Oasis Guide
        </h1>
        <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-2xl">
          Your personal AI guide to the Red Oasis. Let's craft your
          unforgettable journey in Timimoun.
        </p>
      </div>
      <Card className="w-full max-w-4xl mx-auto shadow-lg animate-fade-in-up">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-foreground">
            Smart Itinerary Planner
          </CardTitle>
          <CardDescription>
            Tell us your interests and trip duration, and we'll create a
            personalized plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItineraryPlanner />
        </CardContent>
      </Card>
    </div>
  );
}
