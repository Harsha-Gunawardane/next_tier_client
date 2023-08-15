import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Text,
  Heading
 
} from "@chakra-ui/react";
// import {  Image, Text, Badge, Button, Group } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import Classes from "../../components/StaffDashboard/Class";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Coursecard from "../../components/tutor/Coursecard";
import Calander from "../../components/tutor/Calander";
import { Calendar } from "@mantine/dates";

function Dashboard() {
  const customColors = ["red", "green", "blue", "purple", "black"];

  return (
    <Box width='100%'  backgroundColor="#F9F9F9">

<Heading ml='10px' mt='5px'>240 Days more for Exam</Heading>
<SimpleGrid minChildWidth='120px' spacing='40px' mt='40px' p={5}>
  <Box>      <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="red.100" p={2}>
                  <FontAwesomeIcon
                    icon={faUser}
                    color={customColors[0]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  Students
                  <br />
                  550
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card></Box>


  <Box >   <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon
                    icon={faChalkboardUser}
                    color={customColors[1]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Courses
                  <br /> 5
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card></Box>
  <Box>
  <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="blue.100" p={2}>
                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                    color={customColors[2]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Study Packs
                  <br />
                  10
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card>
  </Box>
  <Box>     <Card>
          <Box boxSize="100%" _hover={{ transform: "scale(1.1)" }}>
            <CardHeader>
              <Flex alignItems="center">
                <Box borderRadius="50%" bg="green.100" p={2}>
                  <FontAwesomeIcon
                    icon={faChalkboard}
                    color={customColors[1]}
                    size="lg"
                  />
                </Box>
                <Text fontSize="18px" fontWeight="bold" ml={6}>
                  {" "}
                  Supporting Staff
                  <br />
                  5{" "}
                </Text>
              </Flex>
            </CardHeader>
          </Box>
        </Card></Box>

 
</SimpleGrid>

<Text  fontWeight={"300"} ml='40px' fontSize='20px' mt='10px'>
            Classes Summary 
          </Text>

<SimpleGrid minChildWidth='120px' spacing='40px' p={10}>
  <Box bg='white' height='440px' width='135%' p={5} borderRadius="1%">
  <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab>Ongoing</Tab>
    <Tab>Upcoming</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
    <SimpleGrid minChildWidth='120px' spacing='40px'>
    <Coursecard></Coursecard>
    <Coursecard></Coursecard>
    </SimpleGrid>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
       </TabPanels>
</Tabs>
  </Box>
  <Box bg='white' height='350px' width='60%' ml='200px' p={10}><Calendar></Calendar></Box>


 
</SimpleGrid>


     
    </Box>
  );
}

export default Dashboard;
