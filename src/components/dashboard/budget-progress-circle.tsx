
'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface BudgetProgressCircleProps {
  percentage: number;
}

export function BudgetProgressCircle({ percentage }: BudgetProgressCircleProps) {
  const chartData = [{ name: 'spent', value: percentage, fill: 'var(--color-spent)' }];

  const color = "hsl(var(--chart-1))";

  return (
    <ChartContainer
      config={{
        spent: {
          label: 'Spent',
          color: color,
        }
      }}
      className="mx-auto aspect-square h-[150px] w-[150px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-270}
        endAngle={90}
        innerRadius={55}
        outerRadius={70}
        barSize={16}
        cy="50%"
      >
        <RadialBar
          dataKey="value"
          background={{ fill: 'hsl(var(--muted))' }}
          cornerRadius={8}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
