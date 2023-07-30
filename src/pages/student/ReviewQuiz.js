import { Box, Flex, Text } from "@chakra-ui/react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import McqExplaination from "./components/quiz/McqExplaination";
import QuizList from "./components/quiz/QuizList";
import BreadCrumbs from "./components/quiz/BreadCrumbs";
import { clickOnQuestion, useFetchReviewQuestions } from "../../hooks/fetchReviewQuestions";
import ResultCard from "./components/cards/ResultCard";

function ReviewQuiz() {
  const dispatch = useDispatch()

  const { subject, mcqname } = useParams();
  const { isLoading } = useFetchReviewQuestions();

  const state = useSelector((state) => state);
  const trace = useSelector((state) => state.reviewQuiz.trace);
  const question = useSelector((state) => state.reviewQuiz.queue[state.reviewQuiz.trace]);
  const pickedAnswer = useSelector((state) => state.reviewQuiz.answers[state.reviewQuiz.trace]);

  const questions = useSelector((state) => state.reviewQuiz.queue);
  const userAnswers = useSelector((state) => state.reviewQuiz.answers);

  useEffect(() => {
    console.log(state);
  }, [state]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!question) {
    return <Text>No question found.</Text>;
  }

  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;
    return "Question " + trace;
  };

  const handleQuizItemClick = (index) => {
    console.log("Clicked on Quiz item: ", index);
    
    dispatch(clickOnQuestion(index))
  };

  return (
    <Flex pr={10}>
      <Box>
        <BreadCrumbs />
        <McqExplaination
          questionNo={getQuestionNo(trace)}
          {...question}
          pickedAnswer={pickedAnswer}
        />
      </Box>
      <Box mt={8} ml={10}>
        <ResultCard />
        <QuizList mb={2} questions={questions} userAnswers={userAnswers} onItemClick={handleQuizItemClick} />
      </Box>
    </Flex>
  );
}

export default ReviewQuiz;
