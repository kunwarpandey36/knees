'use client';

import { useFormState } from 'react-dom';
import { type FormState } from '@/app/symptom-analyzer/actions';
import { SymptomAnalyzerForm } from '@/components/symptom-analyzer/form';
import { AnalysisResults } from '@/components/symptom-analyzer/results';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

const initialState: FormState = {
  status: 'idle',
  message: '',
};

type SymptomAnalyzerClientProps = {
  getAnalysis: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>;
};

export function SymptomAnalyzerClient({
  getAnalysis,
}: SymptomAnalyzerClientProps) {
  const [state, formAction] = useFormState(getAnalysis, initialState);

  return (
    <div className="space-y-8">
      <SymptomAnalyzerForm formAction={formAction} />

      {state.status === 'error' && state.message && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.status === 'success' && state.data && (
        <AnalysisResults results={state.data} />
      )}
    </div>
  );
}
