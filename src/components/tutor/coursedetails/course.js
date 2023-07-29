import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon,EditIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider,HStack } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton,Box } from '@chakra-ui/react'
import axios from "axios";



const Course = (props) => {

  const[coursesdata,coursesdatachange]=useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/details/" + id);
}

const Coursecontent = (id) => {
  navigate("/tutor/courses/content/" + id);
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
     

     <div>


<ChakraProvider>
<SimpleGrid minChildWidth='300px' spacing='40px' p={5}>
{coursesdata != null && coursesdata.length>0 ? coursesdata.map(item => (


<Card maxW='lg'>
  <CardBody>
    <Image
      src={item.thumbnail}
    
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='3'>
      <Heading color='black' fontSize='l'>{item.title}</Heading>
      <Text color='black' fontSize='12px' >
      <CalendarIcon></CalendarIcon>  {item.startday}
      </Text>
      <HStack mt='-10px'>
        <Box width='400px' >
      <Text color='black'  fontSize='12px' mt='-0px'  >
      <TimeIcon></TimeIcon>  {item.startday}
      </Text>
</Box>
<Box width='100px'>
      <IconButton onClick={() => { LoadDetail(item.id) }} 
  bg='white'
  aria-label='Search database'
  ml='35px'
  mt='-2px'
  height='20px'
  width='1%'
  fontSize='16px'
  icon={<EditIcon />}
/> 
   
   </Box>
      </HStack>
   
    </Stack>
  </CardBody>
  <Divider />
      
    
      <Button variant='solid' colorScheme='blue' fontSize='15px' width='95%' ml='10px' mt='20px' height='35px' mb='10px'onClick={() => { Coursecontent(item.id) }}>
        View
      </Button>
     
     
 

</Card>

)): <Box mt='150px' ><Heading fontSize='25px' ml='400px'>No Course Packages Avaliable</Heading>
<Button colorScheme="blue" width='18%' height='40px' ml='450px' fontSize='15px'>Add Course Package</Button></Box>}

</SimpleGrid>

    
</ChakraProvider>
    </div>
  );
};

export default Course;
