
// Teacher Dashboard

import React from "react";
import { FiAlignJustify } from "react-icons/fi";
import { Box } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter,HStack,SimpleGrid,Heading,Text,Button,ButtonGroupStackDivider,Stack } from '@chakra-ui/react'

const Topcards = (props) => {
  
  return (

    <SimpleGrid spacing={10} minChildWidth='250px' mt='20px'>


<Box bg='#eee' w='80%' height='130px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  <Text>Average Mark</Text>

  <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>
  <Text>Average Mark</Text>
  </Box>
 
</HStack>
  
</Box>
<Box bg='#eee' w='80%' height='130px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  Rank In Class

  <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>
  <Text>Average Mark</Text>
  </Box>
 
</HStack>
</Box>
<Box bg='#eee' w='80%' height='130px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  Completed Quizes

    <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>
  <Text>Average Mark</Text>
  </Box>
 
</HStack>
</Box>

<Box bg='#eee' w='80%' height='130px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  Completed Quizes

    <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>
  <Text>Average Mark</Text>
  </Box>
 
</HStack>
</Box>

<Box bg='#eee' w='80%' height='130px' p={4} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  Completed Quizes

    <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>
  <Text>Average Mark</Text>
  </Box>
 
</HStack>
</Box>



</SimpleGrid>

  );
};

export default Topcards;