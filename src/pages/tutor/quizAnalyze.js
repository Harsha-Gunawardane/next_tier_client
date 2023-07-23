import React from "react";


import { Box} from "@chakra-ui/react";


import { Progress,Button,Text ,Flex} from '@chakra-ui/react'

import {
 
  Heading,

} from "@chakra-ui/react";

import Progressbar from "../../components/student/progressbar";




import { Stack, HStack, VStack } from '@chakra-ui/react'




import { SimpleGrid,ChakraProvider} from '@chakra-ui/react'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'


const quiz = () => {
 
  return (

      <Box overflow='scroll'>

<SimpleGrid spacing={20} minChildWidth='250px'>

</SimpleGrid>

<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' width={{base:350,lg:500,xl:800}} height='400px' p={4} color='black'>

<HStack spacing='24px' mt='30px'>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  <Text fontSize='15px'>Highest Mark</Text>

  <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px' fontSize='25px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>

  </Box>
 
</HStack>
  
</Box>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Average Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='#eee'>
<Heading ml='20px' fontSize='25px'>53</Heading>
</Box>
<Box w='40%' h='40px' bg='#eee'>

</Box>

 
</HStack>
</Box>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Lowest Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='#eee'>
<Heading ml='20px' fontSize='25px'>53</Heading>
</Box>
<Box w='40%' h='40px' bg='#eee'>

</Box>

 
</HStack>
</Box>
</HStack>

</Box>


<Box bg='white' width={{base:200,lg:200,xl:450}} height='420px' p={4} color='black' ml={{base:0,lg:200,xl:120}}>
<Heading fontSize='20px'>Upcoming Events</Heading>
<Box bg='#FAEBD7' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>

<HStack spacing='24px'>
  <Box w='60%' h='40px' bg='transparent'>
<Heading fontSize='20px'>Physics</Heading>
<Text fontSize='15px'>26th June</Text>
<Text fontSize='15px'>#25th Quiz</Text>
  </Box>
  <Box w='40%' h='40px' bg='transparent'>
<Text fontSize='15px' p={2}>15.00-18.00</Text>
  </Box>
 
</HStack>

</Box>
<Box bg='#F0F8FF' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<HStack spacing='24px'>
  <Box w='60%' h='40px' bg='transparent'>
<Heading fontSize='20px'>Physics</Heading>
<Text fontSize='15px'>26th June</Text>
<Text fontSize='15px'>#25th Quiz</Text>
  </Box>
  <Box w='40%' h='40px' bg='transparent'>
<Text fontSize='15px' p={2}>15.00-18.00</Text>
  </Box>
 
</HStack>
</Box>
<Box bg='#FFF0F5' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<HStack spacing='24px'>
  <Box w='60%' h='40px' bg='transparent'>
<Heading fontSize='20px'>Physics</Heading>
<Text fontSize='15px'>26th June</Text>
<Text fontSize='15px'>#25th Quiz</Text>
  </Box>
  <Box w='40%' h='40px' bg='transparent'>
<Text fontSize='15px' p={2}>15.00-18.00</Text>
  </Box>
 
</HStack>
</Box>
  
</Box>

</SimpleGrid>




<SimpleGrid spacing={20} minChildWidth='250px'>

    <Box bg='white' height='400px' mt='-180px' width='120%'>

    <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th fontSize='12px'>To convert</Th>
        <Th fontSize='12px'>into</Th>
        <Th fontSize='12px' isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td fontSize='12px'>inches</Td>
        <Td fontSize='12px'>millimetres (mm)</Td>
        <Td fontSize='12px' isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td fontSize='12px'>inches</Td>
        <Td fontSize='12px'>millimetres (mm)</Td>
        <Td fontSize='12px' isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td fontSize='12px'>inches</Td>
        <Td fontSize='12px'>millimetres (mm)</Td>
        <Td fontSize='12px' isNumeric>25.4</Td>
      </Tr>
    </Tbody>
  
  </Table>
</TableContainer>

    </Box>



<Box bg='white' width={{base:200,lg:200,xl:450}} height='450px' p={10} color='black' ml={{base:0,lg:200,xl:100}}>
  <Heading fontSize={30}>Your Progress</Heading>

  
</Box>

</SimpleGrid>



<br></br>


</Box>



  
  );
};

export default quiz;
