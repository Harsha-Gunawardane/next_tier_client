
import { Card, Flex, FormLabel, SimpleGrid, Spacer } from "@chakra-ui/react";
import { Accordion, ActionIcon, Box } from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

export default function McqsView({ mcqs, handleDeleteMcq }) {
  return (
    <Accordion
      variant="separated"
      defaultValue="customization"
      chevronPosition="left"
      m="20px"
      style={{ overflow: "auto", maxHeight: "330px" }}
    >
      {mcqs.map((mcq) => (
        <Accordion.Item value={mcq.question} key={mcq.id}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Accordion.Control>{mcq.question}</Accordion.Control>
            <ActionIcon >
              <NavLink to={`${mcq.id}/edit`}>
                <IconPencil size="1rem" stroke={1.3} />
              </NavLink>
            </ActionIcon>
            <ActionIcon
              style={{ color: "red" }}
              onClick={() => handleDeleteMcq(mcq.id)}
            >
              <IconTrash size="1rem" stroke={1.3} />
            </ActionIcon>
          </Box>
          <Accordion.Panel>
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
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
