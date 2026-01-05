import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function KnockKneesPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold font-headline text-primary mb-4 text-center">
        Knock Knees (Genu Valgum) – Non-Surgical Management
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-12">
        A guide to home exercises, posture correction, and lifestyle changes to manage knock knees.
      </p>

      <div className="space-y-12">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">1. Home Exercises (Strengthening & Stretching)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>Strengthening the hip outer rotators and abductors helps “pull” knock knees back to neutral. Key exercises include:</p>
            <ul className="list-disc list-outside space-y-3 pl-5 text-left md:text-center">
              <li><span className="font-semibold text-primary">Clamshells (Hip Abductors):</span> Lie on your side with knees bent. Keep feet together and lift the top knee. Do 3 sets of 10–15 reps per side.</li>
              <li><span className="font-semibold text-primary">Side-Lying Leg Raises:</span> Lie on your side with legs straight. Lift the top leg to strengthen glutes and hip stabilizers.</li>
              <li><span className="font-semibold text-primary">Glute Bridges:</span> Lie on your back with knees bent and lift your hips by squeezing your glutes.</li>
              <li><span className="font-semibold text-primary">Banded Squats:</span> With a resistance band above the knees, squat while pushing your knees outward against the band.</li>
              <li><span className="font-semibold text-primary">Stretching:</span> Stretch your inner thighs (Butterfly Stretch) and hip flexors for 20-30 seconds each.</li>
              <li><span className="font-semibold text-primary">Balance/Proprioception:</span> Practice single-leg stands for 30–60 seconds to retrain muscles for better stability.</li>
            </ul>
            <p className="text-sm text-muted-foreground italic">Aim for 3–5 days per week, gradually increasing reps or resistance.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">2. Posture & Activity Modifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <ul className="list-disc list-outside space-y-3 pl-5 text-left md:text-center">
              <li><span className="font-semibold text-primary">Walking/Standing:</span> Keep feet straight and avoid letting knees knock inward. Use shoes with arch support.</li>
              <li><span className="font-semibold text-primary">Knee Alignment:</span> In movements like squats, keep knees over the feet, pointing in the same direction as your toes.</li>
              <li><span className="font-semibold text-primary">Squatting/Lifting:</span> Avoid deep bending with knees pinching inward. Use a support bar if needed.</li>
              <li><span className="font-semibold text-primary">Seating:</span> Avoid sitting cross-legged. If on the floor, use a cushion to keep hips above knees.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">3. Dos and Don’ts</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Do</h4>
              <ul className="list-disc list-outside space-y-2 pl-5 text-left md:text-center">
                <li>Strengthen your hip and thigh muscles.</li>
                <li>Sit and stand with good posture.</li>
                <li>Maintain a healthy weight.</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600">Don’t</h4>
              <ul className="list-disc list-outside space-y-2 pl-5 text-left md:text-center">
                <li>Wear unsupportive shoes like flip-flops.</li>
                <li>Perform deep yoga poses if they cause knees to collapse inward.</li>
                <li>Participate in high-impact sports without caution.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">4. Expected Improvements & Timeline</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p>You may notice reduced pain and a better gait within weeks. Modest changes in knee angle can appear after <span className="text-primary font-semibold">1–3 months</span>. Adults may need <span className="text-primary font-semibold">6–12 months</span> for meaningful change. The focus is on symptom relief and stability, not complete bone realignment.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">5. Supports (Braces, Insoles)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <ul className="list-disc list-outside space-y-3 pl-5 text-left md:text-center">
              <li><span className="font-semibold text-primary">Orthotic Insoles:</span> Can correct excessive foot pronation that worsens knock knees.</li>
              <li><span className="font-semibold text-primary">Valgus Knee Braces:</span> Can shift pressure away from the over-stressed outer knee.</li>
              <li><span className="font-semibold text-primary">Knee Straps/Wraps:</span> For comfort during exercise; they do not change alignment.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">6. Indian Lifestyle Guidance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <ul className="list-disc list-outside space-y-3 pl-5 text-left md:text-center">
              <li><span className="font-semibold text-primary">Floor Sitting:</span> Avoid full lotus or prolonged cross-legged positions.</li>
              <li><span className="font-semibold text-primary">Yoga Modifications:</span> Pay extra attention to knee alignment and use props.</li>
              <li><span className="font-semibold text-primary">Daily Routines:</span> Use support rails for squatting. Push evenly through both legs when rising.</li>
              <li><span className="font-semibold text-primary">Nutrition & Habits:</span> Ensure adequate Vitamin D and calcium.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
