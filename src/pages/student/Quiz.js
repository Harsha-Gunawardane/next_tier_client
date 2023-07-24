import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import `useNavigate` here

import Question from "./components/quiz/Question";
import QuizFooter from "./components/quiz/QuizFooter";
import CountdownTimer from "./components/quiz/CountdownTimer";
import QuizNumberList from "./components/quiz/QuizNumberList";

// import custom hook
import { useFetchQuestions } from "../../hooks/fetchQuestions";
import BreadCrumbs from "./components/quiz/BreadCrumbs";
import AlreadyDoneQuizModal from "./components/modals/AlreadyDoneQuizModal";

function Quiz() {
  const { subject, mcqname } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const state = useSelector((state) => state);
  const question = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const trace = useSelector((state) => state.questions.trace);
  const queue = useSelector((state) => state.questions.queue);
  const quizname = useSelector((state) => state.questions.mcqName);

  const { isLoading, serverError } = useFetchQuestions();

  // Move the `useNavigate` hook outside the component body
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(trace);
  }, [trace]);

  useEffect(() => {
    if (serverError) {
      handleOpenModal();
    }
  }, [serverError]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // Check if question is available before rendering the Question component
  if (!question) {
    return <Text>No question found.</Text>;
  }

  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;

    return "Question " + trace;
  };

  const handleGoBack = () => {
    navigate(-1); // Use `navigate` directly without setting it as state
  };

  return (
    <>
      <Flex>
        <Flex direction="column" minH="85vh">
          <Box flex="1">
            <BreadCrumbs />
            <Question
              key={question.id}
              trace={trace}
              questionNo={getQuestionNo(trace)}
              question={question.question}
              options={question.options}
            />
          </Box>
          {/* QuizFooter at the bottom */}
          <QuizFooter />
        </Flex>
        <Flex ml={20}>
          <Box>
            <Text
              mt={6}
              fontSize={20}
              fontStyle="Roboto"
              fontWeight="medium"
              mb={7}
              color="#444444"
            >
              #Quiz 22
            </Text>
            <QuizNumberList count={queue.length} />
            <Text
              mt={7}
              mb={7}
              fontSize={20}
              fontStyle="Roboto"
              fontWeight="medium"
              color="#444444"
            >
              Time Remaining
            </Text>
            <CountdownTimer time={2 * queue.length * 60} />
          </Box>
        </Flex>
      </Flex>
      <AlreadyDoneQuizModal
        quizname={mcqname}
        handleGoBack={handleGoBack}
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
      />
    </>
  );
}

export default Quiz;
