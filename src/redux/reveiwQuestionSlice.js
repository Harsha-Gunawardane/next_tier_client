import { createSlice } from "@reduxjs/toolkit";

export const reviewQuestionReducer = createSlice({
  name: "reviewQuiz",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startReviewQuiz: (state, action) => {
      const { questions, answers } = action.payload;
      return {
        ...state,
        queue: questions,
        answers: answers,
      };
    },
    clickOnQuestion: (state, action) => {
      return {
        ...state,
        trace: action.payload,
      };
    },
    reset: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      };
    },
  },
});

export const { startReviewQuiz, clickOnQuestion, reset } =
  reviewQuestionReducer.actions;
export default reviewQuestionReducer.reducer;
