import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const useFoldersInfo = create()(
  devtools(
    persist(
      (set) => ({
        folders: [],

        setFolders: (value) => set(() => ({ folders: value })),
        addNewFolder: (value) =>
          set((state) => ({ folders: [...state.folders, value] })),

        addNewTute: (folderName, tuteName) =>
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
      }),
      { name: "foldersInfo" }
    )
  )
);
