
import { PiggyBank, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { MainNav } from "@/components/main-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { budget } from "@/lib/data";
import { BottomNav } from "@/components/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const onBudget = budget.spent <= budget.total;

  return (
    <SidebarProvider>
      <div className="md:hidden">
        <BottomNav />
      </div>
      <Sidebar className="hidden md:flex">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <PiggyBank className="w-8 h-8 text-sidebar-primary" />
            <h1 className="text-xl font-bold font-headline">EduFinance</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <MainNav />
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" asChild>
             <Link href="/">Log out</Link>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader onBudget={onBudget} />
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
