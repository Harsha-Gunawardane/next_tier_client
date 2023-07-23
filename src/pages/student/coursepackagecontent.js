import React from "react";
import { useEffect,useState } from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel } from "@chakra-ui/react";

import {
  Avatar,

} from "@chakra-ui/react";
import {  HStack} from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";


import CourseContent from "../../components/student/CourseContentPage/courseContent";

const Coursecontent = () => {

  const[coursecontentdata,coursecontentdatachange]=useState(null);

 
  useEffect(() => {
    fetch("http://localhost:8000/content").then((res) => {
        return res.json();
    }).then((resp) => {
        coursecontentdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
  return (
   <Box overflowY='scroll'>


  


      <SimpleGrid spacing={20} minChildWidth="250px">

 <Box w="140%" bg="white" p={10} borderRadius="10px" ml="10px">

 <SimpleGrid spacing={2} minChildWidth="250px">
  <Box bg='white' height='150px'>
    <Heading fontSize='20px' mb='20px'>Current Lesson</Heading>
  <Image
      src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
      alt='Green double couch with wooden legs'
      height='150px'
      
      
    />
  </Box>
  <Box bg='white' height='100px' p={5}>
    <Heading fontSize='20px' ml='-100px' mt='50px'>My first UI design case Study</Heading>
  </Box>
 </SimpleGrid>

  <Heading fontSize='20px' mt='80px'>Course Content</Heading>

 {coursecontentdata?.map((item) => (
      <CourseContent item={item} key={item.id} />
    ))}

        </Box>

      

        <Box width="80%" ml="20%" bg="white " p={10} borderRadius="10px">
            <Heading fontSize='20px' mb='30px'>Physics 2024 Theory</Heading>
        <HStack spacing='10px' mt='-15px'>
  <Box w='30%' h='40px' bg='white'>
  <Avatar
            width="40px"
            height='40px'
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            borderRadius='50%'
            ml='20px'
          />
  </Box>
  <Box w='70%' h='40px' bg='white' ml='-20px'>
<Heading fontSize='15px'>Mr.Nilantha jayasooriya</Heading>
<Text fontSize='12px'>Bsc.Eng University of Moratuwa</Text>
  </Box>
 
</HStack>
          <br></br>



<Box bg='white' height='140px' p={2} >
<Text fontSize='15px'>
            Find Physics stock images in HD and millions of other royalty-free
            stock photos, illustrations and vectors in the Shutterstock
            collection. Thousands of new, high-quality pictures added every day.
          </Text>

</Box>
<br></br>


 


        </Box>
      </SimpleGrid>

     
      </Box>
  );
};

export default Coursecontent;
