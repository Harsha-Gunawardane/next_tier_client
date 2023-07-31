import { Flex, Text, Box } from "@chakra-ui/react";
import PreviousQuizCard from "../cards/PreviousQuizCard";

function PreviousQuizList({ previousQuizzes }) {
  return (
    <Flex justifyContent="center">
      <Flex flexDirection="column">
        {previousQuizzes ? (
          previousQuizzes.map((quiz) => (
            <PreviousQuizCard
              key={quiz.id} // Make sure to add a unique key prop when mapping over an array of elements
              subject={quiz.subject}
              quizname={quiz.quizname}
              value={quiz.value}
              color={quiz.color}
              date={quiz.date}
            />
          ))
        ) : (
          <Box
            w={{
              base: "90vw",
              sm: "85vw",
              md: "85vw",
              lg: "700px",
              xl: "750px",
            }}
            mb={2}
            h={20}
            borderRadius={8}
            alignItems="center"
            pr={5}
            border="1px solid #DDDDDD"
          >
            <Box h="85%" w={1.5} mr={4} ml={2} borderRadius={5} bg="#D5D5D5" />

            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontSize={17} fontWeight="medium" color="#444444">
                  No quiz
                </Text>
              </Box>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default PreviousQuizList;
