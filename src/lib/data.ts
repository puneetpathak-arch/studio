
import type { User, Expense, Budget, Goal, Scholarship, Tip, Notification } from './types';
import { Bus, PiggyBank, IndianRupee, Headphones, Plane } from 'lucide-react';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const expenses: Expense[] = [
  { id: '1', description: 'Mess Bill', amount: 3500, category: 'Mess', date: '2024-07-01' },
  { id: '2', description: 'Metro Card Recharge', amount: 500, category: 'Travel', date: '2024-07-03' },
  { id: '3', description: 'Momos at Bytes', amount: 120, category: 'Canteen', date: '2024-07-05' },
  { id: '4', description: 'Netflix Subscription', amount: 199, category: 'Recharge/Subscriptions', date: '2024-07-06' },
  { id: '5', description: 'End-sem Exam Fee', amount: 1200, category: 'Fees/Exam', date: '2024-07-08' },
  { id: '6', description: 'Hostel Rent', amount: 4000, category: 'Rent/Hostel', date: '2024-07-01' },
  { id: '7', description: 'Movie Tickets', amount: 450, category: 'Entertainment', date: '2024-07-10' },
  { id: '8', description: 'Data Structures Textbook', amount: 600, category: 'Education', date: '2024-07-12' },
  { id: '9', description: 'Birthday Gift for Friend', amount: 800, category: 'Shopping', date: '2024-07-15' },
  { id: '10', description: 'Lunch at CCD', amount: 350, category: 'Canteen', date: '2024-07-16' },
];

const calculateSpent = (category: Expense['category']) => {
    return expenses.filter(e => e.category === category).reduce((acc, e) => acc + e.amount, 0);
}

export const budget: Budget = {
  total: 15000,
  spent: expenses.reduce((acc, e) => acc + e.amount, 0),
  categoryBudgets: [
    { category: 'Mess', total: 4000, spent: calculateSpent('Mess') },
    { category: 'Canteen', total: 1500, spent: calculateSpent('Canteen') },
    { category: 'Travel', total: 1000, spent: calculateSpent('Travel') },
    { category: 'Rent/Hostel', total: 5000, spent: calculateSpent('Rent/Hostel') },
    { category: 'Education', total: 1000, spent: calculateSpent('Education') },
    { category: 'Fees/Exam', total: 1500, spent: calculateSpent('Fees/Exam') },
    { category: 'Recharge/Subscriptions', total: 500, spent: calculateSpent('Recharge/Subscriptions') },
    { category: 'Entertainment', total: 1000, spent: calculateSpent('Entertainment') },
    { category: 'Shopping', total: 1000, spent: calculateSpent('Shopping') },
    { category: 'Others', total: 500, spent: calculateSpent('Others') },
  ],
};

export const goals: Goal[] = [
    { id: 'g1', name: 'New Headphones', targetAmount: 8000, savedAmount: 2500, deadline: '2024-10-31', icon: Headphones, color: 'chart-1' },
    { id: 'g2', name: 'Goa Trip', targetAmount: 12000, savedAmount: 3000, deadline: '2024-12-15', icon: Plane, color: 'chart-2' },
];

export const tips: Tip[] = [
    { id: 't1', text: 'Your travel spend is higher than usual. Consider using the bus.', icon: Bus },
    { id: 't2', text: 'You are close to your Canteen budget. Try packing lunch.', icon: PiggyBank },
    { id: 't3', text: 'You have saved ₹200 this week compared to last week. Keep it up!', icon: IndianRupee },
];

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

export const notifications: Notification[] = [
    {
        id: 'n1',
        type: 'budget-warning',
        title: 'Budget Alert: 80% Spent',
        description: 'You\'ve spent ₹12,000 of your ₹15,000 monthly budget.',
        timestamp: '2 hours ago',
        read: false,
    },
    {
        id: 'n2',
        type: 'new-tip',
        title: 'New Savings Tip Available',
        description: 'We found a new way for you to save on daily expenses. Tap to view.',
        timestamp: '1 day ago',
        read: false,
    },
    {
        id: 'n3',
        type: 'goal-achieved',
        title: '🎉 Goal Reached: New Headphones',
        description: 'Congratulations! You\'ve saved ₹8,000 for your new headphones.',
        timestamp: '3 days ago',
        read: true,
    },
    {
        id: 'n4',
        type: 'budget-over',
        title: 'Over Budget!',
        description: 'You have exceeded your monthly Canteen budget by ₹250.',
        timestamp: '5 days ago',
        read: true,
    }
]
