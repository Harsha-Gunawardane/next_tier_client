import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import `useNavigate` here

import Question from "./components/quiz/Question";
import QuizFooter from "./components/quiz/QuizFooter";
import CountdownTimer from "./components/quiz/CountdownTimer";
import QuizNumberList from "./components/quiz/QuizNumberList";

// import custom hook
import { useFetchQuestions } from "../../hooks/reduxReducers/fetchQuestions";
import BreadCrumbs from "./components/quiz/BreadCrumbs";
import QuizErrorModal from "./components/modals/QuizErrorModal";
import Loading from "../../components/skeleton/Loading";

function Quiz() {
  const [isMobile] = useMediaQuery("(max-width: 900px)");

  const [isOpen, setIsOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const state = useSelector((state) => state);
  const question = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const trace = useSelector((state) => state.questions.trace);
  const queue = useSelector((state) => state.questions.queue);
  let quizname = useSelector((state) => state.questions.mcqName);

  const { isLoading, serverError } = useFetchQuestions();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(trace);
  }, [trace]);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleGoBack = () => {
    navigate(-1); // Use `navigate` directly without setting it as state
  };

  // const handleOpenModal = () => {
  //   setIsOpen(true);
  //   return (
  //     <QuizErrorModal
  //       message={errMsg}
  //       quizname={quizname}
  //       handleGoBack={handleGoBack}
  //       handleCloseModal={handleCloseModal}
  //       isOpen={isOpen}
  //     />
  //   );
  // };

  useEffect(() => {
    if (serverError) {
      setErrMsg(serverError);
    }
  }, [serverError]);

  if (errMsg) {
    return (
      <QuizErrorModal
        message={errMsg}
        quizname={quizname}
        handleGoBack={handleGoBack}
        handleCloseModal={handleCloseModal}
        isOpen={true}
      />
    );
  }

  if (isLoading) {
    <Loading />;
  }

  // Check if question is available before rendering the Question component
  if (!question) {
    return <Text>No question found.</Text>;
  }

  const getQuestionNo = (trace) => {
    trace = String(trace + 1);
    if (trace.length === 1) trace = "0" + trace;

    return "Question " + trace;
  };

  function formatQuizName(inputString) {
    // Check if the input string starts with a digit
    if (/^\d/.test(inputString)) {
      // If it starts with a digit, add '#' before the digit
      inputString = "#" + inputString;
    }

    // Replace all occurrences of '-' with a space ' '
    inputString = inputString.replace(/-/g, " ");

    return inputString;
  }

  quizname = formatQuizName(quizname);

  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      flexDirection={isMobile ? "column" : "row"}
    >
      <Flex
        direction="column"
        minH="90vh"
        w="100%"
        minW={390}
      >
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
      <Flex ml={10} mr={10} mb={10}>
        <Flex w='100%' flexDirection='column'>
          <Box>
            <Text
              mt={6}
              fontSize={20}
              fontStyle="Roboto"
              fontWeight="medium"
              mb={7}
              color="#444444"
            >
              {quizname}
            </Text>
            <QuizNumberList count={queue.length} />
          </Box>
          <Box>
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
    </Flex>
  );
}

export default Quiz;
