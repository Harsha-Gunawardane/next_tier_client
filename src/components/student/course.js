import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Avatar,Image,Stack,Box,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'



const Course = (props) => {
  const {  imgUrl,name, email} = props.item;
  return (
     

     <div>


<ChakraProvider>
<Card maxW='lg'>
  <CardBody>
    <Image
      
    src={imgUrl}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading color='black' fontSize='xl' mb='10px'>{name}</Heading>

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
      <CalendarIcon></CalendarIcon>  Rs 3500/month
      </Text>
   
     
      <Button variant='solid' colorScheme='blue' width='100%' height='50px' mt='-5px'>
        <Heading color='white' fontSize='18px'>Enroll</Heading>
      </Button>
    </Stack>
  </CardBody>
</Card>
</ChakraProvider>
    </div>
  );
};

export default Course;
