import React from "react";
import { Flex,AccordionPanel,Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,HStack,Heading} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { ChakraProvider,Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box } from '@chakra-ui/react'

import Addcoursecontent from "./addcoursecontent.js";
import Addcoursedoccontent from "./addcoursedoccontent.js";
import Addcoursequiz from "./addcoursequiz.js";
import Remove from "./Coursecontentremove.js";
import "../../../index.css"





const PaperclassContent = (props) => {
    const { month,week1} = props.item;
   
  return (


<ChakraProvider>

<Accordion allowToggle>
  <AccordionItem width={{base:400,xl:700}}>
    <h2>
      <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' >
        <Box as="span" flex='1' textAlign='left'  height='30px'>
        <Heading p={1} ml='20px' fontSize='15px'>{month}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bg='white'>
<br></br>







 
    
    <HStack spacing={{base:220,xl:510}}>
  <Text fontSize='15px'>Video Content</Text>
  <Box> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width={{base:150,xl:480}} className="box2">{week1.video}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <Remove></Remove></Box>


  </HStack>
</Box>


<HStack  spacing='480px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box> <Addcoursedoccontent></Addcoursedoccontent></Box>   
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="480px" className="box2">{week1.video}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <Remove></Remove></Box>

  </HStack>
</Box>




<HStack  spacing='520px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box> <Addcoursequiz></Addcoursequiz></Box>     
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="480px" className="box2">{week1.video}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <Remove></Remove></Box>

  </HStack>
</Box>

    
    </AccordionPanel>
  </AccordionItem>


</Accordion>



</ChakraProvider>
   
  );
};

export default PaperclassContent;
