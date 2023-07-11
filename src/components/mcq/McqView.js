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
import { ActionIcon } from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons-react";


export default function McqView({ mcqs }) {
  return (
    <Accordion defaultIndex={[0]} allowMultiple margin="10px">
      {mcqs.map((mcq) => (
        <AccordionItem key={mcq.id}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <FormLabel>{mcq.question}</FormLabel>
              </Box>
              <ActionIcon>
                <IconPencil size="1.2rem" stroke={1.3} />
              </ActionIcon>
              <ActionIcon style={{ color: "red" }}>
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
