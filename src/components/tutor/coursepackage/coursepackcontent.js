import React from "react";
import { Flex,AccordionPanel,Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,HStack,Heading, Img} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { ChakraProvider,Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box,Image } from '@chakra-ui/react'

import Addcoursecontent from "../coursecontent/addcoursecontent";
import Addcoursedoccontent from "../coursecontent/addcoursedoccontent";
import Addcoursequiz from "../coursecontent/addcoursequiz";
import Remove from "../coursecontent/Coursecontentremove";
import  { useState } from "react";

import "../../../index.css"





const CourseContent = (props) => {
    const { title,video,videotitle,document,quiz} = props.item;

    const [selectedImage, setSelectedImage] = useState(null); // Step 1: Add state variable

  
   
  return (


<ChakraProvider>

<Accordion allowToggle>
  <AccordionItem width={{base:300,xl:400}}>
    <h2>
      <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' >
        <Box as="span" flex='1' textAlign='left'  height='30px'>
        <Heading p={1} ml='20px' fontSize='15px'>{title}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bg='white'>
<br></br>

    
    <HStack spacing={{base:220,xl:290}}>
  <Text fontSize='15px'>Video Content</Text>
  <Box> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><HStack>  <Image
            boxSize="50%"
            width="60%"
            height='50px'
            objectFit="cover"
            src={video}
          
          />
         <Box><Text  className="box2">{videotitle}</Text></Box> 
          </HStack></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' onClick={() => setSelectedImage(video)}>View</Button><Remove></Remove> </HStack></Box>


  </HStack>
</Box>


<HStack  spacing='270px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box> <Addcoursedoccontent></Addcoursedoccontent></Box>   
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="230px" className="box2">{document}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <Remove></Remove></Box>

  </HStack>
</Box>




<HStack  spacing='290px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box> <Addcoursequiz></Addcoursequiz></Box>     
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="230px" className="box2">{quiz}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' ><HStack><Button>View</Button><Remove></Remove> </HStack></Box>

  </HStack>
</Box>


    
    </AccordionPanel>
  </AccordionItem>


</Accordion>



</ChakraProvider>
   
  );
};

export default CourseContent;
