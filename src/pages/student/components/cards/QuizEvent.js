import { Box, Text, Flex } from "@chakra-ui/react";

function QuizEvent({ title, date, timerange, quizname, linecolor, bgcolor, mb }) {
  return (
    <Flex mb={mb} h={20} w={72} bg={bgcolor} borderRadius={8} alignItems="center">
      <Box h="85%" w={1.5} mr={4} ml={2} borderRadius={5} bg={linecolor} />
      <Box>
        <Text fontSize={15} color='#555555' fontWeight='semibold'>{title}</Text>
        <Flex >
          <Text fontSize={12} color='#555555' mr={12}>{date}</Text>
          <Text fontSize={12} color='#555555'>{timerange}</Text>
        </Flex>
        <Text fontSize={12} color='#555555'>{quizname}</Text>
      </Box>
    </Flex>
  );
}

export default QuizEvent;
