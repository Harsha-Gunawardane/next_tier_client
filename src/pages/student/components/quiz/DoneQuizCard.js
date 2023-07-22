import { Box, Text, Flex } from "@chakra-ui/react";

function DoneQuizCard({
  time,
  questionname,
  linecolor,
  bgcolor,
  mb,
}) {
  return (
    <Flex
      mb={mb}
      h={14}
      w={60}
      bg={bgcolor}
      borderRadius={8}
      alignItems="center"
      cursor='pointer'
    >
      <Box h="85%" w={1.5} mr={4} ml={2} borderRadius={5} bg={linecolor} />
      <Box>
        <Flex pr={3}>
          <Text fontSize={14} color="#444444" mr={16}>
            {questionname}
          </Text>
          <Text fontSize={14} color="#444444">
            {time}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}

export default DoneQuizCard;
