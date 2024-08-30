import { create } from 'zustand';

export interface AuthStore {
  uid: string | null;
  signIn(uid: string): void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  uid: null,
  signIn: (uid) => set(() => ({ uid: uid })),
}));
