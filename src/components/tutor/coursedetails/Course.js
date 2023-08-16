import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Text,
  Image,
  Stack,
  Heading,
  Divider,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProvider, HStack,Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SearchCourse from "./Search";

const Course = (props) => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/details/" + id);
  };

  const Coursecontent = (id) => {
    navigate("/tutor/courses/content/" + id);
  };

  const getCourses = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/course`, {
        signal: controller.signal,
      });
      setCoursesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]); // Make sure to add "axiosPrivate" as a dependency

const handleSearch = (searchTerm) => {
  if (searchTerm.trim() === "") {
    // If search term is empty, show all courses
    getCourses();
  } else {
    // Filter courses based on the search term
    const filteredCourses = coursesdata.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoursesData(filteredCourses);
  }
};


  return (
    <div>
      <ChakraProvider>
        
        
        <SearchCourse onSearch={handleSearch} />
        
        <SimpleGrid minChildWidth="300px" spacing="40px" p={5}>
          {coursesdata != null && coursesdata.length > 0 ? (
            coursesdata.map((item) => (
              <Card key={item.id} maxW="lg">
                <CardBody>
                  <Image src={item.thumbnail} borderRadius="lg" height='210px' width='100%' />
                  <Stack mt="6" spacing="3">
                    <Heading color="black" fontSize="l">
                      {item.title}
                    </Heading>
                    {item.schedule && item.schedule.length > 0 ? (
                    <Text color="black" fontSize="12px">
                      <CalendarIcon /> {item.schedule[0].day}
                    </Text>
                        ) : (
                          <Text color="black" fontSize="12px" mt="-0px">
                            <TimeIcon /> No Date Available
                          </Text>
                        )}


                    <HStack mt="-10px">
                      <Box width="400px">
                      {item.schedule && item.schedule.length > 0 ? (
                <Text color="black" fontSize="12px" mt="-0px">
                  <TimeIcon /> {item.schedule[0].start_time} - {item.schedule[0].end_time}
                </Text>
                    ) : (
                      <Text color="black" fontSize="12px" mt="-0px">
                        <TimeIcon /> No Schedule Available
                      </Text>
                    )}
                      </Box>
                      <Box width="100px">
                        <IconButton
                          onClick={() => {
                            LoadDetail(item.id);
                          }}
                          bg="white"
                          aria-label="Search database"
                          ml="35px"
                          mt="-2px"
                          height="20px"
                          width="1%"
                          fontSize="16px"
                          icon={<EditIcon />}
                        />
                      </Box>
                    </HStack>
                  </Stack>
                </CardBody>
                <Divider />

                <Button
                  variant="solid"
                  colorScheme="blue"
                  fontSize="15px"
                  width="95%"
                  ml="10px"
                  mt="10px"
                  height="35px"
                  mb="10px"
                  onClick={() => {
                    Coursecontent(item.id);
                  }}
                >
                  View
                </Button>
              </Card>
            ))
          ) : (
            <Box mt="150px">
              <Heading fontSize="25px" ml="400px">
                No Course Packages Available
              </Heading>
         
            </Box>
          )}
        </SimpleGrid>
      </ChakraProvider>
    </div>
  );
};

export default Course;
