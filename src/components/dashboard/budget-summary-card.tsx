
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { budget } from '@/lib/data';
import { BudgetProgressCircle } from './budget-progress-circle';
import { IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function BudgetSummaryCard() {
  const percentage = Math.round((budget.spent / budget.total) * 100);
  const remaining = budget.total - budget.spent;

  return (
    <Card className="relative overflow-hidden h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2 z-10 relative">
        <div>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>
            Your spending for{' '}
            {new Date().toLocaleString('default', { month: 'long' })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col">
             <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">
                  ₹{budget.spent.toLocaleString()}
                </span>
                 <span className="text-lg text-muted-foreground">
                  / ₹{budget.total.toLocaleString()}
              </span>
             </div>
            <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
              <IndianRupee className="w-4 h-4" />
              {percentage > 100
                ? `You are ₹${(
                    budget.spent - budget.total
                  ).toLocaleString()} over budget.`
                : `You have ₹${remaining.toLocaleString()} remaining.`}
            </p>
             <div className="mt-6">
                <Button asChild variant="outline">
                    <Link href="#">View Details</Link>
                </Button>
             </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <BudgetProgressCircle percentage={percentage} />
             <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: 'hsl(var(--chart-1))' }}>{percentage}%</span>
                <span className="text-sm text-muted-foreground">Spent</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
