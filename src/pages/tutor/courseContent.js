import React from "react";
import { useEffect,useState } from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel } from "@chakra-ui/react";

import {
  Avatar,

} from "@chakra-ui/react";
import {  HStack} from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";


import CourseContent from "../../components/tutor/coursecontent/coursecontent";
import Adddate from "../../components/tutor/coursecontent/addmonth";
import Addmonth from "../../components/tutor/coursecontent/addmonth.js";
import Announcement from "../../components/tutor/coursecontent/announcement";
import { Show, Hide } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Coursecontent = () => {

  const[coursecontentdata,coursecontentdatachange]=useState(null);

 
  useEffect(() => {
    fetch("http://localhost:8000/content").then((res) => {
        return res.json();
    }).then((resp) => {
        coursecontentdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])






  
const axiosPrivate = useAxiosPrivate();

const [coursedata, setcoursedata] = useState({});

const location = useLocation();
const id = location.pathname.split("/").pop();



useEffect(() => {
  const getcourse = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/course/${id}`, {
        signal: controller.signal,
        
      });
      setcoursedata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getcourse();
}, [axiosPrivate]); 

  return (
   <Box>


  


      <SimpleGrid spacing={20} minChildWidth="250px">

 <Box w="130%" bg="white" p={10} borderRadius="10px" ml="10px">
 {coursedata &&
 <Heading fontSize='30px' mb='30px'>{coursedata.title}</Heading>
 }
 <Hide below='md'>
 <SimpleGrid spacing={2} minChildWidth="250px">
  <Box bg='white' width={{base:160,xl:250}} height={{bae:120,xl:200}}>
  {coursedata &&
  <Image
      src={coursedata.thumbnail}
      alt='Green double couch with wooden legs'
      height={{base:120,xl:150}}
      
      
    />
  }
  </Box>
  <Box bg='white' height='100px' p={5}>
  {coursedata &&
    <Text fontSize='15px' ml={{base:-20,xl:-100}} mt='-20px'>{coursedata.description}</Text>
   } </Box>
 </SimpleGrid>
</Hide>
  <Heading fontSize='20px' mt='40px' mb='20px'>Course Content</Heading>

 {coursecontentdata?.map((item) => (
      <CourseContent item={item} key={item.id} />
    ))}

<Addmonth></Addmonth>
        </Box>

      

        <Box width="72%" ml="20%" bg="white " p={10} borderRadius="10px">
          
        <HStack spacing='10px' mt='-15px'>
  <Box w='30%' h='40px' ml={{base:-20,xl:0}}bg='white'>
  <Avatar
            width="40px"
            height='40px'
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            borderRadius='50%'
            ml='20px'
          />
  </Box>
  <Box w='70%' h='40px' bg='white' ml='-20px'>
<Heading fontSize='15px'>Mr.Nilantha jayasooriya</Heading>
<Text fontSize='12px'>Bsc.Eng University of Moratuwa</Text>
  </Box>
 
</HStack>
          <br></br>

  <Announcement></Announcement>


<br></br>


 


        </Box>
      </SimpleGrid>

     
      </Box>
  );
};

export default Coursecontent;
