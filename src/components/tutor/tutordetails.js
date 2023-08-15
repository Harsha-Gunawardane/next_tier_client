import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon,EditIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider,HStack } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton ,Box,Avatar} from '@chakra-ui/react'



const Tutordetails = (props) => {

 
  return (

<ChakraProvider>
    <Box>

<Heading fontSize='20px' mb='30px'>About the Tutor</Heading>
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
  <Box w='70%' h='40px' bg='white' ml={{base:0,xl:-50}}>
<Heading fontSize='15px'>Mr.Nilantha jayasooriya</Heading>
<Text fontSize='12px'>Bsc.Eng University of Moratuwa</Text>
  </Box>
 
</HStack>
          <br></br>

          <Text fontSize='15px' mt={{base:10,sm:10,xl:0}}>
            Find Physics stock images in HD and millions of other royalty-free
            stock photos, illustrations and vectors in the Shutterstock
            collection. Thousands of new, high-quality pictures added every day.
          </Text>
</Box>
    
</ChakraProvider>
   
  );
};

export default Tutordetails;
