import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import type { Budget, Expense, Goal, UserProfile } from '@/lib/types';
import { initialBudget } from '@/lib/initial-data';
import { initializeFirebase } from '@/firebase';

const { firestore } = initializeFirebase();

// User Profile
export const createUserDocument = async (userId: string, data: UserProfile) => {
  const userRef = doc(firestore, 'users', userId);
  const budgetRef = doc(firestore, `users/${userId}/data/budget`);
  
  // These can run in parallel
  await Promise.all([
    setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    }),
    setDoc(budgetRef, initialBudget)
  ]);
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

// Budget
export const getBudget = async (userId: string): Promise<Budget> => {
  const budgetRef = doc(firestore, `users/${userId}/data/budget`);
  const budgetSnap = await getDoc(budgetRef);
  if (budgetSnap.exists()) {
    return budgetSnap.data() as Budget;
  }
  // If no budget, create one
  await setDoc(budgetRef, initialBudget);
  return initialBudget;
};

export const updateBudget = async (userId: string, budget: Budget) => {
  const budgetRef = doc(firestore, `users/${userId}/data/budget`);
  await setDoc(budgetRef, budget, { merge: true });
};


// Expenses
export const addExpense = async (userId: string, expenseData: Omit<Expense, 'id' | 'date'>) => {
  const expensesColRef = collection(firestore, `users/${userId}/expenses`);
  const expensePayload = {
      ...expenseData,
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(expensesColRef, expensePayload);
  return docRef.id;
};

export const getExpenses = async (userId: string): Promise<Expense[]> => {
  const expensesColRef = collection(firestore, `users/${userId}/expenses`);
  const q = query(expensesColRef, orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
};


// Goals
export const getGoals = async (userId: string): Promise<Goal[]> => {
  const goalsColRef = collection(firestore, `users/${userId}/goals`);
  const q = query(goalsColRef, orderBy('deadline', 'asc'));
  const querySnapshot = await getDocs(q);
  // Note: Firestore doesn't store functions, so we need to map the icon name back to the component
  // This part will be handled in the component that renders the goals.
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Goal));
};

export const addGoal = async (userId: string, goalData: Omit<Goal, 'id' | 'savedAmount' | 'icon'> & { icon: string }) => {
    const goalsColRef = collection(firestore, `users/${userId}/goals`);
    const goalPayload = {
        ...goalData,
        savedAmount: 0,
        createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(goalsColRef, goalPayload);
    return docRef.id;
};

export const addFundsToGoal = async (userId: string, goalId: string, amount: number) => {
    const goalRef = doc(firestore, `users/${userId}/goals`, goalId);
    await updateDoc(goalRef, {
        savedAmount: increment(amount),
    });
};
