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


import CourseContent from "../../components/tutor/courseContent";
import Adddate from "../../components/tutor/addmonth";
import Addmonth from "../../components/tutor/addmonth.js";
import Addannouncement from "../../components/tutor/addannouncement";
import Announcement from "../../components/tutor/announcement";
import Forum from "../../components/student/CourseContentPage/forum";

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
 <Heading fontSize='30px' mb='30px'>Physics 2024 Theory</Heading>
 <SimpleGrid spacing={2} minChildWidth="250px">
  <Box bg='white' height='150px'>
  <Image
      src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
      alt='Green double couch with wooden legs'
      height='150px'
      
      
    />
  </Box>
  <Box bg='white' height='100px' p={5}>
    <Text fontSize='15px' ml='-100px' mt='-30px'>Find Physics stock images in HD and millions of other royalty-free stock photos, illustrations and vectors in the Shutterstock collection. Thousands of new, high-quality pictures added every day</Text>
  </Box>
 </SimpleGrid>

  <Heading fontSize='20px' mt='40px'>Course Content</Heading>

 {coursecontentdata?.map((item) => (
      <CourseContent item={item} key={item.id} />
    ))}

<Addmonth></Addmonth>
        </Box>

      

        <Box width="80%" ml="20%" bg="white " p={10} borderRadius="10px">
          
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

  <Announcement></Announcement>


<br></br>

<Forum></Forum>
 


        </Box>
      </SimpleGrid>

     
      </Box>
  );
};

export default Coursecontent;
