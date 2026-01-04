import type { User, Expense, Budget, Goal, Scholarship, Tip } from './types';
import { Bus, PiggyBank, IndianRupee } from 'lucide-react';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const expenses: Expense[] = [];

export const budget: Budget = {
  total: 15000,
  spent: 0,
  categoryBudgets: [
    { category: 'Mess', total: 4000, spent: 0 },
    { category: 'Canteen', total: 1500, spent: 0 },
    { category: 'Travel', total: 1000, spent: 0 },
    { category: 'Rent/Hostel', total: 5000, spent: 0 },
    { category: 'Groceries', total: 1000, spent: 0 },
    { category: 'Fees/Exam', total: 1500, spent: 0 },
    { category: 'Recharge/Subscriptions', total: 500, spent: 0 },
    { category: 'Others', total: 500, spent: 0 },
  ],
};

export const goals: Goal[] = [];

export const tips: Tip[] = [
    { id: 't1', text: 'Your travel spend is higher than usual. Consider using the bus.', icon: Bus },
    { id: 't2', text: 'You are close to your Canteen budget. Try packing lunch.', icon: PiggyBank },
    { id: 't3', text: 'You have saved ₹200 this week compared to last week. Keep it up!', icon: IndianRupee },
];

export const scholarships: Scholarship[] = [];
