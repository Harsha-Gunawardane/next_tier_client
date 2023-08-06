import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";

import backgroundTemplate4 from "../mcq/assests/backgroundTemplate4.jpg";

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
        src={backgroundTemplate4}
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

          <Stack mt="3px">
            <Text fontSize="14px">{quiz.subject}</Text>
            <Text fontSize="14px">{`${quiz.number_of_questions} Questions`}</Text>
            <Text color="gray" fontSize={{ base: "14px", md: "14px" }}>
              {Array.isArray(quiz.subject_areas)
                ? quiz.subject_areas.join(" / ")
                : ""}
            </Text>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  );
}

export default QuizCard;
