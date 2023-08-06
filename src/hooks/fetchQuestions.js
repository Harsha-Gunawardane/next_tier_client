import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "./useAxiosPrivate";

// redux actions
import * as Action from "../redux/questionSlice";

const STUDENT_QUIZ_URL = "/stu/quiz";

export const useFetchQuestions = () => {
  const axiosPrivate = useAxiosPrivate();

  const subject = useSelector((state) => state.questions.subject);
  const value = useSelector((state) => state.questions.noOfQuestions);

  const dispatch = useDispatch();
  const [data, setData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("I need " + value + " questions from " + subject);
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        const response = await axiosPrivate.post(STUDENT_QUIZ_URL, {
          subject,
          value,
        });

        console.log(response.data.response.questions)
        const questions = response?.data?.response?.questions;

        if (questions.length > 0) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: questions,
          }));

          dispatch(Action.startQuiz(questions));
          dispatch(
            Action.initializeQuiz({
              noOfQuestions: value,
              mcqName: response?.data?.response?.quizName,
              subject,
            })
          );
        } else {
          throw new Error("No questions");
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error?.response?.data?.error }));
      }
    };
    fetchData();
  }, [dispatch]);

  return data;
};

export const initializeQuiz =
  (noOfQuestions, subject, mcqName) => async (dispatch) => {
    try {
      await dispatch(
        Action.initializeQuiz({ noOfQuestions, subject, mcqName })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const moveNextQuestion = () => (dispatch) => {
  dispatch(Action.moveNext());
};

export const movePrevQuestion = () => (dispatch) => {
  dispatch(Action.movePrev());
};

export const resetQuiz = () => (dispatch) => {
  dispatch(Action.reset())
}
