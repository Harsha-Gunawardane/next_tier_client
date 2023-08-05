import React from "react";
import { Card, CardHeader, CardBody, CardFooter,Button,Text,ButtonGroup,Image,Stack,StackDivider,Heading,Divider,SimpleGrid } from '@chakra-ui/react'
import { CalendarIcon, TimeIcon,AddIcon,EditIcon, WarningIcon } from '@chakra-ui/icons'
import { ChakraProvider,HStack } from '@chakra-ui/react'
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton ,Box} from '@chakra-ui/react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SearchStudypack from "./search";



const Coursepackage = (props) => {

  const[coursesdata,setCoursesData]=useState(null);
  const [courseTitles, setCourseTitles] = useState({});
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const LoadDetail = (id) => {
    navigate("/tutor/courses/studypackdetails/" + id);
}

const Coursepackcontent = (id) => {
  navigate("/tutor/courses/studypackcontent/" + id);
}
 
useEffect(() => {
  const getStudyPack = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/studypack`, {
        signal: controller.signal,
      });
      setCoursesData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getStudyPack();
  fetchCourseTitles();
}, [axiosPrivate]); 




const fetchCourseTitles = async () => {
  const controller = new AbortController();
  try {
    const response = await axiosPrivate.get(`/tutor/course`, {
      signal: controller.signal,
    });

    const courseTitleMap = {};
    response.data.forEach((course) => {
      courseTitleMap[course.id] = course.title;
    });

    setCourseTitles(courseTitleMap);
  } catch (error) {
    console.log(error);
  }
};


const handleSearch = (searchTerm) => {
  if (searchTerm.trim() === "") {
    // If search term is empty, show all courses
    setCoursesData(coursesdata);
    window.location.reload();
  } else {
    // Filter courses based on the search term
    const filteredCourses = coursesdata.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoursesData(filteredCourses);
  }
};
 
  return (
     

     <div>

<ChakraProvider>
<SearchStudypack onSearch={handleSearch} />
<SimpleGrid minChildWidth='300px'  spacing='40px'>
{coursesdata != null && coursesdata.length>0 ? coursesdata.map(item => (


<Card maxW='lg'>
  <CardBody>
    <Image
      src={item.thumbnail}
    
      borderRadius='lg'
      
    />
    <Stack mt='6' spacing='3'>
      <Heading color='black' fontSize='l'>{item.title}</Heading>
      <Text color='black' fontSize='12px' >
      <CalendarIcon></CalendarIcon> 10h 20min
      </Text>
      <Text color='black' fontSize='12px' >
      <TimeIcon></TimeIcon> Rs.{item.price}
      </Text>
      <HStack mt='-5px'>
      <Text color='black'  fontSize='12px' mt='5px' >
      <TimeIcon></TimeIcon>  {courseTitles[item.course_id]}
      </Text>

      <IconButton onClick={() => { LoadDetail(item.id) }} 
  bg='white'
  aria-label='Search database'
  ml='180px'
  mt='-2px'
  height='20px'
  width='1%'
  fontSize='16px'
  icon={<EditIcon />}
/> 
   
      </HStack>
   
    </Stack>
  </CardBody>
  <Divider />
      
    
      <Button variant='solid' colorScheme='blue' fontSize='15px' width='95%' ml='10px' mt='20px' height='35px' mb='10px'onClick={() => { Coursepackcontent(item.id) }}>
        View
      </Button>
     
     
 

</Card>

)): <Box mt='150px' ><Heading fontSize='25px' ml='400px'>No Course Packages Avaliable</Heading>
</Box>
}

</SimpleGrid>

    
</ChakraProvider>
    </div>
  );
};

export default Coursepackage;
