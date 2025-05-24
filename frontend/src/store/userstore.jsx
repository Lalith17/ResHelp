import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      userData: null, // user data object
      isLoading: false,

      setUser: (userData) => set({ userData, isLoading: false }),
      clearUser: () => set({ userData: null }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "userData", // name for localStorage key
    }
  )
);
