

import React from "react";

import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,Image,HStack,Avatar,Heading,Text,Button,ButtonGroupStackDivider,Stack } from '@chakra-ui/react'

const Contentmain = (props) => {
  
  return (
<Box bg='white' w='100%' height='200px' p={4} color='black' mt={{base:0,lg:10,xl:10}}>
<Heading mt={{base:0,lg:40,xl:10}} fontSize='30px'>My First UI design Case Study</Heading>

<HStack spacing='2px' mt='10px'>
  <Box w='10%' h='40px' bg='white'>
  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </Box>
  <Box w='80%' h='40px' bg='white'>
  <Text ml='15px' fontSize='20px'>Nilantha Jayasooriya</Text>
<Text ml='15px' fontSize='20px'>Nilantha Jayasooriya</Text>
  </Box>
 
</HStack>


  
</Box>

 

  );
};

export default Contentmain;