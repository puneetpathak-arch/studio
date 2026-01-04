
import type { User, Expense, Budget, Goal, Scholarship, Tip, Notification } from './types';
import { Bus, PiggyBank, IndianRupee, Headphones, Plane } from 'lucide-react';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const expenses: Expense[] = [];

const calculateSpent = (category: Expense['category']) => {
    return expenses.filter(e => e.category === category).reduce((acc, e) => acc + e.amount, 0);
}

export const budget: Budget = {
  total: 15000,
  spent: 0,
  categoryBudgets: [
    { category: 'Mess', total: 4000, spent: 0 },
    { category: 'Canteen', total: 1500, spent: 0 },
    { category: 'Travel', total: 1000, spent: 0 },
    { category: 'Rent/Hostel', total: 5000, spent: 0 },
    { category: 'Education', total: 1000, spent: 0 },
    { category: 'Fees/Exam', total: 1500, spent: 0 },
    { category: 'Recharge/Subscriptions', total: 500, spent: 0 },
    { category: 'Entertainment', total: 1000, spent: 0 },
    { category: 'Shopping', total: 1000, spent: 0 },
    { category: 'Others', total: 500, spent: 0 },
  ],
};

export const goals: Goal[] = [];

export const tips: Tip[] = [];

export const scholarships: Scholarship[] = [
    {
        id: 's1',
        name: 'Post Matric Scholarship for SC Students',
        provider: 'Ministry of Social Justice & Empowerment',
        amount: 'Upto ₹13,500 p.a.',
        deadline: '2024-08-31',
        eligibility: {
            state: ['All India'],
            category: ['SC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/'
    },
    {
        id: 's2',
        name: 'Merit Cum Means Scholarship for Professional and Technical Courses',
        provider: 'Ministry of Minority Affairs',
        amount: '₹20,000 p.a. + Fees',
        deadline: '2024-09-30',
        eligibility: {
            state: ['All India'],
            category: ['Minority'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/'
    },
    {
        id: 's3',
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        provider: 'Government of Madhya Pradesh',
        amount: 'Full Course Fee',
        deadline: '2024-08-15',
        eligibility: {
            state: ['Madhya Pradesh'],
            category: ['General', 'OBC', 'SC', 'ST'],
        },
        link: 'http://scholarshipportal.mp.nic.in/MMVY/HomePage.aspx'
    },
     {
        id: 's4',
        name: 'Pragati Scholarship for Girl Students',
        provider: 'AICTE',
        amount: '₹50,000 p.a.',
        deadline: '2024-10-31',
        eligibility: {
            state: ['All India'],
            category: ['Girl Students'],
        },
        link: 'https://www.aicte-pragati-saksham-gov.in/'
    },
    {
        id: 's5',
        name: 'Chief Minister\'s Scholarship Scheme',
        provider: 'Government of Haryana',
        amount: 'Upto ₹12,000 p.a.',
        deadline: '2024-09-15',
        eligibility: {
            state: ['Haryana'],
            category: ['General', 'SC', 'OBC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://harchhatravratti.highereduhry.ac.in/'
    }
];

export const notifications: Notification[] = []
