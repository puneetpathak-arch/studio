'use client';

import { useState, useEffect, useMemo } from 'react';
import { SpendingBarChart } from "@/components/analytics/spending-bar-chart";
import { BarChartHorizontal, IndianRupee, PieChart, TrendingUp, CalendarDays, Loader2 } from "lucide-react";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";
import { CategoryPieChart } from '@/components/analytics/category-pie-chart';
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from '@/firebase';
import { getBudget, getExpenses } from '@/services/firestore';
import type { Budget, Expense } from '@/lib/types';
import { startOfWeek, isWithinInterval, format } from 'date-fns';


export default function AnalyticsPage() {
  const { user } = useUser();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const [userBudget, userExpenses] = await Promise.all([
          getBudget(user.uid),
          getExpenses(user.uid),
        ]);
        
        const totalSpent = userExpenses.reduce((acc, exp) => acc + exp.amount, 0);
        const updatedCategoryBudgets = userBudget.categoryBudgets.map(cb => {
            const spent = userExpenses
                .filter(exp => exp.category === cb.category)
                .reduce((acc, exp) => acc + exp.amount, 0);
            return { ...cb, spent };
        });

        setBudget({ ...userBudget, spent: totalSpent, categoryBudgets: updatedCategoryBudgets });
        setExpenses(userExpenses);
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  const { avgDailySpend, mostSpentCategory, highestSpendingDay } = useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return { avgDailySpend: 0, mostSpentCategory: 'N/A', highestSpendingDay: 'N/A' };
    }

    const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const uniqueDays = new Set(expenses.map(e => new Date(e.date).toDateString())).size;
    const avgDailySpend = uniqueDays > 0 ? totalSpend / uniqueDays : 0;

    const categorySpends = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const mostSpentCategory = Object.keys(categorySpends).reduce((a, b) => categorySpends[a] > categorySpends[b] ? a : b, 'N/A');

    const dailySpends = expenses.reduce((acc, exp) => {
        const day = new Date(exp.date).toDateString();
        acc[day] = (acc[day] || 0) + exp.amount;
        return acc;
    }, {} as Record<string, number>);

    const highestDay = Object.keys(dailySpends).reduce((a,b) => dailySpends[a] > dailySpends[b] ? a : b, 'N/A');
    const highestSpendingDay = highestDay !== 'N/A' ? format(new Date(highestDay), 'MMMM do') : 'N/A';

    return { avgDailySpend, mostSpentCategory, highestSpendingDay };
  }, [expenses]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <BarChartHorizontal className="w-7 h-7 md:w-8 md:h-8"/>
            Your Spending Insights
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">Analyze your spending patterns.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <QuickStatCard icon={IndianRupee} label="Avg. Daily Spend" value={`₹${avgDailySpend.toFixed(0)}`} className="text-indigo-600" />
          <QuickStatCard icon={PieChart} label="Most Spent On" value={mostSpentCategory} className="text-pink-600" />
          <QuickStatCard icon={CalendarDays} label="Highest Day" value={highestSpendingDay} className="text-green-600" />
          <QuickStatCard icon={TrendingUp} label="Trend" value="N/A" className="text-green-600"/>
      </div>
      
       <div className="grid gap-6 md:grid-cols-2">
         <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CategoryPieChart budget={budget} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SpendingBarChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}
