
'use client';

import { UserNav } from "@/components/user-nav";
import { budget } from "@/lib/data";

interface DashboardHeaderProps {
  // onBudget is no longer needed as it is calculated inside UserNav
}

export function DashboardHeader({}: DashboardHeaderProps) {
  const onBudget = budget.spent <= budget.total;
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6 justify-end">
      <div className="flex items-center justify-end">
        <UserNav onBudget={onBudget} />
      </div>
    </header>
  );
}
