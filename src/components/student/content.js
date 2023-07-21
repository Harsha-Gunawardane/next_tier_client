import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



const Course = (props) => {
  const { name,imgUrl } = props.item;
  return (

<ChakraProvider>


<Card maxW='lg' bg='transparent' boxShadow='none'>
  <CardBody>
    <Image
      src={imgUrl}
      
      borderRadius='none'
      width='100%'
      
    />
    <Stack mt='6' spacing='3'>

    <HStack spacing='2px' mt='-20px'>
    <Image
      src={imgUrl}
      alt='Green double couch with wooden legs'
     height='40px'
      width='40px'
      borderRadius='50%'
    />
    
     <Heading color='black' fontSize='15px' ml='10px'>{name}
     </Heading>
    
   
   
 
</HStack>

<Text ml='50px' mt='-25px' fontSize='12px' color='grey'>Nilantha Jayasooriya</Text>
<HStack spacing='20px' mt='-15px'>
<Text ml='50px' fontSize='10px' color='grey'>4.8k views</Text>
<Text fontSize='10px' color='grey'>1 year ago</Text>
    
   
   
 
</HStack>



    </Stack>
  </CardBody>

</Card>
</ChakraProvider>
   
  );
};

export default Course;
