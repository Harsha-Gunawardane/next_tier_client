import React from "react";
import { Flex,AccordionPanel,Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,HStack,Heading} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { ChakraProvider,Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Box } from '@chakra-ui/react'

import Tabcontent from "./tabcontent.js";
import Addcoursecontent from "./addcoursecontent.js";
import  "../../Student.css";



const CourseContent = (props) => {
    const { month,week1} = props.item;
   
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
    
    <HStack spacing='510px'>
  <Text fontSize='15px'>Video Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="500px" className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>


<HStack  spacing='480px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="500px" className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>




<HStack  spacing='520px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>     
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="500px" className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>

   
    </TabPanel>

   












    <TabPanel>
    
    <HStack spacing='510px'>
  <Text fontSize='15px'>Video Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'  className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>


<HStack  spacing='480px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'   className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>
</Box>



<HStack  spacing='520px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>     
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px' className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>



</Box>
   
    </TabPanel>












    


  <TabPanel>
    
    <HStack spacing='510px'>
  <Text fontSize='15px'>Video Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'  className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>


<HStack  spacing='480px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'   className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>
</Box>



<HStack  spacing='520px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>     
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px' className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>



</Box>
   
    </TabPanel>















    


  <TabPanel>
    
    <HStack spacing='510px'>
  <Text fontSize='15px'>Video Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>       
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'  className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='-5px'>Remove</Button> 

  </HStack>
</Box>


<HStack  spacing='480px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>   
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px'   className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>
</Box>



<HStack  spacing='520px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
  <Box mt='-25px'> <Addcoursecontent></Addcoursecontent></Box>     
  </HStack>

  <Box bg='#F0F8FF' mt='4px' className="box1"  >
  <HStack spacing='500px'>
  <Box p={2}><Text fontSize='15px' className="box2">{week1.video}</Text></Box> 
  <Button fontSize='10px' colorScheme="red" height='18px' width='30px' mt='5px' >Remove</Button> 

  </HStack>



</Box>
   
    </TabPanel>















  </TabPanels>
</Tabs>

    
    </AccordionPanel>
  </AccordionItem>


</Accordion>



</ChakraProvider>
   
  );
};

export default CourseContent;
