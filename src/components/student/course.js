import React from "react";
import { ChakraProvider,Box } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter,Button,Text,ButtonGroup,Avatar,Image,Stack,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'


const Course = () => {
  const[coursesdata,coursesdatachange]=useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/studentcourses/detail/" + id);
}
 
  useEffect(() => {
    fetch("http://localhost:8000/courses").then((res) => {
        return res.json();
    }).then((resp) => {
        coursesdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
  
  return (

 






    <SimpleGrid minChildWidth='300px' spacing='40px' p={5}>
  
    {coursesdata && coursesdata.map(item => (

    <Card maxW='lg'>
  <CardBody>
    <Image
      
    src={item.imgUrl}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading color='black' fontSize='20px' mb='10px'>{item.name}</Heading>

<HStack spacing='24px' mt='-15px'>
  <Box w='30%' h='40px' bg='white'>
  <Avatar
            width="40px"
            height='40px'
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            borderRadius='50%'
            ml='20px'
          />
  </Box>
  <Box w='70%' h='40px' bg='white'>
<Text fontSize='15px' ml='-20px'>Mr.Nilantha jayasooriya</Text>
<Text fontSize='12px'  ml='-20px'>Bsc.Eng University of Moratuwa</Text>
  </Box>
 
</HStack>
      <Text color='black' fontSize='15px' >
        <HStack>
        <CalendarIcon></CalendarIcon> <Text>Rs 3500/</Text> <Text fontSize='12px' color='grey' ml='-10px'>month</Text>
        </HStack>
   
      </Text>
   
     
      <Button variant='solid' colorScheme='blue' width='100%' height='40px' mt='-5px' onClick={() => { LoadDetail(item.id) }} >
        <Heading color='white' fontSize='16px'>Enroll</Heading>
      </Button>
    </Stack>
  </CardBody>
</Card>
    
      
          ))}
     

    
                            
     </SimpleGrid>

 
 



   
  );
};

export default Course;
