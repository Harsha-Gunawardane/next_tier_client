import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  AccordionIcon,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { ActionIcon, ScrollArea } from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";


export default function McqsView({ mcqs , handleDeleteMcq }) {
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
            <AccordionButton _expanded={{ bg: "gray.200" }}>
              <Box as="span" flex="1" textAlign="left" pt="8px">
                <FormLabel>{`${mcq.id}) ${mcq.question}`}</FormLabel>
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
          <AccordionPanel pb={4}>
            <FormLabel fontWeight="400">Points: {mcq.points}</FormLabel>
            <FormLabel fontWeight="400">Choices:</FormLabel>

            <HStack>
              <FormLabel fontWeight="400">{mcq.choice1}</FormLabel>
              <FormLabel fontWeight="400">{mcq.choice2}</FormLabel>
              <FormLabel fontWeight="400">{mcq.choice3}</FormLabel>
              <FormLabel fontWeight="400">{mcq.choice4}</FormLabel>
              <FormLabel fontWeight="400">{mcq.choice5}</FormLabel>
            </HStack>

            <FormLabel fontWeight="400">Answer: {mcq.answer}</FormLabel>

            <FormLabel fontWeight="400">
              Explanation : {mcq.explanation}
            </FormLabel>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
