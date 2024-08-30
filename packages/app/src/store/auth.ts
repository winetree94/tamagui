import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { z } from 'zod';

export const AuthSchema = z.object({
  user: z
    .object({
      userId: z.string(),
      userName: z.string(),
    })
    .or(z.null()),
});

export type AuthState = z.infer<typeof AuthSchema>;

export type AuthActions = {
  signIn(uid: NonNullable<AuthState['user']>): void;
  signOut(): void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create(
  persist(
    immer<AuthStore>((set) => ({
      ...AuthSchema.parse({
        user: null,
      }),
      signIn: (user) =>
        set((state) => {
          state.user = {
            userId: user.userId,
            userName: user.userName,
          };
        }),
      signOut: () =>
        set((state) => {
          state.user = null;
        }),
    })),
    {
      name: 'session',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
