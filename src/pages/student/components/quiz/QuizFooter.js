import { Flex, Text } from "@chakra-ui/react";

function QuizFooter() {
  return (
    <Flex mt={3} ml={12} w={820} justifyContent="space-between">
      <Flex
        color="#444444"
        fontWeight="medium"
        borderRadius={6}
        justifyContent="center"
        alignItems="center"
        h={12}
        w={120}
        bg="#E9E9E9"
        cursor="pointer"
      >
        <Text>Prev</Text>
      </Flex>
      <Flex
        bg="#0074D9"
        color="#FFFFFF"
        fontWeight="medium"
        borderRadius={6}
        justifyContent="center"
        alignItems="center"
        h={12}
        w={120}
        cursor="pointer"
      >
        <Text>Next</Text>
      </Flex>
    </Flex>
  );
}

export default QuizFooter;
