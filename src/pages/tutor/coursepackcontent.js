import React from "react";
import { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import {
  Image,
  Heading,
  Text,

} from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { SimpleGrid, Button } from "@chakra-ui/react";

import CoursepackContent from "../../components/tutor/coursepackage/coursepackcontent";

const Coursepackcontent = () => {
  const [coursecontentdata, coursecontentdatachange] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/content")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        coursecontentdatachange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Box>
      <SimpleGrid spacing={40} minChildWidth="250px">


<Box bg='white' width='120%'>
<Heading fontSize="30px" mb="30px">
            Physics 2024 Theory
          </Heading>
          <SimpleGrid spacing={2} minChildWidth="250px">
            <Box bg="white" height="150px">
              <Image
                src="https://www.ufs.ac.za/images/librariesprovider22/default-album/shutterstock_1140894395.jpg?sfvrsn=554a8521_0"
                alt="Green double couch with wooden legs"
                height="150px"
              />
            </Box>
            <Box bg="white" height="100px" p={5}>
              <Text fontSize="15px" ml="-100px" mt="-20px">
                Find Physics stock images in HD and millions of other
                royalty-free stock photos, illustrations and vectors in the
                Shutterstock collection. Thousands of new, high-quality pictures
                added every day
              </Text>
            </Box>
          </SimpleGrid>
</Box>

<Box bg='white' width='80%' ml='100px'>

<HStack spacing="10px" mt='30px'>
            <Box w="30%" h="40px" bg="white">
              <Avatar
                width="40px"
                height="40px"
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                borderRadius="50%"
                ml="20px"
              />
            </Box>
            <Box w="70%" h="40px" bg="white" ml="-20px">
              <Heading fontSize="15px">Mr.Nilantha jayasooriya</Heading>
              <Text fontSize="12px">Bsc.Eng University of Moratuwa</Text>
            </Box>
          </HStack>


</Box>
</SimpleGrid>


<SimpleGrid minChildWidth='200px' spacing='40px' mt='40px'>
    <Box width='140%'><CoursepackContent></CoursepackContent></Box>
    
    <Box width='60%' ml='200px'>
      <Heading>Documents and Notes</Heading>
    </Box>
 
 </SimpleGrid>

</Box>
       
    
  );
};

export default Coursepackcontent;
