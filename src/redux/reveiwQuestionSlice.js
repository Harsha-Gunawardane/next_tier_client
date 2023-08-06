import { createSlice } from "@reduxjs/toolkit";

export const reviewQuestionReducer = createSlice({
  name: "reviewQuiz",
  initialState: {
    quizName: '',
    subject: '',
    queue: [],
    answers: [],
    trace: 0,
    mark: 0,
    dateDetails: {}
  },
  reducers: {
    startReviewQuiz: (state, action) => {
      const { questions, answers, subject, quizName, mark, dateDetails } = action.payload;
      return {
        ...state,
        queue: questions,
        answers: answers,
        subject: subject,
        quizName: quizName,
        mark: mark,
        dateDetails: dateDetails
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
        quizName: '',
        subject: '',
        mark: 0,
        dateDetails: {}
      };
    },
  },
});

export const { startReviewQuiz, clickOnQuestion, reset } =
  reviewQuestionReducer.actions;
export default reviewQuestionReducer.reducer;
