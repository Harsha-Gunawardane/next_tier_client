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
  Link,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation,useNavigate } from "react-router-dom";

import Addcontent from "../../components/tutor/coursepackage/Addmonth.js";
import Remove from "../../components/tutor/coursepackage/Contentremove";
import Addcoursedoccontent from "../../components/tutor/coursepackage/Adddoc";
import Addcoursequiz from "../../components/tutor/coursepackage/Addquiz";
import Addcoursecontent from "../../components/tutor/coursepackage/Addvideo";
import TutorDetails from "../../components/tutor/TutorDetails2";
import Fetch from "../../hooks/fetchTitle";
import Fetcht from "../../hooks/fetchThumb";
import Fetchfile from "../../hooks/fetchFilepath";
import FetchQuiz from "../../hooks/fetchQuiz";
import Removecontent from "../../components/tutor/coursepackage/Remove";
import { Show, Hide } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

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
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/tutor/quizzes/" + id);
  };

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
      const partOrder = contentIdsData.map((item) => Object.keys(item)[0]);

      for (const part of partOrder) {
        const weekData = contentIdsData.find(
          (item) => Object.keys(item)[0] === part
        );
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
            const response = await axiosPrivate.get(
              `/tutor/content/${contentId}`
            );
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

  // const handleAddMonth = () => {
  //   // Create a new month entry with initial empty content
  //   const newMonth = {
  //     "New Month Name": {
  //       video_id: [],
  //       tute_id: [],
  //       quiz_id: [],
  //     },
  //   };

  //   // Update the contentIdsData state by adding the new month
  //   setContentIdsData([...contentIdsData, newMonth]);
  // };

  const handleRemoveMonth = (month) => {
    // Create a copy of the contentIdsData array and filter out the month to be removed
    const updatedContentIdsData = contentIdsData.filter(
      (weekData) => Object.keys(weekData)[0] !== month
    );

    // Update the state with the modified contentIdsData array
    setContentIdsData(updatedContentIdsData);
  };

  const handleVideoAdded = (newContentIdsData) => {
    // Update the contentIdsData state with the new data
    setContentIdsData(newContentIdsData);
  };

  const handleDocAdded = (newContentIdsData) => {
    // Update the contentIdsData state with the new data
    setContentIdsData(newContentIdsData);
  };

  const handleQuizAdded = (newContentIdsData) => {
    // Update the contentIdsData state with the new data
    setContentIdsData(newContentIdsData);
  };

  const handleContentRemove = (month, contentId) => {
    // Create a copy of the contentIdsData array and filter out the deleted content
    const updatedContentIdsData = contentIdsData.map((weekData) => {
      const updatedWeekData = { ...weekData };
      const weekKey = Object.keys(updatedWeekData)[0];
      if (weekKey === month) {
        const weekContent = updatedWeekData[weekKey];
        if (weekContent) {
          if (
            weekContent.video_id &&
            weekContent.video_id.includes(contentId)
          ) {
            // Remove the deleted content from video_id
            weekContent.video_id = weekContent.video_id.filter(
              (id) => id !== contentId
            );
          } else if (
            weekContent.tute_id &&
            weekContent.tute_id.includes(contentId)
          ) {
            // Remove the deleted content from tute_id
            weekContent.tute_id = weekContent.tute_id.filter(
              (id) => id !== contentId
            );
          } else if (
            weekContent.quiz_id &&
            weekContent.quiz_id.includes(contentId)
          ) {
            // Remove the deleted content from tute_id
            weekContent.quiz_id = weekContent.quiz_id.filter(
              (id) => id !== contentId
            );
          }
        }
      }
      return updatedWeekData;
    });

    // Update the state with the modified contentIdsData array
    setContentIdsData(updatedContentIdsData);
  };

  const updateContentIds = (newContentIds) => {
    setContentIdsData(newContentIds);
  };

  return (
    <Box width="100%">
      <SimpleGrid spacing={10} minChildWidth="250px" mt="20px">
        <Box mt="20px">
          {studypackdata && (
            <Heading fontSize="30px" mb="30px" ml="10px" fontWeight="xl">
              {studypackdata.title}
            </Heading>
            
            
          )}

          {studypackdata && (
                <Image
                boxSize="60%"
                width={{ base: 340, xl: 700 }}
                height={{ base: 300, xl: 350 }}
                ml='10px'
                objectFit="cover"
                src={studypackdata.thumbnail}
                alt="Dan Abramov"
              />
            
            
         
            
          )}

{studypackdata && (
            <Heading fontSize="17px" mt="25px" ml="10px" fontWeight="xl">
              {studypackdata.description}
            </Heading>  
            
          )}
 

     
        </Box>

        <Box
          w="75%"
          bg="white"
          p={10}
          ml={{ base: 0, xl: 110 }}
          mt={{ base: -20, xl: 0 }}
        >
          <Hide below="md">
            <Box mt={{ base: -20, xl: 35 }}>
              <TutorDetails></TutorDetails>
            </Box>
          </Hide>
          <Heading fontSize="20px" mt="20px" mb="20px">
            Course Content
          </Heading>

          {contentIdsData.map((weekData, index) => {
            const weekKey = Object.keys(weekData)[0];
            const weekContent = weekData[weekKey];

            if (weekContent) {
              const formattedWeekKey = weekKey.replace(/%20/g, " ");
              return (
                <Accordion allowToggle key={index}>
                  <AccordionItem width={{ base: 400, xl: 400 }}>
                    <h2>
                      <AccordionButton
                        bg="#eee"
                        border="2px solid white"
                        borderRadius="5px"
                        height="50px"
                      >
                        <Box as="span" flex="1" textAlign="left" height="30px">
                          <Heading p={1} ml="20px" fontSize="15px">
                            {weekKey}
                          </Heading>
                        </Box>
                        <Remove
                          course={id}
                          month={weekKey}
                          onMonthRemove={handleRemoveMonth}
                        ></Remove>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg="white">
                      <br />

                      <HStack spacing={{ base: 220, xl: 250 }}>
                        <Box bg='white' width='200px'><Text fontSize="15px">Video Content</Text></Box>
                        
                        <Box>
                          {" "}
                          <Addcoursecontent
                            dynamicWeek={weekKey}
                            studypackId={id}
                            onVideoAdded={handleVideoAdded}
                          />
                        </Box>
                      </HStack>

                      {weekContent.video_id &&
                        weekContent.video_id.map((videoId, videoIndex) => (
                          <Box bg="gray.100" p="10px" mt="4px" className="box1">
                            <HStack spacing="40px">
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
                                    fontSize="10px"
                                    height="20px"
                                    colorScheme="blue"
                              
                                  >
                                    View
                                  </Button>{" "}
                                  <Removecontent
                                    contentId={videoId}
                                    month={weekKey}
                                    onContentRemove={handleContentRemove}
                                  ></Removecontent>
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}

                      <HStack spacing={{ base: 220, xl: 250 }} mt='5px'>
                        <Text fontSize="15px" width='200px'>Tute Content</Text>
                        <Box>
                          {" "}
                          <Addcoursedoccontent
                            dynamicWeek={weekKey}
                            studypackId={id}
                            onDocAdded={handleDocAdded}
                          ></Addcoursedoccontent>
                        </Box>
                      </HStack>
                      {weekContent.tute_id &&
                        weekContent.tute_id.map((tuteId, tuteIndex) => (
                          <Box bg="gray.100" p="10px" mt="4px" className="box1">
                            <HStack spacing="40px">
                              <Box p={2} width="210px">
                                <HStack>
                                  {/* <Fetcht videoId={tuteId} /> */}
                                      {/* <Text><Fetchfile videoId={tuteId} /></Text>   */}
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      <HStack> <FaFileAlt/>  <Text> <Fetch videoId={tuteId} /></Text></HStack>
                                   
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="60px" ml="10px" mt="-5px">
                                <HStack>
                                  <Button
                                    fontSize="10px"
                                    height="20px"
                                
                                    colorScheme="blue"
                                    onClick={async () => {
                                      try {
                                        const response = await Fetchfile({ videoId: tuteId });
                                        const fileUrl = response.fileUrl;
                                        window.open(fileUrl, '_blank');
                                      } catch (error) {
                                        console.error("Error fetching the file URL:", error);
                                      }
                                    }}>
                                  
                                    View
                                  </Button>{" "}
                                  <Removecontent
                                    contentId={tuteId}
                                    month={decodeURIComponent(weekKey)}
                                    onContentRemove={handleContentRemove}
                                  ></Removecontent>
                                </HStack>
                              </Box>
                            </HStack>
                          </Box>
                        ))}

                      <HStack spacing={{ base: 220, xl: 250 }} mt='5px'>
                        <Text fontSize="15px" width='200px'>Quiz Content</Text>
                        <Box>
                          {" "}
                          <Addcoursequiz
                            dynamicWeek={weekKey}
                            studypackId={id}
                            onQuizAdded={handleQuizAdded}
                          ></Addcoursequiz>
                        </Box>
                      </HStack>
                      {weekContent.quiz_id &&
                        weekContent.quiz_id.map((quizId, tuteIndex) => (
                          <Box bg="gray.100" p="10px" mt="4px" className="box1">
                            <HStack spacing="40px">
                              <Box p={2} width="210px">
                                <HStack>
                                  {/* <Fetcht videoId={quizId} /> */}
                                  <Box>
                                    <Text fontSize="14px" className="box2">
                                      <FetchQuiz quizId={quizId} />
                                    </Text>
                                  </Box>
                                </HStack>
                              </Box>
                              <Box width="60px" ml="10px" mt="-5px">
                                <HStack>
                                  <Button
                                    fontSize="10px"
                                    height="20px"
                                    colorScheme="blue"
                                    // onClick={() =>
                                    //   handleViewClickdoc({
                                    //     tute: quizId,
                                    //     tutetitle: `${quizId}`,
                                    //     tutethumbnail: `${quizId}`,
                                    //     tutediscription: `${quizId}`,
                                    //   })
                                    // }
                                    onClick={() => {
                                      LoadDetail(quizId);
                                    }}
                                  >
                                    View
                                  </Button>{" "}
                                  <Removecontent
                                    contentId={quizId}
                                    month={decodeURIComponent(weekKey)}
                                    onContentRemove={handleContentRemove}
                                  ></Removecontent>
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
          <Addcontent
            contentIdsData={contentIdsData}
            setContentIdsData={setContentIdsData}
          ></Addcontent>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Coursepackcontent;
