import {
  Image,
  Heading,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import backgroundTemplate from "../../components/mcq/assests/backgroundTemplate.jpg";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaPen } from "react-icons/fa";

export default function QuizInsideCard({ quiz, handleDelete, handleEdit }) {
  return (
    <>
      <Card
        direction={{ base: "column", md: "row" }}
        variant="outline"
        height={{ base: "250px", sm: "150px" }}
      >
        <Image
          objectFit="cover"
          width={{ base: "370px", md: "150px" }}
          height={{ base: "80px", md: "150px" }}
          src={backgroundTemplate}
          padding={{ base: "5px", md: "10px" }}
          borderRadius={{ base: "10px", md: "15px" }}
        />

        <Stack>
          <CardBody padding="10px" minWidth={{ base: "370px", md: "670px" }}>
            <HStack justifyContent="space-between">
              <Text color="gray" fontSize="16px" mt="3px">
                Quiz
              </Text>
              <HStack>
                <IconButton
                  size="xs"
                  variant="outline"
                  icon={<FaPen color="gray" />}
                  onClick={() => handleEdit(quiz.id)}
                />
                <IconButton
                  size="xs"
                  variant="outline"
                  marginLeft="4px"
                  icon={<DeleteIcon w={4} h={4} color="red.500" />}
                  onClick={() => handleDelete(quiz.id)}
                />
              </HStack>
            </HStack>

            <Heading fontSize={{ base: "20px", md: "20px" }} mt="3px">
              {quiz.title}
            </Heading>

            <Box>
              <Text fontSize={{ base: "16px", md: "16px" }}>
                {" "}
                {quiz.subject}
              </Text>
              <Text color="gray" fontSize={{ base: "14px", md: "14px" }}>
                {Array.isArray(quiz.subject_areas)
                  ? quiz.subject_areas.join(" / ")
                  : ""}
              </Text>
              <HStack>
                <Text fontSize={{ base: "14px", md: "16px" }}>
                  {quiz && Array.isArray(quiz.question_ids)
                    ? quiz.question_ids.length
                    : 0}
                </Text>
              </HStack>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
