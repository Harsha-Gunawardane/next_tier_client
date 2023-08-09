import React from "react";
import Coursecomp from "../../components/student/courses.js";
import Coursepackage from "../../components/student/studypack.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box} from '@chakra-ui/react'
import { ChakraProvider,Button,Text } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Courses = () => {

 

  return (

 


<Box width='100%' >
  <Tabs isFitted variant='enclosed' colorScheme="blue" >
  <TabList mb='1em' colorScheme="blue">
    <Tab fontSize='20px'>Course</Tab>
    <Tab fontSize='20px'>Course Package</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>

<Link to = {'add'}><Box width='120px' height='40px' bg='blue' ml='85%' p={2}><Text fontSize='15px' ml='5px' color='white'>+ Add Course</Text></Box></Link>


    <SimpleGrid minChildWidth='300px' spacing='40px'>
    
        <Coursecomp></Coursecomp>
     
     </SimpleGrid>

    </TabPanel>
    <TabPanel>
    <Link to = {'addstudypack'}><Box width='140px' height='40px' bg='blue' ml='85%' p={2}><Text fontSize='14px' ml='5px' color='white'>+ Add StudyPack</Text></Box></Link>
  
    <SimpleGrid minChildWidth='400px' spacing='40px'>

      <Coursepackage></Coursepackage>
        </SimpleGrid>
    </TabPanel>
  </TabPanels>
</Tabs>

  </Box>
   
  );
};

export default Courses;
