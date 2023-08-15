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
  Input
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import data from "./data/data.json";
import { TimeIcon } from "@chakra-ui/icons";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import StudentsList from "./StudentsList";

function CourseDetail() {
  const { id } = useParams();
  const courseIdNum = parseInt(id);

  // Find the course in the JSON data
  const course = data.Tutors.flatMap((tutor) => tutor.courses).find(
    (course) => course.course_id === courseIdNum
  );

  // Check if the course data is found
  if (!course) {
    return <div>Course not found</div>;
  }

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
              {course.course_name} - {course.name}
            </Text>
      <Grid templateColumns="repeat(8, 1fr)" gap={3} marginBottom={5}>
      <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: "78vh", lg: "78vh" }}
        
          ml={4}
        >
           <Tabs colorScheme="blue" backgroundColor="#ffffff"  border="0.05px solid #DAE6F0" borderRadius={10}  height='87vh' overflowY='scroll' css={scrollbarStyles}>
            <TabList gap={10} marginLeft={5}>
              <Tab fontSize={13} fontWeight='medium'>Enrolled Studnets</Tab>
              <Tab fontSize={13} fontWeight='medium'>Payment details</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                  <StudentsList></StudentsList>
                </TabPanel>
                <TabPanel></TabPanel>
            </TabPanels>
            </Tabs>
          
        </GridItem>
        <GridItem
          w="100%"
          h={{ base: "85vh", lg: "85vh" }}
          colSpan={{ base: 8, lg: 2, xl: 2 }}
        
          borderRadius={15}
         
        >
            <Box bg="white" padding={3} borderRadius={10} border="0.05px solid #DAE6F0" height="87vh" mr={4}>
          <Box>
            <Text fontWeight="bold" fontSize="16px" mt={3} mb={4}>
              {course.course_name} - {course.name}
            </Text>
          </Box>
          <SimpleGrid columns={1}>
            <Box>
              <Image src={course.CourseImage} mb={4}></Image>
              <Box mb={4}>
                <Flex gap={10}>
                  <Flex>
                    <Box>
                      <Icon as={TimeIcon}></Icon>
                    </Box>
                    <Box>
                      <Text fontSize="xs" pt={1.5} pl={2}>
                        20 h 20 mins
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Box>
                      <Icon as={FaMoneyBillAlt} width={6} mt={1.5}></Icon>
                    </Box>
                    <Box>
                      <Text fontSize="xs" pt={1.5} pl={2}>
                        {course.price}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
              <Text fontSize="small" fontWeight="bold" mt={4} mb={4}>
                Description
              </Text>
              <Text fontSize="small">{course.course_description}</Text>
            </Box>
          </SimpleGrid>
          </Box>
        </GridItem>
        
      </Grid>
    </Box>
  );
}

export default CourseDetail;
