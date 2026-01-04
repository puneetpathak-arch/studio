
"use client"

import * as React from "react"
import { Pie, PieChart, Cell } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { budget } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const chartData = budget.categoryBudgets.filter(b => b.spent > 0).map(b => ({
  category: b.category,
  amount: b.spent,
  fill: `hsl(var(--chart-${budget.categoryBudgets.findIndex(cb => cb.category === b.category) + 1}))`
}));

const chartConfig = {
  amount: {
    label: "Amount (₹)",
  },
  ...Object.fromEntries(
    budget.categoryBudgets.map((b, index) => [
      b.category,
      {
        label: b.category,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    ])
  ),
}

export function CategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category-wise Spending</CardTitle>
        <CardDescription>Current month's spending distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <PieChart>
            <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent 
                    formatter={(value, name) => [`₹${(value as number).toLocaleString()}`, name]}
                    indicator="dot"
                />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={2}
              isAnimationActive={true}
              animationDuration={1000}
            >
                {chartData.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                ))}
            </Pie>
             <ChartLegend
                content={<ChartLegendContent nameKey="category" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
