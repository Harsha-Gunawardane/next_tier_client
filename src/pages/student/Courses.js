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
} from "@chakra-ui/react";
import { useState } from "react";

import CoursesList from "../common/Courses";
function Courses() {
  const [focusedTab, setFocusedTab] = useState("New");

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
    <Box w={"100%"}>
      <Tabs pl={5} pr={5} mt={2} ml={2}>
        <TabList style={{ borderBottom: "none" }}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            pr={9}
          >
            <Flex gap={3}>
              <Tab
                bg={focusedTab === "New" ? "#383838" : "#E9E9E9"}
                color={focusedTab === "New" ? "#FFFFFF" : "#454545"}
                pl={6}
                pr={6}
                pt={1.5}
                pb={1.5}
                borderRadius={25}
                onClick={() => setFocusedTab("New")}
                borderBottom={"none"}
              >
                New
              </Tab>
              <Tab
                bg={focusedTab === "In progress" ? "#383838" : "#E9E9E9"}
                color={focusedTab === "In progress" ? "#FFFFFF" : "#454545"}
                pl={6}
                pr={6}
                pt={1.5}
                pb={1.5}
                borderRadius={25}
                onClick={() => setFocusedTab("In progress")}
                borderBottom={"none"}
              >
                In progress
              </Tab>
              <Tab
                bg={focusedTab === "Completed" ? "#383838" : "#E9E9E9"}
                color={focusedTab === "Completed" ? "#FFFFFF" : "#454545"}
                pl={6}
                pr={6}
                pt={1.5}
                pb={1.5}
                borderRadius={25}
                onClick={() => setFocusedTab("Completed")}
                borderBottom={"none"}
              >
                Completed
              </Tab>
            </Flex>
          </Flex>
        </TabList>

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
    </Box>
  );
}

export default Courses;
