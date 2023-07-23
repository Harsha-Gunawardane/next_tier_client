

import React from "react";

import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, SimpleGrid,CardFooter,Image,HStack,Avatar,Heading,Text,Button,ButtonGroupStackDivider,Stack } from '@chakra-ui/react'

const Contentmain = (props) => {
  
  return (


    <SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' w='100%' height={{base:250,lg:50,xl:400}} p={10} color='black' >
<Image
      src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      
    />
  
</Box>




<Box bg='white' w='100%' height='200px' p={4} color='black' mt={{base:0,lg:10,xl:10}}>
<Heading mt={{base:0,lg:40,xl:10}} fontSize='25px'>My First UI design Case Study</Heading>

<HStack spacing='2px' mt='10px'>
  <Box w='10%' h='40px' bg='white'>
  <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
  </Box>
  <Box w='80%' h='40px' bg='white'>
  <Text ml='15px' fontSize='16px' >Nilantha Jayasooriya</Text>
<Text ml='15px' fontSize='13px' color='grey'>BSC.Eng University of Moratuwa</Text>
  </Box>
 
</HStack>


  
</Box>

</SimpleGrid>

  );
};

export default Contentmain;