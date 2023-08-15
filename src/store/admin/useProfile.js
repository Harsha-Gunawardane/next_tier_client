import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useProfile = create()(
  devtools(
    persist(
      (set) => ({
        profile: {},

        setProfile: (value) => set(() => ({ profile: value })),
      }),
      { name: "adminProfile" }
    )
  )
);
