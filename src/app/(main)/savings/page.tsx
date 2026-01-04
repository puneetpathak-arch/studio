
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles, Terminal } from 'lucide-react';
import {
  getSavingsSuggestions,
  type Suggestion,
} from '@/ai/flows/ai-savings-suggestions';
import { tips as knownTips } from '@/lib/data';
import { AddGoalDialog } from '@/components/goals/add-goal-dialog';
import type { Expense, Goal } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { getExpenses, getGoals, addGoal } from '@/services/firestore';

function SuggestionCard({
  suggestion,
  onDismiss,
  onAddGoal,
}: {
  suggestion: Suggestion;
  onDismiss: () => void;
  onAddGoal: () => void;
}) {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-primary via-purple-500 to-indigo-600 text-primary-foreground shadow-2xl relative overflow-hidden animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl">
          <span>{suggestion.insight}</span>
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Based on your recent activity.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center gap-4">
        <p className="text-lg">{suggestion.suggestion}</p>
        <div>
          <p className="text-sm text-green-300">Potential Savings</p>
          <p className="text-5xl font-bold text-green-300">
            ₹{suggestion.potentialMonthlySavings.toLocaleString()}
            <span className="text-xl">/month</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button variant="secondary" className="w-full" onClick={onAddGoal}>
          Create Savings Goal
        </Button>
        <Button variant="ghost" className="w-full hover:bg-white/10" onClick={onDismiss}>
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SavingsPage() {
  const { user } = useUser();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddGoalDialogOpen, setIsAddGoalDialogOpen] = useState(false);
  const [initialGoalData, setInitialGoalData] = useState<Partial<Omit<Goal, 'id' | 'savedAmount' | 'color'>> | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setDataLoading(true);
        const [userExpenses, userGoals] = await Promise.all([
          getExpenses(user.uid),
          getGoals(user.uid)
        ]);
        setExpenses(userExpenses);
        setGoals(userGoals);
        setDataLoading(false);
      };
      fetchData();
    } else {
      setDataLoading(false);
    }
  }, [user]);

  const handleGenerateSuggestions = async () => {
    if (!user || expenses.length === 0) {
        toast({
            variant: 'destructive',
            title: 'Not enough data',
            description: 'We need some spending data to generate tips. Please add some expenses first.',
        });
        return;
    }

    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await getSavingsSuggestions({
        spendingData: JSON.stringify(expenses),
        knownTips: JSON.stringify(knownTips.map(t => t.text)),
      });
      setSuggestions(result.suggestions);
    } catch (err) {
      setError('Failed to generate suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (indexToDismiss: number) => {
    setSuggestions(currentSuggestions =>
      currentSuggestions.filter((_, index) => index !== indexToDismiss)
    );
  };

  const handleAddGoalClick = (suggestion: Suggestion) => {
    setInitialGoalData({
      name: suggestion.insight,
      targetAmount: suggestion.potentialMonthlySavings,
    });
    setIsAddGoalDialogOpen(true);
  };

  const handleAddGoal = async (newGoalData: Omit<Goal, 'id' | 'savedAmount' | 'color'>) => {
    if (!user) return;

    const newId = await addGoal(user.uid, newGoalData);
    const newGoal: Goal = {
      ...newGoalData,
      id: newId,
      savedAmount: 0,
      color: `chart-${(goals.length % 5) + 1}` as Goal['color'],
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
    toast({
      title: "Goal Added!",
      description: `Your new goal "${newGoal.name}" has been created.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          Smart Savings Tips 🤖
        </h1>
        <p className="text-base text-muted-foreground">
          Your personal AI financial advisor.
        </p>
      </div>

      <div className="min-h-[400px] flex flex-col justify-center">
        {loading || dataLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">
                {loading ? 'Analyzing your habits...' : 'Loading your data...'}
            </p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : suggestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion, index) => (
              <SuggestionCard
                key={index}
                suggestion={suggestion}
                onDismiss={() => handleDismiss(index)}
                onAddGoal={() => handleAddGoalClick(suggestion)}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center p-8 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                Get Personalized Savings Tips
              </CardTitle>
              <CardDescription>
                Let our AI analyze your spending and find hidden opportunities to save money.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateSuggestions} disabled={loading || dataLoading} size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate My Tips
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      <AddGoalDialog
        open={isAddGoalDialogOpen}
        onOpenChange={setIsAddGoalDialogOpen}
        onAddGoal={handleAddGoal}
        initialData={initialGoalData}
       />
    </div>
  );
}
