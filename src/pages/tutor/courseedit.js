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

import CourseInclude from "../../components/tutor/coursedetails/courseInclude";
import CourseDetails from "../../components/tutor/coursedetails/courseDetails";
import Add from "../../components/tutor/coursedetails/add";
import TutorDetails from "../../components/tutor/tutordetails";
import Courseeditbutton from "../../components/tutor/coursedetails/courseeditbutton";
import Courseremove from "../../components/tutor/coursedetails/courseremove";
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




  const [courseVisibility, setCourseVisibility] = useState({});

  // Function to toggle visibility for a specific course
  const toggleCourseVisibility = (courseId) => {
    setCourseVisibility((prevVisibility) => ({
      ...prevVisibility,
      [courseId]: !prevVisibility[courseId],
    }));
  };

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
            src={coursedata.thumbnail}
            alt="Dan Abramov"
          />
          <br></br>
        

        <Heading fontSize='25px'>{coursedata.title}</Heading>
        
                                    
         
    <HStack spacing='24px' mt='20px'>
    <Box w='50%' h='30px' bg='white'>
  <Text ml='20px' fontSize='15px'><CalendarIcon mr='4px' mt='-2px'></CalendarIcon>{coursedata.startday}</Text>
  </Box>

  <Box w='50%' h='30px' bg='white'>
  <Text ml='' fontSize='15px'><TimeIcon mr='4px' mt='-2px'></TimeIcon>8.00 a.m. - 5.00 p.m.</Text>
  </Box>
  <Box w='50%' h='30px' bg='white'>
  <Text ml='35px' fontSize='15px'>Rs.{coursedata.monthlyfee}</Text>
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
     <CourseDetails></CourseDetails>
<br></br>
          <Heading fontSize='20px'>Course Includes</Heading>

          <CourseInclude></CourseInclude>

<HStack spacing='30px' mt='20px'> 
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
