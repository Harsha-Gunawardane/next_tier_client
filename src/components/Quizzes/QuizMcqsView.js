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
} from "@chakra-ui/react";
import { ActionIcon } from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";


export default function QuizMcqsView({ mcqs, handleDeleteMcq }) {
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      margin="10px"
      padding="10px"
      maxH="330px"
      overflowY="auto"
      variant="seperated"
    >
      {mcqs.map((mcq) => (
        <AccordionItem key={mcq.id}>
          <h2>
            <AccordionButton mb="2px">
              <Box as="span" flex="1" textAlign="left" pt="8px">
                <Text fontSize="16px">{`${mcq.id}) ${mcq.question}`}</Text>
              </Box>
              <ActionIcon>
                <NavLink to={`${mcq.id}/edit`}>
                  <IconPencil size="1.2rem" stroke={1.3} />
                </NavLink>
              </ActionIcon>
              <ActionIcon
                style={{ color: "red" }}
                onClick={() => handleDeleteMcq(mcq.id)}
              >
                <IconTrash size="1.2rem" stroke={1.3} />
              </ActionIcon>
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
                minChildWidth="500px"
                maxWidth="1100px"
                fontSize="12px"
              >
                {mcq.choices.map((choice) => (
                  <FormLabel fontWeight="400">{choice}</FormLabel>
                ))}
              </SimpleGrid>
            </Card>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel fontWeight="400">
                Answer: {mcq.choices[mcq.correct_answer]}
              </FormLabel>
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
