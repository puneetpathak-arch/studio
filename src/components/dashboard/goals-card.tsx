import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { goals } from "@/lib/data";
import { Target } from "lucide-react";

export function GoalsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
        <CardDescription>Your progress towards your financial goals.</CardDescription>
      </CardHeader>
      <CardContent>
        {goals.length > 0 ? (
          <ul className="space-y-4">
            {goals.map((goal) => {
              const percentage = (goal.savedAmount / goal.targetAmount) * 100;
              return (
                <li key={goal.id}>
                  <div className="flex justify-between items-center mb-1">
                      <p className="font-medium flex items-center gap-2"><Target className="w-4 h-4" /> {goal.name}</p>
                      <p className="text-sm text-muted-foreground">
                          ₹{goal.savedAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                      </p>
                  </div>
                  <Progress value={percentage} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No savings goals set yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
