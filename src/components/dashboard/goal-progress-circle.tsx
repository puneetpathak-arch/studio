
'use client';

import { Pie, PieChart } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface GoalProgressCircleProps {
  percentage: number;
  savedAmount: number;
  targetAmount: number;
  color: 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5';
}

export function GoalProgressCircle({
  percentage,
  savedAmount,
  targetAmount,
  color,
}: GoalProgressCircleProps) {
  const chartData = [{ value: percentage }, { value: 100 - percentage }];

  return (
    <ChartContainer
      config={{}}
      className="mx-auto aspect-square h-[120px] w-[120px]"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={45}
          outerRadius={60}
          startAngle={90}
          endAngle={450}
          strokeWidth={0}
        >
          <cell
            key="value"
            fill="hsl(var(--foreground))"
            className="transition-all duration-500"
          />
          <cell
            key="background"
            fill="hsl(var(--muted))"
            className="transition-all duration-500"
          />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{percentage}%</span>
        <span className="text-xs text-muted-foreground">
          ₹{savedAmount.toLocaleString()}/₹{targetAmount.toLocaleString()}
        </span>
      </div>
    </ChartContainer>
  );
}
