import Image from 'next/image';
import {
  Apple,
  Bone,
  Dumbbell,
  Fish,
  Instagram,
  Leaf,
  MessageCircle,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  Weight,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { homeRemedyEffectivenessSummary } from '@/ai/flows/home-remedy-effectiveness-summary';
import Link from 'next/link';

// Data from exercise-guides/page.tsx
const exercises = [
  {
    title: '1. Seated Knee Flexion & Extension',
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
    title: '2. Seated Leg Lifts',
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
    title: '3. Gentle Wall Squat',
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

// Data from dietary-recommendations/page.tsx
const vegFoods = [
  {
    name: 'Turmeric (Haldi)',
    benefit: 'Contains curcumin, a powerful anti-inflammatory compound.',
    imageUrl: 'https://picsum.photos/seed/1/300/200',
    imageHint: 'turmeric spice',
  },
  {
    name: 'Leafy Greens (Saag)',
    benefit: 'Rich in calcium, magnesium, and antioxidants to support bone health.',
    imageUrl: 'https://picsum.photos/seed/2/300/200',
    imageHint: 'leafy greens',
  },
  {
    name: 'Lentils & Legumes (Dal)',
    benefit: 'Excellent source of plant-based protein for muscle support.',
    imageUrl: 'https://picsum.photos/seed/3/300/200',
    imageHint: 'lentils dal',
  },
];

const nonVegFoods = [
  {
    name: 'Fatty Fish (Salmon, Mackerel)',
    benefit: 'High in Omega-3 fatty acids, which reduce inflammation.',
    imageUrl: 'https://picsum.photos/seed/4/300/200',
    imageHint: 'cooked fish',
  },
  {
    name: 'Bone Broth (Paya Soup)',
    benefit: 'Provides collagen and gelatin, which are beneficial for joints.',
    imageUrl: 'https://picsum.photos/seed/5/300/200',
    imageHint: 'chicken soup',
  },
  {
    name: 'Eggs',
    benefit: 'A good source of Vitamin D and protein for bone and muscle strength.',
    imageUrl: 'https://picsum.photos/seed/6/300/200',
    imageHint: 'boiled eggs',
  },
];

function FoodCard({ name, benefit, imageUrl, imageHint }: { name: string; benefit: string; imageUrl: string; imageHint: string }) {
  return (
    <Card className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Image src={imageUrl} alt={name} width={300} height={200} className="w-full h-40 object-cover" data-ai-hint={imageHint} />
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
    imageUrl: 'https://picsum.photos/seed/7/400/300',
    imageHint: 'ginger tea',
  },
  {
    name: 'Warm Oil Massage',
    description: 'Massaging the knee with warm sesame or mustard oil can improve circulation and reduce stiffness.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/8/400/300',
    imageHint: 'oil massage',
  },
  {
    name: 'Hot & Cold Compress',
    description: 'Alternating between hot and cold packs can help manage both pain and inflammation.',
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/9/400/300',
    imageHint: 'hot compress',
  },
];

function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
        />
      ))}
    </div>
  );
}

// Data from find-a-doctor/page.tsx
const doctors = [
  {
    name: 'Kunwar Pandey',
    specialty: 'Nit Silchar',
    address: 'Whatsapp: 8318849893',
  },
];

// Data from community-forum/page.tsx
const threads = [
  {
    topic: 'hello check',
    author: 'Admin',
    tag: 'General',
    replies: 0,
    lastPost: '2024-07-29T23:16:00Z',
  },
  {
    topic: 'Best oils for knee massage?',
    author: 'Sunita J.',
    tag: 'Remedies',
    replies: 5,
    lastPost: '2024-07-30T10:00:00Z',
  },
  {
    topic: 'Struggling with morning stiffness. Any tips?',
    author: 'Priya M.',
    tag: 'Lifestyle',
    replies: 12,
    lastPost: '2024-07-30T04:00:00Z',
  },
  {
    topic: 'My experience with wall squats',
    author: 'Aarti V.',
    tag: 'Exercises',
    replies: 8,
    lastPost: '2024-07-29T12:00:00Z',
  },
  {
    topic: 'Good vegetarian sources for calcium?',
    author: 'Kavita R.',
    tag: 'Diet',
    replies: 15,
    lastPost: '2024-07-28T18:00:00Z',
  },
];

