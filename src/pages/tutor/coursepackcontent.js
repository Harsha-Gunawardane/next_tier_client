import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

import Addmonth from "../../components/tutor/coursepackage/Addmonth.js";
import Addcontent from "../../components/tutor/coursepackage/Addmonth.js";
import Remove from "../../components/tutor/coursepackage/Contentremove";
import Addcoursedoccontent from "../../components/tutor/coursecontent/Addcoursedoccontent";
import Addcoursequiz from "../../components/tutor/coursecontent/Addcoursequiz";
import Addcoursecontent from "../../components/tutor/coursecontent/Addcoursecontent";
import TutorDetails from "../../components/tutor/Tutordetails";
import Fetch from "../../hooks/fetchTitle";
import Fetcht from "../../hooks/fetchThumb";
import Removecontent from "../../components/tutor/coursepackage/Remove";

const Coursepackcontent = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDiscription, setSelectedDiscription] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [studypackdata, setstudypackdata] = useState({});
  const location = useLocation();
  let id = location.pathname.split("/").pop();
  const [contentIdsData, setContentIdsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${id}`, {
          signal: controller.signal,
        });
        setstudypackdata(response.data);

        if (
          response.data &&
          response.data.content_ids &&
          response.data.content_ids.length > 0
        ) {
          setContentIdsData(response.data.content_ids);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);

  // Select the first available content (either video or tute)
  useEffect(() => {
    if (contentIdsData && contentIdsData.length > 0) {
      let firstAvailableId = null;
  
      // Generate the part order based on available parts in contentIdsData
      const partOrder = contentIdsData.map(item => Object.keys(item)[0]);
  
      for (const part of partOrder) {
        const weekData = contentIdsData.find(item => Object.keys(item)[0] === part);
        if (weekData) {
          const weekContent = weekData[part];
  
          if (weekContent) {
            const videoId = weekContent.video_id[0];
            const tuteId = weekContent.tute_id[0];
  
            if (videoId || tuteId) {
              firstAvailableId = videoId || tuteId;
              break;
            }
          }
        }
      }
  
      if (firstAvailableId) {
        setSelectedId(firstAvailableId);
        setLoading(true);
  
        const fetchContentDetails = async (contentId) => {
          try {
            const response = await axiosPrivate.get(`/tutor/content/${contentId}`);
            if (response.data.title) {
              setSelectedTitle(response.data.title);
              setSelectedImage(response.data.thumbnail);
              setSelectedDiscription(response.data.description);
            }
          } catch (error) {
            console.error("Error fetching content:", error);
          } finally {
            setLoading(false);
          }
        };
  
        fetchContentDetails(firstAvailableId);
      }
    }
  }, [contentIdsData, axiosPrivate]);
  
  
  

  const handleViewClick = async (item) => {
    setSelectedId(item.video);
    setSelectedImage(null); // Set to null before updating
    setSelectedTitle(null);
    setSelectedDiscription(null);
    setSelectedDoc(null);

    try {
      setLoading(true); // Set loading to true before fetching content details
      const response = await axiosPrivate.get(`/tutor/content/${item.video}`);
      if (response.data.title) {
        setSelectedTitle(response.data.title);
        setSelectedImage(response.data.thumbnail);
        setSelectedDiscription(response.data.description);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false); // Set loading back to false after fetching
    }
  };

  const handleViewClickdoc = async (item) => {
    setSelectedId(item.tute);
    setSelectedImage(null);
    setSelectedTitle(null);
    setSelectedDiscription(null);

    try {
      const response = await axiosPrivate.get(`/tutor/content/${item.tute}`);
      if (response.data.title) {
        setSelectedTitle(response.data.title);
        setSelectedImage(response.data.thumbnail);
        setSelectedDiscription(response.data.description);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleViewClickQuiz = async (item) => {
    setSelectedId(item.quiz);
    setSelectedImage(null);
    setSelectedTitle(null);

    try {
      const response = await axiosPrivate.get(`/tutor/content/${item.quiz}`);
      if (response.data.title) {
        setSelectedTitle(response.data.title);
        setSelectedImage(response.data.thumbnail);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <Box width="100%">
      <SimpleGrid spacing={20} minChildWidth="250px" mt="20px">
        <Box mt="20px">
          {selectedImage && (
            <Box width="110%" bg="white" position="sticky" top="20" zIndex="1">
              {studypackdata && (
                <Heading fontSize="30px" mb="30px">
                  {studypackdata.title}
                </Heading>
              )}
              <Image
                boxSize="60%"
                width="100%"
                height="350px"
                objectFit="cover"
                src={selectedImage}
                alt="Course Image"
              />
              <Heading mt='10px'>{selectedTitle}</Heading>
              <Text fontSize="15px" mt='10px'>{selectedDiscription}</Text>
            </Box>
          )}

          {!selectedImage && selectedDoc && (
            <Box width="110%" bg="white" position="fixed" top="0">
              <Text fontSize="15px">{selectedTitle}</Text>
              <Text fontSize="15px">{selectedDiscription}</Text>
            </Box>
          )}
        </Box>

        <Box w="90%" bg="white" p={10} ml="70px">
          <Box mt="-45px">
            <TutorDetails></TutorDetails>
          </Box>
          <Heading fontSize="20px" mt="20px" mb="20px">
            Course Content
          </Heading>

          {contentIdsData.map((weekData, index) => {
            const weekKey = Object.keys(weekData)[0];
            const weekContent = weekData[weekKey];

            if (weekContent) {
              return (
                <Accordion allowToggle key={index}>
                  <AccordionItem width={{ base: 300, xl: 400 }}>
                    <h2>
                      <AccordionButton
                        bg="#eee"
                        border="2px solid white"
                        borderRadius="5px"
                        height="50px"
                      >
                        <Remove  course={id} month={weekKey}></Remove>
                        <Box as="span" flex="1" textAlign="left" height="30px">
                          <Heading p={1} ml="20px" fontSize="15px">
                            {weekKey}
                          </Heading>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg="white">
                      <br />

                      <HStack spacing={{ base: 220, xl: 290 }}>
                        <Text fontSize="15px">Video Content</Text>
                        <Box>
                          {" "}
                          <Addcoursecontent />
                        </Box>
                      </HStack>

                      {weekContent.video_id &&
                        weekContent.video_id.map((videoId, videoIndex) => (
                          <Box bg="#F0F8FF" mt="4px" className="box1">
                            <HStack spacing="50px">
                              <Box p={2} width="210px">
                                <HStack>
                                  <Fetcht videoId={videoId} />
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      <Fetch videoId={videoId} />
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="60px" ml="10px" mt="-5px">
                                <HStack>
                                  <Button
                                    fontSize="12px"
                                    height="20px"
                                    onClick={() =>
                                      handleViewClick({
                                        video: videoId,
                                        videotitle: ` ${videoId}`,
                                        videothumbnail: ` ${videoId}`,
                                        videodiscription: ` ${videoId}`,
                                      })
                                    }
                                  >
                                    View
                                  </Button>{" "}
                                  <Removecontent
                                    contentId={videoId} part={weekKey}
                                  ></Removecontent>
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}

                      <HStack spacing={{ base: 220, xl: 290 }}>
                        <Text fontSize="15px">Tute Content</Text>
                        <Box>
                          {" "}
                          <Addcoursedoccontent></Addcoursedoccontent>
                        </Box>
                      </HStack>
                      {weekContent.tute_id &&
                        weekContent.tute_id.map((tuteId, tuteIndex) => (
                          <Box bg="#F0F8FF" mt="4px" className="box1">
                            <HStack spacing="50px">
                              <Box p={2} width="210px">
                                <HStack>
                                  <Fetcht videoId={tuteId} />
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      <Fetch videoId={tuteId} />
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="60px" ml="10px" mt="-5px">
                                <HStack>
                                  <Button
                                    fontSize="12px"
                                    height="20px"
                                    onClick={() =>
                                      handleViewClickdoc({
                                        tute: tuteId,
                                        tutetitle: `${tuteId}`,
                                        tutethumbnail: `${tuteId}`,
                                        tutediscription: `${tuteId}`,
                                      })
                                    }
                                  >
                                    View
                                  </Button>{" "}
                                  <Removecontent
                                    contentId={tuteId}
                                  ></Removecontent>
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}

                      <HStack spacing={{ base: 220, xl: 290 }}>
                        <Text fontSize="15px">Quiz Content</Text>
                        <Box>
                          {" "}
                          <Addcoursedoccontent></Addcoursedoccontent>
                        </Box>
                      </HStack>
                      {weekContent.tute_id &&
                        weekContent.tute_id.map((tuteId, tuteIndex) => (
                          <Box bg="#F0F8FF" mt="4px" className="box1">
                            <HStack spacing="50px">
                              <Box p={2} width="210px">
                                <HStack>
                                  <Image
                                    boxSize="50%"
                                    width="40%"
                                    height="50px"
                                    objectFit="cover"
                                    src={tuteId}
                                  />
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      {tuteId}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="60px" ml="10px" mt="-5px">
                                <HStack>
                                  <Button
                                    fontSize="12px"
                                    height="20px"
                                    onClick={() =>
                                      handleViewClickdoc({
                                        tute: tuteId,
                                        tutetitle: `Tute Title ${
                                          tuteIndex + 1
                                        }`,
                                      })
                                    }
                                  >
                                    View
                                  </Button>{" "}
                                  {/* Remove component */}
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}

                      {/* Similar blocks for Quiz content */}
                      {/* ... (Add similar code for Quiz content) */}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              );
            }
            return null;
          })}
          <Addcontent></Addcontent>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Coursepackcontent;
