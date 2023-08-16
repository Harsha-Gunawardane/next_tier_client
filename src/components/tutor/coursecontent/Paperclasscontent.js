import React from "react";
import { Flex,Link, AccordionPanel, Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, HStack, Heading } from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'
import { ChakraProvider, Button, Image } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

import Addcoursecontent from "./Addcoursecontent.js";
import Addcoursedoccontent from "./Addcoursedoccontent.js";
import Addcoursequiz from "./Addcoursequiz.js";
import Remove from "./Papercontentremove.js";
import Removecontent from "./Contentremove.js";
import Editstudypack from "./Studypackedit.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../index.css"
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.js";

const CourseContent = () => {



  const [coursesdata, setCoursesData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [monthToDelete, setMonthToDelete] = useState("");
  const [studyPackDetails, setStudyPackDetails] = useState({});
  const [contentDetails, setContentDetails] = useState([]);

 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseResponse = await axiosPrivate.get(`/tutor/course/${id}`);
        setCoursesData(courseResponse.data);

        if (courseResponse.data && courseResponse.data.studypack_ids.length > 0) {
          const allStudyPackDetails = await Promise.all(
            courseResponse.data.studypack_ids.map(async (studyPackId) => {
              const studyPackResponse = await axiosPrivate.get(`/tutor/studypack/${studyPackId}`);
              return studyPackResponse.data;
            })
          );
          const studyPackMap = allStudyPackDetails.reduce((map, studyPack) => {
            map[studyPack.id] = studyPack;
            return map;
          }, {});
          setStudyPackDetails(studyPackMap);

          // Fetch content details
          const contentIds = allStudyPackDetails
          .flatMap(studyPack => studyPack.content_ids)
          .flatMap(content => [
            ...content.video_id.map(videoId => ({ id: videoId, type: 'VIDEO' })),
            ...content.tute_id.map(tuteId => ({ id: tuteId, type: 'TUTE' })),
          ]);
        
        const contentDetailsResponse = await Promise.all(
          contentIds.map(async content => {
            const contentResponse = await axiosPrivate.get(`/tutor/content/${content.id}`);
            return { ...contentResponse.data, type: content.type };
          })
        );
        
        setContentDetails(contentDetailsResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [axiosPrivate, id]);

  const getContentTitle = (contentId) => {
    const content = contentDetails.find((content) => content.id === contentId);
    return content ? content.title : "";
  };

  const getContentThumbnail = (contentId) => {
    const content = contentDetails.find((content) => content.id === contentId);
    return content ? content.thumbnail : ""; // Replace with actual property name
  };


  const LoadDetail = (id) => {
    navigate("/tutor/courses/content/analyze/" + id);
  };


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
               
                <Box as="span" flex="1" textAlign="left" height="30px">
                  <Heading p={1} ml="20px" fontSize="15px">
                    {studyPack.title}
                  </Heading>
                </Box>
                <Box mr='10px'>
               
                <Button fontSize='10px' height='20px'  onClick={() => {
                            LoadDetail(studyPack.id);
                          }}>Analyze</Button></Box>
                <Box mr='10px'>
                <Editstudypack course={studyPack.id} ></Editstudypack> </Box>
                <Box mr='10px'>
                <Removecontent studypackid={studyPack.id}></Removecontent>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4} bg="white">

              <HStack spacing={{ base: 220, xl: 300 }}>
          <Box width="600px">
            <Text fontSize="15px">Video Content</Text>
          </Box>
          <Box>
            <Addcoursecontent studypackId={studyPack.id}></Addcoursecontent>
          </Box>
        </HStack>
                {/* Video Content */}
                {studyPack.content_ids.map((content, contentIndex) => (
                  <Box key={contentIndex} mt="20px">
                    {content && content.video_id && content.video_id.length > 0 && (
                      <Box mt="10px">
                        {content.video_id.map((videoId, videoIndex) => (
                          <Box bg="#F0F8FF" mt="4px" className="box1" key={videoIndex}>
                            <HStack spacing={{ base: 90, xl: 330 }}>
                              <Box p={2} width="210px">
                                <HStack>
                                  <Image
                                    boxSize="50%"
                                    width={{ base: 70, xl: 70 }}
                                    height="50px"
                                    objectFit="cover"
                                    src={getContentThumbnail(videoId)}
                                  />
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      {getContentTitle(videoId)}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="90px" ml="5px" mt="-5px">
                                <HStack>
                                  <Button fontSize="12px" height="20px">
                                    View
                                  </Button>{" "}
                                  <Remove contentId={videoId} part={studyPack.id}></Remove>
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}
                      </Box>
                    )}

                    {/* Document Content */}
                    

<HStack spacing={{ base: 220, xl: 300 }} mt='10px'>
          <Box width="600px">
            <Text fontSize="15px">Document Content</Text>
          </Box>
          <Box>
            <Addcoursedoccontent studypackId={studyPack.id}></Addcoursedoccontent>
          </Box>
        </HStack>


                
{content && content.tute_id && content.tute_id.length > 0 && (
  <Box mt="10px">
    {content.tute_id.map((tuteId, tuteIndex) => (
      <Box bg="#F0F8FF" mt="4px" className="box1" key={tuteIndex}>
        <HStack spacing={{ base: 90, xl: 330 }}>
          <Box p={2} width="210px">
            <HStack>
              <Image
                boxSize="50%"
                width={{ base: 70, xl: 70 }}
                height="50px"
                objectFit="cover"
                src={getContentThumbnail(tuteId)}
              />
              <Box>
                <Text fontSize="14px" className="box2">
                  {getContentTitle(tuteId)}
                </Text>
              </Box>
            </HStack>
          </Box>
          <Box width="90px" ml="5px" mt="-5px">
            <HStack>
              <Button fontSize="12px" height="20px">
                View
              </Button>{" "}
              <Remove contentId={tuteId} part={studyPack.id}></Remove>
            </HStack>
          </Box>
        </HStack>
      </Box>
    ))}
  </Box>
)}
                    
                    

                    {/* Quiz Content */}
                    {/* ... similar logic for quiz content ... */}
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </ChakraProvider>
  );
};

export default CourseContent;