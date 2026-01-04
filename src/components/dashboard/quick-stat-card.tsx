
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function QuickStatCard({ icon: Icon, label, value, className }: QuickStatCardProps) {
  return (
    <Card className={cn("transition-transform duration-300 hover:animate-lift bg-card/80 backdrop-blur-sm", className)}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
