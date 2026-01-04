
'use client';

import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { SpendingBarChart } from "@/components/analytics/spending-bar-chart";
import { BarChartHorizontal } from "lucide-react";

export default function AnalyticsPage() {

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <BarChartHorizontal className="w-8 h-8"/>
            Your Spending Insights
        </h1>
        <p className="text-muted-foreground">Analyze your spending patterns.</p>
      </div>
      
       <div className="grid gap-6 lg:grid-cols-2">
         <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CategoryPieChart />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <SpendingBarChart />
        </div>
      </div>
    </div>
  );
}
