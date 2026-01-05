
'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing personalized financial advice to students.
 *
 * - `getFinancialAdvice` - A function that takes a student's question and financial context to return tailored advice.
 * - `FinancialAdviceInput` - The input type for the `getFinancialAdvice` function.
 * - `FinancialAdviceOutput` - The output type for the `getFinancialAdvice` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Expense, Goal } from '@/lib/types';

// Define schemas for complex types
const GoalSchema = z.object({
    id: z.string(),
    name: z.string(),
    targetAmount: z.number(),
    savedAmount: z.number(),
    deadline: z.string().describe("The goal's deadline in ISO 8601 format."),
    icon: z.string(),
    color: z.string(),
    lastFundedDate: z.string().optional().describe("The date the goal was last funded in ISO 8601 format."),
});

const ExpenseSchema = z.object({
    id: z.string(),
    description: z.string(),
    amount: z.number(),
    category: z.string(),
    date: z.string().describe("The date of the expense in ISO 8601 format."),
});


const FinancialContextSchema = z.object({
    monthlyIncome: z.number().describe("The student's total monthly income or allowance."),
    monthlyExpenses: z.number().describe("The student's total spending for the current month."),
    savingsGoals: z.array(GoalSchema).describe("A list of the student's current savings goals."),
    recentTransactions: z.array(ExpenseSchema).describe("A list of the student's most recent transactions."),
});
export type FinancialContext = z.infer<typeof FinancialContextSchema>;


const FinancialAdviceInputSchema = z.object({
  question: z.string().describe("The student's specific question about their finances."),
  context: FinancialContextSchema.describe("The student's overall financial situation."),
});

export type FinancialAdviceInput = z.infer<typeof FinancialAdviceInputSchema>;


const FinancialAdviceOutputSchema = z.object({
  response: z.string().describe('A helpful, conversational, and actionable response to the student\'s question, formatted as a single string. Use markdown for lists or emphasis.'),
});

export type FinancialAdviceOutput = z.infer<typeof FinancialAdviceOutputSchema>;

export async function getFinancialAdvice(input: FinancialAdviceInput): Promise<FinancialAdviceOutput> {
  return financialAdviceFlow(input);
}


const financialAdvicePrompt = ai.definePrompt({
  name: 'financialAdvicePrompt',
  input: { schema: FinancialAdviceInputSchema },
  output: { schema: FinancialAdviceOutputSchema },
  prompt: `You are a friendly and encouraging financial advisor for college students in India. Your name is 'FinBot'.
You are chatting with a student who has asked for financial advice. Use the provided financial context to give a personalized, actionable, and easy-to-understand response.

Keep your answers concise and to the point. If you provide a list, use markdown bullet points.

**Student's Financial Context:**
- Monthly Income/Allowance: ₹{{context.monthlyIncome}}
- Total Monthly Expenses: ₹{{context.monthlyExpenses}}
- Savings Goals: {{JSON.stringify context.savingsGoals}}
- Recent Transactions: {{JSON.stringify context.recentTransactions}}

**Student's Question:**
"{{{question}}}"

Based on this, provide a helpful and supportive answer. Address the student directly.
`,
});

const financialAdviceFlow = ai.defineFlow(
  {
    name: 'financialAdviceFlow',
    inputSchema: FinancialAdviceInputSchema,
    outputSchema: FinancialAdviceOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await financialAdvicePrompt(input);
      return output!;
    } catch (error) {
      console.error('Error in financialAdviceFlow:', error);
      throw new Error('Failed to generate financial advice.');
    }
  }
);
