import { SymptomAnalyzerClient } from "@/components/symptom-analyzer/symptom-analyzer-client";
import { getAnalysis } from "@/app/symptom-analyzer/actions";
import { HeartPulse } from "lucide-react";

export default function SymptomAnalyzerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <HeartPulse className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          AI Symptom Analyzer
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Describe your knee pain, diet, and lifestyle, and our AI will provide personalized insights and suggestions tailored for you.
        </p>
      </div>

      <SymptomAnalyzerClient getAnalysis={getAnalysis} />
    </div>
  );
}
