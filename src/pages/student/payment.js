import React from "react";


import { Box } from "@chakra-ui/react";
import { Image, Heading, Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
  Avatar,

} from "@chakra-ui/react";
import {  HStack} from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Input,FormControl,FormLabel } from '@chakra-ui/react'

import CourseInclude from "../../components/student/courseInclude";
import CourseDetails from "../../components/student/courseDetails";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";


const Payment = () => {

    
  const { courseid } = useParams();

  const [coursedata, coursedatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/courses/" + courseid).then((res) => {
          return res.json();
      }).then((resp) => {
          coursedatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, []);

  return (
  <Box overflowY='scroll'>
    {coursedata &&
    <SimpleGrid minChildWidth='300px' spacing='40px' p={5}>

<Box width='100%' bg='white' height='250px'>
    <Heading fontSize='25px'>Payment</Heading>
    <Text fontSize='20px'  mt='15px' ml='20px'>{coursedata.name}</Text>
    <Text fontSize='20px' mt='15px' ml='20px'>{coursedata.time}</Text>
    <Text fontSize='20px' mt='15px' ml='20px'>{coursedata.price}</Text>
    <Image
    src=""
    />

</Box>



      
        </SimpleGrid>


}
<Box width='90%' bg='white' height='400px' ml='3%'>
    <Heading fontSize='25px'>Card Details</Heading>

    <FormControl mr="5%" >
          <FormLabel htmlFor="first-name" fontWeight={'normal'} fontSize='18px'>
            Cardholder name
          </FormLabel>
          <Input id="firstname" placeholder="cardholder name" width='70%' p={2}  height='35px' fontSize='15px'/>
        </FormControl>

        <FormControl mr="5%" >
          <FormLabel htmlFor="first-name" fontWeight={'normal'} fontSize='18px'>
            Card No
          </FormLabel>
          <Input id="firstname" placeholder="Card No" width='70%' p={2}  height='35px' fontSize='15px' />
        </FormControl>

<HStack spacing='24px'>
<Box>    <FormControl mr="5%" >
          <FormLabel htmlFor="first-name" fontWeight={'normal'} fontSize='18px'>
            MM/YY
          </FormLabel>
          <Input id="firstname" placeholder="MM/YY" width='70%' p={2}  height='35px' fontSize='15px'/>
        </FormControl></Box>
<Box>    <FormControl mr="5%" >
          <FormLabel htmlFor="first-name" fontWeight={'normal'} fontSize='18px'>
            CVN
          </FormLabel>
          <Input id="firstname" placeholder="CVN" width='70%' p={2}  height='35px' fontSize='15px' />
        </FormControl></Box>
 
</HStack>
</Box>

        </Box>
     

     
    
  );
};

export default Payment;
