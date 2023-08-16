import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { Image, Heading, Text } from "@chakra-ui/react";

import { HStack } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { TimeIcon, CalendarIcon } from "@chakra-ui/icons";

import CourseInclude from "../../components/tutor/coursedetails/CourseInclude";
import CourseIncludedoc from "../../components/tutor/coursedetails/CourseIncludedoc";
import CourseDetails from "../../components/tutor/coursedetails/CourseDetails";
import TutorDetails from "../../components/tutor/Tutordetails";
import Courseeditbutton from "../../components/tutor/coursedetails/Courseeditbutton";
import Courseremove from "../../components/tutor/coursedetails/Courseremove";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";

const Courseedit = () => {
  const axiosPrivate = useAxiosPrivate();

  const [coursedata, setcoursedata] = useState({});
  const [isPublic, setIsPublic] = useState(false);

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  useEffect(() => {
    const getStudyPack = async () => {
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
    getStudyPack();
  }, [axiosPrivate]);

  const handleToggleVisibility = () => {
    // Update the isPublic state locally without making an API call
    setIsPublic(!isPublic);
  };

  return (
    <Box>
      {coursedata && (
        <SimpleGrid spacing={20} minChildWidth="250px">
          <Box w="120%" bg="white" p={10} borderRadius="10px" ml="10px">
            <Image
              boxSize="60%"
              width="100%"
              height="350px"
              objectFit="cover"
              src={coursedata.thumbnail}
              alt="Dan Abramov"
            />
            <br></br>

            <Heading fontSize="25px">{coursedata.title}</Heading>

            <HStack spacing="24px" mt="20px">
              <Box w="50%" h="30px" bg="white">
                {coursedata.schedule && coursedata.schedule.length > 0 ? (
                  <Text color="black" fontSize="12px" mt="-0px">
                    <CalendarIcon /> {coursedata.schedule[0].day}
                  </Text>
                ) : (
                  <Text color="black" fontSize="12px" mt="-0px">
                    <TimeIcon /> No Day Available
                  </Text>
                )}
              </Box>

              <Box w="50%" h="30px" bg="white">
                {coursedata.schedule && coursedata.schedule.length > 0 ? (
                  <Text color="black" fontSize="12px" mt="-0px">
                    <TimeIcon /> {coursedata.schedule[0].start_time} -{" "}
                    {coursedata.schedule[0].end_time}
                  </Text>
                ) : (
                  <Text color="black" fontSize="12px" mt="-0px">
                    <TimeIcon /> No Schedule Available
                  </Text>
                )}
              </Box>
              <Box w="50%" h="30px" bg="white">
                <Text ml="35px" fontSize="12px">
                  Rs.{coursedata.monthly_fee}
                </Text>
              </Box>
              <Box w="50%" h="30px" bg="white">
                <Text ml="35px" fontSize="12px">
                  {coursedata.medium}
                </Text>
              </Box>
            </HStack>

            <br></br>

            <Heading fontSize="22px">Description</Heading>
            <br></br>
            <Box width="90%">
              {" "}
              <Text fontSize="15px">{coursedata.description}</Text>
            </Box>

            <Heading></Heading>
          </Box>

          <Box width="80%" ml="10%" bg="white " p={10} borderRadius="10px">
            <TutorDetails></TutorDetails>

            <Heading fontSize="20px" mt="20px">
              Course Details
            </Heading>

            <CourseDetails></CourseDetails>
            <br></br>
            <Heading fontSize="20px" mb="10px">
              Course Includes
            </Heading>

            <CourseInclude></CourseInclude>
            <CourseIncludedoc></CourseIncludedoc>

            <HStack spacing="30px" mt="50px">
              <Courseeditbutton></Courseeditbutton>
              <Courseremove></Courseremove>

              <FormControl display="flex" alignItems="center" mt={2}>
                <FormLabel htmlFor="course-visibility" mb="0" mr={2}>
                  Course Visibility
                </FormLabel>
                <Switch
                  id="course-visibility"
                  isChecked={isPublic}
                  onChange={handleToggleVisibility}
                />
              </FormControl>
            </HStack>
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Courseedit;
