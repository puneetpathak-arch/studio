
'use client';

import { useState } from 'react';
import { PiggyBank, LogOut, Menu, X } from "lucide-react";
import { MainNav, navItems } from "@/components/main-nav";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { user } from '@/lib/data';
import { DashboardHeader } from '@/components/dashboard-header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 shadow-lg z-30">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">EduFinance</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-2xl z-50 transform transition-transform duration-300",
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
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
             <MainNav onNavItemClick={closeMobileMenu} />
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

        <main className="flex-1 p-4 md:p-6 lg:p-8 mt-16 lg:mt-0 relative">
             <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-gray-50 to-purple-50 animate-move-background"></div>
            {children}
        </main>
      </div>
    </div>
  );
}
