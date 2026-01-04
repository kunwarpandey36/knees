'use server';

/**
 * @fileOverview Provides personalized symptom analysis for knee pain in older Indian women.
 *
 * - analyzeSymptoms - Analyzes symptoms and provides personalized advice.
 * - SymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - SymptomAnalysisOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('Description of symptoms experienced in the knee, their severity, and duration.'),
  dietaryHabits: z.enum(['vegetarian', 'non-vegetarian']).describe('Dietary preference: vegetarian or non-vegetarian.'),
  lifestyleDetails: z
    .string()
    .describe('Details about the lifestyle, activity level, and any other relevant health conditions.'),
});
export type SymptomAnalysisInput = z.infer<typeof SymptomAnalysisInputSchema>;

const SymptomAnalysisOutputSchema = z.object({
  potentialCauses: z.string().describe('Potential causes of the knee pain based on the input provided.'),
  personalizedAdvice: z
    .string()
    .describe('Personalized advice on managing the knee pain, including dietary and lifestyle adjustments.'),
});
export type SymptomAnalysisOutput = z.infer<typeof SymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(
  input: SymptomAnalysisInput
): Promise<SymptomAnalysisOutput> {
  return symptomAnalysisFlow(input);
}

const symptomAnalysisPrompt = ai.definePrompt({
  name: 'symptomAnalysisPrompt',
  input: {schema: SymptomAnalysisInputSchema},
  output: {schema: SymptomAnalysisOutputSchema},
  prompt: `You are a healthcare advisor specializing in providing advice to older Indian women experiencing knee pain. Analyze the provided symptoms, dietary habits, and lifestyle details to provide potential causes and tailored advice.

Symptoms: {{{symptoms}}}
Dietary Habits: {{{dietaryHabits}}}
Lifestyle Details: {{{lifestyleDetails}}}

Respond in a tone that is both empathetic and informative, providing actionable steps to manage knee pain.

Potential Causes:
Personalized Advice: `,
});

const symptomAnalysisFlow = ai.defineFlow(
  {
    name: 'symptomAnalysisFlow',
    inputSchema: SymptomAnalysisInputSchema,
    outputSchema: SymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalysisPrompt(input);
    return output!;
  }
);
