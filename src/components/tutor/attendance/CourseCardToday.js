import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Text,
  Stack,
  Image,
  Heading,
  SimpleGrid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import { ChakraProvider, HStack, Link } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { NavLink } from "react-router-dom";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";


const CourseCardToday = (props) => {
  const [coursesdata, setCoursesData] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const getCurrentDay = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurseday", "Friday", "Saturday"];
    const currentDayIndex = new Date().getDay();
    return daysOfWeek[currentDayIndex];
  };

  const getCourses = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/course`, {
        signal: controller.signal,
      });
      setCoursesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const currentDay = getCurrentDay();

  return (
    <>
      <ChakraProvider>
        <SimpleGrid
          spacing={5}
          minChildWidth={{ base: "320px", sm: "320px" }}
          overflowX="auto"
          maxH={{ base: "230px", sm: "360px" }}
          margin="2px auto"
        >
          <GridItem colSpan={3}> </GridItem>
          {
            coursesdata != null && coursesdata.length > 0
              ? coursesdata.map((item) => {
                  const courseHasCurrentDay =
                    item.schedule &&
                    item.schedule.some(
                      (schedule) => schedule.day === currentDay
                    );

                  if (courseHasCurrentDay) {
                    return (
                      <NavLink key={item.id} to={`marking/${item.id}`}>
                        <Card variant="outline">
                <CardBody>
                  <Image
                    src={item.thumbnail}
                    borderRadius="lg"
                    height="140px"
                    width="100%"
                  />
                  <Stack mt="4" spacing="3">
                    <Heading color="black" fontSize="15px">
                      {item.title}
                    </Heading>
                    {item.schedule && item.schedule.length > 0 ? (
                      <Text color="black" fontSize="14px">
                        <CalendarIcon /> {item.schedule[0].day}
                      </Text>
                    ) : (
                      <Text color="black" fontSize="14px" mt="-0px">
                        <TimeIcon /> No Date Available
                      </Text>
                    )}
                    <HStack mt="-10px">
                      <Box>
                        {item.schedule && item.schedule.length > 0 ? (
                          <Text color="black" fontSize="14px" mt="-0px">
                            <TimeIcon /> {item.schedule[0].start_time} -{" "}
                            {item.schedule[0].end_time}
                          </Text>
                        ) : (
                          <Text color="black" fontSize="14px" mt="-0px">
                            <TimeIcon /> No Schedule Available
                          </Text>
                        )}
                      </Box>
                    </HStack>
                  </Stack>
                </CardBody>
              </Card>
                      </NavLink>
                    );
                  } else {
                    return null; // Don't render this course
                  }
                })
              : null /* Remove the message here */
          }
        </SimpleGrid>

        {coursesdata != null && coursesdata.length === 0 && (
          <Box mt="150px">
            {/* <Heading fontSize="25px" ml="400px" color='black'>
              No Course Packages Available
            </Heading> */}
          </Box>
        )}
      </ChakraProvider>
    </>
  );
};

export default CourseCardToday;
