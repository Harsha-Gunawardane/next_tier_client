import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useFoldersInfo = create()(
  devtools(
    persist(
      (set) => ({
        folders: [],
        tutes: [],

        setFolders: (value) => set(() => ({ folders: value })),
        addNewFolder: (value) =>
          set((state) => ({ folders: [...state.folders, value] })),

        addNewTuteToFolder: (folderName, tuteName) =>
          set((state) => {
            const updatedFolders = state.folders.map((folder) => {
              if (folder.name === folderName) {
                return {
                  ...folder,
                  pages: [...folder.pages, tuteName],
                };
              }
              return folder;
            });
            return { folders: updatedFolders };
          }),

        setTutes: (value) => set(() => ({ tutes: value })),
        addNewTute: (value) =>
          set((state) => ({ tutes: [...state.tutes, value] })),
        
      }),
      { name: "foldersInfo" }
    )
  )
);
