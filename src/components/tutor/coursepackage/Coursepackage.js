import React, { useState, useEffect } from "react";
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
  GridItem
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProvider, HStack } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SearchStudypack from "./Search";
import { useNavigate } from "react-router-dom";

const Coursepackage = (props) => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/studypackdetails/" + id);
  };

  const Coursepackcontent = (id) => {
    navigate("/tutor/courses/studypackcontent/" + id);
  };

  const getStudyPack = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/studypack`, {
        signal: controller.signal,
      });

      // Filter courses with type "PAID"
      const paidCourses = response.data.filter((course) => course.type === "PAID");

      setCoursesData(paidCourses);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudyPack();
  }, [axiosPrivate]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If search term is empty, show all courses
      getStudyPack();
    } else {
      // Filter courses based on the search term
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
        <Heading fontSize="25px" mt='150px' ml='36%'>No StudyPacks Available</Heading>
      </div>
    );

    return (
      <div>
        <ChakraProvider>
          <SearchStudypack onSearch={handleSearch} />
          {loading ? ( // Show loading message when loading
            loadingMessage
          ) : coursesdata !== null && coursesdata.length > 0 ? (
            <SimpleGrid minChildWidth="300px" spacing="40px" p={5}>
              <GridItem colSpan={3}>  </GridItem>
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
                
                      <Heading color="black" fontSize="16px" ml='5px'>
                        {item.title}
                      </Heading>
                      <HStack mt="-10px" spacing='175px'>
                        <Text color="black" fontSize="13px" ml='5px'>
                         Rs. {item.price}
                        </Text>

                      
                    
               
                   
                     
                        <Box width="100px">
                          <IconButton
                            onClick={() => {
                              LoadDetail(item.id);
                            }}
                            bg="white"
                            aria-label="Search database"
                            ml="65px"
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
                      Coursepackcontent(item.id);
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

export default Coursepackage;
