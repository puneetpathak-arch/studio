
'use client';

import { useState } from 'react';
import { PiggyBank, LogOut } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import Link from 'next/link';
import { user } from '@/lib/data';
import { BottomNav } from '@/components/bottom-nav';
import { AddExpenseSheet } from '@/components/add-expense-sheet';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
             <PiggyBank className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            EduFinance
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
            <MainNav />
        </nav>

        {/* User Profile & Logout */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">student@example.com</p>
            </div>
          </div>
           <Link href="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
                <LogOut size={20} />
                <span className="font-medium">Log out</span>
            </button>
           </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative pb-24 lg:pb-8">
             <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-gray-50 to-purple-50 animate-move-background"></div>
            {children}
        </main>
      </div>

      {/* Bottom Navigation for mobile */}
      <div className="lg:hidden">
        <AddExpenseSheet>
            <BottomNav />
        </AddExpenseSheet>
      </div>
    </div>
  );
}
