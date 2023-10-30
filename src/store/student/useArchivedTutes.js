import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useArchivedTutes = create()(
  devtools(
    persist(
      (set) => ({
        archivedTutes: [],

        setArchivedTutes: (value) => set(() => ({ archivedTutes: value })),
        addNewArchivedTute: (value) =>
          set((state) => ({ archivedTutes: [...state.archivedTutes, value] })),

        removeArchivedTute: (tuteId) =>
          set((state) => ({
            archivedTutes: state.archivedTutes.filter(
              (tute) => tute.id !== tuteId
            ),
          })),
      }),
      { name: "archivedTutes" }
    )
  )
);
