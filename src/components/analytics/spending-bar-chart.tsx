
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"

const chartData = [
  { week: "Week 1", spending: 1860 },
  { week: "Week 2", spending: 3050 },
  { week: "Week 3", spending: 2370 },
  { week: "Week 4", spending: 2030 },
]

const chartConfig = {
  spending: {
    label: "Spending",
    color: "hsl(var(--chart-1))",
  },
}

export function SpendingBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Spending</CardTitle>
        <CardDescription>Your spending over the last 4 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
             <YAxis
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
             />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
