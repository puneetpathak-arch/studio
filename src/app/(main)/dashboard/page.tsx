'use client';

import { useState, useEffect, useMemo } from 'react';
import { BudgetSummaryCard } from '@/components/dashboard/budget-summary-card';
import { GoalsCard } from '@/app/(main)/dashboard/goals-card';
import { RecentExpensesCard } from '@/components/dashboard/recent-expenses-card';
import { AiSavingsCard } from '@/components/dashboard/ai-savings-card';
import { user as mockUser, tips, goals as initialGoals } from '@/lib/data';
import { QuickStatCard } from '@/components/dashboard/quick-stat-card';
import { TrendingUp, Target, Sparkles } from 'lucide-react';
import { TipsCard } from '@/components/dashboard/tips-card';
import { AddExpenseSheet } from '@/components/add-expense-sheet';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Expense, Budget, Goal } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { startOfWeek, isWithinInterval } from 'date-fns';
import { useUser } from '@/firebase';
import { getExpenses, addExpense, getBudget, updateBudget } from '@/services/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
    const { user } = useUser();
    const [greeting, setGreeting] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [goals, setGoals] = useState<Goal[]>(initialGoals);
    const [budget, setBudget] = useState<Budget | null>(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        if (user) {
            const fetchDashboardData = async () => {
                setLoading(true);
                const [userExpenses, userBudget] = await Promise.all([
                    getExpenses(user.uid),
                    getBudget(user.uid),
                ]);
                setExpenses(userExpenses);
                setBudget(userBudget);
                setLoading(false);
            };
            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, [user]);

     const handleAddExpense = async (newExpense: Omit<Expense, 'id' | 'date'>) => {
        if (!user) return;
        const newId = await addExpense(user.uid, newExpense);
        const expenseToAdd: Expense = {
            ...newExpense,
            id: newId,
            date: new Date().toISOString(),
        };
        setExpenses(prevExpenses => [expenseToAdd, ...prevExpenses]);
    };

    const calculatedBudget = useMemo(() => {
        if (!budget) return null;

        const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        const updatedCategoryBudgets = budget.categoryBudgets.map(cb => {
            const spent = expenses
                .filter(exp => exp.category === cb.category)
                .reduce((acc, exp) => acc + exp.amount, 0);
            return { ...cb, spent };
        });

        return { ...budget, spent: totalSpent, categoryBudgets: updatedCategoryBudgets };
    }, [expenses, budget]);


    const weeklySpend = useMemo(() => {
        if (!expenses) return 0;
        const today = new Date();
        const start = startOfWeek(today);
        return expenses
            .filter(exp => isWithinInterval(new Date(exp.date), { start, end: today }))
            .reduce((acc, exp) => acc + exp.amount, 0);
    }, [expenses]);

    const userName = user?.displayName || mockUser.name.split(' ')[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-2 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-400/10"></div>
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {greeting}, {userName}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">Here's your financial overview for this month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickStatCard icon={TrendingUp} label="This Week" value={`₹${weeklySpend.toLocaleString()}`} className="text-indigo-600" />
          <QuickStatCard icon={Sparkles} label="New Tips" value={tips.length.toString()} className="text-pink-600" />
          <QuickStatCard icon={Target} label="Active Goals" value={goals.length.toString()} className="text-green-600"/>
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
             {loading || !calculatedBudget ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <BudgetSummaryCard budget={calculatedBudget} />
            )}
        </div>
        <div className="md:col-span-2">
            <GoalsCard />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
         <div className="md:col-span-3">
            <RecentExpensesCard expenses={expenses} loading={loading} />
        </div>
        <div className="md-col-span-2">
            <AiSavingsCard />
        </div>
      </div>
      
       <div className="grid gap-6">
         <div>
            <TipsCard />
        </div>
      </div>
        {isMobile ? null : (
            <div className="fixed bottom-8 right-8 z-50">
                <AddExpenseSheet onExpenseAdded={handleAddExpense}>
                    <Button size="icon" className="h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90">
                        <Plus className="h-8 w-8" />
                    </Button>
                </AddExpenseSheet>
            </div>
        )}
    </div>
  );
}
