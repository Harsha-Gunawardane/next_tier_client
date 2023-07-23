import React from "react";
import Coursecomp from "../../components/tutor/course";
import Coursepackage from "../../components/tutor/coursepackage.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom';



const Courses = () => {

 

  return (



<Box width='100%'>
        <Tabs isFitted variant='enclosed' >
  <TabList mb='1em'>
    <Tab fontSize='15px'>Course</Tab>
    <Tab fontSize='15px'>Course Package</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>

    <Link to="/tutor/courses/add">
    <Button ml='1100px' mb='30px' width='100px' colorScheme="blue">Add New</Button>  </Link>
    <SimpleGrid minChildWidth='300px' spacing='40px'>
   
    
        <Coursecomp></Coursecomp>
     
     </SimpleGrid>

    </TabPanel>
    <TabPanel>
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
