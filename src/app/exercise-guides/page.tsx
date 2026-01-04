import Image from 'next/image';
import { Dumbbell } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const exercises = [
  {
    title: 'Seated Knee Flexion & Extension',
    description: 'A gentle movement to improve range of motion.',
    steps: [
      'Sit upright on a chair with your feet flat on the floor.',
      'Slowly straighten one leg until it is parallel to the floor. Hold for 5 seconds.',
      'Gently lower the leg back down.',
      'Now, bend the knee and pull your foot back under the chair as far as is comfortable. Hold for 5 seconds.',
      'Repeat 10 times for each leg.',
    ],
    imageId: 'exercise-knee-flexion',
  },
  {
    title: 'Seated Leg Lifts',
    description: 'Helps to strengthen the quadriceps muscles which support the knee.',
    steps: [
      'Sit on a sturdy chair, with your back straight.',
      'Straighten and raise one leg as high as you can without discomfort.',
      'Hold the position for 10 seconds, then slowly lower your leg.',
      'Do 10-15 repetitions for each leg.',
    ],
    imageId: 'exercise-leg-lifts',
  },
  {
    title: 'Gentle Wall Squat',
    description: 'A safe way to build strength without putting too much pressure on the knees.',
    steps: [
      'Stand with your back against a wall, feet shoulder-width apart.',
      'Slowly slide down the wall until your knees are slightly bent (like sitting in a chair). Do not go too deep.',
      'Hold the position for 5-10 seconds.',
      'Slowly slide back up the wall.',
      'Repeat 5-10 times.',
    ],
    imageId: 'exercise-wall-squat',
  },
];

export default function ExerciseGuidesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Gentle Exercise Guides
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Strengthen your knees and improve flexibility with these low-impact exercises designed for home.
        </p>
      </div>

      <Card className="p-4 md:p-6 shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {exercises.map((exercise, index) => {
            const image = PlaceHolderImages.find(img => img.id === exercise.imageId);
            return (
              <AccordionItem value={`item-${index}`} key={exercise.title}>
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  {exercise.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{exercise.description}</p>
                      <ol className="list-decimal list-inside space-y-2">
                        {exercise.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    {image && (
                      <div className="flex items-center justify-center">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={400}
                          height={267}
                          className="rounded-lg object-cover"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </div>
  );
}
