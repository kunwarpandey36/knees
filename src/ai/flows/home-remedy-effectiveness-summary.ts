'use server';
/**
 * @fileOverview Summarizes user reviews and ratings for a specific home remedy using AI.
 *
 * - homeRemedyEffectivenessSummary - A function that summarizes user feedback for a given home remedy.
 * - HomeRemedyEffectivenessSummaryInput - The input type for the homeRemedyEffectivenessSummary function.
 * - HomeRemedyEffectivenessSummaryOutput - The return type for the homeRemedyEffectivenessSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HomeRemedyEffectivenessSummaryInputSchema = z.object({
  remedyName: z.string().describe('The name of the home remedy.'),
  userReviews: z.array(z.string()).describe('An array of user review strings for the remedy.'),
  userRatings: z.array(z.number()).describe('An array of user ratings (numbers) for the remedy.'),
});
export type HomeRemedyEffectivenessSummaryInput = z.infer<typeof HomeRemedyEffectivenessSummaryInputSchema>;

const HomeRemedyEffectivenessSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of user reviews and ratings for the home remedy.'),
});
export type HomeRemedyEffectivenessSummaryOutput = z.infer<typeof HomeRemedyEffectivenessSummaryOutputSchema>;

export async function homeRemedyEffectivenessSummary(
  input: HomeRemedyEffectivenessSummaryInput
): Promise<HomeRemedyEffectivenessSummaryOutput> {
  return homeRemedyEffectivenessSummaryFlow(input);
}

const homeRemedyEffectivenessSummaryPrompt = ai.definePrompt({
  name: 'homeRemedyEffectivenessSummaryPrompt',
  input: {schema: HomeRemedyEffectivenessSummaryInputSchema},
  output: {schema: HomeRemedyEffectivenessSummaryOutputSchema},
  prompt: `You are an AI assistant specializing in summarizing user reviews and ratings for home remedies.

  Given the following home remedy name, user reviews, and user ratings, generate a concise summary of the remedy's effectiveness based on user experiences.

  Remedy Name: {{{remedyName}}}
  User Reviews: {{#each userReviews}}{{{this}}}\n{{/each}}
  User Ratings: {{#each userRatings}}{{{this}}} {{/each}}

  Summary:`,
});

const homeRemedyEffectivenessSummaryFlow = ai.defineFlow(
  {
    name: 'homeRemedyEffectivenessSummaryFlow',
    inputSchema: HomeRemedyEffectivenessSummaryInputSchema,
    outputSchema: HomeRemedyEffectivenessSummaryOutputSchema,
  },
  async input => {
    const {output} = await homeRemedyEffectivenessSummaryPrompt(input);
    return output!;
  }
);
