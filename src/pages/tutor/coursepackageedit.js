import React from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import {
  SimpleGrid,
  Button,
  FormControl,
  Switch,
  FormLabel,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { TimeIcon, CalendarIcon } from "@chakra-ui/icons";

// import CourseInclude from "../../components/tutor/coursepackage/CoursepackInclude";
// import CourseDetails from "../../components/tutor/coursepackage/CoursepackDetails";
import TutorDetails from "../../components/tutor/Tutordetails";
import Courseeditbutton from "../../components/tutor/coursepackage/Coursepackageedit";
import Courseremove from "../../components/tutor/coursepackage/Coursepackremove";
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

  const countAllIds = () => {
    let totalVideoIds = 0;
    let totalTuteIds = 0;
    let totalQuizIds = 0;

    if (studypackdata.content_ids && Array.isArray(studypackdata.content_ids)) {
      studypackdata.content_ids.forEach((part) => {
        // Iterate through the dynamic keys (e.g., "Part-1")
        Object.keys(part).forEach((key) => {
          const subPart = part[key];

          if (subPart.video_id && Array.isArray(subPart.video_id)) {
            totalVideoIds += subPart.video_id.length;
          }
          if (subPart.tute_id && Array.isArray(subPart.tute_id)) {
            totalTuteIds += subPart.tute_id.length;
          }
          if (subPart.quiz_id && Array.isArray(subPart.quiz_id)) {
            totalQuizIds += subPart.quiz_id.length;
          }
        });
      });
    }

    return {
      totalVideoIds,
      totalTuteIds,
      totalQuizIds,
    };
  };

  const totalIds = countAllIds();

  const [isPublic, setIsPublic] = useState(false);
  const handleToggleVisibility = () => {
    // Update the isPublic state locally without making an API call
    setIsPublic(!isPublic);
  };

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

            {/* <HStack spacing="24px" mt="20px">
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
            </HStack> */}

            {/* <Heading fontSize="22px">Description</Heading> */}

            <Box width={{ base: 300, xl: 500 }} mt="18px">
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
              Study Pack Details
            </Heading>
            <UnorderedList spacing={3} mb="10px">
              {/* <ListItem mt="10px">
                {" "}
                <Text ml="" fontSize="15px">
                  20h 20 min Course
                </Text>
              </ListItem> */}
              <ListItem mt='10px'>
                {" "}
                <Text fontSize="15px">Rs.{studypackdata.price}</Text>
              </ListItem>
              <ListItem>
                {" "}
                <Text fontSize="15px">Medium-{studypackdata.medium}</Text>
              </ListItem>
              <ListItem>
                {" "}
                <Text fontSize="15px">
                  {" "}
                  Total Videos: {totalIds.totalVideoIds}
                </Text>
              </ListItem>
              <ListItem>
                {" "}
                <Text fontSize="15px">
                  Total Tutes: {totalIds.totalTuteIds}
                </Text>
              </ListItem>
              <ListItem>
                {" "}
                <Text fontSize="15px">
                  Total Quizs: {totalIds.totalQuizIds}
                </Text>
              </ListItem>
            </UnorderedList>

            <br></br>

            {/* <CourseInclude></CourseInclude> */}

            <HStack spacing="30px" mt="20px">
              <Courseeditbutton></Courseeditbutton>
              <Courseremove></Courseremove>

              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="course-visibility" mb="0" mr={2}>
                  {studypackdata.visibility}
                </FormLabel>
              </FormControl>
            </HStack>
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Coursepackedit;
