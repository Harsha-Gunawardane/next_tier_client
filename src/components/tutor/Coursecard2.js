import React, { useEffect, useState } from "react";
import {
  CardBody,
  Button,
  Text,
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  GridItem,
  Box
} from "@chakra-ui/react";
import { Card, Image, Badge, Group } from '@mantine/core';
import { CalendarIcon, TimeIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProvider, HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Coursecard = (props) => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/details/" + id);
  };

  const Coursecontent = (id) => {
    navigate("/tutor/courses/content/" + id);
  };

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
  }, [axiosPrivate]);

  const currentDay = getCurrentDay();

  const filteredCourses = coursesdata != null && coursesdata.length > 0
    ? coursesdata.filter(item => {
        const courseHasCurrentDay = item.schedule && item.schedule.some(schedule => schedule.day === currentDay);
        return !courseHasCurrentDay;
      })
    : [];

  // Sort courses by their start time, assuming there's a 'time' property in each course
  filteredCourses.sort((a, b) => {
    if (a.time && b.time) {
      return new Date(b.time) - new Date(a.time);
    }
    return 0;
  });

  // Display only the latest 2 courses
  const latestTwoCourses = filteredCourses.slice(0, 2);
  latestTwoCourses.reverse();

  return (
    <>
      <ChakraProvider>
        <SimpleGrid minChildWidth="300px" spacing="40px" p={5} mt='-40px'>
          <GridItem colSpan={3}> </GridItem>
          {latestTwoCourses.length > 0 ? (
            latestTwoCourses.map((item) => (
              <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src={item.thumbnail}
                    height={180}
                    alt="Course Thumbnail"
                  />
                </Card.Section>
                <Group position="apart" mt="md" mb="xs">
                  <Text fontWeight={600} fontSize='15px'>{item.title}</Text>
                  {/* You can use the first day from the schedule */}
                  <Badge color="blue" variant="light">
                    {item.schedule[0].day}
                  </Badge>
                </Group>
                <HStack spacing="24px" mt="20px">
                  <Box w="50%" h="30px" bg="white">
                    <Text color="grey" fontSize="10px" mt="-0px">
                      <TimeIcon mr='5px' />8.00 a.m. - 12.00 p.m. 
                    </Text>
                  </Box>
                  <Box w="50%" h="30px" bg="white">
                    <Text color="grey" fontSize="10px" mt="-0px">
                      <TimeIcon mr='5px' />Hall 07 Ground Floor
                    </Text>
                  </Box>
                </HStack>
                <Button variant="light" colorScheme="blue" bg='#2b8ecc' fontSize='12px' radius="md" mt='10px' color='white'      onClick={() => {
                      Coursecontent(item.id);
                    }}>
                  Access Course
                </Button>
              </Card>
            ))
          ) : (
            <Box mt="150px">
              {/* <Heading fontSize="25px" ml="400px" color='black'>
                No Course Packages Available
              </Heading> */}
            </Box>
          )}
        </SimpleGrid>
      </ChakraProvider>
    </>
  );
};

export default Coursecard;
