import {
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Grid,
  GridItem,
  Input,
  Select,
  Button,
  Avatar,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
// import useStaffStore from "../../zustandStore/staffStore";


const StaffEdit = () => {
  // const [newItem, setNewItem] = useState("");

  // const addStaff = useStaffStore((state) => state.addStaff);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container m="0">
        <form onSubmit={handleSubmit}>
          <Grid
            h="500px"
            w="1220px"
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(8, 1fr)"
            gap={4}
          >
            <GridItem
              rowSpan={1}
              colSpan={8}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl as="fieldset">
                <FormLabel as="legend">Choose Staff Title</FormLabel>
                <RadioGroup defaultValue="supportingStaff" name="staffTitle">
                  <HStack spacing="24px">
                    <Radio value="supportingStaff">
                      Class Supporting Staff
                    </Radio>
                    <Radio value="paperMarkingStaff">Paper Marking Staff</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={1}
              colSpan={4}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
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
              colSpan={4}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input type="text" placeholder="Address" name="address" />
              </FormControl>
            </GridItem>

            <GridItem
              rowSpan={2}
              colSpan={2}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl>
                <FormLabel mb="5px">Staff Image</FormLabel>
                <Avatar
                  width="160px"
                  height="160px"
                  src="https://bit.ly/code-beast"
                  ml="50px"
                >
                  <AvatarBadge width="3em" height="3em" bg="gray.400">
                    {/* <EditIcon w={15} h={10} /> */}
                    <IconButton
                      borderRadius="30px"
                      width="3em"
                      height="3em"
                      aria-label="Insert Image"
                      bg="gray.400"
                      icon={<EditIcon boxSize="20px" />}
                      // onClick={handleImageClick}
                    />
                  </AvatarBadge>
                </Avatar>
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
                <FormLabel>Birthday</FormLabel>
                <Input type="date" name="birthday" />
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
                <FormLabel>Contact</FormLabel>
                <Input type="text" placeholder="Contact" name="contact" />
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
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select option" name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
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
                <FormLabel>Language</FormLabel>
                <Select placeholder="Select option" name="language">
                  <option value="sinhala">Sinhala</option>
                  <option value="english">English</option>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem
              rowSpan={1}
              colSpan={4}
              display="flex"
              alignItems="center"
              pl="20px"
            >
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="text" placeholder="Address" name="address" />
              </FormControl>
            </GridItem>
            <GridItem
              colStart={7}
              colEnd={9}
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

export default StaffEdit;
