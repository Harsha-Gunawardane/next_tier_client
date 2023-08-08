import React from "react";
import {
  Flex,
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
import Remove from "./Coursecontentremove.js";
import Removecontent from "./Contentremove.js";
import Editstudypack from "./Studypackedit.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../index.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

const CourseContent = ({ course }) => {
  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [monthToDelete, setMonthToDelete] = useState("");
  const [studyPackDetails, setStudyPackDetails] = useState({});
  const [videoInfoArray, setVideoInfoArray] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course/${id}`, {
          signal: controller.signal,
        });
        setCoursesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);

  useEffect(() => {
    if (coursesdata && coursesdata.studypack_ids.length > 0) {
      const fetchStudyPackDetails = async () => {
        try {
          const allStudyPackDetails = await Promise.all(
            coursesdata.studypack_ids.map(async (studyPackId) => {
              const response = await axiosPrivate.get(
                `/tutor/studypack/${studyPackId}`
              );
              return response.data;
            })
          );
          const studyPackMap = allStudyPackDetails.reduce((map, studyPack) => {
            map[studyPack.id] = studyPack;
            return map;
          }, {});
          setStudyPackDetails(studyPackMap);
        } catch (error) {
          console.error("Error fetching study pack details:", error);
        }
      };

      fetchStudyPackDetails();
    }
  }, [coursesdata]);

  const getContentInfo = async (contentId) => {
    try {
      const response = await axiosPrivate.get(`/tutor/content/${contentId}`);
      const content = response.data;
      return {
        title: content.title,
        thumbnail: content.thumbnail,
        videoId: content.id,
      };
    } catch (error) {
      console.error("Error fetching content details:", error);
      return {
        title: "",
        thumbnail: "",
        videoId: "",
      };
    }
  };

  useEffect(() => {
    const fetchVideoInfo = async (studyPack) => {
      const videoInfoArray = await Promise.all(
        studyPack.content_ids.flatMap((content) => {
          const videoInfoPromises = content[
            Object.keys(content)[0]
          ].video_id.map(async (videoId) => {
            const videoInfo = await getContentInfo(videoId);
            return { ...videoInfo, type: "video" };
          });

          const tuteInfoPromises = content[Object.keys(content)[0]].tute_id.map(
            async (tuteId) => {
              const tuteInfo = await getContentInfo(tuteId);
              return { ...tuteInfo, type: "tute" };
            }
          );

          const quizInfoPromises = content[Object.keys(content)[0]].quiz_id.map(
            async (quizId) => {
              const quizInfo = await getContentInfo(quizId);
              return { ...quizInfo, type: "quiz" };
            }
          );

          return [
            ...videoInfoPromises,
            ...tuteInfoPromises,
            ...quizInfoPromises,
          ];
        })
      );
      setVideoInfoArray(videoInfoArray);
    };

    if (Object.keys(studyPackDetails).length > 0) {
      Object.keys(studyPackDetails).forEach((studyPackKey) => {
        fetchVideoInfo(studyPackDetails[studyPackKey]);
      });
    }
  }, [studyPackDetails]);

  return (
    <ChakraProvider>
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
                <Removecontent studypackid={studyPack.id}></Removecontent>
                <Box as="span" flex="1" textAlign="left" height="30px">
                  <Heading p={1} ml="20px" fontSize="15px">
                    {studyPack.title}
                  </Heading>
                </Box>
                <Editstudypack course={studyPack.id}></Editstudypack>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4} bg="white">
                <Tabs variant="soft-rounded" colorScheme="blue">
                  <TabList>
                    {studyPack.content_ids.map((content, contentIndex) => (
                      <Tab key={contentIndex} height="15px">
                        <Text fontSize="12px">{`Week ${
                          contentIndex + 1
                        }`}</Text>
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {studyPack.content_ids.map((content, contentIndex) => (
                      <TabPanel key={contentIndex}>
                        {/* Video Content */}

                        <HStack spacing={{ base: 220, xl: 300 }} mt="10px">
                          <Box width="600px">
                            <Text fontSize="15px">Video Content</Text>
                          </Box>
                          <Box>
                            <Addcoursecontent></Addcoursecontent>
                          </Box>
                        </HStack>

                        {content &&
                          content[Object.keys(content)[0]].video_id &&
                          content[Object.keys(content)[0]].video_id.length >
                            0 && (
                            <HStack spacing={{ base: 220, xl: 300 }}>
                              {/* ... (other components) */}
                              {content[Object.keys(content)[0]].video_id.map(
                                (videoId, videoIndex) => {
                                  const videoInfo = videoInfoArray.find(
                                    (info) => info.videoId === videoId
                                  );
                                  if (!videoInfo) {
                                    return null;
                                  }

                                  return (
                                    <Box
                                      bg="#F0F8FF"
                                      mt="4px"
                                      className="box1"
                                      key={videoIndex}
                                    >
                                      <HStack spacing={{ base: 90, xl: 330 }}>
                                        <Box p={2} width="210px">
                                          <HStack>
                                            <Image
                                              boxSize="50%"
                                              width={{ base: 70, xl: 70 }}
                                              height="50px"
                                              objectFit="cover"
                                              src={videoInfo.thumbnail}
                                            />
                                            <Box>
                                              <Text
                                                fontSize="14px"
                                                className="box2"
                                              >
                                                {videoInfo.title}
                                              </Text>
                                            </Box>
                                          </HStack>
                                        </Box>

                                        <Box width="90px" ml="5px" mt="-5px">
                                          <HStack>
                                            <Button
                                              fontSize="12px"
                                              height="20px"
                                            >
                                              View
                                            </Button>{" "}
                                            <Remove
                                              contentId={videoId}
                                              part={`week2`}
                                              studypackId={studyPack.id}
                                            />
                                          </HStack>
                                        </Box>
                                      </HStack>
                                    </Box>
                                  );
                                }
                              )}
                            </HStack>
                          )}

                        {/* Document Content */}

                    
                            <HStack spacing={{ base: 220, xl: 300 }} mt="10px">
                              <Box width="600px">
                                <Text fontSize="15px">Document Content</Text>
                              </Box>
                              <Box>
                                <Addcoursedoccontent />
                              </Box>
                            </HStack>
                          

                        {content[Object.keys(content)[0]].tute_id.map(
                          (tuteId, tuteIndex) => {
                            const tuteInfo = videoInfoArray.find(
                              (info) => info.videoId === tuteId
                            );
                            if (!tuteInfo) {
                              return null;
                            }

                            return (
                              <Box
                                bg="#F0F8FF"
                                mt="4px"
                                className="box1"
                                key={tuteIndex}
                              >
                                <HStack spacing={{ base: 90, xl: 330 }}>
                                  <Box p={2} width="210px">
                                    <HStack>
                                      <Image
                                        boxSize="50%"
                                        width={{ base: 70, xl: 70 }}
                                        height="50px"
                                        objectFit="cover"
                                        src={tuteInfo.thumbnail}
                                      />
                                      <Box>
                                        <Text fontSize="14px" className="box2">
                                          {tuteInfo.title}
                                        </Text>
                                      </Box>
                                    </HStack>
                                  </Box>

                                  <Box width="90px" ml="5px" mt="-5px">
                                    <HStack>
                                      <Button fontSize="12px" height="20px">
                                        View
                                      </Button>{" "}
                                      <Remove
                                        contentId={tuteId}
                                        studypackId={studyPack.id}
                                      />
                                    </HStack>
                                  </Box>
                                </HStack>
                              </Box>
                            );
                          }
                        )}

                        {/* Quiz Content */}
                  
                            <HStack spacing={{ base: 220, xl: 300 }} mt="10px">
                              <Box width="600px">
                                <Text fontSize="15px">Quiz Content</Text>
                              </Box>
                              <Box>
                                <Addcoursequiz />
                              </Box>
                            </HStack>
                       
                        {content[Object.keys(content)[0]].quiz_id.map(
                          (quizId, quizIndex) => {
                            const quizInfo = videoInfoArray.find(
                              (info) => info.videoId === quizId
                            );
                            if (!quizInfo || quizInfo.type !== "quiz") {
                              return null;
                            }

                            return (
                              <Box
                                bg="#F0F8FF"
                                mt="4px"
                                className="box1"
                                key={quizIndex}
                              >
                                <HStack spacing={{ base: 90, xl: 330 }}>
                                  <Box p={2} width="210px">
                                    <HStack>
                                      <Image
                                        boxSize="50%"
                                        width={{ base: 70, xl: 70 }}
                                        height="50px"
                                        objectFit="cover"
                                        src={quizInfo.thumbnail}
                                      />
                                      <Box>
                                        <Text fontSize="14px" className="box2">
                                          {quizInfo.title}
                                        </Text>
                                      </Box>
                                    </HStack>
                                  </Box>

                                  <Box width="90px" ml="5px" mt="-5px">
                                    <HStack>
                                      <Button fontSize="12px" height="20px">
                                        View
                                      </Button>{" "}
                                      <Remove
                                        contentId={quizId}
                                        studypackId={studyPack.id}
                                      />
                                    </HStack>
                                  </Box>
                                </HStack>
                              </Box>
                            );
                          }
                        )}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ChakraProvider>
  );
};

export default CourseContent;
