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

import api from "../../api/axios";
import { useForm } from "react-hook-form";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useStaffStore from "../../zustandStore/staffStore";

const StaffEdit = () => {
  const { register, handleSubmit } = useForm();

  const staffs = useStaffStore((state) => state.staffs);

  let updatedData = {};

  const handleEdit = async (id) => {
    try {
      const response = await api.put(`/posts/${id}`, updatedData);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  
  const onSubmit = async (data) => {
    try {
      updatedData = data;
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    console.log(data);
    console.log(staffs);
  };

  return (
    <div>
      <BreadCrumbs />
      {/* <FormLabel>{staffs.}</FormLabel> */}

      <Container m="0" maxW="100%" p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            h="auto"
            w={["100%", "100%", "100%", "1220px"]}
            templateRows="repeat(4, 1fr)"
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(8, 1fr)",
            ]}
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
                <RadioGroup name="staffTitle">
                  <HStack spacing="24px">
                    <Radio value="supportingStaff" {...register("staffTitle")}>
                      Class Supporting Staff
                    </Radio>
                    <Radio
                      value="paperMarkingStaff"
                      {...register("staffTitle")}
                    >
                      Paper Marking Staff
                    </Radio>
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
                  value={staffs.name}
                  {...register("name")}
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
                <Input
                  type="text"
                  placeholder="Address"
                  name="address"
                  {...register("address")}
                />
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
                <Input type="date" name="birthday" {...register("birthday")} />
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
                <Input
                  type="text"
                  placeholder="Contact"
                  name="contact"
                  {...register("contact")}
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
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select option"
                  name="gender"
                  {...register("gender")}
                >
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
                <Select
                  placeholder="Select option"
                  name="language"
                  {...register("language")}
                >
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
                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  {...register("email")}
                />
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
                onClick={() => handleEdit()}
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
