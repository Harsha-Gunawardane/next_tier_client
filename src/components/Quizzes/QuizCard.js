import { Card, CardBody, Stack, Heading, Text, Image } from "@chakra-ui/react";

import backgroundTemplate2 from "../mcq/assests/backgroundTemplate2.jpg";

function QuizCard({ quiz }) {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      // overflow="hidden"
      variant="outline"
      // height={{ base: "160px", sm: "125px" }}
    >
      <Image
        objectFit="cover"
        width={{ base: "355px", sm: "120px" }}
        // height={{ base: "40px", sm: "120px" }}
        src={backgroundTemplate2}
        padding={{ base: "5px", sm: "10px" }}
        borderRadius={{ base: "10px", sm: "15px" }}
      />

      <Stack>
        <CardBody padding="8px">
          <Text color="gray" fontSize="14px">
            Quiz
          </Text>
          <Heading size={{ base: "sm", sm: "md" }} mt="3px">
            {quiz.title}
          </Heading>

          <Text fontSize="14px" mt="3px">
            {quiz.subject}
          </Text>
          <Text fontSize="14px">{`${quiz.number_of_questions} Questions`}</Text>
          <Text color="gray" fontSize={{ base: "14px", md: "14px" }}>
            {Array.isArray(quiz.subject_areas)
              ? quiz.subject_areas.join(" / ")
              : ""}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default QuizCard;
