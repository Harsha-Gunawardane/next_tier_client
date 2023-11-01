import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useAxiosPrivate from "../useAxiosPrivate";

// redux actions
import * as Action from "../../redux/questionSlice";
import * as ResultAction from "../../redux/resultSlice";

const STUDENT_QUIZ_URL = "/stu/quiz";
const STUDENT_ATTEMPT_QUIZ_URL = "/stu/quiz/attempt";

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

  const quizId = useSelector((state) => state.questions.quizId);
  const courseRelated = useSelector((state) => state.questions.courseRelated);

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        let response;
        if (courseRelated) {
          response = await axiosPrivate.post(STUDENT_ATTEMPT_QUIZ_URL, {
            quizId,
          });
        } else {
          response = await axiosPrivate.post(STUDENT_QUIZ_URL, {
            subject,
            value,
          });
        }

        console.log(response.data.response.questions);
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
        setData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error?.response?.data?.error,
        }));
      }
    };
    fetchData();
  }, [axiosPrivate, courseRelated, dispatch, quizId, subject, value]);

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

export const initializeQuizById = (quizId, axiosPrivate) => async (dispatch) => {
  const queryString = new URLSearchParams({
    quizId,
  }).toString();

  try {
    const response = await axiosPrivate.get(
      `${STUDENT_ATTEMPT_QUIZ_URL}?${queryString}`
    );
    console.log(response.data);
    const { noOfQuestions, subject, mcqName } = response.data.data;
    dispatch(Action.initializeQuiz({ noOfQuestions, subject, mcqName }));
    dispatch(Action.setCourseRelatedQuiz());
    dispatch(Action.setQuizId(quizId));

    return subject;
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
  dispatch(Action.reset());
  dispatch(ResultAction.reset());
};
