import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const tuteReducer = createSlice({
    name: "tute",
    initialState: {
        id: "",
        name: "",
        content: ""
    },
    reducers: {
        createTute: (state, action) => {
            const { id, name, content} = action.payload
            return {
                ...state,
                id: id,
                name: name,
                content: content
            }
        },
        saveContent: (state, action) => {
            return {
                ...state,
                content: action.payload
            }
        },
        reset: (state) => {
            return {
                ...state,
                id: '',
                name: '',
                content: ''
            }
        }
    }
})

export const { createTute, saveContent, reset } = tuteReducer.actions;

export default tuteReducer.reducer;