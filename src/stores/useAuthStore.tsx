// stores/useAuthStore.ts
import { create } from "zustand";

interface AuthUser {
  name: string;
  role: "Admin" | "User";
  email?: string;
  profilePhoto: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isInitialized: boolean;
  login: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
  setInitialized: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,

  login: (user, accessToken) => set({ user, accessToken }),

  logout: () => {
    // clear everything
    set({ user: null, accessToken: null });
  },

  setInitialized: () => set({ isInitialized: true }),

  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}));
