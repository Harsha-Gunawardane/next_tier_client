import React from "react";

import Course from "../../components/student/course";
import { ChakraProvider,Box } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter,Button,Text,ButtonGroup,Avatar,Image,Stack,HStack,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import CoursePackage from "../../components/student/coursepackage.js";


const Courses = () => {
  const[coursesdata,coursesdatachange]=useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/studentcourses/detail/" + id);
}
 
  useEffect(() => {
    fetch("http://localhost:8000/courses").then((res) => {
        return res.json();
    }).then((resp) => {
        coursesdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
  
  return (

 


<Box overflow='scroll'>


<Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab fontSize='15px'>Courses</Tab>
    <Tab  fontSize='15px'>Course Packages</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
<Course></Course>
    </TabPanel>
    <TabPanel>
   <CoursePackage></CoursePackage>
    </TabPanel>
  </TabPanels>
</Tabs>



 
 


  </Box>
   
  );
};

export default Courses;
