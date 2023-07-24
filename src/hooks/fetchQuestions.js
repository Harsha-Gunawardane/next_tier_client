import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import apiData from "../pages/student/data";

// redux actions
import * as Action from "../redux/questionSlice";

export const useFetchQuestions = () => {

  const subject = useSelector((state) => state.questions.subject)
  const noOfQuestions = useSelector((state) => state.questions.noOfQuestions)

  const dispatch = useDispatch();
  const [data, setData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        let questions = await apiData;

        console.log("I need " + noOfQuestions + " questions from " + subject)
        if (questions.length > 0) {
          setData((prev) => ({ ...prev, isLoading: false, apiData: questions, serverError: 'I am the error' }));
          dispatch(Action.startQuiz(questions));
        } else {
          throw new Error("No questions");
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [dispatch]);

  return data;
};

export const initializeQuiz = (noOfQuestions, subject, mcqName) => async (dispatch) => {
  try {
    await dispatch(Action.initializeQuiz({noOfQuestions, subject, mcqName}));
  } catch (error) {
    console.log(error);
  }
}

export const moveNextQuestion = () => (dispatch) => {
  dispatch(Action.moveNext());
};

export const movePrevQuestion = () => (dispatch) => {
  dispatch(Action.movePrev());
};
