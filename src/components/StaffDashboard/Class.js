import React from "react";
import {
  Box,
  Text,
  Avatar,
  SimpleGrid,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import data from "../../pages/InstituteStaff/data/data";

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  // Convert hours and minutes to strings
  const hoursStr = hours.toString().padStart(2, "0");
  const minutesStr = minutes.toString().padStart(2, "0");

  return { hours: hoursStr, minutes: minutesStr };
}

function Classes() {
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
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555;
    }
  `;

  const currentTime = getCurrentTime();

  const doneClasses = data.classes.filter(
    (classItem) =>
      classItem.startTime < `${currentTime.hours}:${currentTime.minutes} ` &&
      classItem.endTime <= `${currentTime.hours}:${currentTime.minutes} `
  );

  const ongoingClasses = data.classes.filter(
    (classItem) =>
      classItem.startTime < `${currentTime.hours}:${currentTime.minutes} ` &&
      classItem.endTime > `${currentTime.hours}:${currentTime.minutes} `
  );

  const pendingClasses = data.classes.filter(
    (classItem) =>
      classItem.startTime >= `${currentTime.hours}:${currentTime.minutes} ` &&
      classItem.endTime > `${currentTime.hours}:${currentTime.minutes} `
  );
  return (
    <Box width="100%">
      <Tabs mx="20px" my="10px" border="0.05px solid #DAE6F0" borderRadius={15}>
        <TabList gap={10} marginLeft={5}>
          <Tab fontSize={13} fontWeight="medium">
            Ongoing
          </Tab>
          <Tab fontSize={13} fontWeight="medium">
            Pending
          </Tab>
          <Tab fontSize={13} fontWeight="medium">
            Done
          </Tab>
        </TabList>
        <TabPanels height="36vh" overflowY="scroll" css={scrollbarStyles}>
          <TabPanel>
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
              marginLeft={4}
              marginRight={4}
            >
              {ongoingClasses.map((classItem, id) => (
                <Box
                  key={classItem.id}
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
                  <Avatar src={classItem.profileImage} mb="2" size="xl" />
                  <Text fontWeight="bold" fontSize={13}>
                    {classItem.teacher}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.subject} (${classItem.examYear})`}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.startTime} - ${classItem.endTime}`}
                  </Text>
                  <Button size="sm" colorScheme="blue" marginTop={2}>
                    View Course
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
              marginLeft={4}
              marginRight={4}
            >
              {pendingClasses.map((classItem, id) => (
                <Box
                  key={classItem.id}
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
                    src={classItem.profileImage}
                    mb="2"
                    height={100}
                    width={140}
                    borderRadius={5}
                  />
                  <Text fontWeight="bold" fontSize={13}>
                    {classItem.teacher}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.subject} (${classItem.examYear})`}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.startTime} - ${classItem.endTime}`}
                  </Text>

                  <Button size="sm" colorScheme="blue" marginTop={2}>
                    View Course
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
              marginLeft={4}
              marginRight={4}
            >
              {doneClasses.map((classItem, id) => (
                <Box
                  key={classItem.id}
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
                  <Avatar src={classItem.profileImage} mb="2" size="xl" />
                  <Text fontWeight="bold" fontSize={13}>
                    {classItem.teacher}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.subject} (${classItem.examYear})`}
                  </Text>
                  <Text fontSize={13}>
                    {" "}
                    {` ${classItem.startTime} - ${classItem.endTime}`}
                  </Text>
                  <Button size="sm" colorScheme="blue" marginTop={2}>
                    View Course
                  </Button>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Classes;
