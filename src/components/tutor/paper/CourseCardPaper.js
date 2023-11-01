import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Text,
  Image,
  Stack,
  Heading,
  SimpleGrid,
  Box,
  GridItem,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SearchCourse from "./SearchCourse";


const CourseCardPaper = () => {
  const [coursesdata, setCoursesData] = useState(null);
  const [filteredcoursesdata, setFilteredCoursesData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const axiosPrivate = useAxiosPrivate();

  const getCourses = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/course`, {
        signal: controller.signal,
      });


      setCoursesData(response.data);
      console.log(response.data);
      setLoading(false); // Set loading to false once data is loaded
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (coursesdata) {
      const filteredCourses = coursesdata.filter((course) =>
        course.title.toLowerCase().includes("paper".toLowerCase())
      );
      setFilteredCoursesData(filteredCourses);
    }
  }, [coursesdata]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      getCourses();
    } else {
      const filteredCourses = filteredcoursesdata.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoursesData(filteredCourses);
    }
  };

  
  

  // Define a loading message
  const loadingMessage = <div>Loading courses...</div>;

  // Define a message for when there are no courses available
  const noCoursesMessage = (
    <div>
      <Heading fontSize="25px" mt="150px" ml="36%">
        No Courses Available
      </Heading>
    </div>
  );

  return (
    <div>
      <SearchCourse onSearch={handleSearch} />
      {loading ? ( // Show loading message when loading
        loadingMessage
      ) : coursesdata != null && coursesdata.length > 0 ? (
        <SimpleGrid
          spacing={5}
          minChildWidth={{ base: "320px", sm: "320px" }}
          overflowY="auto"
          maxH={{ base: "230px", sm: "660px" }}
          margin="2px auto"
        >
          <GridItem colSpan={3}> </GridItem>
          {filteredcoursesdata.map((item) => (
            <NavLink key={item.id} to={`course/${item.id}`}>
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
          ))}
        </SimpleGrid>
      ) : (
        noCoursesMessage // Show message for no courses available
      )}
    </div>
  );
};

export default CourseCardPaper;
