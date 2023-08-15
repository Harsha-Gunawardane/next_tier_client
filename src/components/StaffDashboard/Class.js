import React, { useState } from "react";
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
} from "@chakra-ui/react";
import data from "../../pages/InstituteStaff/data/data";
import ClassDetails from "./ClassDetails";

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
      <Tabs mx="5px" my="7px" border="0.05px solid #DAE6F0" borderRadius={15} bg="white">
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
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
              px={[2, 4]}
            >
              {ongoingClasses.map((classItem, id) => (
                  <Box
                  key={classItem.id}
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
                    transform: 'scale(1.05)', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    cursor: 'pointer', 
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  <Avatar
                    src={classItem.profileImage}
                    my="5"
                    height={["60px", "80px", "100px"]} 
                    width={["80px", "100px", "120px"]}
                    borderRadius={5}
                  />
                  <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}> 
                    {classItem.teacher}
                  </Text>
                  <Text fontSize={["12px", "12px", "12px"]}> 
                    {` ${classItem.class}`}
                  </Text>
                  <Text fontSize={["12px", "12px", "12px"]}> 
                    {` ${classItem.startTime} - ${classItem.endTime}`}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
              px={[2, 4]}
            >
              {pendingClasses.map((classItem, id) => (
                 <Box
                 key={classItem.id}
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
                   transform: 'scale(1.05)', 
                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                   cursor: 'pointer', 
                   transition: 'transform 0.3s, box-shadow 0.3s',
                 }}
               >
                 <Avatar
                   src={classItem.profileImage}
                   my="5"
                   height={["60px", "80px", "100px"]} 
                   width={["80px", "100px", "120px"]} 
                   borderRadius={5}
                 />
                 <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}> 
                   {classItem.teacher}
                 </Text>
                 <Text fontSize={["12px", "12px", "12px"]}> 
                   {` ${classItem.class}`}
                 </Text>
                 <Text fontSize={["12px", "12px", "12px"]}> 
                   {` ${classItem.startTime} - ${classItem.endTime}`}
                 </Text>
               </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid
              columns={[1, 2, 3, 5]}
              spacing="6"
             px={[2, 4]}
            >
              {doneClasses.map((classItem, id) => (
                <Box
                key={classItem.id}
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
                  transform: 'scale(1.05)', 
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                  cursor: 'pointer', 
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
              >
                <Avatar
                  src={classItem.profileImage}
                  my="5"
                  height={["60px", "80px", "100px"]} 
                  width={["80px", "100px", "120px"]} 
                  borderRadius={5}
                />
                <Text fontWeight="bold" fontSize={["13px", "13px", "14px"]}> 
                  {classItem.teacher}
                </Text>
                <Text fontSize={["12px", "12px", "12px"]}> 
                  {` ${classItem.class}`}
                </Text>
                <Text fontSize={["12px", "12px", "12px"]}> 
                  {` ${classItem.startTime} - ${classItem.endTime}`}
                </Text>
              </Box>
              ))}
            </SimpleGrid>
          </TabPanel>
          <ClassDetails
        isOpen={modalOpen}
        onClose={closeModal}
        classItem={selectedClass}
      />
        </TabPanels>
      </Tabs>
      
    </Box>
  );
}

export default Classes;
