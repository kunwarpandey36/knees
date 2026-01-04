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

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-card py-20 md:py-32 lg:py-40">
        <div className="container px-4 md:px-6 text-center">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
              The Silent Epidemic of Knee Pain in Indian Women
            </h1>
            <p className="max-w-[800px] mx-auto text-muted-foreground md:text-xl">
              This is a comprehensive guide to understanding and managing knee deformities like <span className="text-primary font-semibold">Genu Varum (Bow Legs)</span> and <span className="text-primary font-semibold">Genu Valgum (Knock Knees)</span>, which disproportionately affect aging Indian women.
            </p>
          </div>
        </div>
      </section>
      
      <Separator className="my-12 md:my-16" />

      {/* Deformities Section */}
      <section id="deformities" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Bone className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Understanding the Deformities</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              A healthy leg's mechanical axis—a line from hip to ankle—should pass through the knee's center. Deviation from this axis defines deformity.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Genu Varum (Bow Legs)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">This is the most prevalent deformity in India. The knees remain widely separated when ankles touch, shifting load to the inner knee.</p>
                <p>This overload <span className="text-primary font-semibold">crushes the medial meniscus</span> and cartilage, leading to a vicious cycle of more pain and worse deformity.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Genu Valgum (Knock Knees)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Knees touch or "knock" while ankles are apart. This shifts the load to the outer part of the knee.</p>
                <p>It's often linked to <span className="text-primary font-semibold">lateral compartment arthritis</span>, rheumatoid arthritis, or severe Vitamin D deficiency (osteomalacia).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />
      
      {/* Exercise Guides Section */}
      <section id="exercises" className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Dumbbell className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Solution: Strengthen Your Joints</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Strong muscles act as a natural brace. While exercise can't reshape bone, it corrects imbalances that worsen deformity.
            </p>
          </div>
          <Card className="p-4 md:p-6 shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  Key Physiotherapy Exercises
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p><span className="font-semibold text-primary">Static Quadriceps:</span> Sit with legs extended, press the back of your knee into a rolled towel. Hold for 10 seconds. Strengthens the thigh without bending the painful knee.</p>
                  <p><span className="font-semibold text-primary">Straight Leg Raises:</span> Lie on your back and lift one straight leg to the height of the other bent knee. Builds quad strength without joint compression.</p>
                  <p><span className="font-semibold text-primary">Clamshells (Crucial for Knock Knees):</span> Lie on your side with knees bent. Keeping feet together, lift the top knee. This strengthens hip abductors to prevent inward knee collapse.</p>
                   <p><span className="font-semibold text-primary">Hamstring Stretches:</span> Lie on your back and use a strap or dupatta to gently pull one straight leg up, stretching the back of the thigh to reduce joint pressure.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                  Safe Yoga Asanas
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                  <p><span className="font-semibold text-primary">Tadasana (Mountain Pose):</span> Teaches proper alignment and weight distribution.</p>
                  <p><span className="font-semibold text-primary">Vrikshasana (Tree Pose):</span> Improves balance, strengthening stabilizer muscles. Use a wall for support.</p>
                  <p><span className="font-semibold text-primary">Setu Bandhasana (Bridge Pose):</span> Strengthens glutes and hamstrings, unloading the knee.</p>
                  <p className="font-bold text-destructive">YOGA DON'TS: Avoid Padmasana (Lotus Pose) or deep Vajrasana if you have knee pain. These poses can damage the meniscus.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      <Separator className="my-12 md:my-16" />
      
      {/* Dietary Recommendations Section */}
      <section id="diet" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <Apple className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Solution: The Anti-Inflammatory Diet</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Weight loss is the single most effective non-surgical intervention. A 5% reduction in body weight can lead to a <span className="text-primary font-semibold">24% improvement</span> in function.
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
      <section id="symptom-analyzer" className="w-full py-12 md:py-24 lg:py-32 bg-card">
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
      <section id="remedies" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold font-headline tracking-tight sm:text-4xl">
                Supportive Home Remedies
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore time-tested Ayurvedic remedies for temporary relief and managing inflammation.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Ayurvedic Oils & Pastes (Lepams)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p><span className="font-semibold text-primary">Mahanarayan Oil:</span> The gold standard for joint pain. Its anti-inflammatory herbs penetrate tissues to reduce stiffness.</p>
                        <p><span className="font-semibold text-primary">Janu Basti:</span> A specialized therapy where a dough dam filled with warm medicated oil is placed on the knee to lubricate the joint.</p>
                        <p><span className="font-semibold text-primary">Turmeric & Ginger Paste (Lepam):</span> A warm paste of these spices can significantly reduce acute swelling.</p>
                    </CardContent>
                </Card>
                <AiSummary />
            </div>
          </div>
      </section>
    </div>
  );
}
