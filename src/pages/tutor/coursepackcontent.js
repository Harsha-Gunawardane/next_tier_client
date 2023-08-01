import React from "react";
import { useEffect,useState } from "react";

import { Box } from "@chakra-ui/react";
import { Image, Heading, Text,Accordion,AccordionButton,AccordionIcon,AccordionItem,AccordionPanel } from "@chakra-ui/react";

import {
  Avatar,

} from "@chakra-ui/react";
import {  HStack} from "@chakra-ui/react";
import {

  SimpleGrid,
  Button,
} from "@chakra-ui/react";


import CourseContent from "../../components/tutor/coursepackage/coursepackcontent";

import Addmonth from "../../components/tutor/coursepackage/addmonth.js";
import Addcontent from "../../components/tutor/coursecontent/addmonth.js";
import Remove from "../../components/tutor/coursecontent/Coursecontentremove";
import Addcoursedoccontent from "../../components/tutor/coursecontent/addcoursedoccontent";
import Addcoursequiz from "../../components/tutor/coursecontent/addcoursequiz";
import Addcoursecontent from "../../components/tutor/coursecontent/addcoursecontent";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Coursepackcontent = () => {

  const[coursepackcontentdata,coursepackcontentdatachange]=useState(null);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [selectedTitle, setSelectedTitle] = useState(null); 
  const [selectedDoc, setSelectedDoc] = useState(null); 
  

 
  useEffect(() => {
    fetch("http://localhost:8000/studypackcontent")
    .then((res) => res.json())
    .then((resp) => {
      coursepackcontentdatachange(resp);

      // Set the default selected image to id === 1 when the data is fetched
      const defaultImageItem = resp.find((item) => item.id === 1);
      if (defaultImageItem) {
        setSelectedImage(defaultImageItem.video);
        setSelectedTitle(defaultImageItem.videotitle);
        
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}, []);

const handleViewClick = (item) => {
  setSelectedImage(item.video);
  setSelectedTitle(item.videotitle);
  setSelectedDoc(null);
};

const handleViewClickdoc = (item) => {
  setSelectedImage(null);
  setSelectedTitle(null);
  setSelectedDoc(item.doc);
};






  
const axiosPrivate = useAxiosPrivate();

const [studypackdata, setstudypackdata] = useState({});

const location = useLocation();
const id = location.pathname.split("/").pop();



useEffect(() => {
  const getStudyPack = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/studypack/${id}`, {
        signal: controller.signal,
        
      });
      setstudypackdata(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getStudyPack();
}, [axiosPrivate]); 




  return (
   <Box width='100%'>


{studypackdata &&
<Heading fontSize='30px' mb='30px'>{studypackdata.title}</Heading>

}

      <SimpleGrid spacing={20} minChildWidth="250px">



{selectedImage && (
        <Box width='110%' bg='white'>
        <Image
            boxSize="60%"
            width="100%"
            height='350px'
            objectFit="cover"
            src={selectedImage}
            alt="Dan Abramov"
          />

          <Heading>{selectedTitle}</Heading>
         
          
        </Box>
  )}

{!selectedImage && selectedDoc && (
          <Box width="110%" bg="white">
            <Text fontSize="15px">{selectedDoc}</Text>
          </Box>
        )}
 <Box w="90%" bg="white" p={10}  ml="70px">

 
  <Heading fontSize='20px' mt='-40px' mb='20px'>Course Content</Heading>

 {coursepackcontentdata?.map((item) => (
  

  <Accordion allowToggle>
  <AccordionItem width={{base:300,xl:400}}>
    <h2>
      <AccordionButton bg='#eee' border='2px solid white' borderRadius='5px' height='50px' >
        <Box as="span" flex='1' textAlign='left'  height='30px'>
        <Heading p={1} ml='20px' fontSize='15px'>{item.title}</Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} bg='white'>
<br></br>

    
    <HStack spacing={{base:220,xl:290}}>
  <Text fontSize='15px'>Video Content</Text>
   <Box> <Addcoursecontent></Addcoursecontent></Box>        
  </HStack>


<Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}  width='210px'><HStack>  <Image
            boxSize="50%"
            width="40%"
            height='50px'
            objectFit="cover"
            src={item.video}
          
          />
         <Box ><Text fontSize='14px' className="box2">{item.videotitle}</Text></Box> 
          </HStack></Box> 
  <Box width='60px' ml='10px' mt='-5px' > <HStack><Button fontSize='12px' height='20px' onClick={() => handleViewClick(item)}>View</Button> <Remove></Remove></HStack></Box>


  </HStack>
</Box>


<HStack  spacing='270px' mt='10px' >
  <Text fontSize='15px'>Document Content</Text>
  <Box> <Addcoursedoccontent></Addcoursedoccontent></Box>    
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="200px" className="box2" >{item.doc }</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' ><HStack><Button  fontSize='12px' height='20px' onClick={() => handleViewClickdoc(item)}>View</Button> <Remove></Remove></HStack></Box>

  </HStack>
</Box>




<HStack  spacing='290px'  mt='10px' >
  <Text fontSize='15px'>Quiz Content</Text>
   <Box> <Addcoursequiz></Addcoursequiz></Box>   
  </HStack>

  <Box bg='#F0F8FF'mt='4px' className="box1" >
  <HStack spacing='50px'>
  <Box p={2}><Text fontSize='15px' width="200px" className="box2">{item.quiz}</Text></Box> 
  <Box width='60px' ml='10px' mt='-5px' ><HStack><Button fontSize='12px' height='20px'>View</Button> <Remove></Remove></HStack></Box>

  </HStack>
</Box>


    
    </AccordionPanel>
  </AccordionItem>


</Accordion>
    ))}


        </Box>

      

    
      </SimpleGrid>

     
      </Box>
  );
};

export default Coursepackcontent;
