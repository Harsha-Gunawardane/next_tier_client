import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import Edit from "./Contentedit.js";




const Contents = (props) => {
  

  const[videodata,videodatachange]=useState(null);

   
  useEffect(() => {
    fetch("http://localhost:8000/videocontent").then((res) => {
        return res.json();
    }).then((resp) => {
        videodatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])

  return (
    

<ChakraProvider>
{videodata  != null && videodata.length>0 ? videodata.map(item => (
<Card maxW='lg' bg='transparent' boxShadow='none'>
  <CardBody>
    <Image
      
      src={item.imgUrl}
      borderRadius='none'
      width='100%'
      
    />
    <Stack mt='6' spacing='3'>

    <HStack spacing='2px' mt='-10px'>
    <Image
      
      alt='Green double couch with wooden legs'
     height='35px'
      width='35px'
      borderRadius='50%'
      src={item.imgUrl}
    />
    
     <Heading color='black' fontSize='l' ml='10px'>{item.name}
     </Heading>
    
   
   
 
</HStack>
<Text ml='50px' mt='-12px' fontSize='12px' colorScheme="blue">Public</Text>

<Text ml='50px' mt='-10px' fontSize='12px' color='grey'>Nilantha Jayasooriya</Text>

<HStack spacing='20px' mt='-10px'>
<Text ml='50px' fontSize='10px' color='grey'>4.8k views</Text>
<Text fontSize='10px' color='grey'>1 year ago</Text>
<Box mt='-20px'><Edit></Edit></Box>

    
   
   
 
</HStack>



    </Stack>
  </CardBody>

</Card>
)):<Box mt='150px' ><Heading fontSize='25px' ml='400px'>No Contents Avaliable</Heading>
<Button colorScheme="blue" width='18%' height='40px' ml='450px' fontSize='15px'>Add contents</Button></Box>
}
</ChakraProvider>
   
  );
};

export default Contents;
