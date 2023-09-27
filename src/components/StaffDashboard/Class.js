import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Avatar,
  SimpleGrid,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useToast,
} from "@chakra-ui/react";
import ClassDetails from "./ClassDetails";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosPrivate.get("/staff/class/details", {});
        setClassData(response.data);
      } catch (error) {
        console.error("Error fetching class details:", error.response.data);
        toast({
          title: "Error",
          description: "Error fetching class details. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchClasses();
  }, [toast, axiosPrivate]);

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const openModal = (classItem) => {
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClass(null);
    setModalOpen(false);
  };

  return (
    <Box width="100%">
      <Tabs
        mx="5px"
        my="7px"
        border="0.05px solid #DAE6F0"
        borderRadius={15}
        bg="white"
      >
        <TabList gap={8} marginLeft={5}>
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
        <TabPanels height="35vh" overflowY="scroll" css={scrollbarStyles}>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 5]} spacing="6" px={[2, 4]}>
              {classData.map((classItem) => {
                const currentTime = getCurrentTime();
                const relevantSchedules = classItem.hall_schedule.filter((schedule) => {
                  const startTime = new Date(schedule.date + " " + schedule.start_time);
                  const endTime = new Date(schedule.date + " " + schedule.end_time);
                  const currentDateTime = new Date();

                  return (
                    startTime < currentDateTime &&
                    endTime > currentDateTime
                  );
                });

                return relevantSchedules.map((schedule, index) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    p="2"
                    shadow="md"
                    bg="white"
                    mb="4"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    maxW="300px"
                    onClick={() => openModal(classItem)}
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <Avatar
                      src={classItem.tutor.user.profile_picture}
                      my="5"
                      height={["60px", "80px", "100px"]}
                      width={["80px", "100px", "120px"]}
                      borderRadius={5}
                    />
                    <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}>
                      {` ${classItem.tutor.user.first_name} ${classItem.tutor.user.last_name}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${classItem.title}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${schedule.start_time} - ${schedule.end_time}`}
                    </Text>
                  </Box>
                ));
              })}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 5]} spacing="6" px={[2, 4]}>
              {classData.map((classItem) => {
                const currentTime = getCurrentTime();
                const relevantSchedules = classItem.hall_schedule.filter((schedule) => {
                  const startTime = new Date(schedule.date + " " + schedule.start_time);
                  const endTime = new Date(schedule.date + " " + schedule.end_time);
                  const currentDateTime = new Date();

                  return (
                    startTime >= currentDateTime && endTime > currentDateTime
                  );
                });

                return relevantSchedules.map((schedule, index) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    p="2"
                    shadow="md"
                    bg="white"
                    mb="4"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    maxW="300px"
                    onClick={() => openModal(classItem)}
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <Avatar
                      src={classItem.tutor.user.profile_picture}
                      my="5"
                      height={["60px", "80px", "100px"]}
                      width={["80px", "100px", "120px"]}
                      borderRadius={5}
                    />
                    <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}>
                      {` ${classItem.tutor.user.first_name} ${classItem.tutor.user.last_name}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${classItem.title}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${schedule.start_time} - ${schedule.end_time}`}
                    </Text>
                  </Box>
                ));
              })}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={[1, 2, 3, 5]} spacing="6" px={[2, 4]}>
              {classData.map((classItem) => {
                const currentTime = getCurrentTime();
                const relevantSchedules = classItem.hall_schedule.filter((schedule) => {
                  const startTime = new Date(schedule.date + " " + schedule.start_time);
                  const endTime = new Date(schedule.date + " " + schedule.end_time);
                  const currentDateTime = new Date();

                  return (
                    startTime < currentDateTime && endTime <= currentDateTime
                  );
                });

                return relevantSchedules.map((schedule, index) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    p="2"
                    shadow="md"
                    bg="white"
                    mb="4"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    width="100%"
                    maxW="300px"
                    onClick={() => openModal(classItem)}
                    _hover={{
                      transform: "scale(1.05)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                  >
                    <Avatar
                      src={classItem.tutor.user.profile_picture}
                      my="5"
                      height={["60px", "80px", "100px"]}
                      width={["80px", "100px", "120px"]}
                      borderRadius={5}
                    />
                    <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}>
                      {` ${classItem.tutor.user.first_name} ${classItem.tutor.user.last_name}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${classItem.title}`}
                    </Text>
                    <Text fontSize={["12px", "12px", "12px"]}>
                      {` ${schedule.start_time} - ${schedule.end_time}`}
                    </Text>
                  </Box>
                ));
              })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
        <ClassDetails isOpen={modalOpen} onClose={closeModal} classItem={selectedClass} />
      </Tabs>
    </Box>
  );
}

export default Classes;
