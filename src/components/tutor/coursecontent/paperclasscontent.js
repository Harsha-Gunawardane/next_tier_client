import React from "react";
import { Flex,AccordionPanel,Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,HStack,Heading} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { ChakraProvider,Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Image } from '@chakra-ui/react'

import Addcoursecontent from "./addcoursecontent.js";
import Addcoursedoccontent from "./addcoursedoccontent.js";
import Addcoursequiz from "./addcoursequiz.js";
import Remove from "./Coursecontentremove.js";
import RemovePaper from "./Paperremove.js";
import "../../../index.css"





const PaperclassContent = (props) => {
    const { title,video,videotitle} = props.item;
   
  return (


<ChakraProvider>

<Accordion allowToggle>
  <AccordionItem width={{base:400,xl:700}}>
    <h2>
      <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' > <RemovePaper  item={props.item}></RemovePaper>
        <Box as="span" flex='1' textAlign='left'  height='30px'>
        <Heading p={1} ml='20px' fontSize='15px'>{title}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bg='white'>
<br></br>







 
    
    <HStack spacing={{base:220,xl:550}}>
  <Text fontSize='15px'>Video Content</Text>
  <Box> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='330px'>
  <Box p={2}  width='210px'><HStack>  <Image
            boxSize="50%"
            width="40%"
            height='50px'
            objectFit="cover"
            src={video}
          
          />
         <Box ><Text fontSize='14px' className="box2">{videotitle}</Text></Box> 
          </HStack></Box> 
  <Box width='100px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> <Remove></Remove></HStack></Box>


  </HStack>
</Box>


<HStack  spacing='520px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box> <Addcoursedoccontent></Addcoursedoccontent></Box>   
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='330px'>
  <Box p={2}  width='210px'><HStack>  <Image
            boxSize="50%"
            width="40%"
            height='50px'
            objectFit="cover"
            src={video}
          
          />
         <Box ><Text fontSize='14px' className="box2">{videotitle}</Text></Box> 
          </HStack></Box> 
  <Box width='100px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' >View</Button> <Remove></Remove></HStack></Box>


  </HStack>
</Box>


    </AccordionPanel>
  </AccordionItem>


</Accordion>



</ChakraProvider>
   
  );
};

export default PaperclassContent;
