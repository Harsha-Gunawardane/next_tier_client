import { Flex, Box, Text } from "@chakra-ui/react";
import { AiTwotoneTrophy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../quiz/ProgressBar";

function PreviousQuizCard({ value, color, subject, quizname }) {
  const navigate = useNavigate()

  const handleOnClick = () => {
    navigate(`/stu/quizzes/${subject}/${quizname}/review`)
  }

  return (
    <Flex
      cursor="pointer"
      w={700}
      mb={2}
      h={20}
      borderRadius={8}
      alignItems="center"
      pr={5}
      border="1px solid #E5E5E5"
      onClick={handleOnClick}
    >
      <Box h="85%" w={1.5} mr={4} ml={2} borderRadius={5} bg="#D5D5D5" />

      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontSize={17} fontWeight="medium" color="#444444">
            # Quiz 24
          </Text>
          <Text fontSize={13}>24th June 2023</Text>
        </Box>
        <ProgressBar color={color} width="60%" value={value} />
        <AiTwotoneTrophy size={40} color={color} />
      </Flex>
    </Flex>
  );
}

export default PreviousQuizCard;