function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return Math.floor(seconds) + ' seconds ago';
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-card py-20 md:py-32 text-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="flex justify-center items-center gap-4">
              <Weight className="h-16 w-16 text-primary" />
              <Bone className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              The One and Only Solution for Knee Pain
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
              Stop looking for temporary fixes. The real path to healthy knees is through two fundamental pillars:{' '}
              <span className="text-primary font-semibold">achieving a healthy weight</span> and{' '}
              <span className="text-primary font-semibold">building strong joints</span>. This is the only solution that provides
              lasting relief.
            </p>
          </div>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />

      {/* Main content sections */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 space-y-16">
        {/* The Crisis Section */}
        <section id="crisis">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              1. The Crisis: Genu Valgum & Varum in Indian Women
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">A silent epidemic of leg deformities is affecting millions of aging women in India.</p>
          </div>
          <Card className="p-6 md:p-8 shadow-lg">
            <CardContent className="space-y-6 text-lg">
              <p>
                Knee osteoarthritis (OA) is the most frequent joint disease in India, with prevalence rates from 22% to 39%. Unlike in the
                West, Indian women are disproportionately affected by knee OA, which is closely linked to leg deformities like{' '}
                <span className="text-primary font-semibold">Genu Varum (bow-legs)</span> and{' '}
                <span className="text-primary font-semibold">Genu Valgum (knock-knees)</span>.
              </p>
              <p>
                These conditions are not just a part of aging; they stem from a mix of biomechanical failure, nutritional deficiencies (especially
                Vitamin D and Calcium), and cultural lifestyle factors like frequent squatting.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Exercise Guides Section */}
        <section id="exercises">
          <div className="text-center mb-12">
            <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">2. Strengthen Your Joints: Gentle Exercise Guides</h2>
            <p className="mt-4 text-lg text-muted-foreground">Strengthen your knees and improve flexibility with these low-impact exercises designed for home.</p>
          </div>
          <Card className="p-4 md:p-6 shadow-lg mb-12">
            <Accordion type="single" collapsible className="w-full">
              {exercises.map((exercise, index) => {
                return (
                  <AccordionItem value={`item-${index}`} key={exercise.title}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline text-left">{exercise.title}</AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">{exercise.description}</p>
                        <ol className="list-decimal list-inside space-y-2">
                          {exercise.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Card>

          <Separator className="my-12" />

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
              Corrective Exercises for Common Knee Issues
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Targeted exercises to help with specific alignment issues like knock knees and bowlegs.{' '}
              <span className="text-primary font-semibold">Always consult a doctor or physiotherapist before starting a new exercise program.</span>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/bow-legs">
              <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-headline text-primary">Bow Legs (Genu Varum)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Learn non-surgical exercises and lifestyle changes to manage bow legs and reduce knee strain.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/knock-knees">
              <Card className="h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
                <CardHeader>
                  <CardTitle className="font-headline text-primary">Knock Knees (Genu Valgum)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Discover how to strengthen hip muscles and stretch tight areas to correct knock-knee alignment.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Dietary Recommendations Section */}
        <section id="diet">
          <div className="text-center mb-12">
            <Apple className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">3. Lose Weight: Nourish Your Knees</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover traditional Indian foods that can help manage knee pain and improve joint health.
            </p>
          </div>
          <div>
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

        {/* Home Remedies Section */}
        <section id="remedies">
          <div className="text-center mb-12">
            <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">4. Supportive Home Remedies</h2>
            <p className="mt-4 text-lg text-muted-foreground">Explore time-tested Indian home remedies for temporary relief, rated by our community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remedies.map(remedy => (
              <Card key={remedy.name} className="flex flex-col overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <Image
                  src={remedy.imageUrl}
                  alt={remedy.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  data-ai-hint={remedy.imageHint}
                />
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
            ))}
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8 font-headline">
              A Closer Look: <span className="text-primary">Ginger & Turmeric Tea</span>
            </h3>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">User Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      "This tea really helps in the mornings with my stiff knees." - <span className="font-semibold">Sunita J.</span>
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <MessageCircle className="h-5 w-5 mt-1 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      "A comforting drink, especially in winter. My pain feels a bit less." - <span className="font-semibold">Rekha P.</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Find a Doctor Section */}
        <section id="find-doctor">
          <div className="text-center mb-12">
            <Stethoscope className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">5. Find a Specialist</h2>
            <p className="mt-4 text-lg text-muted-foreground">Connect with experienced doctors and physiotherapists.</p>
          </div>
          <div className="mb-12">
            <div className="flex w-full items-center space-x-2">
              <Input type="text" placeholder="Enter your city or pincode" className="text-base" />
              <Button type="submit">Search</Button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-headline text-center">Contact</h3>
            {doctors.map(doctor => (
              <Card key={doctor.name} className="shadow-md transform transition-transform duration-300 hover:shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="font-headline">{doctor.name}</CardTitle>
                  <p className="text-primary font-semibold">{doctor.specialty}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center text-muted-foreground mb-4">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{doctor.address}</span>
                  </div>
                  <Button asChild>
                    <a href="https://wa.me/8318849893" target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Forum Section */}
        <section id="community">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">6. Community Forum</h2>
            <p className="mt-4 text-lg text-muted-foreground">Share experiences, ask questions, and support each other. You are not alone.</p>
          </div>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-4">
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
                  {threads.length > 0 ? (
                    threads.map(thread => (
                      <TableRow key={thread.topic} className="cursor-pointer hover:bg-muted/50">
                        <TableCell>
                          <div className="font-medium font-headline">{thread.topic}</div>
                          <div className="text-sm text-muted-foreground">by {thread.author}</div>
                          <Badge variant="outline" className="mt-1">
                            {thread.tag}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">{thread.replies}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{getTimeAgo(thread.lastPost)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No active discussions yet. Be the first to start one!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
