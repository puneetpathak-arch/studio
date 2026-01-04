export type User = {
  name: string;
  college: string;
  avatarUrl: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: 'Mess' | 'Canteen' | 'Groceries' | 'Travel' | 'Rent/Hostel' | 'Fees/Exam' | 'Recharge/Subscriptions' | 'Others';
  date: string;
};

export type Budget = {
  total: number;
  spent: number;
  categoryBudgets: CategoryBudget[];
};

export type CategoryBudget = {
  category: Expense['category'];
  total: number;
  spent: number;
};

export type Goal = {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: string;
};

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: {
    state?: string[];
    category?: string[];
    income?: string;
  };
  link: string;
};

export type Tip = {
  id: string;
  text: string;
  icon: React.ElementType;
};
