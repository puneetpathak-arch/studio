
'use client';

import { useState, useEffect } from "react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { GoalsCard } from "@/app/(main)/dashboard/goals-card";
import { RecentExpensesCard } from "@/components/dashboard/recent-expenses-card";
import { AiSavingsCard } from "@/components/dashboard/ai-savings-card";
import { user, goals, tips, expenses as initialExpenses, budget as initialBudget } from "@/lib/data";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";
import { TrendingUp, Target, Sparkles } from "lucide-react";
import { TipsCard } from "@/components/dashboard/tips-card";
import { AddExpenseSheet } from "@/components/add-expense-sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Expense, Budget } from "@/lib/types";

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
    const [budget, setBudget] = useState<Budget>(initialBudget);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
        } else if (hour < 17) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    useEffect(() => {
        const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        const updatedCategoryBudgets = budget.categoryBudgets.map(cb => {
            const spent = expenses
                .filter(exp => exp.category === cb.category)
                .reduce((acc, exp) => acc + exp.amount, 0);
            return { ...cb, spent };
        });

        setBudget(prevBudget => ({
            ...prevBudget,
            spent: totalSpent,
            categoryBudgets: updatedCategoryBudgets
        }));
    }, [expenses, budget.categoryBudgets]);


    const handleAddExpense = (newExpense: Omit<Expense, 'id' | 'date'>) => {
        const expenseToAdd: Expense = {
            ...newExpense,
            id: `exp-${Date.now()}`,
            date: new Date().toISOString(),
        };
        setExpenses(prevExpenses => [expenseToAdd, ...prevExpenses]);
    };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-2 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-orange-400/10"></div>
         <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                {greeting}, {user.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-indigo-100 text-lg">Here's your financial overview for this month.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickStatCard icon={TrendingUp} label="This Week" value="₹1,860" className="text-indigo-600" />
          <QuickStatCard icon={Sparkles} label="New Tips" value={tips.length.toString()} className="text-pink-600" />
          <QuickStatCard icon={Target} label="Active Goals" value={goals.length.toString()} className="text-green-600"/>
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
            <BudgetSummaryCard budget={budget} />
        </div>
        <div className="md:col-span-2">
            <GoalsCard />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
         <div className="md:col-span-3">
            <RecentExpensesCard expenses={expenses} />
        </div>
        <div className="md:col-span-2">
            <AiSavingsCard />
        </div>
      </div>
      
       <div className="grid gap-6">
         <div>
            <TipsCard />
        </div>
      </div>
       <div className="lg:hidden fixed bottom-24 right-6 z-50">
          <AddExpenseSheet onExpenseAdded={handleAddExpense}>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </AddExpenseSheet>
        </div>
    </div>
  );
}
