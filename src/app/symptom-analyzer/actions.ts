'use server';

import { analyzeSymptoms, SymptomAnalysisOutput } from '@/ai/flows/personalized-symptom-analysis';
import { z } from 'zod';

const symptomAnalysisFormSchema = z.object({
  symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }),
  dietaryHabits: z.enum(['vegetarian', 'non-vegetarian'], { required_error: "Please select your dietary preference." }),
  lifestyleDetails: z.string().min(10, { message: "Please describe your lifestyle in at least 10 characters." }),
});

export type FormState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  data?: SymptomAnalysisOutput;
};

export async function getAnalysis(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    symptoms: formData.get('symptoms'),
    dietaryHabits: formData.get('dietaryHabits'),
    lifestyleDetails: formData.get('lifestyleDetails'),
  };

  const validationResult = symptomAnalysisFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      status: 'error',
      message: validationResult.error.errors.map(e => e.message).join(', '),
    };
  }

  try {
    const result = await analyzeSymptoms(validationResult.data);
    return {
      status: 'success',
      message: 'Analysis complete.',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
