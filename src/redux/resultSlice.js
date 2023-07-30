import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    username: null,
    result: [], // Initialize result as an empty array
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    putResult: (state, action) => {
      const { trace, result } = action.payload;
      console.log(trace + " " + result);
    
      const updatedResult = [...state.result]; // Create a shallow copy of the original result array
      updatedResult[trace] = result; // Update the value at the specified trace index
    
      return {
        ...state,
        result: updatedResult,
      };
    },    
    reset: () => {
      return {
        username: null,
        result: [],
      };
    },
  },
});

export const { setUsername, putResult, reset } = resultReducer.actions;

export default resultReducer.reducer;
