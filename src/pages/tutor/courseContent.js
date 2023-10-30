import React from "react";
import { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import {
  Image,
  Heading,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import { Avatar } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { SimpleGrid, Button } from "@chakra-ui/react";

import CourseContent from "../../components/tutor/coursecontent/Coursecontent";
import PaperContent from "../../components/tutor/coursecontent/Paperclasscontent";
import Announcement from "../../components/tutor/coursecontent/Announcement";
import Poll from "../../components/tutor/coursecontent/Addpoll";
import Forum from "../../components/tutor/coursecontent/Forum";
import { Show, Hide } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import AddNew from "./addstudypack";
import Addpaper from "./addpaper";
import TutorDetails from "../../components/tutor/TutorDetails2";

const Coursecontent = () => {
  const [coursecontentdata, coursecontentdatachange] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  const [coursedata, setcoursedata] = useState({});

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  useEffect(() => {
    const getcourse = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/course/${id}`, {
          signal: controller.signal,
        });
        setcoursedata(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getcourse();
  }, [axiosPrivate]);

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
    // return <p>Loading...</p>;
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
    // return <p>Loading...</p>;
  };

  return (
    <Box>
      <SimpleGrid spacing={20} minChildWidth="250px">
        <Box w="130%" bg="white" p={10} borderRadius="10px" ml="10px">
          {coursedata && (
            <Heading fontSize="27px" mb="30px" fontWeight="xl">
              {coursedata.title}
            </Heading>
          )}
          <Hide below="md">
            <Box
              bg="white"
              width={{ base: 160, xl: 750 }}
              height={{ base: 80, xl: 100 }}
            >
              {coursedata && (
                <Image
                  src={coursedata.thumbnail}
                  alt="Green double couch with wooden legs"
                  height={{ base: 40, xl: 100 }}
                  width="96%"
                />
              )}
            </Box>
            {/* <Box bg='white' height='100px' p={5} >
                {coursedata &&
                  <Text fontSize='15px' ml={{ base: -20, xl: -50 }} mt='-10px'>{coursedata.description}</Text>
                } </Box> */}
          </Hide>
          <Heading fontSize="20px" mt="40px" mb="20px" fontWeight="xl">
            Course Content
          </Heading>

          {renderAddNew()}
          {renderCourseContent()}
        </Box>

        <Box width="72%" ml="20%" bg="white" p={10} borderRadius="10px">
          <TutorDetails></TutorDetails>

          <br></br>

          <Announcement></Announcement>

          <br></br>

          <Forum></Forum>
          <Poll></Poll>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Coursecontent;
