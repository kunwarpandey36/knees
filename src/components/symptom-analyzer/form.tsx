'use client';

import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? 'Analyzing...' : 'Get My Analysis'}
    </Button>
  );
}

type SymptomAnalyzerFormProps = {
  formAction: (payload: FormData) => void;
  initialState?: any
};

export function SymptomAnalyzerForm({ formAction }: SymptomAnalyzerFormProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Tell Us About Your Symptoms</CardTitle>
        <CardDescription>
          This information will be processed by our AI to provide you with personalized insights. It is not a substitute for professional medical advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="symptoms" className="text-lg font-semibold font-headline">Describe your symptoms</Label>
            <p className="text-sm text-muted-foreground">
              Please be as detailed as possible. Mention the location of the pain, its intensity (mild, moderate, severe), duration, and what makes it better or worse.
            </p>
            <Textarea
              id="symptoms"
              name="symptoms"
              placeholder="e.g., I have a sharp pain in my right knee for the last 2 weeks. It hurts more when I climb stairs..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold font-headline">Dietary Habits</Label>
            <RadioGroup name="dietaryHabits" defaultValue="vegetarian" className="flex gap-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vegetarian" id="r-veg" />
                <Label htmlFor="r-veg">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-vegetarian" id="r-nonveg" />
                <Label htmlFor="r-nonveg">Non-Vegetarian</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lifestyle" className="text-lg font-semibold font-headline">Describe your lifestyle</Label>
            <p className="text-sm text-muted-foreground">
              Include details about your daily activity level (e.g., mostly sedentary, moderately active), occupation, and any other health conditions you may have.
            </p>
            <Textarea
              id="lifestyle"
              name="lifestyleDetails"
              placeholder="e.g., I am a homemaker and spend most of my day on my feet. I am also diabetic..."
              className="min-h-[120px]"
              required
            />
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
