
'use client';

import { useState } from 'react';
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
import { Loader2, Sparkles, Terminal, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  getSavingsSuggestions,
  type Suggestion,
} from '@/ai/flows/ai-savings-suggestions';
import { expenses, tips as knownTips } from '@/lib/data';

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  return (
    <Card className="flex flex-col h-full bg-gradient-to-br from-primary via-purple-500 to-indigo-600 text-primary-foreground shadow-2xl relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
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
        <Button variant="secondary" className="w-full">
          Create Savings Goal
        </Button>
        <Button variant="ghost" className="w-full hover:bg-white/10">
          Dismiss
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function SavingsPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestions = async () => {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          Smart Savings Tips 🤖
        </h1>
        <p className="text-muted-foreground">
          Your personal AI financial advisor.
        </p>
      </div>

      <div className="min-h-[400px] flex flex-col justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Analyzing your habits...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : suggestions.length > 0 ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {suggestions.map((suggestion, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1 h-full">
                    <SuggestionCard suggestion={suggestion} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        ) : (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                Get Personalized Savings Tips
              </CardTitle>
              <CardDescription>
                Let our AI analyze your spending and find hidden opportunities to save money.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateSuggestions} disabled={loading} size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate My Tips
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
