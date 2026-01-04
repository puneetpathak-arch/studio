import type { User, Expense, Budget, Goal, Scholarship, Tip } from './types';
import { Bus, PiggyBank, IndianRupee } from 'lucide-react';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const expenses: Expense[] = [
  { id: '1', description: 'Lunch at canteen', amount: 80, category: 'Canteen', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
  { id: '2', description: 'Auto to college', amount: 50, category: 'Travel', date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString() },
  { id: '3', description: 'Hostel fee', amount: 5000, category: 'Rent/Hostel', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString() },
  { id: '4', description: 'Mobile recharge', amount: 299, category: 'Recharge/Subscriptions', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString() },
  { id: '5', description: 'Snacks', amount: 120, category: 'Groceries', date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString() },
  { id: '6', description: 'Mess bill', amount: 3500, category: 'Mess', date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString() },
  { id: '7', description: 'Exam form fee', amount: 1200, category: 'Fees/Exam', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString() },
];

export const budget: Budget = {
  total: 15000,
  spent: expenses.reduce((sum, e) => sum + e.amount, 0),
  categoryBudgets: [
    { category: 'Mess', total: 4000, spent: 3500 },
    { category: 'Canteen', total: 1500, spent: 80 },
    { category: 'Travel', total: 1000, spent: 50 },
    { category: 'Rent/Hostel', total: 5000, spent: 5000 },
    { category: 'Groceries', total: 1000, spent: 120 },
    { category: 'Fees/Exam', total: 1500, spent: 1200 },
    { category: 'Recharge/Subscriptions', total: 500, spent: 299 },
    { category: 'Others', total: 500, spent: 0 },
  ],
};

export const goals: Goal[] = [
  { id: 'g1', name: 'New Laptop Fund', targetAmount: 60000, savedAmount: 25000, deadline: '2024-12-31' },
  { id: 'g2', name: 'Goa Trip', targetAmount: 10000, savedAmount: 3500, deadline: '2024-11-15' },
];

export const tips: Tip[] = [
    { id: 't1', text: 'Your travel spend is higher than usual. Consider using the bus.', icon: Bus },
    { id: 't2', text: 'You are close to your Canteen budget. Try packing lunch.', icon: PiggyBank },
    { id: 't3', text: 'You have saved ₹200 this week compared to last week. Keep it up!', icon: IndianRupee },
];

export const scholarships: Scholarship[] = [
  { 
    id: 's1', 
    name: 'National Scholarship Scheme', 
    provider: 'Government of India', 
    amount: '₹12,000/year', 
    deadline: '2024-10-31', 
    eligibility: { category: ['General', 'OBC', 'SC', 'ST'] },
    link: '#'
  },
  { 
    id: 's2', 
    name: 'Haryana State Merit Scholarship', 
    provider: 'Government of Haryana', 
    amount: '₹5,000/semester', 
    deadline: '2024-09-30', 
    eligibility: { state: ['Haryana'], income: '< 2.5 Lakhs' },
    link: '#'
  },
  { 
    id: 's3', 
    name: 'AICTE Pragati Scholarship for Girls', 
    provider: 'AICTE', 
    amount: '₹50,000/year', 
    deadline: '2024-11-15', 
    eligibility: { category: ['Girl Students'] },
    link: '#'
  },
  {
    id: 's4',
    name: 'J&K Prime Minister\'s Special Scholarship',
    provider: 'Government of India',
    amount: 'Tuition + Hostel Fees',
    deadline: '2024-10-15',
    eligibility: { state: ['J&K'] },
    link: '#'
  }
];
