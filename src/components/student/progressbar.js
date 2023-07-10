

import React from "react";

import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,Image,HStack,Avatar,Progress,Heading,Text,Button,ButtonGroupStackDivider,Stack } from '@chakra-ui/react'

const Progressbar = (props) => {
  
  return (
<Box bg='white' w='100%' height='100px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' mt='10px'>
<HStack spacing='24px'>
  <Box w='20%' h='30px' bg='white'>
    <Heading fontSize='20px'>#Quiz 23</Heading>
    <Text fontSize='15px'>23rd June 2023</Text>
  </Box>
  <Box w='65%' h='40px' bg='white' mt='20px'>
  <Progress width='100%' value={80} mt='10px'/>
  </Box>
  
</HStack>

</Box>

 

  );
};

export default Progressbar;