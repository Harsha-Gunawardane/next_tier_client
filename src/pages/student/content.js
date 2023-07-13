import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider,SimpleGrid,Box,Heading ,HStack,Center,Flex,Text,Image,Avatar

} from '@chakra-ui/react'
import Contentmain from "../../components/student/Contentmain";
import Content from "../../components/student/content";
import { useEffect,useState } from "react";
import CourseContent from "../../components/student/courseContent";




  const Videocontent= () => {

    const[videodata,videodatachange]=useState(null);

   
    useEffect(() => {
      fetch("http://localhost:8000/videocontents").then((res) => {
          return res.json();
      }).then((resp) => {
          videodatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [])
  // 2. Wrap ChakraProvider at the root of your app
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