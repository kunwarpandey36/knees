import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  HeartPulse,
  Apple,
  Dumbbell,
  Sparkles,
  Stethoscope,
  Users,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: HeartPulse,
    title: 'Symptom Analyzer',
    description: 'Use our AI to understand potential causes of your knee pain and get personalized advice.',
    link: '/symptom-analyzer',
    badge: 'AI-Powered',
  },
  {
    icon: Apple,
    title: 'Dietary Recommendations',
    description: 'Discover Indian vegetarian and non-vegetarian foods that support joint health.',
    link: '/dietary-recommendations',
  },
  {
    icon: Dumbbell,
    title: 'Exercise Guides',
    description: 'Follow gentle, step-by-step exercises to strengthen your knees at home.',
    link: '/exercise-guides',
  },
  {
    icon: Sparkles,
    title: 'Home Remedies',
    description: 'Explore a curated database of traditional Indian remedies for pain relief.',
    link: '/home-remedies',
  },
  {
    icon: Stethoscope,
    title: 'Find a Doctor',
    description: 'Locate specialists near you who offer culturally sensitive care.',
    link: '/find-a-doctor',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with others, share experiences, and find support in our community.',
    link: '/community-forum',
  },
];

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                Your Trusted Companion for Knee Health
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Saheli Knee Care offers personalized guidance, traditional wisdom, and community support for older Indian women managing knee pain.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="font-headline">
                  <Link href="/symptom-analyzer">
                    Analyze Your Symptoms <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Holistic Care at Your Fingertips</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From AI-driven analysis to time-tested remedies, we provide a complete ecosystem for managing knee pain.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <feature.icon className="h-8 w-8 text-primary" />
                    {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
                  </div>
                  <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button variant="link" asChild className="p-0 h-auto font-headline">
                    <Link href={feature.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              A Word from Our Community
            </h2>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card className="p-6 shadow-lg">
              <blockquote className="text-lg italic text-foreground">
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                "Saheli Knee Care has been a blessing. The exercises are gentle, and the dietary advice is so practical for my vegetarian kitchen. I feel understood and supported for the first time on this journey."
              </blockquote>
              <p className="mt-4 font-semibold text-right">- Mrs. Gupta, Mumbai</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
