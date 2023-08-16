import React from "react";
import { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/react";

import {
  Avatar,

} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";


import CourseContent from "../../components/tutor/coursecontent/Coursecontent";
import PaperContent from "../../components/tutor/coursecontent/Paperclasscontent";
import Announcement from "../../components/tutor/coursecontent/Announcement";
import Forum from "../../components/tutor/coursecontent/Forum";
import { Show, Hide } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import AddNew from "../tutor/addstudypack";
import Addpaper from "../tutor/addpaper";


const Coursecontent = () => {

  const [coursecontentdata, coursecontentdatachange] = useState(null);



  const axiosPrivate = useAxiosPrivate();

  const [coursedata, setcoursedata] = useState({});

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const data = {
    id: "eaea8414-d4ec-4d26-8882-203b4efa6419",
    tutor_id: "0ea16776-fd8a-41a2-b753-c34ebee4e9b4",
    title: "Physics 2025 A/L Theory",
    description: "Physics is the branch of science that deals with the structure of matter and how the fundamental constituents of the universe interact. It studies objects ranging from the very small using quantum mechanics to the entire universe using general relativity.",
    subject: "Physics",
    medium: "Sinhala",
    grade: "2025 A/L",
    thumbnail: "abc",
    monthly_fee: 2500,
    hall_id: null,
    content_ids: [
      {
        tute_id: [],
        video_id: []
      }
    ],
    start_date: "2023-08-15T14:09:29.444Z",
    studypack_ids: [],
    schedule: [
      {
        day: "Wednesday",
        end_time: "10:00",
        start_time: "08:00"
      }
    ]
  }


  useEffect(() => {
    setcoursedata(data);
  }, []);



  const renderCourseContent = () => {
    if (coursedata && coursedata.title) {
      const title = coursedata.title;
      if (title.includes("Paper")) {
        return <PaperContent />;
      } else if (title.includes("Theory") || title.includes("Revision")) {
        return <CourseContent />;
      } else {
        return <CourseContent />;
      }
    }
    // If coursedata or coursedata.title is not available, you can return a loading component or a placeholder here
    return <p>Loading...</p>;
  };



  const renderAddNew = () => {
    if (coursedata && coursedata.title) {
      const title = coursedata.title;
      if (title.includes("Paper")) {
        return <Addpaper />;
      } else if (title.includes("Theory") || title.includes("Revision")) {
        return <AddNew />;
      } else {
        return <AddNew />;
      }
    }
    // If coursedata or coursedata.title is not available, you can return a loading component or a placeholder here
    return <p>Loading...</p>;
  };

  return (
    <Box>

      <SimpleGrid spacing={20} minChildWidth="250px">

        <Box w="130%" bg="white" p={10} borderRadius="10px" ml="10px">
          {coursedata &&
            <Heading fontSize='27px' mb='30px' fontWeight='xl'>{coursedata.title}</Heading>
          }
          <Hide below='md'>
            <SimpleGrid spacing={2} minChildWidth="250px">
              <Box bg='white' width={{ base: 160, xl: 750 }} height={{ base: 120, xl: 200 }}>
                {coursedata &&
                  <Image
                    src={coursedata.thumbnail}
                    alt='Green double couch with wooden legs'
                    height={{ base: 120, xl: 150 }}
                    width='260px'


                  />
                }
              </Box>
              <Box bg='white' height='200px' p={5} >
                {coursedata &&
                  <Text fontSize='15px' ml={{ base: -20, xl: -50 }} mt='-20px'>{coursedata.description}</Text>
                } </Box>
            </SimpleGrid>
          </Hide>
          <Heading fontSize='20px' mt='40px' mb='20px' fontWeight='xl'>Course Content</Heading>

          {renderAddNew()}
          {renderCourseContent()}




        </Box>



        <Box width="72%" ml="20%" bg="white" p={10} borderRadius="10px">

          <HStack spacing='10px' mt='-15px'>
            <Box w='30%' h='40px' ml={{ base: -20, xl: 0 }} bg='white'>
              <Avatar
                width="40px"
                height='40px'
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                borderRadius='50%'
                ml='20px'
              />
            </Box>
            <Box w='70%' h='40px' bg='white' ml='-20px'>
              <Heading fontSize='15px'>Mr.Nilantha jayasooriya</Heading>
              <Text fontSize='12px'>Bsc.Eng University of Moratuwa</Text>
            </Box>

          </HStack>
          <br></br>

          <Announcement></Announcement>


          <br></br>


          <Forum></Forum>


        </Box>
      </SimpleGrid>


    </Box>
  );
};

export default Coursecontent;
