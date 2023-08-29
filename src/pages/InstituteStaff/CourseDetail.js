import { useState, useEffect } from "react";
import {
  Text,
  Box,
  Image,
  Flex,
  SimpleGrid,
  Grid,
  GridItem,
  Icon,
  Select,
  Spacer,
  Input,
  Button,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import data from "./data/data.json";
import { TimeIcon, CalendarIcon } from "@chakra-ui/icons";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Avatar,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const coursepayments = data.Coursepayments;

function CourseDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/staff/course/${id}`);
        setCourseDetails(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [axiosPrivate, id]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  const handleViewProfile = (stuId) => {
    navigate(`/staff/stu-profile/${stuId}`);
  };

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

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Text fontWeight="bold" fontSize="16px" mb={1}>
        {courseDetails.title} - {courseDetails.subject}
      </Text>
      <Grid templateColumns="repeat(8, 1fr)" gap={3} marginBottom={5}>
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: "78vh", lg: "78vh" }}
          ml={4}
        >
          <Tabs
            colorScheme="blue"
            backgroundColor="#ffffff"
            border="0.05px solid #DAE6F0"
            borderRadius={10}
            height="87vh"
            overflowY="scroll"
            css={scrollbarStyles}
          >
            <TabList gap={10} marginLeft={5}>
              <Tab fontSize={13} fontWeight="medium">
                Enrolled Studnets
              </Tab>
              <Tab fontSize={13} fontWeight="medium">
                Payment details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box width="100%" height="79.2vh">
                  <SimpleGrid
                    columns={[1, 2, 3, 4]}
                    spacing="6"
                    marginLeft={4}
                    marginRight={4}
                  >
                    {courseDetails.student_enrolled_course.map((enrollment) => (
                      <Box
                        // key={stu.id}
                        borderWidth="1px"
                        borderRadius="lg"
                        p="4"
                        shadow="md"
                        bg="white"
                        mb="1"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        key={enrollment.student.id}
                      >
                        <Avatar
                          // src={stu.profileImage}
                          src={enrollment.student.profile_picture}
                          mb="2"
                          size="xl"
                        />
                        <Text fontWeight="bold" fontSize={13}>
                          {/* {stu.fName} {stu.lName} */}
                          {enrollment.student.first_name}{" "}
                          {enrollment.student.last_name}
                        </Text>
                        <Text fontSize={13}>
                          {/* {stu.gender} */}
                          {enrollment.student.gender}
                        </Text>
                        {/* {courseDetails.student_enrolled_course.map((enrolledStudent) => (
  <Box key={enrolledStudent.student.id}>
    <Badge
      colorScheme={
        enrolledStudent.student.students[0].stream === "Mathematics"
          ? "red"
          : enrolledStudent.student.students[0].stream === "Biology"
          ? "green"
          : enrolledStudent.student.students[0].stream === "Arts"
          ? "teal"
          : "orange"
      }
    >
      <Text fontSize={13}>
        {enrolledStudent.student.students[0].stream}
      </Text>
    </Badge>
  </Box>
))} */}

                        <Text fontSize={13}>
                          Joined Date:
                          {/* {stu.joinedDate} */}
                          {new Date(
                            enrollment.student.join_date
                          ).toLocaleDateString()}
                        </Text>
                        <Text fontSize={13}>
                          Enrolled Date:
                          {/* {stu.joinedDate} */}
                          {new Date(
                            enrollment.enrolled_at
                          ).toLocaleDateString()}
                        </Text>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          marginTop={2}
                          onClick={() =>
                            handleViewProfile(enrollment.student.id)
                          }
                        >
                          View Profile
                        </Button>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>
              </TabPanel>
              <TabPanel>
  <Box height="550px" overflowY="scroll" css={scrollbarStyles}>
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Payment Details</TableCaption>
        <Thead>
          <Tr fontSize={13}>
            <Th>Date</Th>
            <Th>Student</Th>
            <Th>Payment Method</Th>
            <Th>Study Pack ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courseDetails.study_pack.map((pack) =>
            pack.student_purchase_studypack.map((payment) => (
              <Tr key={payment.id}>
                <Td fontSize={13}>
                  {new Date(payment.purchased_at).toLocaleDateString()}
                </Td>
                <Td>
                  <Flex gap={4}>
                    <Avatar src={payment.student.profile_picture} />
                    <Text fontSize={13} marginTop={4}>
                      {payment.student.first_name} {payment.student.last_name}
                    </Text>
                  </Flex>
                </Td>
                <Td paddingLeft={-14}>
                  <Text
                    marginLeft={4}
                    textAlign="center"
                    width="120px"
                    fontSize={13}
                    color="white"
                    borderRadius={15}
                    px={2}
                    py={1}
                    bg={
                      payment.type === "PHYSICAL" ? "green.500" : "blue.500"
                    }
                  >
                    {payment.type}
                  </Text>
                </Td>
                <Td fontSize={13}>{pack.id}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
</TabPanel>

            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem
          w="100%"
          h={{ base: "85vh", lg: "85vh" }}
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          borderRadius={15}
        >
          <Box
            bg="white"
            padding={3}
            borderRadius={10}
            border="0.05px solid #DAE6F0"
            height="87vh"
            mr={4}
            overflowY="scroll"
            css={scrollbarStyles}
          >
            <Box>
              <Text fontWeight="bold" fontSize="16px" mt={3} mb={4}>
                {courseDetails.title} - {courseDetails.subject}
              </Text>
            </Box>
            <SimpleGrid columns={1}>
              <Box>
                <Image src={courseDetails.thumbnail} mb={4}></Image>
                <Box mb={4}>
                  <Flex justify="space-between">
                    <Flex ml={2}>
                      <Box>
                        <Icon as={CalendarIcon}></Icon>
                      </Box>
                      <Box>
                        <Text fontSize="xs" pt={1.5} pl={2}>
                          {courseDetails.start_date
                            ? new Date(
                                courseDetails.start_date
                              ).toLocaleDateString()
                            : ""}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex mr={2}>
                      <Box>
                        <Icon as={FaMoneyBillAlt} width={6} mt={1.5}></Icon>
                      </Box>
                      <Box>
                        <Text fontSize="xs" pt={1.5} pl={2}>
                          {courseDetails.monthly_fee}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Text fontSize="small" fontWeight="bold" mt={4} mb={4}>
                  Description
                </Text>
                <Text fontSize="small">{courseDetails.description}</Text>
              </Box>
            </SimpleGrid>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default CourseDetail;
