'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing AI-powered savings suggestions to students based on their spending habits.
 *
 * - `getSavingsSuggestions` -  A function that takes a student's spending data as input and returns personalized savings suggestions.
 * - `SavingsSuggestionsInput` - The input type for the `getSavingsSuggestions` function.
 * - `SavingsSuggestionsOutput` - The output type for the `getSavingsSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavingsSuggestionsInputSchema = z.object({
  spendingData: z.string().describe('A JSON string containing the student\'s spending data, including categories, amounts, and dates.'),
  knownTips: z.string().describe('A JSON string containing an array of known tips and tricks for student savings.'),
});

export type SavingsSuggestionsInput = z.infer<typeof SavingsSuggestionsInputSchema>;

const SavingsSuggestionsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of personalized savings suggestions for the student.'),
});

export type SavingsSuggestionsOutput = z.infer<typeof SavingsSuggestionsOutputSchema>;

export async function getSavingsSuggestions(input: SavingsSuggestionsInput): Promise<SavingsSuggestionsOutput> {
  return savingsSuggestionsFlow(input);
}

const savingsSuggestionsPrompt = ai.definePrompt({
  name: 'savingsSuggestionsPrompt',
  input: {schema: SavingsSuggestionsInputSchema},
  output: {schema: SavingsSuggestionsOutputSchema},
  prompt: `You are a financial advisor for college students in India. Analyze the student's spending habits provided in the spendingData, and suggest potential savings opportunities based on your knowledge and the provided knownTips. Be specific and provide actionable advice.

Spending Data: {{{spendingData}}}

Known Tips and Tricks: {{{knownTips}}}

Output an array of personalized savings suggestions.  The array should be well formatted as a JSON string.
`,
});

const savingsSuggestionsFlow = ai.defineFlow(
  {
    name: 'savingsSuggestionsFlow',
    inputSchema: SavingsSuggestionsInputSchema,
    outputSchema: SavingsSuggestionsOutputSchema,
  },
  async input => {
    try {
      // Parse the spending data and known tips from JSON strings
      const spendingData = JSON.parse(input.spendingData);
      const knownTips = JSON.parse(input.knownTips);

      // It would be ideal to do some preprocessing of the data here to make it easier for the LLM to work with.
      // However, since we cannot do computation in Handlebars, we will pass the raw data to the prompt.

      const {output} = await savingsSuggestionsPrompt({
        ...input,
        spendingData: JSON.stringify(spendingData),
        knownTips: JSON.stringify(knownTips),
      });

      return output!;
    } catch (error) {
      console.error('Error in savingsSuggestionsFlow:', error);
      throw new Error('Failed to generate savings suggestions.');
    }
  }
);
