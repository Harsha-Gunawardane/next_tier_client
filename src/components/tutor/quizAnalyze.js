import React from "react";
import { Box} from "@chakra-ui/react";
import { Progress,Button,Text ,Flex} from '@chakra-ui/react'

import {Heading,} from "@chakra-ui/react";
import Progressbar from "../../components/student/progressbar";
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { SimpleGrid,ChakraProvider} from '@chakra-ui/react'

import  "../../Student.css";

  import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'

  import { CheckCircleIcon} from '@chakra-ui/icons'
  import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
  import { Divider } from '@chakra-ui/react'



const quiz = () => {
 
  return (

      <Box overflow='scroll'>
        
        <Heading fontSize='25px'>Paper 03 - Analyze</Heading>
<SimpleGrid spacing={20} minChildWidth='250px'>

</SimpleGrid>

<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' width={{base:350,lg:500,xl:800}} height='200px' p={4} color='black'>

<HStack spacing='24px' mt='30px'>
<Box bg='white' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
  <Text fontSize='15px'>Highest Mark</Text>

  <HStack spacing='24px' mt='20px'>
  <Box w='60%' h='40px' bg='white'>
  <Heading ml='20px' fontSize='25px'>53</Heading>
  </Box>
  <Box w='40%' h='40px' bg='white' mt='-20px'>

<CircularProgress value={53} size='50px' />
  </Box>
 
</HStack>
  
</Box>
<Box bg='wwhite' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Average Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='white'>
<Heading ml='20px' fontSize='25px'>43</Heading>
</Box>
<Box w='40%' h='40px' bg='white' mt='-20px'>
<CircularProgress value={43} size='50px' color='green' />
</Box>

 
</HStack>
</Box>
<Box bg='white' w='70%' height='110px' p={2} color='black' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
<Text fontSize='15px'>Lowest Mark</Text>

<HStack spacing='24px' mt='20px'>
<Box w='60%' h='40px' bg='white'>
<Heading ml='20px' fontSize='25px'>13</Heading>
</Box>
<Box w='40%' h='40px' bg='white' mt='-20px'>
<CircularProgress value={13} size='50px' color='red' />
</Box>

 
</HStack>
</Box>
</HStack>


</Box>


<Box bg='white' width={{base:200,lg:200,xl:450}}  p={4} color='black' ml={{base:0,lg:200,xl:120}}>
<Box bg='white' w='100%' height='200px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>

<HStack spacing='24px'>
  <Box w='60%' h='40px' bg='transparent'>
<Heading fontSize='20px'>Paper 03</Heading>
<Divider />
<Heading fontSize='15px' mt='25px'>Paper Type</Heading>
<Heading fontSize='15px' mt='15px'>No of Questions</Heading>
<Heading fontSize='15px' mt='15px'>Time</Heading>

  </Box>
  <Box w='40%' h='40px' bg='transparent'>
  <Text fontSize='15px' mt='48px'>Paper Type</Text>
  <Text fontSize='15px' mt='10px'>Paper Type</Text>
  <Text fontSize='15px' mt='10px'>Paper Type</Text>

  </Box>
 
</HStack>

</Box>

<Heading fontSize='20px' mt='30px'>Related Areas</Heading>

<Flex bg='white' mt='10px'>
<UnorderedList spacing='10px'>
  <ListItem fontSize='15px' mt='10px'><CheckCircleIcon color='#1E90FF'></CheckCircleIcon>Lorem ipsum dolor sit amet</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#1E90FF'></CheckCircleIcon>Consectetur adipiscing elit</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#1E90FF'></CheckCircleIcon>Integer molestie lorem at massa</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#1E90FF'></CheckCircleIcon>Facilisis in pretium nisl aliquet</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#1E90FF'></CheckCircleIcon>Facilisis in pretium nisl aliquet</ListItem>
</UnorderedList>

</Flex>

</Box>



</SimpleGrid>




<SimpleGrid spacing={20} minChildWidth='250px'>

    <Box bg='white' width='120%' mt='-300px' p={5}>
      <Heading fontSize='25px'>Students Marks</Heading>

      <table>
  <tr>
    <th>Name</th>
    <th>Course</th>
    <th>Marks</th>
    <th>Rank</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Physics 2024 Theory</td>
    <td>50</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Physics 2024 Theory</td>
    <td>94</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Adam</td>
    <td>Physics 2024 Theory</td>
    <td>67</td>
    <td>50</td>
  </tr>
</table>

    </Box>



<Box bg='white' width={{base:200,lg:200,xl:450}} height='50px' p={10} color='black' ml={{base:0,lg:200,xl:100}}>
 

  
</Box>

</SimpleGrid>



<br></br>


</Box>



  
  );
};

export default quiz;
