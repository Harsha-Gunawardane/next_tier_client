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


  const filteredCourses =
    coursesdata &&
    coursesdata
      .filter((item) => item.schedule.some((schedule) => schedule.day === currentDay))
      .sort((a, b) => b.timestamp - a.timestamp) // Replace 'timestamp' with your actual timestamp field
      .slice(0, 2);


  return (
    <>
      <ChakraProvider>
        <SimpleGrid minChildWidth="300px" spacing="40px" mt='-40px'>
          <GridItem colSpan={3}> </GridItem>
          {filteredCourses != null && filteredCourses.length > 0 ? (
            filteredCourses.map((item) => {
              const courseHasCurrentDay = item.schedule && item.schedule.some(schedule => schedule.day === currentDay);

              if (courseHasCurrentDay) {
                return (
                  <Card key={item.id} shadow="sm" padding="lg" radius="md" withBorder>
                    <Card.Section>
                      <Image
                        src={item.thumbnail}
                        height={180}
                        alt="Norway"
                      />
                    </Card.Section>
                    <Group position="apart" mt="md" mb="xs">
                      <Text weight={600} fontSize='13px'>{item.title}</Text>
                      <Badge color="blue" variant="light">
                        Today
                      </Badge>
                    </Group>
                    <HStack spacing="24px" mt="20px">
                      <Box w="50%" h="30px" bg="white">
                      
                         {item.schedule && item.schedule.length > 0 ? (
                  <Text color="grey" fontSize="10px" mt="-0px">
                <TimeIcon mr='5px' />   {item.schedule[0].start_time} -{" "}
                    {item.schedule[0].end_time}
                  </Text>
                ) : (
                  <Text color="black" fontSize="10px" mt="-0px">
                  No Schedule Available
                  </Text>
                )}
                       
                        <Text color="black" fontSize="12px" mt="-0px"></Text>
                      </Box>
                      <Box w="50%" h="30px" bg="white">
                        <Text color="grey" fontSize="10px" mt="-0px">
                          <TimeIcon mr='5px' />Hall 07 Ground Floar 
                        </Text>
                        <Text color="black" fontSize="12px" mt="-0px"></Text>
                      </Box>
                    </HStack>
                    <Button variant="light" colorScheme="blue" bg='#2b8ecc' fontSize='12px' radius="md" mt='10px' color='white'      onClick={() => {
                      Coursecontent(item.id);
                    }}>
                      Access Course 
                    </Button>
                  </Card>
                );
              } else {
                return null; // Don't render this course
              }
            })
          ) :    <Heading fontSize="25px" color='black'>
          {/* No Course Packages Available */}
        </Heading> /* Remove the message here */
          }
        </SimpleGrid>


      
      </ChakraProvider>
    </>
  );
};

export default Coursecard;
