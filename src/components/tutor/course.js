import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider } from '@chakra-ui/react'



const Course = (props) => {
  const { category, type, rentPrice, imgUrl, carName, groupSize,Box,Avatar } = props.item;
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
      <Heading color='blue.600' fontSize='xl'>{carName}</Heading>
      <Text color='black' fontSize='15px' >
      <CalendarIcon></CalendarIcon>  Monday
      </Text>
   
      <Text color='black'  fontSize='15px' >
      <TimeIcon></TimeIcon>  8-00 a.m - 5.00 p.m.
      </Text>
   
    </Stack>
  </CardBody>
  <Divider />
      
  <Button variant='solid' colorScheme='blue' width='100%' height='40px'>
        View
      </Button>

</Card>
</ChakraProvider>
    </div>
  );
};

export default Course;
