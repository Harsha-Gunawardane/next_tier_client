import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";

const DoneQuizCard = React.memo(({ i, time, questionname, linecolor, bgcolor, mb, onClick }) => {
  return (
    <Flex
      mb={mb}
      h={14}
      minH={12}
      w={60}
      bg={bgcolor}
      borderRadius={8}
      alignItems="center"
      cursor="pointer"
      onClick={onClick}

    >
      <Box h="85%" w={1.5} mr={4} ml={2} borderRadius={5} bg={linecolor} />
      <Box>
        <Flex pr={3}>
          <Text fontSize={14} color="#444444">
            {questionname}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
});

export default DoneQuizCard;
