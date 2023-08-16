import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider,SimpleGrid,Box,Heading ,HStack,Center,Flex,Text,Image,Avatar, Button

} from '@chakra-ui/react'


import { useEffect,useState } from "react";
import Contents from "../../components/tutor/content";
import Add from "../../components/tutor/addcontent.js";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'




  const Videocontent= () => {

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
  // 2. Wrap ChakraProvider at the root of your app
  return (
 
  <Box>

<Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList ml='60px'>
    <HStack>
      <Flex>
    <Tab height="25px" fontSize='12px'>Physics 2024 Theory</Tab>
    <Tab height="25px" fontSize='12px'>Physics 2024 Paper</Tab>
    <Tab height="25px" fontSize='12px'>Physics 2024 Revision</Tab>
    </Flex>
    <Box ml='530px' mt='20px'><Add></Add></Box>
    </HStack>
  </TabList>
  <TabPanels>
    <TabPanel>
    <SimpleGrid minChildWidth='250px' spacing='40px' p={5}>
    
    <Contents></Contents>
    
    </SimpleGrid>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs>



</Box>
  
 
  )
}
export default Videocontent;