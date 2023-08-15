import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import reducers
import questionReducer from "./questionSlice";
import resultReducer from "./resultSlice";
import reviewQuestionReducer from './reveiwQuestionSlice';
import tuteReducer from './tuteSlice';
import tutesReducer from "./tutesSlice";

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer,
    reviewQuiz: reviewQuestionReducer,
    tute: tuteReducer,
    tutes: tutesReducer
})

// create store
export default configureStore({ reducer: rootReducer })