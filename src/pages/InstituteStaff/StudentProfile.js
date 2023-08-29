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
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
// import data from './data/data.json';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StuProfile() {
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

  // const { id } = useParams();
  // const stuData = data.Students.find((stu) => stu.stu_id.toString() === id);
  // console.log('Stu Data:', stuData);

  // // Check if the staff data is found
  // if (!stuData) {
  //     return <div>Staff not found</div>;
  // }

  const { id } = useParams();
  const [studentDetails, setStudentDetails] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/stu-profile/${id}`);
        setStudentDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [axiosPrivate, id]);

  if (!studentDetails) {
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
              src={studentDetails.profile_picture}
            ></Avatar>
            <Text fontWeight="bold" fontSize={20} mt={3}>
              {studentDetails.first_name} {studentDetails.last_name}
            </Text>
            <Text fontSize={13} mt={1}>
              {studentDetails.gender}
            </Text>
            <Text fontSize={13} mt={1}>
              {/* {stuData.stream} */}
            </Text>
            <Text fontSize={13} mt={1}>
              Joined Date:{" "}
              {studentDetails.join_date
                ? new Date(studentDetails.join_date).toLocaleDateString()
                : ""}
            </Text>
            {/* <Flex mt={3} >
              <Text fontSize={13} >Account status:</Text>
              <Badge colorScheme="green" fontSize={15}>
                Enabled
              </Badge>
            </Flex> */}
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
            <TabList gap="40px">
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Personal Information
              </Tab>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Emergency Contact
              </Tab>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Educational Information
              </Tab>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Course Details
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
                          value={studentDetails.first_name}
                          bg="white"
                          fontSize="small"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small">Last Name</FormLabel>
                        <Input
                          bg="white"
                          value={studentDetails.last_name}
                          fontSize="small"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Date of Birth
                        </FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={
                            studentDetails.DOB
                              ? new Date(
                                  studentDetails.DOB
                                ).toLocaleDateString()
                              : ""
                          }
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          E-mail
                        </FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={studentDetails.username}
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Phone Number
                        </FormLabel>
                        <Input
                          bg="white"
                          value={studentDetails.phone_number}
                          fontSize="small"
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Address
                        </FormLabel>
                        <Textarea
                          bg="white"
                          fontSize="small"
                          value={studentDetails.address}
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
                    <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                      <FormControl>
                        <FormLabel fontSize="small">
                          Relationship with the student
                        </FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={
                            studentDetails.students[0]?.emergency_contact
                              ?.relationship || "null"
                          }
                          style={
                            studentDetails.students[0]?.emergency_contact
                              ?.relationship
                              ? {}
                              : {
                                  color: "grey",
                                  fontStyle: "italic",
                                }
                          }
                          readOnly
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small">Full Name</FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={
                            studentDetails.students[0]?.emergency_contact
                              ?.name || "null"
                          }
                          readOnly
                          style={
                            studentDetails.students[0]?.emergency_contact?.name
                              ? {}
                              : {
                                  color: "grey",
                                  fontStyle: "italic",
                                }
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Mobile Number
                        </FormLabel>
                        <Input
                          bg="white"
                          fontSize="small"
                          value={
                            studentDetails.students[0]?.emergency_contact
                              ?.phone_number || "null"
                          }
                          readOnly
                          style={
                            studentDetails.students[0]?.emergency_contact
                              ?.phone_number
                              ? {}
                              : {
                                  color: "grey",
                                  fontStyle: "italic",
                                }
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Address
                        </FormLabel>
                        <Textarea
                          bg="white"
                          fontSize="small"
                          value={
                            studentDetails.students[0]?.emergency_contact
                              ?.address || "null"
                          }
                          readOnly
                          style={
                            studentDetails.students[0]?.emergency_contact
                              ?.address
                              ? {}
                              : {
                                  color: "grey",
                                  fontStyle: "italic",
                                }
                          }
                        />
                      </FormControl>
                    </SimpleGrid>
                  </Box>
                </SimpleGrid>
              </TabPanel>
              <TabPanel>
                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                {studentDetails.students.map((student, index) => (
                  <Box key={index}>
                    <SimpleGrid columns={1} spacingX={4} spacingY={2}>
                      <Box>
                        <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Grade
                            </FormLabel>
                            <Input
                              bg="white"
                              fontSize="small"
                              value={student.grade}
                              readOnly
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="small">Stream</FormLabel>
                            <Input
                              bg="white"
                              fontSize="small"
                              value={student.stream}
                              readOnly
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="small">Subjects</FormLabel>
                            <Input
                              bg="white"
                              fontSize="small"
                              value={student.subjects.join(", ")}
                              readOnly
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Medium
                            </FormLabel>
                            <Input
                              bg="white"
                              fontSize="small"
                              value={student.medium}
                              readOnly
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              School
                            </FormLabel>
                            <Input
                              bg="white"
                              fontSize="small"
                              value={student.school}
                              readOnly
                            />
                          </FormControl>
                        </SimpleGrid>
                      </Box>
                    </SimpleGrid>
                  </Box>
                ))}
              </TabPanel>
              {/* ... (other tab panels) */}
              <TabPanel>
                <SimpleGrid
                  p="10px"
                  columns={{ base: 1, lg: 2, xl: 2 }}
                  spacing={10}
                  mt={4}
                >
                  {studentDetails.student_enrolled_course.map(
                    (enrolledCourse) => (
                      <div
                        key={enrolledCourse.course.id}
                        className="course-details-box"
                        onClick={() =>
                          handleViewCourse(enrolledCourse.course.id)
                        }
                      >
                        <Box
                          borderWidth="1px"
                          borderRadius={10}
                          minChildWidth="500px"
                          shadow="md"
                          bg="white"
                          p={3}
                          mb={3}
                          _hover={{
                            backgroundColor: "#E2F5FF",
                            cursor: "pointer",
                            // transform: "scale(1.02)",
                            transition: "background-color 0.3s, transform 0.5s",
                          }}
                        >
                          <Flex justify="space-between">
                            <Box>
                              <Image
                                src={enrolledCourse.course.thumbnail}
                                height="84px"
                                width="110px"
                                borderRadius={3}
                              ></Image>
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="end"
                            >
                              <Text fontWeight="bold" fontSize={16}>
                                {enrolledCourse.course.title}
                              </Text>
                              <Text fontSize={14}>
                                {enrolledCourse.course.subject}
                              </Text>
                              <Text fontSize={13}>
                                Enrolled Date:{" "}
                                {enrolledCourse.enrolled_at
                                  ? new Date(
                                      enrolledCourse.enrolled_at
                                    ).toLocaleDateString()
                                  : ""}
                              </Text>
                              <Text fontSize={13}>
                                Monthly Fee: {enrolledCourse.course.monthly_fee}
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </div>
                    )
                  )}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default StuProfile;
