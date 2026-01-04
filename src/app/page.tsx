import Image from 'next/image';
import {
  HeartPulse,
  Apple,
  Dumbbell,
  Sparkles,
  Stethoscope,
  Users,
  MessageSquare,
  Weight,
  Bone,
  Leaf,
  Fish,
  Star,
  Wand2,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { SymptomAnalyzerClient } from '@/components/symptom-analyzer/symptom-analyzer-client';
import { getAnalysis } from '@/app/symptom-analyzer/actions';
import { homeRemedyEffectivenessSummary } from '@/ai/flows/home-remedy-effectiveness-summary';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

// Data from exercise-guides/page.tsx
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

// Data from dietary-recommendations/page.tsx
const vegFoods = [
  { name: 'Turmeric (Haldi)', benefit: 'Contains curcumin, a powerful anti-inflammatory compound.', imageId: 'diet-turmeric' },
  { name: 'Leafy Greens (Saag)', benefit: 'Rich in calcium, magnesium, and antioxidants to support bone health.', imageId: 'diet-leafy-greens' },
  { name: 'Lentils & Legumes (Dal)', benefit: 'Excellent source of plant-based protein for muscle support.', imageId: 'diet-lentils' },
];

const nonVegFoods = [
  { name: 'Fatty Fish (Salmon, Mackerel)', benefit: 'High in Omega-3 fatty acids, which reduce inflammation.', imageId: 'diet-fish' },
  { name: 'Bone Broth (Paya Soup)', benefit: 'Provides collagen and gelatin, which are beneficial for joints.', imageId: 'diet-chicken-soup' },
  { name: 'Eggs', benefit: 'A good source of Vitamin D and protein for bone and muscle strength.', imageId: 'diet-eggs' },
];

function FoodCard({ name, benefit, imageId }: { name: string; benefit: string; imageId: string }) {
  const image = PlaceHolderImages.find(img => img.id === imageId);
  return (
    <Card className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {image && (
        <Image
          src={image.imageUrl}
          alt={image.description}
          width={300}
          height={200}
          className="w-full h-40 object-cover"
          data-ai-hint={image.imageHint}
        />
      )}
      <CardHeader>
        <CardTitle className="font-headline">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{benefit}</p>
      </CardContent>
    </Card>
  );
}

// Data from home-remedies/page.tsx
const remedies = [
  {
    name: 'Ginger & Turmeric Tea',
    description: 'A warm, soothing tea combining the anti-inflammatory properties of ginger and turmeric.',
    rating: 4,
    imageId: 'remedy-ginger-tea',
  },
  {
    name: 'Warm Oil Massage',
    description: 'Massaging the knee with warm sesame or mustard oil can improve circulation and reduce stiffness.',
    rating: 5,
    imageId: 'remedy-oil-massage',
  },
  {
    name: 'Hot & Cold Compress',
    description: 'Alternating between hot and cold packs can help manage both pain and inflammation.',
    rating: 4,
    imageId: 'remedy-hot-compress',
  },
];

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'
          }`}
        />
      ))}
    </div>
  );
}

async function AiSummary() {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    return (
      <Card className="bg-primary/10 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-primary">
            <Wand2 />
            AI-Powered Community Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">AI summary is unavailable. Please configure your API key.</p>
        </CardContent>
      </Card>
    );
  }
  
  try {
    const summary = await homeRemedyEffectivenessSummary({
      remedyName: "Ginger & Turmeric Tea",
      userReviews: [
        "This tea really helps in the mornings with my stiff knees.",
        "I didn't feel much difference, maybe I need to drink it for longer.",
        "A comforting drink, especially in winter. My pain feels a bit less.",
        "The taste is strong, but it's worth it for the relief it provides.",
      ],
      userRatings: [5, 2, 4, 4],
    });

    return (
      <Card className="bg-primary/10 border-primary shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-primary">
            <Wand2 />
            AI-Powered Community Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">"{summary.summary}"</p>
        </CardContent>
      </Card>
    );
  } catch (e: any) {
    return (
      <Card className="bg-destructive/10 border-destructive shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-destructive">
            <Wand2 />
            AI-Powered Community Summary Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">{e.message || 'An error occurred while generating the summary.'}</p>
        </CardContent>
      </Card>
    )
  }
}

// Data from find-a-doctor/page.tsx
const doctors = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Orthopedic Surgeon',
    address: '123, Wellness Clinic, Juhu, Mumbai',
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Rheumatologist',
    address: '456, HealthFirst Hospital, Andheri, Mumbai',
  },
  {
    name: 'Dr. Priya Mehta',
    specialty: 'Physiotherapist',
    address: '789, Active Life Physio, Bandra, Mumbai',
  },
];

// Data from community-forum/page.tsx
const threads = [
  {
    topic: 'Best oils for knee massage?',
    author: 'Sunita J.',
    tag: 'Remedies',
    replies: 5,
    lastPost: '2 hours ago',
  },
  {
    topic: 'Struggling with morning stiffness. Any tips?',
    author: 'Priya M.',
    tag: 'Lifestyle',
    replies: 12,
    lastPost: '8 hours ago',
  },
  {
    topic: 'My experience with wall squats',
    author: 'Aarti V.',
    tag: 'Exercises',
    replies: 8,
    lastPost: '1 day ago',
  },
  {
    topic: 'Good vegetarian sources for calcium?',
    author: 'Kavita R.',
    tag: 'Diet',
    replies: 15,
    lastPost: '2 days ago',
  },
];


export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-card py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex justify-center items-center gap-4">
                <Weight className="h-16 w-16 text-primary" />
                <Bone className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              The One and Only Solution for Knee Pain
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
              Stop looking for temporary fixes. The real path to healthy knees is through two fundamental pillars: achieving a healthy weight and building strong joints. This is the only solution that provides lasting relief.
            </p>
          </div>
        </div>
      </section>
      
      <Separator className="my-12 md:my-16" />

      {/* Exercise Guides Section */}
      <section id="exercises" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Strengthen Your Joints: Gentle Exercise Guides</h2>
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
            <h3 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                Corrective Exercises for Common Knee Issues
            </h3>
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
      </section>

      <Separator className="my-12 md:my-16" />
      
      {/* Dietary Recommendations Section */}
      <section id="diet" className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Apple className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Lose Weight: Nourish Your Knees</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover traditional Indian foods that can help manage knee pain and improve joint health.
            </p>
          </div>
          <Tabs defaultValue="vegetarian" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto">
              <TabsTrigger value="vegetarian" className="py-2 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Vegetarian
              </TabsTrigger>
              <TabsTrigger value="non-vegetarian" className="py-2 flex items-center gap-2">
                <Fish className="h-5 w-5" />
                Non-Vegetarian
              </TabsTrigger>
            </TabsList>
            <TabsContent value="vegetarian" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {vegFoods.map(food => (
                  <FoodCard key={food.name} {...food} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="non-vegetarian" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {nonVegFoods.map(food => (
                  <FoodCard key={food.name} {...food} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* Symptom Analyzer Section */}
      <section id="symptom-analyzer" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <HeartPulse className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                AI Symptom Analyzer
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Describe your knee pain, diet, and lifestyle, and our AI will provide personalized insights and suggestions tailored for you.
              </p>
            </div>
            <SymptomAnalyzerClient getAnalysis={getAnalysis} />
          </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* Home Remedies Section */}
      <section id="remedies" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                Supportive Home Remedies
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore time-tested Indian home remedies for temporary relief, rated by our community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remedies.map((remedy) => {
                const image = PlaceHolderImages.find(img => img.id === remedy.imageId);
                return (
                  <Card key={remedy.name} className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    <CardHeader>
                      <CardTitle className="font-headline">{remedy.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{remedy.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Rating rating={remedy.rating} />
                    </div>
                  </Card>
                );
              })}
            </div>
            <Separator className="my-12 md:my-20" />
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8 font-headline">A Closer Look: Ginger & Turmeric Tea</h3>
              <div className="space-y-6">
                  <Card>
                      <CardHeader>
                          <CardTitle className="font-headline">User Reviews</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <div className="flex gap-4">
                              <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground"/>
                              <p className="text-muted-foreground">"This tea really helps in the mornings with my stiff knees." - <span className="font-semibold">Sunita J.</span></p>
                          </div>
                          <div className="flex gap-4">
                              <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground"/>
                              <p className="text-muted-foreground">"A comforting drink, especially in winter. My pain feels a bit less." - <span className="font-semibold">Rekha P.</span></p>
                          </div>
                      </CardContent>
                  </Card>
                  <AiSummary />
              </div>
            </div>
          </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* Find a Doctor Section */}
      <section id="find-doctor" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Stethoscope className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
              Find a Specialist
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Connect with experienced doctors and physiotherapists in your area.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Enter your city or pincode" className="text-base" />
              <Button type="submit">Search</Button>
            </div>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold font-headline">Doctors in Mumbai</h3>
            {doctors.map((doctor) => (
              <Card key={doctor.name} className="shadow-md transform transition-transform duration-300 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline">{doctor.name}</CardTitle>
                  <p className="text-primary font-semibold">{doctor.specialty}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{doctor.address}</span>
                  </div>
                  <Button>Book Appointment</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />
      
      {/* Community Forum Section */}
      <section id="community" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                Community Forum
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Share experiences, ask questions, and support each other. You are not alone.
              </p>
            </div>
            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                      <CardTitle className="font-headline">Active Discussions</CardTitle>
                      <CardDescription>Join the conversation or start your own.</CardDescription>
                  </div>
                  <Button>Start a New Discussion</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Topic</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead className="text-right">Last Post</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {threads.map((thread) => (
                      <TableRow key={thread.topic} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="font-medium font-headline">{thread.topic}</div>
                          <div className="text-sm text-muted-foreground">by {thread.author}</div>
                          <Badge variant="outline" className="mt-1">{thread.tag}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{thread.replies}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{thread.lastPost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
      </section>
    </div>
  );
}
