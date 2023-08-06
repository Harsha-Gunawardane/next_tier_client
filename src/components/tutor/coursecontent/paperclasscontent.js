import React from "react";
import { Flex, AccordionPanel, Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, HStack, Heading } from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { ChakraProvider, Button, Image } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

import Addcoursecontent from "./Addcoursecontent.js";
import Addcoursedoccontent from "./Addcoursedoccontent.js";
import Addcoursequiz from "./Addcoursequiz.js";
import Remove from "./Coursecontentremove.js";
import Removecontent from "./Contentremove.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../index.css"
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

const CourseContent = () => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const courseId = 'YOUR_COURSE_ID';
  const monthToDelete = '2232';

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course/${id}`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);

  const months = coursesdata
    ? coursesdata.studypack_ids.map((monthData) => {
      return Object.keys(monthData)[0];
    })
    : [];

  return (
    <ChakraProvider>
      <Accordion allowToggle>
        {months.map((month, index) => {
          const monthData = coursesdata.studypack_ids[index][month];
          
   

          const videoIds = monthData.video_id || [];
          const tuteIds = monthData.tute_id || [];

     

          return (
            <AccordionItem key={index} width={{ base: 400, xl: 700 }}>
              <h2>
                <AccordionButton
                  bg="#eee"
                  border="2px solid white"
                  borderRadius="5px"
                  height="50px"
                >
                  <Removecontent courseId={id} month={monthToDelete}></Removecontent>
                  <Box as="span" flex="1" textAlign="left" height="30px">
                    <Heading p={1} ml="20px" fontSize="15px">
                      {month}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} bg="white">
                <HStack spacing={{ base: 220, xl: 300 }}>
                  <Box width='600px'><Text fontSize='15px'>Video Content</Text></Box>
                  <Box> <Addcoursecontent></Addcoursecontent></Box>
                </HStack>

                <Box bg='#F0F8FF' mt='4px' className="box1" >
                  <HStack spacing={{ base: 90, xl: 330 }}>
                    <Box p={2} width='210px'>
                      <HStack>
                        <Image
                          boxSize="50%"
                          width={{ base: 70, xl: 70 }}
                          height='50px'
                          objectFit="cover"
                        />
                        <Box ><Text fontSize='14px' className="box2">{videoIds.join(', ')}</Text></Box>
                      </HStack>
                    </Box>
                    <Box width='90px' ml='5px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> <Remove></Remove></HStack></Box>
                  </HStack>
                </Box>

                <HStack spacing={{ base: 220, xl: 300 }} mt='10px' >
                  <Box width='600px' ><Text fontSize='15px'>Document Content</Text></Box>
                  <Box> <Addcoursedoccontent></Addcoursedoccontent></Box>
                </HStack>

                <Box bg='#F0F8FF' mt='4px' className="box1" >
                  <HStack spacing={{ base: 90, xl: 330 }}>
                    <Box p={2} width='210px'>
                      <HStack>
                        <Image
                          boxSize="50%"
                          width={{ base: 70, xl: 70 }}
                          height='50px'
                          objectFit="cover"
                        />
                        <Box ><Text fontSize='14px' className="box2"> {tuteIds.join(', ')}</Text></Box>
                      </HStack>
                    </Box>
                    <Box width='90px' ml='5px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> <Remove></Remove></HStack></Box>
                  </HStack>
                </Box>


  
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ChakraProvider>
  );
};

export default CourseContent;
