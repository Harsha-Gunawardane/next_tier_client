import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Button,

} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import CoursesList from "../common/Courses";
import SearchBar from "../../components/SearchBar";
import { axiosPrivate } from "../../api/axios";
import { Loader } from "@mantine/core";
import StudyPacks from "../common/StudyPacks";


function MyCourses() {
  // const [focusedTab, setFocusedTab] = useState("New");
  const { minimized } = useOutletContext();
  const [classes, setClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [studyPacks, setStudyPacks] = useState([]);
  const [studyPacksLoading, setStudyPacksLoading] = useState(true);
  const [skipClass, setSkipClass] = useState(0);
  const [takeClass, setTakeClass] = useState(100);
  const [skipStudyPack, setSkipStudyPack] = useState(0);
  const [takeStudyPack, setTakeStudyPack] = useState(100);

  useEffect(() => {
    fetchClasses(skipClass, takeClass, "", "", "");
    fetchStudyPacks(skipStudyPack, takeStudyPack, "", "", "");
  }, [])


  const fetchClasses = async (skip, limit, search, grade, subject) => {
    let isMounted = true;
    const controller = new AbortController();

    try {

      const CLASSES_FETCH_URL = `/stu/mycourses?skip=${skip}&limit=${limit}`;

      if (search) {
        CLASSES_FETCH_URL += `&search=${search}`
      }
      if (grade) {
        CLASSES_FETCH_URL += `&grade=${grade}`
      }
      if (subject) {
        CLASSES_FETCH_URL += `&subject=${subject}`
      }

      const response = await axiosPrivate.get(`${CLASSES_FETCH_URL}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal
      })

      console.log(response.data)
      const classes = response.data;
      console.log(classes)

      setSkipClass(skip + (classes.length))

      if (isMounted) {
        setClasses((prevState) => {
          const newState = [...prevState, ...classes]
          console.log(newState)
          return newState
        })
        setClassesLoading(false)
      }


    } catch (error) {
      console.log(error)
      setClassesLoading(false)
    }
  }

  const fetchStudyPacks = async (skip, limit, search, grade, subject) => {
    let isMounted = true;
    const controller = new AbortController();

    try {
      const STUDYPACKS_FETCH_URL = `/stu/mystudypacks?skip=${skip}&limit=${limit}`;
      if (search) {
        STUDYPACKS_FETCH_URL += `&search=${search}`
      }
      if (grade) {
        STUDYPACKS_FETCH_URL += `&grade=${grade}`
      }
      if (subject) {
        STUDYPACKS_FETCH_URL += `&subject=${subject}`
      }
      const response = await axiosPrivate.get(`${STUDYPACKS_FETCH_URL}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: controller.signal
      })
      console.log(response.data)
      const studyPacks = response.data;
      console.log(studyPacks)
      setSkipStudyPack(skip + (studyPacks.length))
      if (isMounted) {
        setStudyPacks((prevState) => {
          const newState = [...prevState, ...studyPacks]
          console.log(newState)
          return newState
        })
        setStudyPacksLoading(false)

      }
    } catch (error) {
      setStudyPacksLoading(false)

    }
  }


  const navigate = useNavigate();

  const navigateToTutors = () => {
    navigate("/stu/tutors");
  }

  return (
    <Tabs variant={"soft-rounded"} colorScheme={"accent"} w={"100%"} >
      <Box position={"sticky"} top={"64px"} backdropBlur={"20px"} bg={"white"} zIndex={2} >
        <TabList >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
            pr={9}
          >
            <Flex gap={3}>
              <Tab
                _selected={{ color: "#FFFFFF", bg: "#383838" }}
                color={"#3f3f3f"}
                bg={"gray.100"}
                fontWeight={"medium"}
              >
                Classes
              </Tab>
              <Tab
                _selected={{ color: "#FFFFFF", bg: "#383838" }}
                color={"#3f3f3f"}
                bg={"gray.100"}
                fontWeight={"medium"}
              >
                Study Packs
              </Tab>
            </Flex>
          </Flex>
        </TabList>
        <Flex p="5px" my="5px" justifyContent={"space-between"} alignItems={"center"} >
          <Flex w={"100%"} p="5px" gap="20px" justifyContent={"flex-start"} alignItems={"center"} >
            <SearchBar />
            <Flex justifyContent={"space-between"} alignItems={"center"} gap="10px">
              <Select placeholder='Grade' w="200px" size={"sm"}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
              <Select placeholder='Subject' w="200px" size={"sm"}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
              </Select>
            </Flex>
          </Flex>
          <Flex justifyContent={"flex-end"} alignItems={"center"} gap="10px" pr="10px">
          </Flex>
        </Flex>
      </Box>
      <TabPanels>
        <TabPanel p="5px">
          {classesLoading ?
            <Loader /> :
            <CoursesList courses={classes} enrolled={true} />
          }
        </TabPanel>
        <TabPanel p="5px">
          {/* <CoursesList courses={inProgressCourses} /> */}
          {studyPacksLoading ?
            <Loader w={"100%"} h={"100%"} /> :
            <StudyPacks studyPacks={studyPacks} purchased={true} />
          }
        </TabPanel>
      </TabPanels>
    </Tabs >

  );
}

export default MyCourses;
