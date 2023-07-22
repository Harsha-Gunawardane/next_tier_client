import { Box, Flex, Text } from "@chakra-ui/react";

import ReviewQuizHeader from "./components/quiz/ReviewQuizHeader";
import Question from "./components/quiz/Question";
import QuizFooter from "./components/quiz/QuizFooter";
import CountdownTimer from "./components/quiz/CountdownTimer";
import QuizNumberList from "./components/quiz/QuizNumberList";

function Quiz() {
  const question =
    "Which of the following statements best describes the Law of Conservation of Energy?";
  const options = [
    "Energy can be created but not destroyed.",
    "Energy can be destroyed but not created.",
    "Energy cannot be created or destroyed, only transferred or transformed.",
    "Energy can be transferred but not transformed.",
  ];

  return (
    <Flex>
      <Flex direction="column" minH="85vh">
        <Box flex="1">
          {/* Your content here */}
          <ReviewQuizHeader
            subject="Physics"
            quizname="# Quiz 22"
            isExplain={false}
          />
          <Question
            questionNo="Question 01"
            question={question}
            options={options}
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
            fontStyle='Roboto'
            fontWeight="medium"
            mb={7}
            color="#444444"
          >
            #Quiz 22
          </Text>
          <QuizNumberList />
          <Text
            mt={7}
            mb={7}
            fontSize={20}
            fontStyle='Roboto'
            fontWeight="medium"
            color="#444444"
          >
            Time Remaining
          </Text>
          <CountdownTimer />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Quiz;
