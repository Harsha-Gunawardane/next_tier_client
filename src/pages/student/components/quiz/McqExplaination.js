import {
  Box,
  Flex,
  Text,
  ListItem,
  ListIcon,
  OrderedList,
} from "@chakra-ui/react";
import { MdCheckCircle, MdClose } from "react-icons/md";

function McqExplaination({
  questionNo,
  question,
  options,
  answers,
  pickedAnswer,
  explain,
}) {
  return (
    <Box mt={6} ml={5} w="90%">
      <Text mb={4} fontSize={24} color="#555555" fontWeight="semibold">
        {questionNo}
      </Text>

      <Text fontSize={15}>{question}</Text>
      <OrderedList mt={5}>
        {options.map((option, index) => (
          <Flex ml={answers === index || (pickedAnswer === index && answers !== index) ? 4 : 16}>
            <ListIcon as={MdCheckCircle} display={answers === index ? 'block' : 'none'} color="#15BD66" mt={1} mr={8} />
            <ListIcon as={MdClose} display={pickedAnswer === index && answers !== index ? 'block' : 'none'} color="#EF7373" mt={1} mr={8} />
            <ListItem bg={(pickedAnswer === index && answers === index) ? '#D3F3D2' : pickedAnswer === index ?'#F1F1F1' : '#FFFFFF'} pl={2} pr={3} pt={1} pb={1} borderRadius={4} fontSize={15}>{option}</ListItem>
          </Flex>
        ))}
      </OrderedList>
      <Text fontSize={20} color="#555555" fontWeight="semibold" mt={8} ml={3}>
        Explaination
      </Text>
      <Text
        fontSize={14}
        mt={8}
        ml={10}
        whiteSpace="pre-line"
        lineHeight="tall"
      >
        {explain}
      </Text>
    </Box>
  );
}

export default McqExplaination;
