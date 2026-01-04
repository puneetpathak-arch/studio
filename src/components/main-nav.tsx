
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChartHorizontal, GraduationCap, LayoutDashboard, User, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/analytics", icon: BarChartHorizontal, label: "Analytics" },
  { href: "/savings", icon: Sparkles, label: "AI Savings" },
  { href: "/scholarships", icon: GraduationCap, label: "Scholarships" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
              className="group-data-[collapsible=icon]:justify-center"
            >
              <item.icon className={cn("text-sidebar-primary", pathname.startsWith(item.href) && "text-sidebar-primary-foreground")}/>
              <span className={cn(pathname.startsWith(item.href) && "text-sidebar-primary-foreground")}>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
