import * as React from 'react'

import {
  ChakraProvider, SimpleGrid, Box, Heading, HStack, Center, Flex, Text, Image, Avatar

} from '@chakra-ui/react'
import Contentmain from "../../components/student/Contentmain";
import Content from "../../components/student/content";
import { useEffect, useState } from "react";
import useSidebar from "../../hooks/useSidebar";


const videos = [
  {
    id: 1,
    name: "Physics",
    imgUrl: "https://images.unsplash.com/photo-1612837017391-0b6b3b0e9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljcyUyMGZvciUyMGJ1c2luZXNzJTIwY2xhc3NpZmllcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
  {
    id: 2,
    name: "Chemistry",
    imgUrl: "https://images.unsplash.com/photo-1612837017391-0b6b3b0e9b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljcyUyMGZvciUyMGJ1c2luZXNzJTIwY2xhc3NpZmllcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  }]



const Videocontent = () => {

  const [videodata, videodatachange] = useState(videos);

  const { setSidebarOptionHandler } = useSidebar();

  useEffect(() => {
    setSidebarOptionHandler("content");
  }, [setSidebarOptionHandler]);


  useEffect(() => {
    fetch("http://localhost:8000/videocontents").then((res) => {
      return res.json();
    }).then((resp) => {
      videodatachange(resp);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])


  return (

    <Box overflow='scroll'>
      <Contentmain></Contentmain>


      <SimpleGrid minChildWidth='250px' spacing='40px' p={5}>

        {videodata?.map((item) => (
          <Content item={item} key={item.id} />
        ))}

      </SimpleGrid>

    </Box>


  )
}
export default Videocontent;