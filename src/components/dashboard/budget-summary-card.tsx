import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { budget } from "@/lib/data";
import { AddExpenseSheet } from "../add-expense-sheet";

export function BudgetSummaryCard() {
  const percentage = (budget.spent / budget.total) * 100;

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Monthly Budget</CardTitle>
          <CardDescription>
            Your spending for {new Date().toLocaleString('default', { month: 'long' })}
          </CardDescription>
        </div>
        <AddExpenseSheet />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">
                ₹{budget.spent.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
                / ₹{budget.total.toLocaleString()}
            </span>
        </div>
        <Progress value={percentage} className="mt-4" />
        <p className="text-xs text-muted-foreground mt-2">
          {percentage > 100 
            ? `You are ₹${(budget.spent - budget.total).toLocaleString()} over budget.`
            : `You have ₹${(budget.total - budget.spent).toLocaleString()} remaining.`
          }
        </p>
      </CardContent>
    </Card>
  );
}
