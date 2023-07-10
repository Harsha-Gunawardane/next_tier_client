import React from "react";
import course from "../../assets/data/course.js";
import Course from "../../components/student/course";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Courses = () => {
  return (

 


<Box overflow='scroll'>



    <SimpleGrid minChildWidth='300px' spacing='40px' p={5}>
    
          {course?.map((item) => (
            <Course item={item} key={item.id} />
          ))}
     
     </SimpleGrid>

 
 


  </Box>
   
  );
};

export default Courses;
