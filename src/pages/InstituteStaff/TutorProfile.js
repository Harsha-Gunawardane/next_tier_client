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
} from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import data from "./data/data.json";
import { useNavigate } from "react-router-dom";

function TutorProfile() {
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
  const tutorData = data.Tutors.find(
    (tutor) => tutor.tutor_id.toString() === id
  );
  console.log("Tutor Data:", tutorData);

  // Check if the staff data is found
  if (!tutorData) {
    return <div>Tutor not found</div>;
  }
  const handleViewProfile = (tutorId,courseID) => {
navigate(`/staff/tutor-profile/${tutorId}/course/${courseID}`);
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
              src={tutorData.profileImage}
            ></Avatar>
            <Text fontWeight="bold" fontSize={20} mt={3}>
              {tutorData.fName} {tutorData.lName}
            </Text>
            <Text fontSize={13} mt={1}>
              {tutorData.gender}
            </Text>
            <Text fontSize={13} color="gray" mt={1}>
              {tutorData.education.qualifications}
            </Text>
            <Text fontSize={13} mt={1}>
              Joined Date:{tutorData.joinedDate}
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
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Courses
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={1} minChildWidth={300}>
                  <Box borderRadius={15} p={5}>
                    {/* Personal Info */}
                    {/* <Text fontSize={14} mb={2} fontWeight="bold">Personal Information</Text> */}
                    <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                      <FormControl>
                        <FormLabel fontSize="small">First Name</FormLabel>
                        <Input
                          value={tutorData.fName}
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
                          value={tutorData.lName}
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Date of Birth
                        </FormLabel>
                        <Input
                          value={tutorData.dob}
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
                          value={tutorData.email}
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
                          value={tutorData.phn_num}
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
                          value={tutorData.address}
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
                <SimpleGrid columns={1} spacingX={4} spacingY={2}>
                  <Box>
                    <FormControl>
                      <FormLabel fontSize="small" mt={3}>
                        School
                      </FormLabel>
                      <Input
                        value={tutorData.education.school}
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
                        value={tutorData.education.medium}
                        fontSize="small"
                        bg="white"
                        readOnly
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel fontSize="small">Qualification</FormLabel>
                      <Textarea
                        fontSize="small"
                        value={tutorData.education.qualifications}
                        bg="white"
                        readOnly
                      />
                    </FormControl>
                  </Box>
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                <SimpleGrid columns={1}>
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
                </SimpleGrid>
                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                <SimpleGrid
                  p="10px"
                  columns={{ base: 1, lg: 3, xl: 3 }}
                  spacing={10}
                >
                  {tutorData.courses.map((course) => (
                    <Box
                      minChildWidth="250px"
                      borderColor="#C4C4C4"
                      bg="white"
                      borderRadius={10}
                    >
                      <Box padding={0}>
                        <Image
                          src={course.CourseImage}
                          width="100%"
                          alt="Course Image"
                        />
                      </Box>

                      <Stack mt="4" spacing="3">
                        <Box>
                          <Heading size="md" fontSize={20} paddingLeft={4}>
                            {course.course_name}
                          </Heading>
                        </Box>

                        <Divider></Divider>
                        <Flex gap={3} marginLeft={4}>
                          <Box>
                            <Text fontSize={11}>{course.price} per month</Text>
                          </Box>
                        </Flex>
                      </Stack>

                      <Box padding={0} paddingTop={3}>
                        <Button
                          width="100%"
                          colorScheme="blue"
                          borderTopRightRadius={0}
                          borderTopLeftRadius={0}
                          onClick={() => handleViewProfile(tutorData.tutor_id,course.course_id)}
                        >
                          View Course
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default TutorProfile;
