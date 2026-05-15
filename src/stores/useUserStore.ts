import { UserStore } from "@/types/storeType";
import { create } from "zustand";

import { persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,

      setUser: (user) =>
        set({
          user,
        }),

      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: "user-storage",

      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
