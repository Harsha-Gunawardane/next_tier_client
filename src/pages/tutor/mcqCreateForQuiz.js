import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Button,
  Textarea,
  Select,
} from "@chakra-ui/react";

// import { ChevronRightIcon} from "@chakra-ui/icons";
// import { FaCamera, FaImage } from "react-icons/fa";

// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const McqCreateForQuiz = () => {
  return (
    <Box width="100%" overflowY="auto" mb="20px">
      <Container m="0">
        <form action="" method="post">
          <FormLabel fontSize="18px">Create Question</FormLabel>

          <Grid
            h="580px"
            w="1220px"
            templateRows="repeat(9, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
          >
            <GridItem
              rowSpan={1}
              colSpan={6}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Question</FormLabel>
                <Input
                  type="text"
                  placeholder="Question"
                  name="question"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Points (for Question)</FormLabel>
                <Input type="text" placeholder="Points" name="points" />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Medium</FormLabel>
                <Input type="text" placeholder="Medium" name="medium" />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={2}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input type="text" placeholder="Subject" name="subject" />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={6}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>
                  Subject Area(s) Eg:Industrial Chemistry/Inorganic Chemistry
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Subject Area(s)"
                  name="subjectAreas"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={6}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl>
                <FormLabel>Choices</FormLabel>
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Choice 1. (A)</FormLabel>
                <Input
                  type="text"
                  placeholder="Choice"
                  name="choice1"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Choice 2. (B)</FormLabel>
                <Input
                  type="text"
                  placeholder="Choice"
                  name="choice2"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Choice 3. (C)</FormLabel>
                <Input
                  type="text"
                  placeholder="Choice"
                  name="choice3"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Choice 4. (D)</FormLabel>
                <Input
                  type="text"
                  placeholder="Choice"
                  name="choice4"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl>
                <FormLabel>Choice 5. (E)</FormLabel>
                <Input
                  type="text"
                  placeholder="Choice"
                  name="choice5"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={6}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Right Choice</FormLabel>
                <Input
                  type="text"
                  placeholder="Right Choice"
                  name="rightChoice"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Answer Type</FormLabel>
                <Select placeholder="Select a type" name="answerType">
                  <option value="multipleChoice">Multiple Choice Answer</option>
                  <option value="singleChoice">Single Choice Answer</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={3}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Difficulty</FormLabel>
                <Select placeholder="Select a type" name="dificultyType">
                  <option value="simple">Simple</option>
                  <option value="average">Average</option>
                  <option value="hard">Hard</option>
                </Select>
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={3}
              colSpan={6}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Answer Explanation</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Answer Explanation"
                  name="answerExplanation"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              colStart={6}
              colEnd={7}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <Button
                type="submit"
                colorScheme="messenger"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr="28px"
              >
                Save Information
              </Button>
              <Button
                colorScheme="messenger"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Cancel
              </Button>
            </GridItem>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default McqCreateForQuiz;
