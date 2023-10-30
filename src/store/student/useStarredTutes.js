import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useStarredTutes = create()(
  devtools(
    persist(
      (set) => ({
        starredTutes: [],

        setStarredTutes: (value) => set(() => ({ starredTutes: value })),
        addNewStarredTute: (value) =>
          set((state) => ({ starredTutes: [...state.starredTutes, value] })),

        removeStarredTute: (tuteId) =>
          set((state) => ({
            starredTutes: state.starredTutes.filter(
              (tute) => tute.id !== tuteId
            ),
          })),
      }),
      { name: "starredTutes" }
    )
  )
);
