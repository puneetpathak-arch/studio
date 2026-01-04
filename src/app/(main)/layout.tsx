
'use client';

import { useState } from 'react';
import { PiggyBank, LogOut, Menu, X } from "lucide-react";
import { MainNav } from "@/components/main-nav";
import Link from 'next/link';
import { user } from '@/lib/data';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-100 to-orange-100 flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/40 via-purple-400/30 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/40 via-rose-400/30 to-orange-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-cyan-400/30 via-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-gradient-to-br from-yellow-400/20 via-orange-400/25 to-pink-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.08) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 shadow-2xl relative z-10 border-r border-indigo-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-10 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-float">
             <PiggyBank className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EduFinance
          </span>
        </div>

        <nav className="flex-1 space-y-2 relative z-10">
            <MainNav onNavItemClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)} />
        </nav>

        <div className="mt-6 pt-6 border-t border-slate-700/50 relative z-10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/50">
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

       {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-4 shadow-lg z-50 backdrop-blur-lg bg-opacity-95 border-b border-indigo-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <PiggyBank className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">EduFinance</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
       <aside
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white p-6 shadow-2xl z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <PiggyBank className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EduFinance
          </span>
        </div>

        <nav className="flex-1 space-y-2">
            <MainNav onNavItemClick={() => setIsMobileMenuOpen(false)} />
        </nav>

        <div className="mt-6 pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-lg">
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
        <main className="flex-1 p-4 md:p-6 lg:p-8 relative mt-16 lg:mt-0">
            {children}
        </main>
      </div>

    </div>
  );
}
