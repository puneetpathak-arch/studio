
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
  color
}: GoalProgressCircleProps) {
  const chartData = [{ value: percentage }, { value: 100 - percentage }];
  const progressColor = `hsl(var(--${color}))`;

  return (
    <div className="relative w-[120px] h-[120px]">
      <ChartContainer
        config={{}}
        className="absolute inset-0"
      >
        <PieChart width={120} height={120}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={450}
            strokeWidth={0}
          >
            <cell
              key="value"
              fill={progressColor}
              className="transition-all duration-500"
            />
            <cell
              key="background"
              fill="hsl(var(--muted))"
              className="transition-all duration-500"
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold" style={{ color: progressColor }}>{percentage}%</span>
        <span className="text-xs text-muted-foreground">
          ₹{savedAmount.toLocaleString()}/₹{targetAmount.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
