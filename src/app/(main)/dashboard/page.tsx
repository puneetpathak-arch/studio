
'use client';

import { useState, useEffect } from "react";
import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { GoalsCard } from "@/app/(main)/dashboard/goals-card";
import { RecentExpensesCard } from "@/components/dashboard/recent-expenses-card";
import { AiSavingsCard } from "@/components/dashboard/ai-savings-card";
import { user, goals, tips } from "@/lib/data";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";
import { BarChart, Target, Lightbulb } from "lucide-react";
import { AddExpenseSheet } from "@/components/add-expense-sheet";
import { TipsCard } from "@/components/dashboard/tips-card";

export default function DashboardPage() {
    const [greeting, setGreeting] = useState('');
    const [emoji, setEmoji] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Good Morning');
            setEmoji('☀️');
        } else if (hour < 17) {
            setGreeting('Good Afternoon');
            setEmoji('👋');
        } else {
            setGreeting('Good Evening');
            setEmoji('🌙');
        }
    }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-bold text-primary">{greeting}, {user.name.split(' ')[0]}! {emoji}</h1>
        <p className="text-muted-foreground text-base">Here's your financial overview for this month.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <QuickStatCard icon={BarChart} label="This Week" value="₹1,860" />
          <QuickStatCard icon={Target} label="Active Goals" value={goals.length.toString()} />
          <QuickStatCard icon={Lightbulb} label="New Tips" value={tips.length.toString()} />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <BudgetSummaryCard />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <GoalsCard />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <RecentExpensesCard />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <AiSavingsCard />
        </div>
      </div>
      
       <div className="grid gap-6 lg:grid-cols-2">
         <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <TipsCard />
        </div>
        <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            
        </div>
      </div>
      <AddExpenseSheet />
    </div>
  );
}
