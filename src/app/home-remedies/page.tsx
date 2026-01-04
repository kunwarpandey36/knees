import Image from 'next/image';
import { Sparkles, Star, Wand2, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { homeRemedyEffectivenessSummary } from '@/ai/flows/home-remedy-effectiveness-summary';

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
}


export default function HomeRemediesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Traditional Home Remedies
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore time-tested Indian home remedies for knee pain relief, rated by our community.
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
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">A Closer Look: Ginger & Turmeric Tea</h2>
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
  );
}
