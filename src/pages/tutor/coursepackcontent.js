import React, { useEffect, useState } from "react";
import { Box, Image, Heading, Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, HStack, SimpleGrid, Button } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

import Addmonth from "../../components/tutor/coursepackage/addmonth.js";
import Addcontent from "../../components/tutor/coursepackage/addmonth.js";
import Remove from "../../components/tutor/coursepackage/contentremove";
import Addcoursedoccontent from "../../components/tutor/coursecontent/addcoursedoccontent";
import Addcoursequiz from "../../components/tutor/coursecontent/addcoursequiz";
import Addcoursecontent from "../../components/tutor/coursecontent/addcoursecontent";
import TutorDetails from "../../components/tutor/tutordetails";

const Coursepackcontent = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [studypackdata, setstudypackdata] = useState({});
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const [contentIdsData, setContentIdsData] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/studypack/${id}`, {
          signal: controller.signal,
        });
        setstudypackdata(response.data);

        if (response.data && response.data.content_ids && response.data.content_ids.length > 0) {
          setContentIdsData(response.data.content_ids);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);




  useEffect(() => {
    if (contentIdsData && contentIdsData.length > 0) {
      const firstWeekKey = Object.keys(contentIdsData[0])[0];
      const firstWeekVideoIds = contentIdsData[0][firstWeekKey]?.video_id;
      if (firstWeekVideoIds && firstWeekVideoIds.length > 0) {
        // Get the first video_id
        const firstVideoId = firstWeekVideoIds[0];

        // Fetch the content details using the first video_id
        const fetchContentDetails = async (videoId) => {
          try {
            const response = await axiosPrivate.get(`/tutor/content/${videoId}`);
            if (response.data.title) {
              setSelectedTitle(response.data.title);
              setSelectedImage(response.data.thumbnail);
            }
          } catch (error) {
            console.error("Error fetching content:", error);
          }
        };

        // Call the function to fetch content details
        fetchContentDetails(firstVideoId);
      }
    }
  }, [contentIdsData]);




  const handleViewClick = async (item) => {
    setSelectedId(item.video);
    setSelectedImage(item.videothumbnail);
    setSelectedTitle(item.videotitle);
    setSelectedDoc(null);

    try {
      const response = await axiosPrivate.get(`/tutor/content/${item.video}`);
      if (response.data.title) {
        setSelectedTitle(response.data.title);
        setSelectedImage(response.data.thumbnail);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };



  const handleViewClickdoc =async (item) => {
    setSelectedId(item.tute);
    setSelectedImage(item.tutethumbnail);
    setSelectedTitle(item.tutetitle);
  

    try {
      const response = await axiosPrivate.get(`/tutor/content/${item.tute}`);
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
      {studypackdata && <Heading fontSize="30px" mb="30px">{studypackdata.title}</Heading>}

      <SimpleGrid spacing={20} minChildWidth="250px" mt="20px">
        {selectedImage && (
          <Box width="110%" bg="white">
            <Image
              boxSize="60%"
              width="100%"
              height="350px"
              objectFit="cover"
              src={selectedImage}
              alt="Course Image"
            />
            <Heading>{selectedTitle}</Heading>
          </Box>
        )}

        {!selectedImage && selectedDoc && (
          <Box width="110%" bg="white">
            <Text fontSize="15px">{selectedTitle}</Text>
          </Box>
        )}

        <Box w="90%" bg="white" p={10} ml="70px">
          <Box mt='-45px'>
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
                      <AccordionButton bg="#eee" border="2px solid white" borderRadius="5px" height="50px">
                      <Remove></Remove>
                        <Box as="span" flex="1" textAlign="left" height="30px">
                          <Heading p={1} ml="20px" fontSize="15px">{weekKey}</Heading>
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
                        weekContent.video_id.map(
                          (videoId, videoIndex) => (
                          <Box
                            bg="#F0F8FF"
                            mt="4px"
                            className="box1"
                          >
                            <HStack spacing="50px">
                              <Box p={2} width="210px">
                                <HStack>
                                  <Image
                                    boxSize="50%"
                                    width="40%"
                                    height="50px"
                                    objectFit="cover"
                                    src={videoId}
                                  />
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                    {videoId}
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

                      <HStack spacing={{ base: 220, xl: 290 }}>
                        <Text fontSize="15px">Tute Content</Text>
                        <Box>
                          {" "}
                        <Addcoursedoccontent></Addcoursedoccontent>
                        </Box>
                      </HStack>
                      {weekContent.tute_id &&
                        weekContent.tute_id.map((tuteId, tuteIndex) => (
                          <Box
                            bg="#F0F8FF"
                            mt="4px"
                        
                            className="box1"
                          >
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
                                        tutetitle: `${tuteId}`,
                                        tutethumbnail: `${tuteId}`,
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



<HStack spacing={{ base: 220, xl: 290 }}>
                        <Text fontSize="15px">Quiz Content</Text>
                        <Box>
                          {" "}
                        <Addcoursedoccontent></Addcoursedoccontent>
                        </Box>
                      </HStack>
                      {weekContent.tute_id &&
                        weekContent.tute_id.map((tuteId, tuteIndex) => (
                          <Box
                            bg="#F0F8FF"
                            mt="4px"
                          
                            className="box1"
                          >
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
                                        tutetitle: `Tute Title ${tuteIndex + 1}`,
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
