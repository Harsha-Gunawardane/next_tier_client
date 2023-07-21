import React from "react";
import {

  AccordionPanel,
  Text,

  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,

  HStack,
  Heading,

} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
} from "@chakra-ui/react";


const Payment = (props) => {
  

  return (
    <ChakraProvider>
<Box bg='white' height='160px' p={3} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderRadius='10px'>
<Heading fontSize='20px' >Payment</Heading>
<HStack spacing='10px' mt='20px'>
  <Box w='50%' h='40px' bg='white'>
    <Text fontSize='10px' color='grey' ml='40px'>per month</Text>
    <Text fontSize='15px' ml='40px'>Rs.3500</Text>

  </Box>
  <Box w='50%' h='40px' bg='white' >
  <Text fontSize='10px' color='grey' ml='20px' >last payment</Text>
  <Text fontSize='15px' ml='20px'>2023 June</Text>
  </Box>
 
</HStack>
<Button width='50%' height='35px' mb='10px' ml='120px' mt='5px' fontSize='12px'  colorScheme='green'>Pay Online</Button>
</Box>

    </ChakraProvider>
  );
};

export default Payment;
