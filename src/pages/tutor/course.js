import React from "react";
import course from "../../assets/data/course.js";
import Coursecomp from "../../components/tutor/course";
import { Tabs, TabList, TabPanels, Tab, TabPanel , SimpleGrid,Box} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

const Courses = () => {
  return (

 


<Box overflow='scroll'>
        <Tabs isFitted variant='enclosed' >
  <TabList mb='1em'>
    <Tab fontSize='15px'>Course</Tab>
    <Tab fontSize='15px'>Course Package</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>


    <SimpleGrid minChildWidth='300px' spacing='40px'>
    
          {course?.map((item) => (
            <Coursecomp item={item} key={item.id} />
          ))}
     
     </SimpleGrid>

    </TabPanel>
    <TabPanel>
    <SimpleGrid minChildWidth='400px' spacing='40px'>
      
        </SimpleGrid>
    </TabPanel>
  </TabPanels>
</Tabs>

  </Box>
   
  );
};

export default Courses;
