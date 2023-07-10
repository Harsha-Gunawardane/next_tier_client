import React from "react";


import { Box} from "@chakra-ui/react";


import { Progress,Button,Text ,Flex} from '@chakra-ui/react'

import {
 
  Heading,

} from "@chakra-ui/react";




import { Stack, HStack, VStack } from '@chakra-ui/react'




import { SimpleGrid,ChakraProvider} from '@chakra-ui/react'

const quiz = () => {
 
  return (

      <Box overflow='scroll'>

<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' w='100%' height='60px' p={4} color='black'>
<Heading color='green' fontSize={30}>120 Days for Exam </Heading>
  
</Box>
</SimpleGrid>

<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' width={{base:350,lg:500,xl:800}} height='400px' p={4} color='black'>

<HStack spacing='24px' mt='30px'>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  <Text fontSize='15px'>Average Mark</Text>

  <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='#eee'>
  <Heading ml='20px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='#eee'>

  </Box>
 
</HStack>
  
</Box>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Average Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='#eee'>
<Heading ml='20px'>53</Heading>
</Box>
<Box w='40%' h='40px' bg='#eee'>

</Box>

 
</HStack>
</Box>
<Box bg='#eee' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Average Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='#eee'>
<Heading ml='20px'>53</Heading>
</Box>
<Box w='40%' h='40px' bg='#eee'>

</Box>

 
</HStack>
</Box>
</HStack>


  
</Box>


<Box bg='white' width={{base:200,lg:200,xl:450}} height='420px' p={4} color='black' ml={{base:0,lg:200,xl:120}}>

<Box bg='#FAEBD7' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='20px'>This is a Box</Text>
</Box>
<Box bg='#F0F8FF' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='20px'>This is a Box</Text>
</Box>
<Box bg='#FFF0F5' w='100%' height='100px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='20px'>This is a Box</Text>
</Box>
  
</Box>

</SimpleGrid>




<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' width={{base:350,lg:500,xl:800}} height='500px' p={4} color='black'>

<Heading color='black' fontSize={30}>Previous Quizes </Heading>





  
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
