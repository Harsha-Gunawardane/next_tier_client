import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Text,
  Badge,
  Flex,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Stack,
  Heading,
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaMoneyBillAlt } from "react-icons/fa";
// import data from "./data/data.json";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function TutorProfile() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
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

  const { id } = useParams();
  // const staffData = data.staffs.find((staff) => staff.id.toString() === id);
  // console.log('Staff Data:', staffData);
  const [tutorDetails, setTutorDetails] = useState(null);
  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/tutor-profile/${id}`);
        setTutorDetails(response.data);
      } catch (error) {
        console.error("Error fetching staff profile:", error);
      }
    };

    fetchTutorProfile();
  }, [axiosPrivate, id]);

  if (!tutorDetails) {
    return <div>Loading...</div>;
  }
  const handleViewCourse = (courseID) => {
    navigate(`/staff/course/${courseID}`);
  };

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
        {/**Grid Item 1 */}
        <GridItem
          w="100%"
          h={{ base: "50vh", lg: "50vh" }}
          as="aside"
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          marginLeft={4}
          borderRadius={15}
        >
          <Box
            height="53vh"
            borderWidth="1px"
            borderRadius={15}
            shadow="md"
            bg="white"
            mb="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={3}
          >
            <Avatar
              width={200}
              height={200}
              mt={4}
              src={tutorDetails.profile_picture}
            ></Avatar>
            <Text fontWeight="bold" fontSize={20} mt={3}>
              {tutorDetails.first_name} {tutorDetails.last_name}
            </Text>
            <Text fontSize={13} mt={1}>
              {tutorDetails.gender}
            </Text>
            <Text fontSize={13} color="gray" mt={1}>
              {tutorDetails.tutor.map((tutor) =>
                tutor.qualifications
                  .map(
                    (qualification, index) =>
                      `${qualification}${
                        index !== tutor.qualifications.length - 1 ? ", " : ""
                      }`
                  )
                  .join("")
              )}
            </Text>
            <Text fontSize={13} mt={1}>
              Joined Date:{" "}
              {new Date(tutorDetails.join_date).toLocaleDateString()}{" "}
            </Text>
          </Box>
        </GridItem>

        {/**Grid Item 2 */}
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: "88.3vh", lg: "88.3vh" }}
          marginRight={4}
          marginLeft={3}
        >
          <Tabs
            height="88.3vh"
            mt={3}
            borderRadius={0}
            overflowY="scroll"
            css={scrollbarStyles}
            variant="enclosed"
          >
            <TabList>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Courses
              </Tab>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
                marginRight="6px"
              >
                Personal Information
              </Tab>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
                marginRight="6px"
              >
                Educational Background
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* <SimpleGrid columns={1}>
                  <Box mb={4}>
                    <Flex>
                      <Text fontSize="small" mt="10px">
                        Subjects taken:
                      </Text>
                      <Flex mt="2" flexWrap="wrap">
                        {tutorData.subjects.map((subject, index) => (
                          <Badge
                            key={index}
                            colorScheme={
                              subject === "Physics"
                                ? "red"
                                : subject === "Mathematics"
                                ? "green"
                                : subject === "Chemistry"
                                ? "teal"
                                : "orange"
                            }
                            fontSize="small"
                            variant="solid"
                            ml={3}
                          >
                            {subject}
                          </Badge>
                        ))}
                      </Flex>
                    </Flex>
                  </Box>
                </SimpleGrid> */}
                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                {/* <SimpleGrid
                  p="10px"
                  columns={{ base: 1, lg: 3, xl: 3 }}
                  spacing={10}
                >
                  {tutorDetails.tutor.courses.map((course,index) => (
                    <Box
                      minChildWidth="250px"
                      borderColor="#C4C4C4"
                      bg="white"
                      borderRadius={10}
                      key={index}
                    > */}
                <SimpleGrid
                  p="10px"
                  columns={{ base: 1, lg: 3, xl: 3 }}
                  spacing={10}
                >
                  {tutorDetails.tutor.map((tutor, tutorIndex) =>
                    tutor.courses.map((course, courseIndex) => (
                      <Box
                        minChildWidth="250px"
                        borderColor="#C4C4C4"
                        bg="white"
                        borderRadius={10}
                        key={`${tutorIndex}-${courseIndex}`}
                      >
                        <Box padding={0}>
                          <Image
                            src={course.thumbnail}
                            width="100%"
                            alt="Course Image"
                          />
                        </Box>

                        <Stack mt="4" spacing="3">
                          <Box>
                            <Heading size="md" fontSize={20} paddingLeft={4}>
                              {course.title}
                            </Heading>
                          </Box>

                          <Divider></Divider>
                          <Flex gap={3} marginLeft={4}>
                            <Box>
                              <Icon as={FaMoneyBillAlt} width={6}></Icon>
                            </Box>
                            <Box>
                              <Text fontSize={11}>
                                {course.monthly_fee} per month
                              </Text>
                            </Box>
                          </Flex>
                        </Stack>

                        <Box padding={0} paddingTop={3}>
                          <Button
                            width="100%"
                            colorScheme="blue"
                            borderTopRightRadius={0}
                            borderTopLeftRadius={0}
                            onClick={() => handleViewCourse(course.id)}
                          >
                            View Course
                          </Button>
                        </Box>
                      </Box>
                    ))
                  )}
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={1} minChildWidth={300}>
                  <Box borderRadius={15} p={5}>
                    {/* Personal Info */}
                    {/* <Text fontSize={14} mb={2} fontWeight="bold">Personal Information</Text> */}
                    <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                      <FormControl>
                        <FormLabel fontSize="small">First Name</FormLabel>
                        <Input
                          value={tutorDetails.first_name}
                          fontSize="small"
                          bg="white"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small">Last Name</FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={tutorDetails.last_name}
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Date of Birth
                        </FormLabel>
                        <Input
                          value={
                            tutorDetails.DOB
                              ? new Date(tutorDetails.DOB).toLocaleDateString()
                              : ""
                          }
                          fontSize="small"
                          bg="white"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          E-mail
                        </FormLabel>
                        <Input
                          value={tutorDetails.username}
                          fontSize="small"
                          bg="white"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Phone Number
                        </FormLabel>
                        <Input
                          value={tutorDetails.phone_number}
                          fontSize="small"
                          bg="white"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Address
                        </FormLabel>
                        <Textarea
                          value={tutorDetails.address}
                          fontSize="small"
                          bg="white"
                          readOnly
                        />
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                {tutorDetails.tutor.map((tutor, index) => (
                  <Box key={index}>
                    <FormControl>
                      <FormLabel fontSize="small" mt={3}>
                        School
                      </FormLabel>
                      <Input
                        value={tutor.school}
                        fontSize="small"
                        bg="white"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="small" mt={3}>
                        Medium of teaching
                      </FormLabel>
                      <Input
                        value={tutor.medium}
                        fontSize="small"
                        bg="white"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="small">Qualification</FormLabel>
                      <Textarea
                        fontSize="small"
                        value={tutor.qualifications
                          .map(
                            (qualification, index) =>
                              `${qualification}${
                                index !== tutor.qualifications.length - 1
                                  ? ", "
                                  : ""
                              }`
                          )
                          .join("")}
                        bg="white"
                        readOnly
                      />
                    </FormControl>
                  </Box>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default TutorProfile;
