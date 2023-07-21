import React from "react";


import { Box } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";

import {
  Avatar,

} from "@chakra-ui/react";
import {  HStack} from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { TimeIcon,CalendarIcon} from '@chakra-ui/icons'


import TutorDetails from "../../components/tutor/tutordetails";
import Courseeditbutton from "../../components/tutor/courseeditbutton";
import Courseremove from "../../components/tutor/courseremove";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";


const Courseedit = () => {



  const { courseid } = useParams();

  const [coursedata, coursedatachange] = useState({});

  useEffect(() => {
      fetch("http://localhost:8000/courses/" + courseid).then((res) => {
          return res.json();
      }).then((resp) => {
          coursedatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, []);




  return (
   <Box overflowY='scroll'>


{coursedata &&
      <SimpleGrid spacing={20} minChildWidth="250px">

        <Box w="120%" bg="white" p={10} borderRadius="10px" ml="10px">
          <Image
            boxSize="60%"
            width="100%"
            height='350px'
            objectFit="cover"
            src="   https://th.bing.com/th/id/OIP.VJQzsb88_Ogu1MFyxA6HxQHaEj?pid=ImgDet&rs=1"
            alt="Dan Abramov"
          />
          <br></br>
        

        <Heading fontSize='25px'>{coursedata.name}</Heading>
        
                                    
         
    <HStack spacing='24px' mt='20px'>
    <Box w='50%' h='30px' bg='white'>
  <Text ml='20px' fontSize='15px'><CalendarIcon mr='4px' mt='-2px'></CalendarIcon>Monday</Text>
  </Box>

  <Box w='50%' h='30px' bg='white'>
  <Text ml='' fontSize='15px'><TimeIcon mr='4px' mt='-2px'></TimeIcon>8.00 a.m. - 5.00 p.m.</Text>
  </Box>
  <Box w='50%' h='30px' bg='white'>
  <Text ml='35px' fontSize='15px'>Rs.{coursedata.price}</Text>
  </Box>
 
</HStack>
        
          <br></br>
          <Heading fontSize='22px'>Description</Heading>
          <br></br>
          <Text fontSize='15px'>{coursedata.description}</Text>
         
          

          <Heading></Heading>
        </Box>

      

        <Box width="80%" ml="10%" bg="white " p={10} borderRadius="10px">
 

          <TutorDetails></TutorDetails>
      

 
          <Heading fontSize='20px' mt='20px' >Course Details</Heading>
    
<br></br>
          <Heading fontSize='20px'>Course Includes</Heading>

    

<HStack spacing='30px'> 
<Courseeditbutton></Courseeditbutton>
<Courseremove></Courseremove>

</HStack>
         

        </Box>

   
      </SimpleGrid>
     }
     
     
      </Box>
  );
};

export default Courseedit;
