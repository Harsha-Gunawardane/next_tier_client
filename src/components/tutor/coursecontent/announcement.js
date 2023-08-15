import React from "react";


import { ChakraProvider,Text,Heading,Box,HStack,Button } from "@chakra-ui/react";
import Addannouncement from "./Addannouncement";



const Announcement = (props) => {
  

  return (
    <ChakraProvider>


<Box bg='white' p={5} ml={{base:-85,xl:0}}>
        <Heading fontSize='20px' mt='-20px' mb='10px' fontWeight='xl'>Announcement</Heading>
      <Box bg='white' mt='20px' width={{base:350,xl:320}} p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderLeft='6px solid red'>
        <Text fontSize='16px' color='grey'>Class is cancelled on 29th July</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.29 P.M.</Text>
        </HStack>
      </Box>

      <Box bg='white' mt='20px' width={{base:350,xl:320}}  p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'  borderLeft='6px solid red'>
        <Text fontSize='15px'  color='grey'>Class is cancelled on 29th July</Text>
        <HStack mt='8px'  spacing='30px'>
          <Text fontSize='12px'  color='grey'>15 JUNE 2023</Text>
          <Text fontSize='12px'  color='grey'>08.29 P.M.</Text>
        </HStack>
      </Box>

      
      
     <Addannouncement></Addannouncement> 
    
      </Box>

    </ChakraProvider>
  );
};

export default Announcement;
