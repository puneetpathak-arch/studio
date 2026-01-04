"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Terminal } from "lucide-react";
import { getSavingsSuggestions } from "@/ai/flows/ai-savings-suggestions";
import { expenses } from "@/lib/data";

const knownTipsForAI = [
  "Use student discounts where available.",
  "Opt for college bus services over private transport.",
  "Cook simple meals instead of eating out frequently.",
  "Share subscription costs with friends.",
  "Buy second-hand textbooks or use library resources.",
];

export function AiSavingsCard() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await getSavingsSuggestions({
        spendingData: JSON.stringify(expenses),
        knownTips: JSON.stringify(knownTipsForAI),
      });
      setSuggestions(result.suggestions);
    } catch (err) {
      setError("Failed to generate suggestions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI-Powered Savings Helper
        </CardTitle>
        <CardDescription>
          Get personalized savings suggestions based on your spending habits.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[120px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : suggestions.length > 0 ? (
          <ul className="space-y-2 list-disc list-inside">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-foreground">
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-center text-muted-foreground py-6">
            Click the button below to get your personalized tips!
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateSuggestions} disabled={loading} className="w-full">
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Generate Suggestions</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
