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
} from "@chakra-ui/react";

// import { ChevronRightIcon} from "@chakra-ui/icons";
// import { FaCamera, FaImage } from "react-icons/fa";

// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const CreateMcq = () => {
  return (
    <div>
    
    <Container m="0">
        <form action="" method="post">
          <FormLabel>Create Question</FormLabel>

          <Grid
            h="500px"
            w="1220px"
            templateRows="repeat(9, 1fr)"
            templateColumns="repeat(6, 1fr)"
            gap={4}
            overflowY="auto"
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
                  placeholder="Name"
                  name="name"
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
                <Input type="text" placeholder="Address" name="address" />
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
                <Input type="text" placeholder="Address" name="address" />
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
                <Input type="text" placeholder="Address" name="address" />
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
                  placeholder="Name"
                  name="name"
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
                  placeholder="Name"
                  name="name"
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
                  placeholder="Name"
                  name="name"
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
                  placeholder="Name"
                  name="name"
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
                  placeholder="Name"
                  name="name"
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
                <FormLabel>Choice 5. (E)</FormLabel>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
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
                  placeholder="Name"
                  name="name"
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
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  color="blue.600"
                />
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
                <FormLabel>Explanation</FormLabel>
                <Textarea
                  type="text"
                  placeholder="Name"
                  name="name"
                  color="blue.600"
                />
              </FormControl>
            </GridItem>

            <GridItem
              colStart={5}
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
    </div>
  );
};

export default CreateMcq;
