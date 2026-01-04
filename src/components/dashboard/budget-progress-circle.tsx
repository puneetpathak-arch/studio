
'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface BudgetProgressCircleProps {
  percentage: number;
}

export function BudgetProgressCircle({ percentage }: BudgetProgressCircleProps) {
  const chartData = [{ name: 'spent', value: percentage, fill: 'var(--color-spent)' }];

  let color;
  if (percentage <= 70) {
    color = 'hsl(var(--chart-2))'; // Green
  } else if (percentage <= 90) {
    color = 'hsl(var(--chart-5))'; // Orange
  } else {
    color = 'hsl(var(--destructive))'; // Red
  }

  return (
    <ChartContainer
      config={{
        spent: {
          label: 'Spent',
          color: color,
        }
      }}
      className="mx-auto aspect-square h-[180px] w-[180px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-270}
        endAngle={90}
        innerRadius={110}
        outerRadius={140}
        barSize={12}
        cy="55%"
      >
        <RadialBar
          dataKey="value"
          background={{ fill: 'hsl(var(--muted))' }}
          cornerRadius={6}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </RadialBarChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center top-1/2 -translate-y-1/2 mt-3">
        <span className="text-4xl font-bold" style={{ color }}>{percentage}%</span>
        <span className="text-sm text-muted-foreground">Spent</span>
      </div>
    </ChartContainer>
  );
}
