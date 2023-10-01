import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useProfile = create()(
  devtools(
    persist(
      (set) => ({
        parentProfile: {},

        setParentProfile: (value) => set(() => ({ parentProfile: value })),
      }),
      { name: "parentProfile" }
    )
  )
);
