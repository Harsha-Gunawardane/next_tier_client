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
  Button,
  Tooltip,
} from "@chakra-ui/react";
import backgroundTemplate4 from "../../components/mcq/assests/backgroundTemplate4.jpg";
import { DeleteIcon, DownloadIcon } from "@chakra-ui/icons";
import { FaPen } from "react-icons/fa";

export default function PaperMarkingInsideCard({ paper, handleDelete, handleEdit }) {
  
  return (
    <>
      <Card
        direction={{ base: "column", md: "row" }}
        variant="outline"
        height={{ base: "120px", sm: "100px" }}
      >
        <Image
          objectFit="cover"
          width={{ base: "370px", md: "150px" }}
          height={{ base: "80px", md: "100px" }}
          src={backgroundTemplate4}
          padding={{ base: "5px", md: "10px" }}
          borderRadius={{ base: "10px", md: "15px" }}
        />

        <Stack>
          <CardBody padding="10px" minWidth={{ base: "370px", md: "585px" }}>
            <HStack justifyContent="space-between">
              {/* <Text color="gray" fontSize="14px">
                Paper
              </Text> */}
              <Heading fontSize={{ base: "16px", md: "16px" }} mb="4px" mt="4px">
                {paper.title}
              </Heading>
              <HStack>
                <Tooltip
                  hasArrow
                  label="Download paper"
                  fontSize="sm"
                  bg="gray"
                >
                  <IconButton
                    size="xs"
                    variant="outline"
                    icon={<DownloadIcon w={4} h={4} color="gray" />}
                  />
                </Tooltip>
                <Tooltip hasArrow label="Edit paper" fontSize="sm" bg="gray">
                  <IconButton
                    size="xs"
                    variant="outline"
                    marginLeft="4px"
                    icon={<FaPen color="gray" />}
                    onClick={() => handleEdit(paper.paper_id)}
                  />
                </Tooltip>
                <Tooltip
                  hasArrow
                  label="Delete paper"
                  fontSize="sm"
                  bg="red.500"
                >
                  <IconButton
                    size="xs"
                    variant="outline"
                    marginLeft="4px"
                    icon={<DeleteIcon w={4} h={4} color="red.500" />}
                    onClick={() => handleDelete(paper.paper_id)}
                  />
                </Tooltip>
              </HStack>
            </HStack>

            <Box>
              <Text fontSize={{ base: "16px", md: "15px" }}>
                {paper.subject}
              </Text>
              <HStack justifyContent="space-between">
                <Text color="gray" fontSize={{ base: "14px", md: "14px" }}>
                  {Array.isArray(paper.subject_areas)
                    ? paper.subject_areas.join(" / ")
                    : ""}
                </Text>

                <Button
                  leftIcon={<DownloadIcon />}
                  colorScheme="gray"
                  variant="outline"
                  size="sm"
                >
                  Upload Discussion Video
                </Button>
              </HStack>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}
