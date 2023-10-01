import React from "react";
import { Box} from "@chakra-ui/react";
import { Progress,Button,Text ,Flex} from '@chakra-ui/react'

import {Heading,} from "@chakra-ui/react";

import { Stack, HStack, VStack } from '@chakra-ui/react'
import { SimpleGrid,ChakraProvider} from '@chakra-ui/react'


import { Table } from '@mantine/core';
  import {
    
    ListItem,
   
    UnorderedList,
  } from '@chakra-ui/react'

  import { CheckCircleIcon} from '@chakra-ui/icons'
  import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
  import { Divider } from '@chakra-ui/react'
  import Barchart from "../../components/charts/BarChart"
  import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";



const Quiz = () => {

  const location = useLocation();
  const iid = location.pathname.split("/").pop();
  
  const axiosPrivate = useAxiosPrivate();

  const [studypackdata, setstudypackdata] = useState({});

  useEffect(() => {
    const getStudyPack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${iid}`, {
          signal: controller.signal,
        });
        setstudypackdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudyPack();
  }, [axiosPrivate]);

  const elements = [
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
    { name: 'Thisura', course: 'Physics 2024 Theory', marks: '90', rank: '1' },
   
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.name}</td>
      <td>{element.course}</td>
      <td>{element.marks}</td>
      <td>{element.rank}</td>
    </tr>
  ));
 
  return (

      <Box>
      
      {studypackdata && (    
        <Heading fontSize='25px' mt='5px' ml='10px'>2024 AL Paper Classs-Paper 03 - Analyze {studypackdata.title}</Heading>
      )}
<SimpleGrid spacing={20} minChildWidth='250px'>

</SimpleGrid>

<SimpleGrid spacing={20} minChildWidth='250px'>

<Box bg='white' width={{base:350,lg:500,xl:800}} height='800px' p={4} color='black'>

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



<Box bg='white' width='100%' mt='30px' p={5}>
      <Heading fontSize='25px' mb='20px'>Students Marks</Heading>

      <Table horizontalSpacing="md" verticalSpacing="sm" fontSize="md" striped highlightOnHover withBorder>
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Marks</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>

    </Box>

</Box>


<Box bg='white' width={{base:200,lg:200,xl:400}}  p={4} color='black' ml={{base:0,lg:200,xl:170}}>
<Box bg='#F0F8FF'  w='100%' height='190px' p={4} color='black' mt='20px' borderRadius={'10px'} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>

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

<Box bg='white' mt='10px'>
<UnorderedList spacing='10px'>
  <ListItem fontSize='15px' mt='10px'><CheckCircleIcon color='#20B2AA' mr='4px'></CheckCircleIcon>Lorem ipsum dolor sit amet</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#20B2AA' mr='4px'></CheckCircleIcon>Consectetur adipiscing elit</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#20B2AA' mr='4px'></CheckCircleIcon>Integer molestie lorem at massa</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#20B2AA' mr='4px'></CheckCircleIcon>Facilisis in pretium nisl aliquet</ListItem>
  <ListItem  fontSize='15px'><CheckCircleIcon color='#20B2AA' mr='4px'></CheckCircleIcon>Facilisis in pretium nisl aliquet</ListItem>
</UnorderedList>

</Box>

<Heading fontSize='20px' mt='30px'>Mark Range</Heading>


<Box bg='white' mt='10px'  height='200px'>

<Barchart></Barchart>
</Box>

</Box>



</SimpleGrid>



</Box>



  
  );
};

export default Quiz;
