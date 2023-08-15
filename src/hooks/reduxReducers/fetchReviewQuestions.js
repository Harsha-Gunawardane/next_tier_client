import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

import useAxiosPrivate from "../useAxiosPrivate";

// redux actions
import * as Action from "../../redux/reveiwQuestionSlice";

const STUDENT_QUIZ_MARKING_URL = "/stu/marking"

export const useFetchReviewQuestions = (subject, quizName) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate()

  const [data, setData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {

    const fetchData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));

      try {
        const response = await axiosPrivate.post(STUDENT_QUIZ_MARKING_URL, {
          subject,
          quizName
        }) 

        console.log(response.data)

        const questions = response.data?.response?.questions
        const answers = response.data?.response?.answers
        const mark = response.data?.response?.mark
        const dateDetails = response.data?.response?.dateDetails

        if (questions.length > 0) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: { questions, answers },
          }));
          dispatch(
            Action.startReviewQuiz({ questions, answers, subject, quizName, mark, dateDetails })
          );
        } else {
          throw new Error("No questions");
        }
      } catch (error) {
        toast({
          title: error.message,
          status: "error",
          isClosable: true,
          position: "top-right",
        });

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
