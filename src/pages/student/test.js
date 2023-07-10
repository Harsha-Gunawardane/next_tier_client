import React from "react";
import course from "../../assets/data/course.js";
import Course from "../../components/student/course";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Courses = () => {
  return (

 
<ChakraProvider>

<Box overflowY='scroll'>


<SimpleGrid minChildWidth='120px' spacing='40px'>
  <Box bg={{base:'white',xl:'tomato'}} height='200px'></Box>

  <Box bg='tomato' height='800px'>
  
  <SimpleGrid minChildWidth='120px' spacing='10px' p={10} >
  <Box bg='white' height='50px' > Fname</Box>
  <Box bg='white' height='50px'> Lname</Box>
  </SimpleGrid>

  <SimpleGrid minChildWidth='120px' spacing='10px' p={10} mt='-80px'>
  <Box bg='white' height='50px' width='100%'>Adress</Box>
  <Box bg='white' height='50px' width='100%'>School</Box>
  </SimpleGrid>

  <SimpleGrid minChildWidth='120px' spacing='10px' p={10} mt='-80px'>
  <Box bg='white' height='50px' width='100%'> password</Box>
  <Box bg='white' height='50px' width='100%'> Confirm Password</Box>
  </SimpleGrid>

  </Box>

</SimpleGrid>

 
 


  </Box>
  </ChakraProvider>
   
  );
};

export default Courses;
