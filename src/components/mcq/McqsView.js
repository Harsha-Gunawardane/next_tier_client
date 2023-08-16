import { Card, Flex, FormLabel, Spacer } from "@chakra-ui/react";
import { Accordion, ActionIcon, Box, SimpleGrid } from "@mantine/core";

import { IconPencil, IconTrash } from "@tabler/icons-react";

export default function McqsView({ mcqs, handleDelete, handleEdit }) {
  console.log(mcqs);
  return (
    <Accordion
      variant="separated"
      chevronPosition="left"
      m="20px"
      style={{ overflow: "auto", maxHeight: "270px" }}
    >
      {mcqs.map((mcq) => (
        <Accordion.Item key={mcq.id} value={mcq.question}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Accordion.Control>{mcq.question}</Accordion.Control>
            <ActionIcon onClick={() => handleEdit(mcq.id)}>
              <IconPencil size="1rem" stroke={1.3} />
            </ActionIcon>
            <ActionIcon
              style={{ color: "red" }}
              onClick={() => handleDelete(mcq.id)}
            >
              <IconTrash size="1rem" stroke={1.3} />
            </ActionIcon>
          </Box>
          <Accordion.Panel>
            <Flex color="gray.500">
              <FormLabel fontWeight="400">{`${mcq.difficulty_level} Level`}</FormLabel>
              <Spacer />
              <FormLabel fontWeight="400">Points : {mcq.points}</FormLabel>
            </Flex>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel>Answer Choices</FormLabel>
              <SimpleGrid cols={2} mb="xs" spacing="xs" verticalSpacing="xs">
                {mcq.options.map((choice) => (
                  <Card
                    // variant="outline"
                    shadow="md"
                    padding="5px"
                    paddingLeft="10px"
                    margin="2px"
                    fontWeight="400"
                  >
                    {choice}
                  </Card>
                ))}
              </SimpleGrid>
            </Card>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel>Correct Answer</FormLabel>
              <Card shadow="md" padding="5px" mb="5px" paddingLeft="15px">
                {mcq.options[mcq.correct_answer]}
              </Card>
            </Card>

            <Card variant="outline" padding="10px" mb="5px">
              <FormLabel>Explanation</FormLabel>
              <Card shadow="md" padding="10px">
                {mcq.explanation}
              </Card>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
