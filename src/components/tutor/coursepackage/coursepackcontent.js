import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon,EditIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider,HStack } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton ,Box} from '@chakra-ui/react'



const Coursepackcontent = (props) => {

  const[coursesdata,coursesdatachange]=useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/coursepackage").then((res) => {
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
  <Heading fontSize='20px'> Video Contents</Heading>
<SimpleGrid minChildWidth='160px' spacing='40px'>
{coursesdata != null && coursesdata.length>0 ? coursesdata.map(item => (


<Card maxW='lg'>
  <CardBody>
    <Image
      src={item.imgUrl}
    
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='3'>
      <Heading color='black' fontSize='l'>{item.name}</Heading>
       
   
    </Stack>
  </CardBody>


</Card>

)): <Box mt='150px' ><Heading fontSize='25px' ml='400px'>No Course Packages Avaliable</Heading>
<Button colorScheme="blue" width='18%' height='40px' ml='450px' fontSize='15px'>Add Course Package</Button></Box>
}

</SimpleGrid>

    
</ChakraProvider>
    </div>
  );
};

export default Coursepackcontent;
