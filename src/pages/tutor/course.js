import React from "react";
import course from "../../assets/data/course.js";
import Coursecomp from "../../components/tutor/coursedetails/course.js";
import Coursepackage from "../../components/tutor/coursepackage/coursepackage.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box} from '@chakra-ui/react'
import { ChakraProvider,Button } from '@chakra-ui/react'
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

<Link to = {'add'}>Add Course</Link>
    <SimpleGrid minChildWidth='300px' spacing='40px'>
    
        <Coursecomp></Coursecomp>
     
     </SimpleGrid>

    </TabPanel>
    <TabPanel>
    <Link to = {'addstudypack'}>Add Study Pack</Link>
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
