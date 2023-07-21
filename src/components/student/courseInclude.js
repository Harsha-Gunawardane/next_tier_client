
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,ListItem,UnorderedList,Image,HStack,Avatar,Progress,Heading,Text,Button,ButtonGroupStackDivider,Stack } from '@chakra-ui/react'

const courseInclude = (props) => {
  
  return (


  

    <Accordion allowToggle>
<AccordionItem>
<h2>
<AccordionButton bg='#eee' height='40px'>
  <Box as="span" flex='1' textAlign='left'>
    <Heading fontSize='15px'>Week 1</Heading>
  </Box>
  <AccordionIcon />
</AccordionButton>
</h2>
<AccordionPanel pb={4} bg='#eee' borderRadius='10px'>

</AccordionPanel>
</AccordionItem>

<AccordionItem>
<h2>
<AccordionButton bg='#eee'  height='40px'>
  <Box as="span" flex='1' textAlign='left'>
    <Heading fontSize='16px'>Week 2</Heading>
  </Box>
  <AccordionIcon />
</AccordionButton>
</h2>
<AccordionPanel pb={4} bg='#eee' borderRadius='10px'>

</AccordionPanel>
</AccordionItem>
</Accordion>

);
};

export default courseInclude;