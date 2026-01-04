
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
      <CardContent className="h-[250px] flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="h-full w-full flex items-center"
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
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              isAnimationActive={true}
              animationDuration={1000}
            >
                {chartData.map((entry) => (
                    <Cell key={`cell-${entry.category}`} fill={entry.fill} />
                ))}
            </Pie>
          </PieChart>
          <ChartLegend
              content={<ChartLegendContent nameKey="category" className="flex flex-col gap-2"/>}
              className="w-1/2"
          />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
