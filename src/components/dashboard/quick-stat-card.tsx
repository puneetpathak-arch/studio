
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  gradient: string;
  iconBg: string;
  className?: string;
}

export function QuickStatCard({ icon: Icon, label, value, gradient, iconBg, className }: QuickStatCardProps) {
  return (
    <div className={cn("bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-2 border-indigo-200/50 hover:shadow-2xl hover:border-indigo-300/70 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group", className)}>
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-opacity", gradient)}></div>
        <div className="relative z-10 flex items-center gap-4">
            <div className={cn("w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform", iconBg)}>
                <Icon className="text-white" size={32} />
            </div>
            <div>
                <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide">{label}</p>
                <p className={cn("text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", iconBg.replace('via','from'))}>{value}</p>
            </div>
        </div>
    </div>
  );
}
