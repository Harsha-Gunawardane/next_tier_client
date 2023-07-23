import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon,EditIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider,HStack } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton ,Box,Avatar} from '@chakra-ui/react'
import Addcoursecontent from "./addcoursecontent.js";
import  "../../Student.css";



const Tabcontent = (props) => {


 
  return (

<ChakraProvider>
<HStack spacing='510px'>
  
  <Text fontSize='15px'>Video Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'  className="box2"></Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>

<HStack  spacing='480px' mt='10px' >

  <Text fontSize='15px'>Document Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   


  
  
  </HStack>

  <Box bg='#F0F8FF' mt='4px' >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'></Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>



</Box>

<HStack  spacing='520px'  mt='10px' >

  <Text fontSize='15px'>Quiz Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   


  
  
  </HStack>

  <Box bg='#F0F8FF' mt='4px' >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'></Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>



</Box>
    
</ChakraProvider>
   
  );
};

export default Tabcontent;
