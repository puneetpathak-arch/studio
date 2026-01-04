
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Goal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AddFundsDialog } from '@/components/goals/add-funds-dialog';
import { useState, useEffect, useMemo } from 'react';
import { useUser } from '@/firebase';
import { getGoals, addFundsToGoal } from '@/services/firestore';
import { goalIcons } from '@/components/goals/add-goal-dialog';
import { Skeleton } from '@/components/ui/skeleton';

function GoalCard({ goal, onFundAdded }: { goal: Goal, onFundAdded: (goalId: string, amount: number) => void }) {
  const percentage = Math.round((goal.savedAmount / goal.targetAmount) * 100);
  
  const IconComponent = useMemo(() => {
    const iconData = goalIcons.find(i => i.name === goal.icon);
    return iconData ? iconData.icon : Target;
  }, [goal.icon]);

  return (
    <Card
      className="flex flex-col h-full border-border"
    >
      <CardHeader className="pb-4 h-24 flex justify-center">
        <CardTitle className="flex items-center gap-2 text-lg">
          <IconComponent
            className="w-6 h-6 text-primary shrink-0"
          />
          <span className="font-bold">{goal.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center gap-4">
        <div className="space-y-2">
            <div className='flex justify-between items-baseline'>
                <span className='text-sm text-muted-foreground'>Progress</span>
                <span className="font-bold text-primary">{percentage}%</span>
            </div>
          <Progress value={percentage} />
          <div className="text-sm text-muted-foreground text-right">
            <span className="font-semibold text-foreground">₹{goal.savedAmount.toLocaleString()}</span> / ₹{goal.targetAmount.toLocaleString()}
          </div>
        </div>
        <AddFundsDialog goal={goal} onFundAdded={onFundAdded} />
      </CardContent>
    </Card>
  );
}

export function GoalsCard() {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchGoals = async () => {
        setLoading(true);
        const userGoals = await getGoals(user.uid);
        setGoals(userGoals);
        setLoading(false);
      };
      fetchGoals();
    } else {
      setLoading(false);
    }
  }, [user]);


  const handleFundAdded = async (goalId: string, amount: number) => {
    if (!user) return;
    await addFundsToGoal(user.uid, goalId, amount);
    setGoals(prevGoals =>
      prevGoals.map(g =>
        g.id === goalId ? { ...g, savedAmount: g.savedAmount + amount } : g
      )
    );
  };
  
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Your Goals <Target className="w-5 h-5" />
          </CardTitle>
          <Link href="/goals" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <CardDescription>
          Your progress towards your financial goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center px-10 md:px-6">
        {loading ? <Skeleton className="h-[200px] w-full" /> 
        : goals.length > 0 ? (
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {goals.map((goal) => (
                <CarouselItem key={goal.id} className="basis-full md:basis-1/2 pl-2">
                  <div className="p-1 h-full">
                    <GoalCard goal={goal} onFundAdded={handleFundAdded} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        ) : (
          <div className="flex items-center justify-center h-full w-full py-8">
            <p className="text-muted-foreground">No savings goals set yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
