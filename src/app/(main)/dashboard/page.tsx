
'use client';

import { useState, useEffect } from "react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { GoalsCard } from "@/app/(main)/dashboard/goals-card";
import { RecentExpensesCard } from "@/components/dashboard/recent-expenses-card";
import { AiSavingsCard } from "@/components/dashboard/ai-savings-card";
import { user, goals, tips } from "@/lib/data";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";
import { TrendingUp, Target, Sparkles, BarChart, Lightbulb } from "lucide-react";
import { TipsCard } from "@/components/dashboard/tips-card";
import { AddExpenseSheet } from "@/components/add-expense-sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');

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
          <QuickStatCard icon={TrendingUp} label="This Week" value="₹1,860" gradient="from-indigo-50 to-purple-50" iconBg="from-indigo-500 via-purple-500 to-pink-500" />
          <QuickStatCard icon={Sparkles} label="New Tips" value={tips.length.toString()} gradient="from-pink-50 to-orange-50" iconBg="from-pink-500 via-rose-500 to-orange-500" />
          <QuickStatCard icon={Target} label="Active Goals" value={goals.length.toString()} gradient="from-green-50 to-emerald-50" iconBg="from-green-500 to-emerald-600" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
            <BudgetSummaryCard />
        </div>
        <div className="md:col-span-2">
            <GoalsCard />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
         <div className="md:col-span-3">
            <RecentExpensesCard />
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
          <AddExpenseSheet>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
              <Plus className="h-6 w-6" />
            </Button>
          </AddExpenseSheet>
        </div>
    </div>
  );
}
