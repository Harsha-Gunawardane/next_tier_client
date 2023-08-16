
import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'
import Remove from "../coursecontent/Coursecontentremove";
import Addvideo from "./Addvideo";
import Adddoc from "./Adddoc";
import { Image,HStack,Avatar,Progress,Heading,Text,Button } from '@chakra-ui/react'

const coursepackInclude = (props) => {
  
  return (


  

    <Accordion allowToggle>
    <AccordionItem width={{base:300,xl:400}}>
      <h2>
        <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' >
          <Box as="span" flex='1' textAlign='left'  height='30px'>
          <Heading p={1} ml='10px' fontSize='15px'>Video Contents</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg='white'>
  <br></br>
  

 
  <Box bg='#F0F8FF'mt='4px' className="box1" >
    <HStack spacing='50px'>
    <Box p={2}  width='210px'><HStack>  <Image
              boxSize="50%"
              width="40%"
              height='50px'
              objectFit="cover"
              src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
           
            
            />
           <Box ><Text fontSize='14px' className="box2">Physics Part 02</Text></Box> 
            </HStack></Box> 
    <Box width='70px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> <Remove></Remove></HStack></Box>
  
  
    </HStack>
  </Box>
  <Addvideo></Addvideo>

      </AccordionPanel>
    </AccordionItem>


    <AccordionItem width={{base:300,xl:400}}>
      <h2>
        <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' >
          <Box as="span" flex='1' textAlign='left'  height='30px'>
          <Heading p={1} ml='10px' fontSize='15px'>Document Contents</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg='white'>
  <br></br>
  

  
  <Box bg='#F0F8FF'mt='4px' className="box1" >
    <HStack spacing='50px'>
    <Box p={2}  width='210px'><HStack>  <Image
              boxSize="50%"
              width="40%"
              height='50px'
              objectFit="cover"
              src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
           
            
            />
           <Box ><Text fontSize='14px' className="box2">Physics Part 02</Text></Box> 
            </HStack></Box> 
    <Box width='60px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> </HStack></Box>
  
  
    </HStack>
  </Box>
  <Adddoc></Adddoc>

      </AccordionPanel>
    </AccordionItem>
  
  
  </Accordion>







);
};

export default coursepackInclude;