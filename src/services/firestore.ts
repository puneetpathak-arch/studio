
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
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const { firestore } = initializeFirebase();

// User Profile & Budget (Single Document)
export const createUserDocument = (userId: string, data: Partial<UserProfile>) => {
    const userRef = doc(firestore, 'users', userId);
    const userData = {
        ...data,
        budget: initialBudget,
        createdAt: serverTimestamp(),
    };

    setDoc(userRef, userData).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'create',
            requestResourceData: userData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};

export const updateUserProfile = (userId: string, data: Partial<UserProfile>) => {
    const userRef = doc(firestore, 'users', userId);
    updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'update',
            requestResourceData: data,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
}

export const getUserDocument = async (userId: string): Promise<UserProfile | null> => {
    const userRef = doc(firestore, 'users', userId);
    try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data() as UserProfile;
        } else {
            return null;
        }
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
}


// Budget
export const getBudget = async (userId: string): Promise<Budget> => {
    const userDoc = await getUserDocument(userId);
    if (userDoc && userDoc.budget) {
        return userDoc.budget;
    }
    return initialBudget;
};

export const updateBudget = (userId: string, budget: Budget) => {
    const userRef = doc(firestore, 'users', userId);
    updateDoc(userRef, { budget }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: userRef.path,
            operation: 'update',
            requestResourceData: { budget },
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};


// Expenses
export const addExpense = async (userId: string, expenseData: Omit<Expense, 'id' | 'date'>) => {
  const expensesColRef = collection(firestore, `users/${userId}/expenses`);
  const expensePayload = {
      ...expenseData,
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(expensesColRef, expensePayload);
    return docRef.id;
  } catch(serverError) {
    const permissionError = new FirestorePermissionError({
        path: expensesColRef.path,
        operation: 'create',
        requestResourceData: expensePayload,
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

export const getExpenses = async (userId: string): Promise<Expense[]> => {
  const expensesColRef = collection(firestore, `users/${userId}/expenses`);
  const q = query(expensesColRef, orderBy('createdAt', 'desc'));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Expense));
  } catch (serverError) {
    const permissionError = new FirestorePermissionError({
        path: expensesColRef.path,
        operation: 'list',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};


// Goals
export const getGoals = async (userId: string): Promise<Goal[]> => {
  const goalsColRef = collection(firestore, `users/${userId}/goals`);
  const q = query(goalsColRef, orderBy('deadline', 'asc'));
  
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Goal));
  } catch (serverError) {
    const permissionError = new FirestorePermissionError({
        path: goalsColRef.path,
        operation: 'list',
    });
    errorEmitter.emit('permission-error', permissionError);
    throw serverError;
  }
};

export const addGoal = async (userId: string, goalData: Omit<Goal, 'id' | 'savedAmount' | 'color' | 'icon'> & { icon: string }) => {
    const goalsColRef = collection(firestore, `users/${userId}/goals`);
    const goalPayload = {
        ...goalData,
        savedAmount: 0,
        createdAt: serverTimestamp(),
    };
    try {
        const docRef = await addDoc(goalsColRef, goalPayload);
        return docRef.id;
    } catch (serverError) {
        const permissionError = new FirestorePermissionError({
            path: goalsColRef.path,
            operation: 'create',
            requestResourceData: goalPayload,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw serverError;
    }
};

export const addFundsToGoal = (userId: string, goalId: string, amount: number) => {
    const goalRef = doc(firestore, `users/${userId}/goals`, goalId);
    updateDoc(goalRef, {
        savedAmount: increment(amount),
    }).catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
            path: goalRef.path,
            operation: 'update',
            requestResourceData: { savedAmount: `increment(${amount})` },
        });
        errorEmitter.emit('permission-error', permissionError);
    });
};
