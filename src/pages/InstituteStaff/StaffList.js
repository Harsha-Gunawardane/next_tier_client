// import { useState } from 'react';
import {
  Heading,
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Input,
  Select,
  SimpleGrid,
  Spacer,
  Badge,
  useToast,
} from "@chakra-ui/react";
import data from "./data/data.json";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../LandingPage/Assets/avtr9.jpg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

// import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  useBreakpointValue,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useFormik } from "formik";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const staffData = data.staffs;

// Validation schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed for first name")
    .min(3, "First name must be at least 3 characters long"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Only letters are allowed for first name")
    .min(3, "Last name must be at least 3 characters long"),
  username: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+94\d{9}$/,
      "Invalid phone number format. Please enter +94 followed by 9 digits"
    ),
  DOB: yup.string().required("DOB Number is required"),
});

const StaffList = () => {
  const axiosPrivate = useAxiosPrivate();
  const [staffData, setStaffData] = useState([]); // State to hold fetched staff data

  const toast = useToast(); // Initialize useToast

  useEffect(() => {
    // Fetch staff details from the backend API
    const fetchStaffDetails = async () => {
      try {
        const response = await axiosPrivate.get("/staff/staffList");
        setStaffData(response.data);
      } catch (error) {
        console.error("Error fetching staff details:", error);
        // Display error toast
        toast({
          title: "Error",
          description: "Error fetching staff details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchStaffDetails();
  }, [toast]);

  const scrollbarStyles = `
    ::-webkit-scrollbar {
      width: 4px;
      height: 8px;
      border-radius: 10px;
      background-color: #f5f5f5;
      margin-left: 2px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 8px;
      border: 1px solid white;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `;

  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleViewProfile = (staffId) => {
    navigate(`/staff/profile/${staffId}`);
  };

  //Institue staff registration form submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sortKey, setSortKey] = useState("first_name"); // Default sort key
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order

  const onSubmit = async (values) => {
    setIsFormSubmitted(true);

    try {
      // Make API call to register staff member
      setIsFormSubmitted(false);
      const response = await axiosPrivate.post("/staff/register", values);
      console.log("Form data submitted:", response.data);
      setIsFormSuccess(true);

      // Display success toast
      toast({
        title: "Success",
        description: "Form submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsFormSubmitted(false);

      // Display error toast
      toast({
        title: "Error",
        description: error.response.data.error,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // Search staff by first name or last name
  const filteredStaff = staffData.filter((staff) =>
    `${staff.first_name} ${staff.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sort staff based on selected sort key and order
  const sortedStaff = filteredStaff.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    if (isFormSuccess) {
      onClose();
    }
  }, [isFormSuccess, onClose]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "+94",
    },
    validationSchema,
    onSubmit,
  });

  const formWidth = useBreakpointValue({
    base: "100%",
    sm: "400px",
    md: "500px",
    lg: "600px",
  });

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Box>
        <Flex align="center" justify="space-between" p={4}>
          <Text fontSize={20} color="#242424" mb={4} mt={1} fontWeight="bold">
            Institute Staffs
          </Text>
          {/* <Link to="/staff/add-staff"> */}
          <Button size="sm" mr={4} colorScheme="blue" mt={1} onClick={onOpen}>
            Add new staff
          </Button>
          {/* </Link> */}
          <Modal
            closeOnOverlayClick={false}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign="center">
                Staff Registration Form
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* <AddInstStaff /> */}
                <Box width={formWidth} maxWidth="100%">
                  {isFormSubmitted && (
                    <Alert status="success" mb={4}>
                      <AlertIcon />
                      Form submitted successfully!
                    </Alert>
                  )}
                  <Box>
                    <form onSubmit={formik.handleSubmit}>
                      <Box mb={4}>
                        <FormLabel>First Name</FormLabel>
                        <FormControl
                          isInvalid={
                            formik.touched.firstName && formik.errors.firstName
                          }
                        >
                          <Input
                            name="firstName"
                            {...formik.getFieldProps("firstName")}
                            placeholder="First Name"
                          />
                          <FormErrorMessage>
                            {formik.errors.firstName}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box mb={4}>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl
                          isInvalid={
                            formik.touched.lastName && formik.errors.lastName
                          }
                        >
                          <Input
                            name="lastName"
                            {...formik.getFieldProps("lastName")}
                            placeholder="Last Name"
                          />
                          <FormErrorMessage>
                            {formik.errors.lastName}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box mb={4}>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl
                          isInvalid={
                            formik.touched.phoneNumber &&
                            formik.errors.phoneNumber
                          }
                        >
                          <InputGroup>
                            <Input
                              name="phoneNumber"
                              {...formik.getFieldProps("phoneNumber")}
                              placeholder="9-digit phone number"
                            />
                          </InputGroup>
                          <FormErrorMessage>
                            {formik.errors.phoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>

                      <Box mb={4}>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl
                          isInvalid={
                            formik.touched.username && formik.errors.username
                          }
                        >
                          <Input
                            name="username"
                            {...formik.getFieldProps("username")}
                            placeholder="Enter your email address"
                          />
                          <FormErrorMessage>
                            {formik.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      </Box>
                      <FormControl
                        isInvalid={formik.errors.DOB && formik.touched.DOB}
                        mb={5}
                      >
                        <FormLabel>Date of Birth:</FormLabel>
                        <Input
                          type="date"
                          name="DOB"
                          {...formik.getFieldProps("DOB")}
                          placeholder="Enter the DOB."
                          
                        />
                        <FormErrorMessage>{formik.errors.DOB}</FormErrorMessage>
                      </FormControl>
                      {/* Submit button */}
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"
                      >
                        <Box>
                          <Flex gap={3} mt={3} mb={3}>
                            <Button
                              colorScheme="blue"
                              type="submit"
                              disabled={!formik.isValid || isFormSubmitted}
                            >
                              Submit
                            </Button>
                            <Button
                              onClick={onClose}
                              disabled={isFormSubmitted}
                            >
                              Close
                            </Button>
                          </Flex>
                        </Box>
                      </Box>
                    </form>
                  </Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>
      <Box>
        <SimpleGrid p="10px" columns={5} spacing={6} minChildWidth={200}>
          <Box height="40px">
            <Input
              placeholder="Search staff"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mb={["2", "0"]}
              fontSize={13}
              backgroundColor="white"
            />
          </Box>
          <Box></Box>
          <Box></Box>

          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort By:
                </Text>
              </Box>
              <Box>
                <Select
                  fontSize={13}
                  backgroundColor="white"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="first_name">First Name</option>
                  <option value="last_name">First Name</option>
                  <option value="join_date">Joined Date</option>
                </Select>
                <Spacer mx="2" />
              </Box>
            </Flex>
          </Box>
          <Box height="40px">
            <Flex paddingLeft={7}>
              <Box>
                <Text mr="2" fontSize={13} marginTop={2}>
                  Sort Order:
                </Text>
              </Box>
              <Box>
                <Select
                  w="max-content"
                  fontSize={13}
                  backgroundColor="white"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Select>
              </Box>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
      <Box width="100%" height="72vh" overflowY="scroll" css={scrollbarStyles}>
        <SimpleGrid
          columns={[1, 2, 3, 4, 5]}
          spacing="6"
          marginLeft={4}
          marginRight={4}
        >
          {sortedStaff.map((staff) => (
            <Box
              key={staff.id}
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              shadow="md"
              bg="white"
              mb="1"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                name={`${staff.first_name} ${staff.last_name}`}
                src={staff.profile_picture}
                mb="2"
                size="xl"
              />
              <Text fontWeight="bold" fontSize={13}>
                {staff.first_name} {staff.last_name}
              </Text>
              <Text fontSize={13}></Text>
              <Text fontSize={13}>Staff</Text>
              <Text fontSize={13}>
                Joined Date: {new Date(staff.join_date).toLocaleDateString()}
              </Text>
              <Button
                size="sm"
                colorScheme="blue"
                marginTop={2}
                onClick={() => handleViewProfile(staff.id)}
              >
                View Profile
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default StaffList;
