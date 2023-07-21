import React from "react";
import {


  Text,



  HStack,
  Heading,

} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import {
 
  Box,
  Button,
} from "@chakra-ui/react";


const Forum = (props) => {
  

  return (
    <ChakraProvider>

<Box bg='#F0F8FF' height='220px' p={4} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Heading fontSize='20px' mb='10px'>Class Forum</Heading>

<HStack spacing='10px'>
 <Box w='50%' h='80px' bg='#F0F8FF'>
  <Text fontSize='15px'>Introducing Class Forums.Discuss your matters with your Friends and Tutor </Text>

 </Box>
 <Box w='50%' h='80px' bg='#F0F8FF' >

 </Box>

</HStack>
<Button colorScheme='blue' height='30px'><Text fontSize='12px'>Visit Forum</Text></Button>
</Box>

    </ChakraProvider>
  );
};

export default Forum;
