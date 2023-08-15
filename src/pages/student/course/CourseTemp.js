import React from "react";
import { Box } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";
import { Avatar, } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import {
  SimpleGrid, Button,
} from "@chakra-ui/react";
import CourseInclude from "../../../components/tutor/coursedetails/courseInclude";
import CourseDetails from "../../../components/tutor/coursedetails/courseDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

const CourseTemp = () => {

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


  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/studentcourses/detail/payment/" + id);
  }


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
                <Text ml='20px' fontSize='15px'>20h 20min</Text>
              </Box>
              <Box w='50%' h='30px' bg='white'>
                <Text ml='20px' fontSize='15px'>Rs.3500</Text>
              </Box>

            </HStack>

            <br></br>
            <Heading fontSize='22px'>Description</Heading>
            <br></br>
            <Text fontSize='15px'>Find Physics stock images in HD
              and millions of other royalty-free stock photos, illustrations
              and vectors in the Shutterstock collection. Thousands of new,
              high-quality pictures added every day.</Text>



            <Heading></Heading>
          </Box>



          <Box width="80%" ml="15%" bg="white " p={10} borderRadius="10px">
            <Heading fontSize='20px' mb='30px'>About the Tutor</Heading>
            <HStack spacing='10px' mt='-15px'>
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
              <Box w='70%' h='40px' bg='white' ml='-20px'>
                <Heading fontSize='15px'>Mr.Nilantha jayasooriya</Heading>
                <Text fontSize='12px'>Bsc.Eng University of Moratuwa</Text>
              </Box>

            </HStack>
            <br></br>

            <Text fontSize='15px'>
              Find Physics stock images in HD and millions of other royalty-free
              stock photos, illustrations and vectors in the Shutterstock
              collection. Thousands of new, high-quality pictures added every day.
            </Text>

            <Heading mt={30} fontSize='20px'>Purchase Course</Heading>
            <br></br>
            <HStack spacing='10px' mt='-15px'>
              <Box w='50%' h='40px' bg='white'>
                <Heading ml='20px' fontSize='15px'>Rs.2500</Heading>
              </Box>
              <Box w='50%' h='40px' bg='white'>
                <Heading ml='-20px' fontSize='15px' color='grey'>Rs.3500</Heading>
              </Box>

            </HStack>
            <Button width='70%' height='30px' mt='-5px' mb='20px' ml='20px' fontSize='15px' colorScheme='blue' onClick={() => { LoadDetail(coursedata.id) }}>Buy Now</Button>

            <Heading fontSize='20px' >Course Details</Heading>
            {/* <CourseDetails></CourseDetails> */}
            <br></br>
            <Heading fontSize='20px'>Course Includes</Heading>

            {/* <CourseInclude></CourseInclude> */}

          </Box>
        </SimpleGrid>
      }

    </Box>
  );
};

export default CourseTemp;
