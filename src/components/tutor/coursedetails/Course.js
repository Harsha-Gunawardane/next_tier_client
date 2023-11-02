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
  GridItem,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProvider, HStack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SearchCourse from "./Search";

const Course = (props) => {
  const [coursesdata, setCoursesData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
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
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, [axiosPrivate]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      getCourses();
    } else {
      const filteredCourses = coursesdata.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCoursesData(filteredCourses);
    }
  };

  // Define a loading message
  const loadingMessage = <div>Loading courses...</div>;

  // Define a message for when there are no courses available
  const noCoursesMessage = (
    <div>
      <Heading fontSize="25px" mt='150px' ml='36%'>No Courses Available</Heading>
    </div>
  );

  return (
    <div>
      <ChakraProvider>
        <SearchCourse onSearch={handleSearch} />
        {loading ? ( // Show loading message when loading
          loadingMessage
        ) : coursesdata != null && coursesdata.length > 0 ? (
          <SimpleGrid minChildWidth="300px" spacing="40px" p={5}>
               <GridItem  colSpan={3}>  </GridItem>
            {coursesdata.map((item) => (
           
                <Card maxW="lg" key={item.id}>
                  <CardBody>
                    <Image
                      src={item.thumbnail} 
                      borderRadius="lg"
                      height="210px"
                      width="100%"
                    />
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
                              <TimeIcon /> {item.schedule[0].start_time} -{" "}
                              {item.schedule[0].end_time}
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
            
            ))}
          </SimpleGrid>
        ) : (
          noCoursesMessage // Show message for no courses available
        )}
      </ChakraProvider>
    </div>
  );
};

export default Course;
