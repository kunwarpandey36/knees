import Image from 'next/image';
import {
  HeartPulse,
  Apple,
  Dumbbell,
  Sparkles,
  Stethoscope,
  Users,
  Weight,
  Bone,
  Leaf,
  Fish,
  Star,
  Wand2,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { SymptomAnalyzerClient } from '@/components/symptom-analyzer/symptom-analyzer-client';
import { getAnalysis } from '@/app/symptom-analyzer/actions';
import { homeRemedyEffectivenessSummary } from '@/ai/flows/home-remedy-effectiveness-summary';
import { Button } from '@/components/ui/button';

// Data from dietary-recommendations/page.tsx
const vegFoods = [
  {
    name: 'Turmeric (Haldi)',
    benefit: 'Contains curcumin, a powerful anti-inflammatory compound.',
    imageId: 'diet-turmeric',
  },
  {
    name: 'Leafy Greens (Saag)',
    benefit:
      'Rich in calcium, magnesium, and antioxidants to support bone health.',
    imageId: 'diet-leafy-greens',
  },
  {
    name: 'Lentils & Legumes (Dal)',
    benefit: 'Excellent source of plant-based protein for muscle support.',
    imageId: 'diet-lentils',
  },
];

const nonVegFoods = [
  {
    name: 'Fatty Fish (Salmon, Mackerel)',
    benefit: 'High in Omega-3 fatty acids, which reduce inflammation.',
    imageId: 'diet-fish',
  },
  {
    name: 'Bone Broth (Paya Soup)',
    benefit: 'Provides collagen and gelatin, which are beneficial for joints.',
    imageId: 'diet-chicken-soup',
  },
  {
    name: 'Eggs',
    benefit:
      'A good source of Vitamin D and protein for bone and muscle strength.',
    imageId: 'diet-eggs',
  },
];

const homeRemedies = [
  {
    id: 'remedy-ginger-tea',
    name: 'Ginger & Turmeric Tea',
    description:
      'A warm, soothing tea combining the anti-inflammatory properties of ginger and turmeric.',
    rating: 4,
  },
  {
    id: 'remedy-oil-massage',
    name: 'Warm Oil Massage',
    description:
      'Massaging the knee with warm sesame or mustard oil can improve circulation and reduce stiffness.',
    rating: 5,
  },
  {
    id: 'remedy-hot-compress',
    name: 'Hot & Cold Compress',
    description:
      'Alternating between hot and cold packs can help manage both pain and inflammation.',
    rating: 4,
  },
];

const doctors = [
  {
    name: 'Dr. Anjali Sharma',
    specialty: 'Orthopedic Surgeon',
    location: '123, Wellness Clinic, Juhu, Mumbai',
  },
  {
    name: 'Dr. Vikram Singh',
    specialty: 'Rheumatologist',
    location: '456, HealthFirst Hospital, Andheri, Mumbai',
  },
  {
    name: 'Dr. Priya Mehta',
    specialty: 'Physiotherapist',
    location: '789, Active Life Physio, Bandra, Mumbai',
  },
];

const discussions = [
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

function FoodCard({
  name,
  benefit,
  imageId,
}: {
  name: string;
  benefit: string;
  imageId: string;
}) {
  const image = PlaceHolderImages.find((img) => img.id === imageId);
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

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating
              ? 'text-primary fill-primary'
              : 'text-muted-foreground/50'
          }`}
        />
      ))}
    </div>
  );
}

function HomeRemedyCard({
  id,
  name,
  description,
  rating,
}: {
  id: string;
  name: string;
  description: string;
  rating: number;
}) {
  const image = PlaceHolderImages.find((img) => img.id === id);
  return (
    <Card className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
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
        <CardTitle className="font-headline">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <div className="p-6 pt-0">
        <Rating rating={rating} />
      </div>
    </Card>
  );
}

async function AiSummary() {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    return (
      <Card className="bg-primary/10 border-primary shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-primary">
            <Wand2 />
            AI-Powered Community Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">
            AI summary is unavailable. Please configure your API key in the
            .env file.
          </p>
        </CardContent>
      </Card>
    );
  }

  try {
    const summary = await homeRemedyEffectivenessSummary({
      remedyName: 'Ginger & Turmeric Tea',
      userReviews: [
        'This tea really helps in the mornings with my stiff knees.',
        "I didn't feel much difference, maybe I need to drink it for longer.",
        'A comforting drink, especially in winter. My pain feels a bit less.',
        'The taste is strong, but it is worth it for the relief it provides.',
      ],
      userRatings: [5, 2, 4, 4],
    });

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">User Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" />
              <p className="text-muted-foreground">
                "This tea really helps in the mornings with my stiff knees." -{' '}
                <span className="font-semibold">Sunita J.</span>
              </p>
            </div>
            <div className="flex gap-4">
              <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" />
              <p className="text-muted-foreground">
                "A comforting drink, especially in winter. My pain feels a bit
                less." - <span className="font-semibold">Rekha P.</span>
              </p>
            </div>
          </CardContent>
        </Card>
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
      </div>
    );
  } catch (e: any) {
    return (
      <Card className="bg-destructive/10 border-destructive shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-destructive">
            <Wand2 />
            AI-Powered Community Summary Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="italic">
            {e.message || 'An error occurred while generating the summary.'}
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full bg-primary/10 text-center py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
              The Genu Valgum and Genu Varum Crisis in Aging Indian Women
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
              A Comprehensive Orthopedic and Geriatric Report on Understanding
              and Managing Knee Deformities
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Deformities Section */}
        <section id="deformities" className="w-full py-12 md:py-24">
          <div className="text-center mb-12">
            <Bone className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              1. Understanding the Deformities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              The mechanical axis of the leg—a straight line from hip to
              ankle—should pass through the knee's center. Deviation from this
              axis defines the deformity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-primary">
                  Genu Varum (Bow Legs)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The most prevalent deformity in India. The knees remain widely
                  separated when ankles touch, shifting load to the inner knee.
                </p>
                <p>
                  This overload{' '}
                  <span className="text-primary font-semibold">
                    crushes the medial meniscus
                  </span>{' '}
                  and cartilage, leading to a vicious cycle of more pain and
                  worse deformity.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="font-headline text-primary">
                  Genu Valgum (Knock Knees)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Knees touch or "knock" while ankles are apart. This shifts the
                  load to the outer part of the knee.
                </p>
                <p>
                  It's often linked to{' '}
                  <span className="text-primary font-semibold">
                    lateral compartment arthritis
                  </span>
                  , rheumatoid arthritis, or severe Vitamin D deficiency
                  (osteomalacia).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Etiology Section */}
        <section id="etiology" className="w-full py-12 md:py-24 bg-card rounded-lg">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                2. Etiology: Why Indian Women?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                The high prevalence of knee deformities in Indian women results
                from a unique convergence of biological, nutritional, and
                cultural factors.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    The Gender Gap and Menopause
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Women have a wider pelvis, increasing the Q-angle which
                    predisposes them to malalignment. The drop in{' '}
                    <span className="text-primary font-semibold">
                      estrogen during menopause
                    </span>{' '}
                    accelerates cartilage degradation and bone density loss,
                    making the knee joint highly susceptible to wear and tear.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    The Calcium-Vitamin D Paradox
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Despite abundant sunshine,{' '}
                    <span className="text-primary font-semibold">
                      70-90% of Indians are Vitamin D deficient
                    </span>
                    . This impairs calcium absorption, leading to softer bones
                    (osteomalacia) that can bow under body weight.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">
                    Cultural Lifestyle: The "Indian Knee"
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Decades of high-flexion activities like{' '}
                    <span className="text-primary font-semibold">
                      squatting and sitting cross-legged
                    </span>{' '}
                    generate immense compressive forces, wearing down the knee's
                    natural shock absorbers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Solution Section */}
        <section className="w-full text-center py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Weight className="h-16 w-16 text-primary" />
              <Dumbbell className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              The One and Only Solution for Lasting Relief
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl mt-6">
              Stop looking for temporary fixes. The real path to healthy knees
              is through two fundamental pillars:{' '}
              <span className="text-primary font-semibold">
                achieving a healthy weight
              </span>{' '}
              and{' '}
              <span className="text-primary font-semibold">
                building strong joints
              </span>
              . This is the only approach that provides lasting relief and
              reclaims your mobility.
            </p>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Exercise Guides Section */}
        <section id="exercises" className="w-full py-12 md:py-24 bg-card rounded-lg">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                3. Strengthen Your Joints: Gentle Exercise Guides
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Strengthen your knees and improve flexibility with these
                low-impact exercises designed for home.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="p-4 md:p-6 shadow-lg mb-12">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-0">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Seated Knee Flexion & Extension
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            A gentle movement to improve range of motion.
                          </p>
                          <ol className="list-decimal list-inside space-y-2">
                            <li>
                              Sit upright on a chair with your feet flat on the
                              floor.
                            </li>
                            <li>
                              Slowly straighten one leg until it is parallel to
                              the floor. Hold for 5 seconds.
                            </li>
                            <li>Gently lower the leg back down.</li>
                            <li>
                              Now, bend the knee and pull your foot back under
                              the chair as far as is comfortable. Hold for 5
                              seconds.
                            </li>
                            <li>Repeat 10 times for each leg.</li>
                          </ol>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="https://images.unsplash.com/photo-1763949391155-33111ea76d76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxrbmVlJTIwZXhlcmNpc2V8ZW58MHx8fHwxNzY3NTQ1MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="A person gently performing a seated knee flexion exercise."
                            width={400}
                            height={267}
                            className="rounded-lg object-cover"
                            data-ai-hint="knee exercise"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Seated Leg Lifts
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Helps to strengthen the quadriceps muscles which
                            support the knee.
                          </p>
                          <ol className="list-decimal list-inside space-y-2">
                            <li>Sit on a sturdy chair, with your back straight.</li>
                            <li>
                              Straighten and raise one leg as high as you can
                              without discomfort.
                            </li>
                            <li>
                              Hold the position for 10 seconds, then slowly lower
                              your leg.
                            </li>
                            <li>Do 10-15 repetitions for each leg.</li>
                          </ol>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="https://images.unsplash.com/photo-1467818488384-3a21f2b79959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsZWclMjBsaWZ0fGVufDB8fHx8MTc2NzU0NTAxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="A person performing a seated leg lift."
                            width={400}
                            height={267}
                            className="rounded-lg object-cover"
                            data-ai-hint="leg lift"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Gentle Wall Squat
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            A safe way to build strength without putting too much
                            pressure on the knees.
                          </p>
                          <ol className="list-decimal list-inside space-y-2">
                            <li>
                              Stand with your back against a wall, feet
                              shoulder-width apart.
                            </li>
                            <li>
                              Slowly slide down the wall until your knees are
                              slightly bent (like sitting in a chair). Do not go
                              too deep.
                            </li>
                            <li>Hold the position for 5-10 seconds.</li>
                            <li>Slowly slide back up the wall.</li>
                            <li>Repeat 5-10 times.</li>
                          </ol>
                        </div>
                        <div className="flex items-center justify-center">
                          <Image
                            src="https://images.unsplash.com/photo-1720697444461-6ff0f2d2efd8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3YWxsJTIwc3F1YXR8ZW58MHx8fHwxNzY3NTQ1MDE3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="A person doing a gentle wall squat."
                            width={400}
                            height={267}
                            className="rounded-lg object-cover"
                            data-ai-hint="wall squat"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
              <Separator className="my-12 md:my-16" />
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                  Corrective Exercises for Common Knee Issues
                </h3>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  Targeted exercises to help with specific alignment issues like
                  knock knees and bowlegs. Always consult a doctor or
                  physiotherapist before starting a new exercise program.
                </p>
              </div>

              <Card className="p-4 md:p-6 shadow-lg">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="corrective-item-0">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Corrective Exercises for Knock Knees (Genu Valgum)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <p className="text-muted-foreground">
                        These non-surgical exercises focus on strengthening weak
                        muscles and stretching tight ones to improve knee
                        alignment and reduce pain associated with knock knees.
                      </p>
                      <div
                        id="knock-knee-exercises"
                        className="space-y-4"
                      >
                        <h4 className="font-bold font-headline text-lg">
                          1. Strengthen Hip Abductors
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Pull thighs outward to reduce medial knee
                          stress.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Side-Lying Leg Raises:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Lie on your side, raise top leg 30-45°. Hold
                                2-3 sec, lower slowly.
                              </li>
                              <li>
                                3 sets of 15 reps each leg, 5 times a week.
                              </li>
                            </ol>
                          </li>
                          <li>
                            <span className="font-semibold">
                              Standing Hip Abduction (with Resistance Band):
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Place a band around your ankles and stand
                                tall.
                              </li>
                              <li>
                                Move one leg outward against the band, hold for
                                2 seconds, and return.
                              </li>
                              <li>2-3 sets of 10-15 reps each side.</li>
                            </ol>
                          </li>
                          <li>
                            <span className="font-semibold">Clamshells:</span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Lie on your side with knees bent and feet
                                together.
                              </li>
                              <li>
                                Lift your top knee like opening a clamshell,
                                keeping feet together. Add a resistance band
                                around thighs for more challenge.
                              </li>
                              <li>3 sets of 15 reps.</li>
                            </ol>
                          </li>
                          <li>
                            <span className="font-semibold">
                              Lateral Band Walks:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Place a band around ankles or thighs.
                              </li>
                              <li>
                                Get into a slight squat and step sideways for
                                10-15 steps, then return.
                              </li>
                              <li>2 sets in each direction.</li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                      <div
                        id="knock-knee-exercises-2"
                        className="space-y-4"
                      >
                        <h4 className="font-bold font-headline text-lg">
                          2. Strengthen Hip External Rotators
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Control thigh rotation to prevent inward knee
                          collapse.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Seated External Rotation (with Resistance Band):
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Sit upright with a band around your ankles.
                              </li>
                              <li>
                                Keeping your knee stable, rotate one foot
                                outward from the hip.
                              </li>
                              <li>3 sets of 10-12 reps each side.</li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                      <div
                        id="knock-knee-exercises-3"
                        className="space-y-4"
                      >
                        <h4 className="font-bold font-headline text-lg">
                          3. Stretch Tight Adductors (Inner Thigh)
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Reduce the inward pull on the thighs.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Butterfly Stretch:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Sit with the soles of your feet together.
                              </li>
                              <li>
                                Gently press your knees toward the floor. Hold
                                for 30 seconds.
                              </li>
                              <li>Repeat 3 times, daily.</li>
                            </ol>
                          </li>
                          <li>
                            <span className="font-semibold">Side Lunges:</span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Step out to one side, keeping the other leg
                                straight, feeling a stretch in the inner
                                thigh.
                              </li>
                              <li>
                                Perform 10 slow, controlled reps per leg.
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                      <div
                        id="knock-knee-exercises-4"
                        className="space-y-4"
                      >
                        <h4 className="font-bold font-headline text-lg">
                          4. Stretch Iliotibial (IT) Band
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Reduce lateral tension on the knee.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Standing ITB Stretch:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>Cross one leg behind the other.</li>
                              <li>
                                Lean your hip out to the side of the back leg
                                until you feel a stretch.
                              </li>
                              <li>
                                Hold for 30 seconds, repeat 3 times per side.
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="corrective-item-1">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Corrective Exercises for Bowlegs (Genu Varum)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <p className="text-muted-foreground">
                        These exercises aim to strengthen muscles that help
                        align the knee and stretch those that pull it outward.
                      </p>
                      <div className="space-y-4">
                        <h4 className="font-bold font-headline text-lg">
                          Strengthen Hip Adductors and Quadriceps
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Pull knees inward and stabilize the joint.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Ball Squeezes:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Sit or lie down with a soft ball between your
                                knees.
                              </li>
                              <li>
                                Squeeze the ball for 5 seconds, then relax.
                                Repeat 15 times.
                              </li>
                            </ol>
                          </li>
                          <li>
                            <span className="font-semibold">
                              Inner Thigh Leg Lifts:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Lie on your side, top leg bent over the bottom
                                straight leg.
                              </li>
                              <li>
                                Lift the bottom leg up. Repeat 15 times per
                                side.
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="corrective-item-2">
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      Corrective Exercises for Patellar Maltracking
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <p className="text-muted-foreground">
                        These exercises help stabilize the kneecap and ensure it
                        glides smoothly.
                      </p>
                      <div className="space-y-4">
                        <h4 className="font-bold font-headline text-lg">
                          Strengthen Quadriceps (VMO)
                        </h4>
                        <p className="text-sm text-muted-foreground italic">
                          Goal: Strengthen the inner part of your quad to help
                          guide the kneecap.
                        </p>
                        <ul className="space-y-3 list-disc list-outside pl-5">
                          <li>
                            <span className="font-semibold">
                              Straight Leg Raises:
                            </span>
                            <ol className="list-decimal list-inside pl-4 text-muted-foreground">
                              <li>
                                Lie on your back, one knee bent. Keep the other
                                leg straight.
                              </li>
                              <li>
                                Tighten your thigh muscle and lift the straight
                                leg about a foot off the floor. Hold for 5
                                seconds.
                              </li>
                              <li>Repeat 15 times per leg.</li>
                            </ol>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Dietary Recommendations Section */}
        <section id="diet" className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Apple className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                4. Lose Weight: The Anti-Inflammatory Indian Diet
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                A 5% reduction in body weight can lead to a{' '}
                <span className="text-primary font-semibold">
                  24% improvement
                </span>{' '}
                in function. Discover traditional Indian foods that can help.
              </p>
            </div>
            <Tabs defaultValue="vegetarian" className="w-full max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-auto">
                <TabsTrigger
                  value="vegetarian"
                  className="py-2 flex items-center gap-2"
                >
                  <Leaf className="h-5 w-5" />
                  Vegetarian
                </TabsTrigger>
                <TabsTrigger
                  value="non-vegetarian"
                  className="py-2 flex items-center gap-2"
                >
                  <Fish className="h-5 w-5" />
                  Non-Vegetarian
                </TabsTrigger>
              </TabsList>
              <TabsContent value="vegetarian" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vegFoods.map((food) => (
                    <FoodCard key={food.name} {...food} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="non-vegetarian" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {nonVegFoods.map((food) => (
                    <FoodCard key={food.name} {...food} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Symptom Analyzer Section */}
        <section
          id="symptom-analyzer"
          className="w-full py-12 md:py-24 bg-card rounded-lg"
        >
          <div className="container mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <HeartPulse className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                5. AI Symptom Analyzer
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Describe your knee pain, diet, and lifestyle, and our AI will
                provide personalized insights and suggestions tailored for you.
              </p>
            </div>
            <SymptomAnalyzerClient getAnalysis={getAnalysis} />
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Home Remedies Section */}
        <section id="remedies" className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                6. Supportive Home Remedies
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore time-tested Indian home remedies for temporary relief,
                rated by our community.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {homeRemedies.map((remedy) => (
                <HomeRemedyCard key={remedy.name} {...remedy} />
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8 font-headline">
                A Closer Look: Ginger & Turmeric Tea
              </h3>
              <AiSummary />
            </div>
          </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Find a Doctor Section */}
        <section id="find-doctor" className="w-full py-12 md:py-24 bg-card rounded-lg">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Stethoscope className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                7. Find a Specialist
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Connect with experienced doctors and physiotherapists in your
                area.
              </p>
            </div>
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your city or pincode"
                  className="text-base"
                />
                <Button type="submit">Search</Button>
              </div>
            </div>
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className="text-2xl font-bold font-headline">
                Doctors in Mumbai
              </h3>
              {doctors.map((doctor) => (
                <Card
                  key={doctor.name}
                  className="shadow-md transform transition-transform duration-300 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="font-headline">
                      {doctor.name}
                    </CardTitle>
                    <p className="text-primary font-semibold">
                      {doctor.specialty}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{doctor.location}</span>
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
        <section id="community" className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                8. Community Forum
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Share experiences, ask questions, and support each other. You
                are not alone.
              </p>
            </div>
            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1.5">
                  <CardTitle className="font-headline">
                    Active Discussions
                  </CardTitle>
                  <CardDescription>
                    Join the conversation or start your own.
                  </CardDescription>
                </div>
                <Button>Start a New Discussion</Button>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Topic</TableHead>
                      <TableHead>Replies</TableHead>
                      <TableHead className="text-right">Last Post</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discussions.map((discussion) => (
                      <TableRow
                        key={discussion.topic}
                        className="cursor-pointer hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="font-medium font-headline">
                            {discussion.topic}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            by {discussion.author}
                          </div>
                          <Badge variant="outline" className="mt-1">
                            {discussion.tag}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {discussion.replies}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {discussion.lastPost}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
