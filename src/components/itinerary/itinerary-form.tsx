
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/components/itinerary/submit-button';
import type { ItineraryState } from '@/lib/types';

type ItineraryFormProps = {
  fieldErrors?: ItineraryState['fieldErrors'];
};

export function ItineraryForm({ fieldErrors }: ItineraryFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="interests" className="text-base">
          What are your interests?
        </Label>
        <p className="text-sm text-muted-foreground">
          e.g., "historical sites, natural wonders, cultural experiences, local food"
        </p>
        <Textarea
          id="interests"
          name="interests"
          placeholder="Tell us what you'd love to see and do..."
          rows={4}
          required
          aria-describedby="interests-error"
        />
        {fieldErrors?.interests && (
          <p id="interests-error" className="text-sm text-destructive">
            {fieldErrors.interests.join(', ')}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-base">
          How many days is your trip?
        </Label>
        <Input
          id="duration"
          name="duration"
          type="number"
          placeholder="e.g., 3"
          min="1"
          max="14"
          required
          className="max-w-xs"
          aria-describedby="duration-error"
        />
        {fieldErrors?.duration && (
          <p id="duration-error" className="text-sm text-destructive">
            {fieldErrors.duration.join(', ')}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </div>
  );
}
