import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,FormControl,
  SimpleGrid,
  Box,
  Checkbox,Image,
  FormLabel,Input, IconButton
} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import React,{useEffect,useState} from "react";
import { useDisclosure } from '@chakra-ui/react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";





const Addvideo = ({ studypackId ,dynamicWeek,onVideoAdded}) => {

const { isOpen, onOpen, onClose } = useDisclosure()

const initialRef = React.useRef(null)
const finalRef = React.useRef(null)



const [contentdata, setcontentData] = useState([]); 

const axiosPrivate = useAxiosPrivate();

useEffect(() => {
  const getCourses = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`/tutor/content`, {
        signal: controller.signal,
      });
      setcontentData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  getCourses();
}, [axiosPrivate]);

const videoContent = contentdata.filter((content) => content.type === 'VIDEO');

const [selectedItems, setSelectedItems] = useState([]);

const handleCheckboxChange = (index) => {
  if (selectedItems.includes(index)) {
    setSelectedItems(selectedItems.filter((item) => item !== index));
  } else {
    setSelectedItems([...selectedItems, index]);
  }
};


const [existingVideoIds, setExistingVideoIds] = useState([]); 
const [price, setPrice] = useState([]); 


useEffect(() => {
  const fetchExistingVideoIds = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
      const contentIds = response.data.content_ids;

      // Extract video_ids from content_ids array
      const videoIds = contentIds.find(content => content.week1)?.week1?.video_id || [];

      // Set existing video IDs
      setExistingVideoIds(videoIds);

      // Set price
      setPrice(response.data.price);

      console.log(videoIds);
      console.log(response.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  fetchExistingVideoIds();
}, [isOpen]);




const [selectedVideoIds, setSelectedVideoIds] = useState(existingVideoIds);
const [selectedPrice, setSelectedPrice] = useState(price);




const handleSave = async (event) => {
  event.preventDefault();

  try {
    // Fetch the existing content_ids structure
    const response = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
    const existingContentIds = response.data.content_ids;
    const price = response.data.price;

    // Find the content object for the dynamic week
    const dynamicWeekContent = existingContentIds.find(content => content[dynamicWeek]);

    if (dynamicWeekContent) {
      // Get the existing video IDs in the dynamic week
      const existingDynamicWeekVideoIds = dynamicWeekContent[dynamicWeek].video_id;

      // Add selected content IDs to the existing video IDs
      const updatedVideoIds = [...existingDynamicWeekVideoIds, ...selectedItems.map(index => videoContent[index].id)];

      // Update the dynamic week's video_id array
      dynamicWeekContent[dynamicWeek].video_id = updatedVideoIds;
    }

    // Update the studypack with the modified content_ids structure and the price
    await axiosPrivate.put(`/tutor/studypack/${studypackId}`, {
      content_ids: existingContentIds,
      price: price,
    });
    onVideoAdded(existingContentIds);
    onClose(); 
  } catch (error) {
    console.log(error);
  }
};








return (
  <>
    <IconButton fontSize='20px' size={20}   bg='white'   icon={<SmallAddIcon/>} onClick={onOpen}></IconButton>

    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent size='2xl' maxW='60vw'>
        <ModalHeader>Add Video Content</ModalHeader>
        <ModalCloseButton />

    
          <form onSubmit={handleSave}>
          
              <ModalBody pb={6}>
              <SimpleGrid columns={4} spacing={4}>
                  {videoContent.map((content, index) => (
                    <Box key={index} p={2} borderWidth={1} borderRadius='md'>
                      <Checkbox
                        isChecked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <Image src={content.thumbnail} alt={`Thumbnail ${index}`}   height="100px"
                            width="100%" />
                      <p>{content.title}</p>
                    </Box>
                  ))}
                </SimpleGrid>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} fontSize='18px' height='30px' type='submit'>
                  Save
                </Button>
                <Button onClick={onClose} fontSize='18px' height='30px'>
                  Cancel
                </Button>
              </ModalFooter>
          
            </form>
        
   
       
      </ModalContent>
    </Modal>
  </>
)
}



export default Addvideo;