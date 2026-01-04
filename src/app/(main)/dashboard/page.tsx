import { BudgetSummaryCard } from "@/components/dashboard/budget-summary-card";
import { GoalsCard } from "@/components/dashboard/goals-card";
import { RecentExpensesCard } from "@/components/dashboard/recent-expenses-card";
import { TipsCard } from "@/components/dashboard/tips-card";
import { AiSavingsCard } from "@/components/dashboard/ai-savings-card";
import { CategoryPieChart } from "@/components/analytics/category-pie-chart";
import { SpendingBarChart } from "@/components/analytics/spending-bar-chart";
import { user } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's your financial overview for this month.</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <BudgetSummaryCard />
        <div className="lg:col-span-2">
          <GoalsCard />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentExpensesCard />
        <div className="lg:col-span-2">
            <AiSavingsCard />
        </div>
      </div>
      
       <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart />
        <SpendingBarChart />
      </div>
    </div>
  );
}
