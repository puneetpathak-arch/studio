
import type { User, Scholarship, Tip, Notification } from './types';

export const user: User = {
  name: 'Rohan Sharma',
  college: 'IIT Delhi',
  avatarUrl: 'https://picsum.photos/seed/100/100/100',
};

export const tips: Tip[] = [];

export const scholarships: Scholarship[] = [
    {
        id: 's1',
        name: 'Post Matric Scholarship for SC Students',
        provider: 'Ministry of Social Justice & Empowerment',
        amount: 'Upto ₹13,500 p.a.',
        deadline: '2024-12-31',
        eligibility: {
            state: ['All India'],
            category: ['SC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/fresh/newstdRegfrmInstruction'
    },
    {
        id: 's2',
        name: 'Merit Cum Means Scholarship for Professional and Technical Courses',
        provider: 'Ministry of Minority Affairs',
        amount: '₹20,000 p.a. + Fees',
        deadline: '2024-11-30',
        eligibility: {
            state: ['All India'],
            category: ['Minority'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://scholarships.gov.in/fresh/newstdRegfrmInstruction'
    },
    {
        id: 's3',
        name: 'Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)',
        provider: 'Government of Madhya Pradesh',
        amount: 'Full Course Fee',
        deadline: '2025-01-15',
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
        deadline: '2024-11-30',
        eligibility: {
            state: ['All India'],
            category: ['Girl Students'],
        },
        link: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati-Saksham-Scholarship-Scheme'
    },
    {
        id: 's5',
        name: 'Chief Minister\'s Scholarship Scheme',
        provider: 'Government of Haryana',
        amount: 'Upto ₹12,000 p.a.',
        deadline: '2024-12-20',
        eligibility: {
            state: ['Haryana'],
            category: ['General', 'SC', 'OBC'],
            income: '₹2.5 Lakh p.a.'
        },
        link: 'https://harchhatravratti.highereduhry.ac.in/'
    }
];

export const notifications: Notification[] = []

// Keep initial goals for demonstration purposes, they will be fetched from Firestore
export { goals } from './initial-data';
