import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  FormLabel,
  Flex,
  Spacer,
  Card,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";

import { IoIosAddCircleOutline } from "react-icons/io";

export default function McqsAddingViewInDrawer({ mcqs, handleDeleteMcq }) {
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      margin="10px"
      padding="10px"
      maxH="500px"
      overflowY="auto"
    >
      {mcqs.map((mcq) => (
        <AccordionItem key={mcq.id}>
          <h2>
            <AccordionButton mb="2px">
              <Box as="span" flex="1" textAlign="left" pt="8px">
                <Text
                  fontSize={{ base: "14px", md: "16px" }}
                >{`${mcq.id}) ${mcq.question}`}</Text>
              </Box>
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                mt="10px"
                mr="5px"
              >
                <IoIosAddCircleOutline
                  size="16px"
                  style={{ marginRight: "4px" }}
                />
                Add Question
              </Button>
              <AccordionIcon size="1.2rem" stroke={1.3} />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Flex color="gray.500">
              <FormLabel fontWeight="400">Medium Level</FormLabel>
              <Spacer />
              <FormLabel fontWeight="400">Points : {mcq.points}</FormLabel>
            </Flex>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel fontWeight="400">Choices:</FormLabel>

              <SimpleGrid
                minChildWidth="300px"
                maxWidth="1100px"
                fontSize="12px"
              >
                <FormLabel fontWeight="400">{mcq.choice1}</FormLabel>
                <FormLabel fontWeight="400">{mcq.choice2}</FormLabel>
                <FormLabel fontWeight="400">{mcq.choice3}</FormLabel>
                <FormLabel fontWeight="400">{mcq.choice4}</FormLabel>
                <FormLabel fontWeight="400">{mcq.choice5}</FormLabel>
              </SimpleGrid>
            </Card>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel fontWeight="400">Answer: {mcq.answer}</FormLabel>
            </Card>

            <Card variant="outline" padding="10px">
              <FormLabel fontWeight="400">
                Explanation : {mcq.explanation}
              </FormLabel>
            </Card>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}