import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useAdminsInfo = create()(
  devtools(
    persist(
      (set) => ({
        adminsInfo: [],
        selectedAdmin: {},

        setAdminsInfo: (value) => set(() => ({ adminsInfo: value })),
        setSelectedAdmin: (value) => set(() => ({ selectedAdmin: value })),
        setPushAdmin: (value) =>
          set((state) => ({ adminsInfo: [...state.adminsInfo, value] })),
      }),
      { name: "adminsInfo" }
    )
  )
);
