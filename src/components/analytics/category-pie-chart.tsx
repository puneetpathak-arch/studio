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
}));

const chartConfig = {
  amount: {
    label: "Amount",
  },
  ...Object.fromEntries(
    chartData.map((item, index) => [
      item.category,
      {
        label: item.category,
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
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartConfig[entry.category]?.color} />
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
