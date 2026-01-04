'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Goal } from '@/lib/types';
import { Target, Plus } from 'lucide-react';
import { AddGoalDialog, goalIcons } from '@/components/goals/add-goal-dialog';
import { AddFundsDialog } from '@/components/goals/add-funds-dialog';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { getGoals, addGoal, addFundsToGoal } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { LucideIcon } from 'lucide-react';

function GoalCard({ goal, onFundAdded }: { goal: Goal; onFundAdded: (goalId: string, amount: number) => void; }) {
  const percentage = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));

  const IconComponent = useMemo(() => {
    const iconData = goalIcons.find(i => i.name === goal.icon);
    return iconData ? iconData.icon : Target;
  }, [goal.icon]);

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <IconComponent className="w-7 h-7 text-primary" />
          <span>{goal.name}</span>
        </CardTitle>
        <CardDescription>
            Deadline: {new Date(goal.deadline).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="space-y-2">
            <div className='flex justify-between items-baseline'>
                <span className='text-sm text-muted-foreground'>
                    Saved: <span className="font-bold text-foreground">₹{goal.savedAmount.toLocaleString()}</span>
                </span>
                <span className='text-sm text-muted-foreground'>
                    Target: <span className="font-bold text-foreground">₹{goal.targetAmount.toLocaleString()}</span>
                </span>
            </div>
          <Progress value={percentage} />
          <div className="text-right font-bold text-primary">{percentage}%</div>
        </div>
      </CardContent>
      <CardFooter>
        <AddFundsDialog goal={goal} onFundAdded={onFundAdded} />
      </CardFooter>
    </Card>
  );
}

export default function GoalsPage() {
  const { user } = useUser();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  const handleAddGoal = async (newGoalData: Omit<Goal, 'id' | 'savedAmount' | 'color' | 'icon'> & { icon: string; }) => {
    if (!user) return;

    const goalToAdd = {
        name: newGoalData.name,
        targetAmount: newGoalData.targetAmount,
        deadline: newGoalData.deadline,
        icon: newGoalData.icon,
    };

    const newId = await addGoal(user.uid, goalToAdd);
    const newGoal: Goal = {
      ...goalToAdd,
      id: newId,
      savedAmount: 0,
      color: `chart-${(goals.length % 5) + 1}` as Goal['color'],
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
    toast({
      title: "Goal Added!",
      description: `Your new goal "${newGoal.name}" has been created.`,
    })
  };

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Target className="w-7 h-7 md:w-8 md:h-8"/>
                Savings Goals
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
                Track and manage your financial goals.
            </p>
        </div>
        <AddGoalDialog onAddGoal={handleAddGoal}>
             <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Goal
            </Button>
        </AddGoalDialog>
      </div>

      {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[300px] w-full" />)}
          </div>
      ) : goals.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {goals.map((goal, index) => (
            <div key={goal.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
              <GoalCard goal={goal} onFundAdded={handleFundAdded} />
            </div>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center text-center p-12 space-y-4">
            <Target className="w-16 h-16 text-muted-foreground/50"/>
            <CardHeader className="p-0">
                <CardTitle>No Goals Yet</CardTitle>
                <CardDescription>
                    Create a savings goal to get started on your financial journey.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <AddGoalDialog onAddGoal={handleAddGoal}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Goal
                    </Button>
                </AddGoalDialog>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
