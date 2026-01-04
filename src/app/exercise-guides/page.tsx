import Image from 'next/image';
import { Dumbbell } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

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

const correctiveExercises = [
  {
    title: 'Corrective Exercises for Knock Knees (Genu Valgum)',
    description: "These non-surgical exercises focus on strengthening weak muscles and stretching tight ones to improve knee alignment and reduce pain associated with knock knees.",
    sections: [
      {
        title: 'Strengthen Hip Abductors',
        subtitle: 'Goal: Pull thighs outward to reduce medial knee stress.',
        exercises: [
          { name: 'Side-Lying Leg Raises', steps: ['Lie on your side, raise top leg 30-45°. Hold 2-3 sec, lower slowly.', '3 sets of 15 reps each leg, 5 times a week.'] },
          { name: 'Standing Hip Abduction (with Resistance Band)', steps: ['Place a band around your ankles and stand tall.', 'Move one leg outward against the band, hold for 2 seconds, and return.', '2-3 sets of 10-15 reps each side.'] },
          { name: 'Clamshells', steps: ['Lie on your side with knees bent and feet together.', 'Lift your top knee like opening a clamshell, keeping feet together. Add a resistance band around thighs for more challenge.', '3 sets of 15 reps.'] },
          { name: 'Lateral Band Walks', steps: ['Place a band around ankles or thighs.', 'Get into a slight squat and step sideways for 10-15 steps, then return.', '2 sets in each direction.'] },
        ]
      },
      {
        title: 'Strengthen Hip External Rotators',
        subtitle: 'Goal: Control thigh rotation to prevent inward knee collapse.',
        exercises: [
          { name: 'Seated External Rotation (with Resistance Band)', steps: ['Sit upright with a band around your ankles.', 'Keeping your knee stable, rotate one foot outward from the hip.', '3 sets of 10-12 reps each side.'] },
        ]
      },
      {
        title: 'Stretch Tight Adductors (Inner Thigh)',
        subtitle: 'Goal: Reduce the inward pull on the thighs.',
        exercises: [
          { name: 'Butterfly Stretch', steps: ['Sit with the soles of your feet together.', 'Gently press your knees toward the floor. Hold for 30 seconds.', 'Repeat 3 times, daily.'] },
          { name: 'Side Lunges', steps: ['Step out to one side, keeping the other leg straight, feeling a stretch in the inner thigh.', 'Perform 10 slow, controlled reps per leg.'] },
        ]
      },
      {
        title: 'Stretch Iliotibial (IT) Band',
        subtitle: 'Goal: Reduce lateral tension on the knee.',
        exercises: [
          { name: 'Standing ITB Stretch', steps: ['Cross one leg behind the other.', 'Lean your hip out to the side of the back leg until you feel a stretch.', 'Hold for 30 seconds, repeat 3 times per side.'] },
        ]
      }
    ]
  },
    {
    title: 'Corrective Exercises for Bowlegs (Genu Varum)',
    description: 'These exercises aim to strengthen muscles that help align the knee and stretch those that pull it outward.',
    sections: [
        {
            title: 'Strengthen Hip Adductors and Quadriceps',
            subtitle: 'Goal: Pull knees inward and stabilize the joint.',
            exercises: [
                { name: 'Ball Squeezes', steps: ['Sit or lie down with a soft ball between your knees.', 'Squeeze the ball for 5 seconds, then relax. Repeat 15 times.'] },
                { name: 'Inner Thigh Leg Lifts', steps: ['Lie on your side, top leg bent over the bottom straight leg.', 'Lift the bottom leg up. Repeat 15 times per side.'] },
            ]
        }
    ]
  },
  {
    title: 'Corrective Exercises for Patellar Maltracking',
    description: 'These exercises help stabilize the kneecap and ensure it glides smoothly.',
    sections: [
        {
            title: 'Strengthen Quadriceps (VMO)',
            subtitle: 'Goal: Strengthen the inner part of your quad to help guide the kneecap.',
            exercises: [
                { name: 'Straight Leg Raises', steps: ['Lie on your back, one knee bent. Keep the other leg straight.', 'Tighten your thigh muscle and lift the straight leg about a foot off the floor. Hold for 5 seconds.', 'Repeat 15 times per leg.'] },
            ]
        }
    ]
  }
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

      <Card className="p-4 md:p-6 shadow-lg mb-12">
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
      
      <Separator className="my-12 md:my-16" />

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
            Corrective Exercises for Common Knee Issues
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Targeted exercises to help with specific alignment issues like knock knees and bowlegs. Always consult a doctor or physiotherapist before starting a new exercise program.
        </p>
      </div>

      <Card className="p-4 md:p-6 shadow-lg">
        <Accordion type="single" collapsible className="w-full">
          {correctiveExercises.map((exercise, index) => (
              <AccordionItem value={`corrective-item-${index}`} key={exercise.title}>
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  {exercise.title}
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                  <p className="text-muted-foreground">{exercise.description}</p>
                  {exercise.sections.map(section => (
                    <div key={section.title} className="space-y-4">
                        <h4 className="font-bold font-headline text-lg">{section.title}</h4>
                        <p className="text-sm text-muted-foreground italic">{section.subtitle}</p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                            {section.exercises.map(ex => (
                                <li key={ex.name}>
                                    <span className="font-semibold">{ex.name}:</span>
                                    <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                                      {ex.steps.map((step, i) => <li key={i}>{step}</li>)}
                                    </ol>
                                </li>
                            ))}
                        </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </Card>
    </div>
  );
}
