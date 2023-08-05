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


import PaperclassContent from "../../components/tutor/coursecontent/paperclasscontent";
import Adddate from "../../components/tutor/coursecontent/addmonth";
import Addmonth from "../../components/tutor/coursecontent/addmonth.js";
import Announcement from "../../components/tutor/coursecontent/announcement";
import { Show, Hide } from '@chakra-ui/react'

const Coursecontent = () => {

  const[coursecontentdata,coursecontentdatachange]=useState(null);

 
  useEffect(() => {
    fetch("http://localhost:8000/paperclasscontent").then((res) => {
        return res.json();
    }).then((resp) => {
        coursecontentdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
  return (
   <Box>


  


      <SimpleGrid spacing={20} minChildWidth="250px">

 <Box w="130%" bg="white" p={10} borderRadius="10px" ml="10px">
 <Heading fontSize='30px' mb='30px'>Physics 2024 Paper</Heading>
 <Hide below='md'>
 <SimpleGrid spacing={2} minChildWidth="250px">
  <Box bg='white' width={{base:160,xl:250}} height={{base:120,xl:200}}>
  <Image
      src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
      alt='Green double couch with wooden legs'
      height={{base:120,xl:150}}
      
      
    />
  </Box>
  <Box bg='white' height='100px' p={5}>
    <Text fontSize='15px' ml={{base:-20,xl:-100}} mt='-20px'>Find Physics stock images in HD and millions of other royalty-free stock photos, illustrations and vectors in the Shutterstock collection. Thousands of new, high-quality pictures added every day</Text>
  </Box>
 </SimpleGrid>
</Hide>
  <Heading fontSize='20px' mt='40px' mb='20px'>Course Content</Heading>

 {coursecontentdata?.map((item) => (
      <PaperclassContent item={item} key={item.id} />
    ))}

<Addmonth></Addmonth>
        </Box>

      

        <Box width="72%" ml="20%" bg="white " p={10} borderRadius="10px">
          
        <HStack spacing='10px' mt='-15px'>
  <Box w='30%' h='40px' ml={{base:-20,xl:0}}bg='white'>
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


 


        </Box>
      </SimpleGrid>

     
      </Box>
  );
};

export default Coursecontent;
