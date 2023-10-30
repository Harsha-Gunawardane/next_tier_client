import React from "react";
import {
  Flex,
  Link,
  AccordionPanel,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { ChakraProvider, Button, Image } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

import Addcoursecontent from "./Addcoursecontent.js";
import Addcoursedoccontent from "./Addcoursedoccontent.js";
import Addcoursequiz from "./Addcoursequiz.js";
import Remove from "./Papercontentremove.js";
import Removecontent from "./Contentremove.js";
import Editstudypack from "./Studypackedit.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../index.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";
import Addpaper from "../../../pages/tutor/addpaper";

const CourseContent = () => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [monthToDelete, setMonthToDelete] = useState("");
  const [studyPackDetails, setStudyPackDetails] = useState({});
  const [contentDetails, setContentDetails] = useState([]);

  const LoadDetail = (id) => {
    navigate("/tutor/papers/" + id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axiosPrivate.get(`/tutor/course/${id}`);
        setCoursesData(courseResponse.data);

        if (
          courseResponse.data &&
          courseResponse.data.studypack_ids.length > 0
        ) {
          const allStudyPackDetails = await Promise.all(
            courseResponse.data.studypack_ids.map(async (studyPackId) => {
              const studyPackResponse = await axiosPrivate.get(
                `/tutor/studypack/${studyPackId}`
              );
              return studyPackResponse.data;
            })
          );
          const studyPackMap = allStudyPackDetails.reduce((map, studyPack) => {
            map[studyPack.id] = studyPack;
            return map;
          }, {});
          setStudyPackDetails(studyPackMap);

          const allContentIds = allStudyPackDetails.reduce((ids, studyPack) => {
            return [...ids, ...studyPack.content_ids];
          }, []);
          setContentList(allContentIds);

          // Fetch content details including titles based on content IDs
          const allContentDetails = await Promise.all(
            allContentIds.map(async (contentId) => {
              // Replace with your actual endpoint to fetch paper by ID
              const contentResponse = await axiosPrivate.get(
                `/tutor/courses/paper/unique/${contentId}`
              );
              // console.log(contentResponse.data);
              return contentResponse.data;
            })
          );

          // Store the fetched content details
          setContentDetails(allContentDetails);
          // console.log(allContentDetails);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosPrivate, id]);

  // const getContentTitle = (contentId) => {
  //   const content = contentDetails.find((content) => content.id === contentId);
  //   return content ? content.title : "";
  // };

  // const getContentThumbnail = (contentId) => {
  //   const content = contentDetails.find((content) => content.id === contentId);
  //   return content ? content.thumbnail : ""; // Replace with actual property name
  // };

  

  const handleContentRemoval = (contentId) => {
    // Shallow copy the contentDetails state
    const updatedContentDetails = [...contentDetails];

    // Remove the content from the copied state
    const indexToRemove = updatedContentDetails.findIndex(
      (content) => content.id === contentId
    );

    if (indexToRemove !== -1) {
      updatedContentDetails.splice(indexToRemove, 1);
    }

    setContentDetails(updatedContentDetails);
  };

  const handleStudyPackRemoved = (studyPackId) => {
    setStudyPackDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[studyPackId];
      return updatedDetails;
    });
  };

  // const addStudyPack = (studyPackId) => {
  //   setStudyPackDetails((prevStudyPacks) => [...prevStudyPacks, studyPackId]);
  // };

  const [contentList, setContentList] = useState([]); // State to hold content

  const handleContentAdded = (newContentIds) => {
    // Update the contentList with newly added contentIds
    const updatedContentList = [...contentList, ...newContentIds];
    setContentDetails(updatedContentList);
  };

  const getContentTitle = (contentId) => {
    const content = contentDetails.find(
      (content) => content.paper_id === contentId
    );
    console.log(content);
    return content ? content.title : "";
  };

  return (
    <ChakraProvider>
      {/* <Addpaper></Addpaper> */}
      <Accordion allowToggle>
        {Object.keys(studyPackDetails).map((studyPackKey, index) => {
          const studyPack = studyPackDetails[studyPackKey];
          return (
            <AccordionItem key={index} width={{ base: 400, xl: 700 }}>
              <AccordionButton
                bg="#eee"
                border="2px solid white"
                borderRadius="5px"
                height="50px"
              >
                <Box as="span" flex="1" textAlign="left" height="30px">
                  <Heading p={1} ml="20px" fontSize="15px">
                    {studyPack.title}
                  </Heading>
                </Box>
                {/* <Box mr='10px'> */}

                {/* <Button fontSize='10px' height='20px'  onClick={() => {
                            LoadDetail(studyPack.id);
                          }}>Analyze</Button></Box> */}
                <Box mr="10px">
                  <Editstudypack course={studyPack.id}></Editstudypack>{" "}
                </Box>
                <Box mr="10px">
                  <Removecontent
                    studypackid={studyPack.id}
                    onStudyPackRemoved={handleStudyPackRemoved}
                  ></Removecontent>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4} bg="white">
                <HStack spacing={{ base: 220, xl: 300 }}>
                  <Box width="600px">
                    <Text fontSize="15px">Papers</Text>
                  </Box>
                  <Box>
                    <Addcoursecontent
                      studypackId={studyPack.id}
                      onContentAdded={handleContentAdded}
                    ></Addcoursecontent>
                  </Box>
                </HStack>

                {studyPack.content_ids && studyPack.content_ids.length > 0 && (
                  <Box mt="10px">
                    {studyPack.content_ids.map((contentId, contentIndex) => (
                      <Box
                        bg="gray.100"
                        p="10px"
                        mt="4px"
                        className="box1"
                        key={contentIndex}
                      >
                        <HStack spacing={{ base: 90, xl: 330 }}>
                          <Box p={2} width="210px">
                            <Text fontSize="14px" className="box2">
                              {getContentTitle(contentId)}
                            </Text>
                          </Box>
                          <Box width="90px" ml="5px" mt="-5px">
                            <HStack>
                              <Button
                                fontSize="12px"
                                height="20px"
                                colorScheme="blue"
                                onClick={() => {
                                  LoadDetail(contentId);
                                }}
                              >
                                View
                              </Button>{" "}
                              <Remove
                                contentId={contentId}
                                part={studyPack.id}
                                onContentRemoved={handleContentRemoval}
                              ></Remove>
                            </HStack>
                          </Box>

                          {/* ... (rest of your code) */}
                        </HStack>
                      </Box>
                    ))}
                  </Box>
                )}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ChakraProvider>
  );
};

export default CourseContent;
