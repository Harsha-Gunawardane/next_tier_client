import React from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { SimpleGrid, Button } from "@chakra-ui/react";
import { TimeIcon, CalendarIcon } from "@chakra-ui/icons";

import CourseInclude from "../../components/tutor/coursedetails/courseInclude";
import CourseDetails from "../../components/tutor/coursedetails/courseDetails";
import TutorDetails from "../../components/tutor/tutordetails";
import Courseeditbutton from "../../components/tutor/coursepackage/coursepackageedit";
import Courseremove from "../../components/tutor/coursepackage/coursepackremove";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Coursepackedit = () => {
  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [studypackdata, setstudypackdata] = useState({});

  const location = useLocation();
  const iid = location.pathname.split("/").pop();

  useEffect(() => {
    const getStudyPack = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${iid}`, {
          signal: controller.signal,
        });
        setstudypackdata(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStudyPack();
  }, [axiosPrivate]);

  return (
    <Box overflowY="scroll">
      {studypackdata && (
        <SimpleGrid spacing={20} minChildWidth="250px">
          <Box w="120%" bg="white" p={10} borderRadius="10px" ml="10px">
            <Image
              boxSize="60%"
              width={{ base: 340, xl: 600 }}
              height={{ base: 300, xl: 350 }}
              objectFit="cover"
              src={studypackdata.thumbnail}
              alt="Dan Abramov"
            />
            <br></br>

            <Heading fontSize="25px">{studypackdata.title}</Heading>

            <HStack spacing="24px" mt="20px">
              <Box w="50%" h="30px" bg="white">
                <Text ml="" fontSize="15px">
                  <TimeIcon mr="4px" mt="-2px"></TimeIcon>20h 20 min
                </Text>
              </Box>
              <Box w="50%" h="30px" bg="white">
                <Text ml="35px" fontSize="15px">
                  Rs.{studypackdata.price}
                </Text>
              </Box>
              <Box w="50%" h="30px" bg="white">
                <Text ml="35px" fontSize="15px">
                  Sinhala
                </Text>
              </Box>
            </HStack>

            <br></br>
            <Heading fontSize="22px">Description</Heading>
            <br></br>
            <Box width={{ base: 300, xl: 500 }}>
              <Text fontSize={{ base: 13, xl: 15 }}>
                {studypackdata.description}
              </Text>
            </Box>

            <Heading></Heading>
          </Box>

          <Box
            width="80%"
            ml="10%"
            bg="white "
            mt={{ base: -20, xl: 0 }}
            p={10}
            borderRadius="10px"
          >
            <TutorDetails></TutorDetails>

            <Heading fontSize="20px" mt="20px">
              Course Details
            </Heading>
            <CourseDetails></CourseDetails>
            <br></br>
            <Heading fontSize="20px">Course Includes</Heading>

            <CourseInclude></CourseInclude>

            <HStack spacing="30px" mt="20px">
              <Courseeditbutton></Courseeditbutton>
              <Courseremove></Courseremove>
            </HStack>
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Coursepackedit;
