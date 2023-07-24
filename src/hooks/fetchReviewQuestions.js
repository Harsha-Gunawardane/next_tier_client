import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import apiData, { answers } from "../pages/student/reviewdata";

// redux actions
import * as Action from "../redux/reveiwQuestionSlice";

export const useFetchReviewQuestions = () => {
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
        let correctAnswers = await answers;

        if (questions.length > 0) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: { questions, correctAnswers },
          }));
          dispatch(
            Action.startReviewQuiz({ questions, answers: correctAnswers })
          );
        } else {
          throw new Error("No questions");
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData()
  }, [dispatch]);

  return data;
};

export const clickOnQuestion = (i) => (dispatch) => {
    dispatch(Action.clickOnQuestion(i));
}
