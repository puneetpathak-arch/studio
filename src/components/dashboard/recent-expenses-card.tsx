import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { expenses } from "@/lib/data";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

const categoryColors: { [key: string]: string } = {
    'Mess': 'bg-red-100 text-red-800',
    'Canteen': 'bg-orange-100 text-orange-800',
    'Groceries': 'bg-yellow-100 text-yellow-800',
    'Travel': 'bg-green-100 text-green-800',
    'Rent/Hostel': 'bg-blue-100 text-blue-800',
    'Fees/Exam': 'bg-indigo-100 text-indigo-800',
    'Recharge/Subscriptions': 'bg-purple-100 text-purple-800',
    'Others': 'bg-gray-100 text-gray-800',
};

export function RecentExpensesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Your last 5 transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
        {expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <li key={expense.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <Badge variant="outline" className={`border-none text-xs ${categoryColors[expense.category] || categoryColors['Others']}`}>
                    {expense.category}
                  </Badge>
                </div>
                <p className="font-bold text-right">₹{expense.amount.toLocaleString()}</p>
              </li>
            ))}
          </ul>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">No expenses yet.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
