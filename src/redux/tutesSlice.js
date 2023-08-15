import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const tutesReducer = createSlice({
  name: "tutes",
  initialState: {
    tutes: [],
    pages: [], // all pages are tutes but all tutes are not pages, pages are tutues without a folder
    folders: {},
    currentFolder: {},
    currentPage: {},
  },
  reducers: {
    initialize: (state, action) => {
      const { tutes, pages, folders } = action.payload;
      return {
        ...state,
        tutes: tutes,
        pages: pages,
        folders: folders,
      };
    },
    addTute: (state, action) => {
      const { tute, folderId } = action.payload;
      const tempFolders = { ...state.folders };
      tempFolders[folderId]?.tute_ids.push(tute.id);

      return {
        ...state,
        tutes: [...state.tutes, tute],
        folders: tempFolders,
      };
    },
    addPage: (state, action) => {
      return {
        ...state,
        tutes: [...state.tutes, action.payload],
        pages: [...state.pages, action.payload],
      };
    },
    addFolder: (state, action) => {
      const folderName = action.payload;
      let tempFolers = state.folders;
      tempFolers[folderName] = [];
      return {
        ...state,
        folders: tempFolers,
      };
    },
    intoFolders: (state, action) => {
      return {
        ...state,
        currentFolder: action.payload,
      };
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
      }
    },
    reset: (state) => {
      return {
        ...state,
        tutes: [],
        pages: [],
        folders: [],
        currentFolder: [],
      };
    },
  },
});

export const { initialize, addTute, addPage, addFolder, intoFolders, reset, setCurrentPage } =
  tutesReducer.actions;

export default tutesReducer.reducer;
