import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    noOfQuestions: 0,
    subject: "",
    mcqName: "",
    queue: [],
    answers: [],
    trace: 0,
    // courseRelated: false,
  },
  reducers: {
    startQuiz: (state, action) => {
      return {
        ...state,
        queue: action.payload,
      };
    },
    initializeQuiz: (state, action) => {
      const { noOfQuestions, subject, mcqName } = action.payload;
      return {
        ...state,
        noOfQuestions: noOfQuestions,
        subject: subject,
        mcqName: mcqName,
      };
    },
    moveNext: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrev: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    // setCourseRelatedQuiz: (state) => {
    //   return {
    //     ...state,
    //     courseRelated: true,
    //   };
    // },
    reset: () => {
      return {
        noOfQuestions: 0,
        subject: "",
        mcqName: "",
        queue: [],
        answers: [],
        trace: 0,
      };
    },
  },
});

export const {
  startQuiz,
  initializeQuiz,
  moveNext,
  movePrev,
  reset,
  // setCourseRelatedQuiz,
} = questionReducer.actions;

export default questionReducer.reducer;
