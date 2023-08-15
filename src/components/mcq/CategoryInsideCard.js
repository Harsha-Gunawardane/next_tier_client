import {
  Image,
  Heading,
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
  Spacer,
  IconButton,
  Box,
} from "@chakra-ui/react";
import backgroundTemplate from "../../components/mcq/assests/backgroundTemplate.jpg";
import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import { FaPen } from "react-icons/fa";

export default function CategoryInsideCard() {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      variant="outline"
      height={{ base: "220px", sm: "150px" }}
    >
      <Image
        objectFit="cover"
        width={{ base: "370px", sm: "150px" }}
        height={{ base: "80px", sm: "150px" }}
        src={backgroundTemplate}
        padding={{ base: "5px", sm: "10px" }}
        borderRadius={{ base: "10px", sm: "15px" }}
      />

      <Stack>
        <CardBody padding="10px" minWidth={{ base: "370px", sm: "620px" }}>
          <HStack>
            <Text color="gray" fontSize="16px" mt="3px">
              Category
            </Text>
            <Spacer />
            <IconButton
              size="xs"
              variant="outline"
              icon={<FaPen color="gray" />}
            />
            <IconButton
              size="xs"
              variant="outline"
              marginLeft="4px"
              icon={<DeleteIcon w={4} h={4} color="red.500" />}
            />
          </HStack>

          <Heading fontSize={{ base: "20px", sm: "20px" }} mt="5px">
            {/* {quiz.title} */}
            Calculation Questions
          </Heading>

          <Box >
  
            <HStack>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
              >{`6 Questions`}</Text>
            </HStack>
          </Box>
        </CardBody>
      </Stack>
    </Card>
  );
}
