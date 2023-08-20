import React from "react";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Select,
  FormLabel,
  Grid,
  GridItem,

} from "@chakra-ui/react";
import { useState } from "react";

import CoursesList from "../common/Courses";
import SearchBar from "../../components/SearchBar";
function Courses() {
  // const [focusedTab, setFocusedTab] = useState("New");

  const newCourses = [
    {
      courseName: "Physics 2024 Theory",
      tutorName: "Mr. Nilantha Jayasooriya",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
    {
      courseName: "Chemistry 2024 Theory",
      tutorName: "Mr. Jeewaka C Perera",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
    {
      courseName: "Mathematics 2025 Paper",
      tutorName: "Mr. Manoj Solangaarachchi",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
    {
      courseName: "Physics 2025 Paper",
      tutorName: "Mr. Samitha Rathnayeka",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
  ];

  const inProgressCourses = [
    {
      courseName: "Chemistry 2024 Theory",
      tutorName: "Mr. Jeewaka C Perera",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
    {
      courseName: "Mathematics 2025 Paper",
      tutorName: "Mr. Manoj Solangaarachchi",
      tutorDegree: "Bsc Engineering at University of Moratuwa",
      fee: 3500.00,
    },
  ];

  const completedCourse = [];

  return (


    <Tabs variant={"soft-rounded"} colorScheme={"accent"} w={"100%"} >
      <Box position={"sticky"} top={0}>
        <TabList >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            pr={9}
          >
            <Flex gap={3}>
              <Tab
                _selected={{ color: "#FFFFFF", bg: "#383838" }}
                color={"#3f3f3f"}
                bg={"gray.100"}
                fontWeight={"medium"}
              >
                Classes
              </Tab>
              <Tab
                _selected={{ color: "#FFFFFF", bg: "#383838" }}
                color={"#3f3f3f"}
                bg={"gray.100"}
                fontWeight={"medium"}
              >
                Study Packs
              </Tab>
              <Tab
                _selected={{ color: "#FFFFFF", bg: "#383838" }}
                color={"#3f3f3f"}
                bg={"gray.100"}
                fontWeight={"medium"}
              >
                Tutors
              </Tab>
            </Flex>
          </Flex>
        </TabList>
        <Flex w={"100%"} p="5px" gap="20px" my="10px" justifyContent={"flex-start"} alignItems={"center"} >
          <SearchBar />
          <Flex justifyContent={"space-between"} alignItems={"center"} gap="10px">
            <Select placeholder='Grade' w="200px" >
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Subject' w="200px">
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </Flex>
        </Flex>
      </Box>
      {/* </GridItem> */}
      <TabPanels>
        <TabPanel>

          <CoursesList courses={newCourses} />
        </TabPanel>
        <TabPanel>
          <CoursesList courses={inProgressCourses} />
        </TabPanel>
        <TabPanel>
          <CoursesList courses={completedCourse} />
        </TabPanel>
      </TabPanels>
    </Tabs>

  );
}

export default Courses;
