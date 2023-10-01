import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  Text,
  Heading,
  Image,
  HStack,Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import {  Image, Text, Badge, Button, Group } from '@mantine/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Coursecard from "../../components/tutor/Coursecard";
import Coursecard2 from "../../components/tutor/Coursecard2";
// import Upcome from "../../components/tutor/dashboard/Upcomi";
import Calander from "../../components/tutor/Calander";
import Classes from "../../components/tutor/Classes";
import { Calendar } from "@mantine/dates";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Dashboard() {
  const customColors = ["red", "green", "blue", "purple", "black"];


  const [coursesdata, setCoursesData] = useState(null);
  const [studypackdata, setstudypackData] = useState(null);
  const [staffdata, setstaffData] = useState(null);
  const [contentdata, setcontentData] = useState(null);

  const axiosPrivate = useAxiosPrivate();



  useEffect(() => {
    // Fetch the courses data
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch courses data
    getCourses();
  }, []); 

  const totalCourses = coursesdata ? coursesdata.length : 0;


  useEffect(() => {
    // Fetch the study pack data
    const getStudypack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack`, {
          signal: controller.signal,
        });
        const paidCourses = response.data.filter((course) => course.type === "PAID");
        setstudypackData(paidCourses);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch study pack data
    getStudypack();
  }, []); 
 
  const totalstudypack = studypackdata ? studypackdata.length : 0;


  useEffect(() => {
    // Fetch the staff data
    const getStaff = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/staffs`, {
          signal: controller.signal,
        });
        setstaffData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch staff data
    getStaff();
  }, []);
 
  const totalstaff = staffdata ? staffdata.length : 0;



  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/content`, {
          signal: controller.signal,
        });
        setcontentData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);


  
  return (
    <Box bg="#F9F9F9" width="100%" p={5}>
      <Heading ml='15px' fontSize='26px'>Tutor Dashboard</Heading>
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
                        <br /> {totalCourses}
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
                       {totalstudypack}
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
                        <br />{totalstaff}{" "}
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
                <Tab>Today</Tab>
                <Tab>Upcoming</Tab>
              </TabList>
              <TabPanels>
                <TabPanel mb='-20px'>
                      <Coursecard></Coursecard>
                
         
                  
               
                </TabPanel>
                <TabPanel  mb='-20px'>
                <Coursecard2></Coursecard2>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        <Box bg="white" width="330px" height="680px" mt={5} ml='250px'>
          <Box mt='20px'>
            <Calander></Calander>
          </Box>
          <Text fontWeight={"400"} ml="10px" fontSize="20px" mt="30px" mb='25px'>
            {" "}
           Recently Uploaded Contents
          </Text>


          {contentdata && contentdata.slice(0, 3).map((content, index) => (
          <Box key={index} bg='white' mt="15px" mb='5px' p={4} width={{base:350,xl:300}}   borderLeft='6px solid #00b0e6'  ml='10px'  borderRadius={'5px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
            <HStack mt='5px' spacing='30px'>
                <Image src={content.thumbnail} alt={content.title} width="70px" height="50px" />
                <Box>
            <Text fontSize='16px' color='grey'>{content.title}</Text>
            <Button fontSize='10px' mt='2px' height='14px'>View</Button>
            </Box>
            </HStack>
           
            {/* <HStack mt='8px' spacing='30px'>
              <Text fontSize='12px'  color='grey'>{content.date}</Text>
              <Text fontSize='12px'  color='grey'>{content.time}</Text>
            </HStack> */}
          </Box>
        ))}

          {/* <Box bg='#e6f9ff' mt='40px' width={{base:350,xl:300}} p={2}  borderLeft='6px solid #00b0e6' ml='15px'>
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
      </Box> */}

  
    
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
