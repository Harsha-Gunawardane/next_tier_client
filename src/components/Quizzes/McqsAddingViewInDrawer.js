import { Button, Card, Flex, FormLabel, Spacer } from "@chakra-ui/react";
import { Accordion, ActionIcon, Box, SimpleGrid } from "@mantine/core";

import { IoIosAddCircleOutline } from "react-icons/io";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function McqsAddingViewInDrawer({
  allMcqs,
  setAllMcqs,
  quizMcqs,
  setQuizMcqs,
  quizId,
  quiz,
  setQuiz,
}) {
  const axiosPrivate = useAxiosPrivate();
  const importMcqToQuiz = async (mcqId) => {
    const McqId = {
      id: mcqId,
    };

    try {
      const response = await axiosPrivate.post(
        `/tutor/quizzes/addMcqId/${quizId}`,
        JSON.stringify(McqId),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response.data);

      const newQuestion = response.data;
      //Added to state
      setQuizMcqs([...quizMcqs, newQuestion]);

      const updatedMcqs = allMcqs.filter((mcq) => mcq.id !== mcqId);
      setAllMcqs(updatedMcqs);

      //Quiz state update
      const updatedQuestionIds = [...quiz.question_ids, mcqId];
      const updatedNumberOfQuestions = quiz.number_of_questions + 1;

      const updatedQuiz = {
        ...quiz,
        question_ids: updatedQuestionIds,
        number_of_questions: updatedNumberOfQuestions,
      };

      setQuiz(updatedQuiz);




    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Accordion
      variant="separated"
      chevronPosition="left"
      mt="20px"
      pr="10px"
      style={{ overflow: "auto", maxHeight: "460px" }}
    >
      {allMcqs.map((mcq) => (
        <Accordion.Item key={mcq.id} value={mcq.question}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Accordion.Control>{mcq.question}</Accordion.Control>
            <Button
              colorScheme="blue"
              variant="outline"
              size="sm"
              mr="5px"
              onClick={() => importMcqToQuiz(mcq.id)}
            >
              <IoIosAddCircleOutline
                size="16px"
                style={{ marginRight: "4px" }}
              />
              Add Question
            </Button>
          </Box>
          <Accordion.Panel>
            <Flex color="gray.500">
              <FormLabel fontWeight="400">Medium Level</FormLabel>
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
