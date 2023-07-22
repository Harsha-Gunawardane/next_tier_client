import { Box, Flex, Text } from "@chakra-ui/react";
import { AiTwotoneTrophy } from "react-icons/ai";

import ReviewQuizHeader from "./components/quiz/ReviewQuizHeader";
import McqExplaination from "./components/quiz/McqExplaination";
import QuizList from "./components/quiz/QuizList";

function ReviewQuiz() {
  const question =
    "Which of the following statements best describes the Law of Conservation of Energy?";
  const options = [
    "Energy can be created but not destroyed.",
    "Energy can be destroyed but not created.",
    "Energy cannot be created or destroyed, only transferred or transformed.",
    "Energy can be transferred but not transformed.",
  ];
  const explain = `The Law of Conservation of Energy is a fundamental principle in physics that states that the total amount of energy in an isolated system remains constant over time. Energy cannot be created out of nothing or destroyed completely. It can only change its form or be transferred from one object or system to another. This principle holds true for all types of energy, including kinetic energy, potential energy, thermal energy, electromagnetic energy, and others.

  Option a) "Energy can be created but not destroyed" is incorrect because it implies that energy can be created from nothing, which goes against the Law of Conservation of Energy.
  
  Option b) "Energy can be destroyed but not created" is also incorrect because it suggests that energy can be completely eliminated, which contradicts the law.
  
  Option d) "Energy can be transferred but not transformed" is incorrect because energy can be both transferred and transformed. For example, when electrical energy is transferred to a light bulb, it is transformed into light energy.
  
  Understanding the Law of Conservation of Energy is crucial in physics as it helps explain various phenomena and is applicable across different branches of science and engineering.`;

  const questions = [
    {
      time: "30s",
      name: "Question 01",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
    {
      time: "30s",
      name: "Question 02",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
    {
      time: "30s",
      name: "Question 03",
      linecolor: "#EF7373",
      bgcolor: "#FDE6E6",
    },
    {
      time: "30s",
      name: "Question 04",
      linecolor: "#EF7373",
      bgcolor: "#FDE6E6",
    },
    {
      time: "30s",
      name: "Question 05",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
    {
      time: "30s",
      name: "Question 06",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
    {
      time: "30s",
      name: "Question 07",
      linecolor: "#15BD66",
      bgcolor: "#FDE6E6",
    },
    {
      time: "30s",
      name: "Question 08",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
    {
      time: "30s",
      name: "Question 09",
      linecolor: "#15BD66",
      bgcolor: "#FDE6E6",
    },
    {
      time: "30s",
      name: "Question 10",
      linecolor: "#15BD66",
      bgcolor: "#D3F3D2",
    },
  ];

  return (
    <Flex>
      <Box>
        <ReviewQuizHeader subject="Physics" quizname="# Quiz 22" />
        <McqExplaination
          questionNo="Question 01"
          question={question}
          options={options}
          correctAnswer={2}
          pickedAnswer={4}
          explain={explain}
        />
      </Box>
      <Box mt={8} mr={16} ml={10}>
        <Flex
          w="100%"
          h={14}
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Text fontSize={22} color="#444444" fontWeight="medium">
            # Quiz 22
          </Text>
          <AiTwotoneTrophy size={40} color="#15BD66" />
        </Flex>
        <QuizList questions={questions} mb={2} />
      </Box>
    </Flex>
  );
}

export default ReviewQuiz;
