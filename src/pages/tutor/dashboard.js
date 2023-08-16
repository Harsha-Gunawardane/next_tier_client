import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Text,
  Heading,
  Image,
  HStack,
} from "@chakra-ui/react";
// import {  Image, Text, Badge, Button, Group } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Coursecard from "../../components/tutor/Coursecard";
import Calander from "../../components/tutor/Calander";
import Classes from "../../components/tutor/Classes";
import { Calendar } from "@mantine/dates";

function Dashboard() {
  const customColors = ["red", "green", "blue", "purple", "black"];

  return (
    <Box bg="#F9F9F9" width="100%" p={5}>
     <SimpleGrid minChildWidth='120px' spacing='40px'>
        
        <Box width="850px" height="700px">
          <SimpleGrid minChildWidth="120px" spacing="40px" mt="10px" p={5}>
            <Box>
              {" "}
              <Card>
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
              </Card>
            </Box>
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
            <Box>
              {" "}
              <Card>
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
                        <br />5{" "}
                      </Text>
                    </Flex>
                  </CardHeader>
                </Box>
              </Card>
            </Box>
          </SimpleGrid>

          <Text fontWeight={"400"} ml="40px" fontSize="25px" mt="10px" mb='10px'>
            {" "}
            Classes Summary
          </Text>

          <Box
            bg="white"
            height="500px"
            width="95%"
            p={10}
            borderRadius="1%"
            ml="20px"
          >
         <Tabs variant='soft-rounded' colorScheme='blue'>
              <TabList mb="1em">
                <Tab>Ongoing</Tab>
                <Tab>Upcoming</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SimpleGrid minChildWidth="120px" spacing="40px">
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
        </Box>

        <Box bg="white" width="330px" height="680px" mt={5} ml='250px'>
          <Box mt='20px'>
            <Calander></Calander>
          </Box>
          <Text fontWeight={"400"} ml="10px" fontSize="20px" mt="20px">
            {" "}
           Upcoming Events
          </Text>

          <Box bg='#e6f9ff' mt='40px' width={{base:350,xl:300}} p={2}  borderLeft='6px solid #00b0e6' ml='15px'>
        <Text fontSize='16px' color='grey'>Assignment on Physics 2024 Theory</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.00 P.M.</Text>
        </HStack>
      </Box>
      <Box bg='#e6f9ff' mt='20px' width={{base:350,xl:300}} p={2}  borderLeft='6px solid #00b0e6'  ml='15px'>
      <Text fontSize='16px' color='grey'>Assignment on Physics 2024 Theory</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.00 P.M.</Text>
        </HStack>
      </Box>
      <Box bg=' #e6f9ff' mt='20px' width={{base:350,xl:300}} p={2}  borderLeft='6px solid #00b0e6'  ml='15px'>
      <Text fontSize='16px' color='grey'>Assignment on Physics 2024 Theory</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.00 P.M.</Text>
        </HStack>
      </Box>

  
    
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
