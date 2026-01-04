import Image from 'next/image';
import { Apple, Fish, Leaf, Drumstick } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

export default function DietaryRecommendationsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Apple className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Nourish Your Knees
        </h1>
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
  );
}
