import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Flex,AccordionPanel,Text,ButtonGroup,Accordion,AccordionButton,AccordionIcon,AccordionItem,Image,Stack,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box } from '@chakra-ui/react'



const courseContent = (props) => {
    const { month,week1,week2,week3,week4} = props.item;
  return (


<ChakraProvider>

<Accordion allowToggle>
  <AccordionItem>
    <h2>
      <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='40px'>
        <Box as="span" flex='1' textAlign='left'  height='30px'>
        <Heading p={1} ml='20px' fontSize='15px'>{month}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bg='white'>
<br></br>
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab height='15px'><Text fontSize='12px'>Week1</Text></Tab>
    <Tab height='15px'><Text fontSize='12px'>Week 2</Text></Tab>
    <Tab height='15px'><Text fontSize='12px'>Week 3</Text></Tab>
    <Tab height='15px'><Text fontSize='12px'>Week 4</Text></Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Text fontSize='15px'>Video Content</Text>
      <Flex bg='lightblue' >
   
      </Flex>
      <Text fontSize='15px'>Document Content</Text>
      <Flex bg='lightblue'>
   
   </Flex>
   <Text fontSize='15px'>Quiz</Text>
   <Flex bg='lightblue'>
   
   </Flex>
   
    </TabPanel>
    <TabPanel>
    <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
    </TabPanel>
    <TabPanel>
    <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
    </TabPanel>
    <TabPanel>
    <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
   <Flex bg='lightblue'>
   
   </Flex>
    </TabPanel>
  </TabPanels>
</Tabs>

    
    </AccordionPanel>
  </AccordionItem>


</Accordion>


</ChakraProvider>
   
  );
};

export default courseContent;
