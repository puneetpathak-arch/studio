
'use client';

import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { SpendingBarChart } from "@/components/analytics/spending-bar-chart";
import { BarChartHorizontal, IndianRupee, PieChart, TrendingUp, CalendarDays } from "lucide-react";
import { QuickStatCard } from "@/components/dashboard/quick-stat-card";

export default function AnalyticsPage() {

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
          <QuickStatCard icon={IndianRupee} label="Avg. Daily Spend" value="₹690" gradient="from-indigo-50 to-purple-50" iconBg="from-indigo-500 via-purple-500 to-pink-500" className="text-indigo-600" />
          <QuickStatCard icon={PieChart} label="Most Spent On" value="Mess" gradient="from-pink-50 to-orange-50" iconBg="from-pink-500 via-rose-500 to-orange-500" className="text-pink-600" />
          <QuickStatCard icon={CalendarDays} label="Highest Day" value="July 1st" gradient="from-green-50 to-emerald-50" iconBg="from-green-500 to-emerald-600" className="text-green-600" />
          <QuickStatCard icon={TrendingUp} label="Trend" value="-15%" gradient="from-red-50 to-orange-50" iconBg="from-red-500 to-orange-600" className="text-green-600"/>
      </div>
      
       <div className="grid gap-6 md:grid-cols-2">
         <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CategoryPieChart />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SpendingBarChart />
        </div>
      </div>
    </div>
  );
}
