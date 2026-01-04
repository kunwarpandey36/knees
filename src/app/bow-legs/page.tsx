import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function BowLegsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-headline text-primary mb-4 text-center">
        Bow Legs (Genu Varum) – Non-Surgical Management
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-12">
        A guide to home exercises, posture correction, and lifestyle changes to manage bow legs.
      </p>

      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">1. Home Exercises (Strengthening & Stretching)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Strengthening the hips and thighs can pull bow-legged knees toward center. Key exercises include:</p>
            <ul className="list-disc list-outside space-y-3 pl-5">
              <li><span className="font-semibold text-primary">Toes-In Squats:</span> Stand with feet ~20 cm apart and toes pointed inward (big toes touching). Squat down slowly, then stand up. Aim for 2–3 sets of 10–15 reps.</li>
              <li><span className="font-semibold text-primary">Foam-Roller Toe Squeeze:</span> Place a roller or towel between the knees. Squeeze knees inward and bend forward to touch your toes. Repeat 10–15 times.</li>
              <li><span className="font-semibold text-primary">Side-Lying Hip Internal Rotation:</span> Lie on one side with knees bent. Keep knees together and lift the top foot upward. Do 10–15 reps on each side.</li>
              <li><span className="font-semibold text-primary">Balance Training:</span> Practice single-leg stands for 30–60 seconds to build stability.</li>
              <li><span className="font-semibold text-primary">Stretching:</span> Stretch the inner thighs (butterfly stretch) and hamstrings for 30 seconds each.</li>
            </ul>
            <p className="text-sm text-muted-foreground italic">Perform these exercises 3–5 days per week, gradually increasing sets as you get stronger.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">2. Posture & Activity Modifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-outside space-y-3 pl-5">
              <li><span className="font-semibold text-primary">Walking/Standing:</span> Keep feet hip-width and weight even. Use arch-support footwear.</li>
              <li><span className="font-semibold text-primary">Squatting/Lifting:</span> Keep feet parallel and knees in line with hips. Hinge at the hips to lift.</li>
              <li><span className="font-semibold text-primary">Sitting:</span> When sitting on the floor, use a cushion so hips are higher than knees.</li>
              <li><span className="font-semibold text-primary">Activity Choices:</span> Favor low-impact activities like walking, cycling, or swimming.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">3. Dos and Don’ts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Do</h4>
              <ul className="list-disc list-outside space-y-2 pl-5">
                <li>Maintain a healthy weight.</li>
                <li>Strengthen core and hip muscles.</li>
                <li>Wear supportive shoes with good arch support.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Don’t</h4>
              <ul className="list-disc list-outside space-y-2 pl-5">
                <li>Run or jump excessively on hard surfaces.</li>
                <li>Sit in extreme lotus or pigeon poses if painful.</li>
                <li>Wear unsupportive footwear for long periods.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">4. Expected Improvements & Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Improvements are gradual. Symptom relief may appear within <span className="text-primary font-semibold">4–8 weeks</span>. Adults may need <span className="text-primary font-semibold">6–12 months</span> of consistent effort for noticeable change. The goal is muscle strengthening and symptom reduction, as complete bone reshaping is unlikely without surgery.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">5. Supports (Braces, Insoles)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-outside space-y-3 pl-5">
              <li><span className="font-semibold text-primary">Orthotic Insoles:</span> Can adjust foot mechanics to relieve knee strain.</li>
              <li><span className="font-semibold text-primary">Braces/Belts:</span> A varus-correction brace can apply gentle pressure to guide the knees inward over time.</li>
              <li><span className="font-semibold text-primary">Knee Sleeves/Straps:</span> Provide comfort and support during exercise but do not correct alignment.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">6. Indian Lifestyle Guidance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc list-outside space-y-3 pl-5">
              <li><span className="font-semibold text-primary">Floor Sitting:</span> Avoid long periods in deep squats. Use a folded mat or low stool.</li>
              <li><span className="font-semibold text-primary">Yoga/Pilates:</span> Focus on alignment cues and use props to avoid over-flexing the knees.</li>
              <li><span className="font-semibold text-primary">Daily Chores:</span> Avoid twisting the knees. Use a sit-to-stand method with support.</li>
              <li><span className="font-semibold text-primary">Lifestyle:</span> Ensure adequate Vitamin D and calcium for bone health.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
