import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import reducers
import questionReducer from "./questionSlice";
import resultReducer from "./resultSlice";
import reviewQuestionReducer from './reveiwQuestionSlice'

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
    reviewQuiz: reviewQuestionReducer
})

// create store
export default configureStore({ reducer: rootReducer })