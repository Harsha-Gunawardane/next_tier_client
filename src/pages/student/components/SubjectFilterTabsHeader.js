import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";

function SubjectFilterTabsHeader({
  subjects,
  focusedSubject,
  setFocusedSubject,
}) {
  return (
    <Flex
      mb={3}
      mt={2}
      ml={{
        base: 3,
      }}
    >
      {subjects.map((subject) => (
        <Box
          cursor="pointer"
          w="max-content"
          pl={5}
          pr={5}
          mr={3}
          h={9}
          key={subject}
          borderRadius={25}
          display="flex"
          alignItems="center"
          bg={focusedSubject === subject ? "#383838" : "#E9E9E9"}
          color={focusedSubject === subject ? "#FFFFFF" : "#383838"}
          onClick={() => setFocusedSubject(subject)}
        >
          <Text letterSpacing={0.5} fontSize={13} fontStyle="Roboto">
            {subject}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}

export default SubjectFilterTabsHeader;
