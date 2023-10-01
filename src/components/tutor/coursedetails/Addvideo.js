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
  Checkbox,
  Text,Image,
useToast
} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import React,{useEffect,useState} from "react";
import { useDisclosure } from '@chakra-ui/react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";





const Addvideo = ({ studypackId,addNewVideo }) => {

const { isOpen, onOpen, onClose } = useDisclosure()

const initialRef = React.useRef(null)
const finalRef = React.useRef(null)



const [contentdata, setcontentData] = useState([]); 

const axiosPrivate = useAxiosPrivate();
const toast=useToast();



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
      const response = await axiosPrivate.get(`/tutor/course/${studypackId}`);
      const contentIds = response.data.content_ids;

      // Extract video_ids from content_ids array
      const videoIds = contentIds.map((item) => item.video_id).flat();

      // Set existing video IDs
      setExistingVideoIds(videoIds);

      // Set price
      setPrice(response.data.monthly_fee); // Assuming 'price' is a state variable

      console.log(videoIds);
      console.log(response.data.price); // Log the price
    } catch (error) {
      console.log(error);
    }
  };

  fetchExistingVideoIds();
}, [isOpen]);



const handleSave = async (event) => {
  event.preventDefault();
 
  try {
    const selectedVideoIds = selectedItems.map((index) => videoContent[index].id);
    const updatedVideoIds = [...existingVideoIds, ...selectedVideoIds];

    // Fetch the existing content_ids structure
    const response = await axiosPrivate.get(`/tutor/course/${studypackId}`);
    const existingContentIds = response.data.content_ids;

    // Modify the existing content_ids structure with the updated video IDs
    const updatedContentIds = [
      {
        tute_id: existingContentIds[0].tute_id, // Keep the existing tute_id array
        video_id: updatedVideoIds, // Update the video_id array with new values
      },
    ];

    // Update the studypack with the modified content_ids structure and the price
    await axiosPrivate.put(`/tutor/course/${studypackId}`, {
      content_ids: updatedContentIds,
      monthly_fee: price, // Pass the price to the API call
    });
    toast({
      title: 'Video Added',
      description: 'The Video has been successfully Added.',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top',
      onCloseComplete: () => {
        // Reload the page after the toast is manually closed
        window.location.reload();
      },
    });
    onClose(); 
    // addNewVideo(updatedContentIds[0]);
    // onClose(); // Close the modal after saving
  } catch (error) {
    console.log(error);
  }
};




return (
  <>
    <Button fontSize='12px' height='20px' colorScheme='white' color='black' ml='320%'  onClick={onOpen}>Add New +</Button>

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
                 
                      <Image src={content.thumbnail} alt={`Thumbnail ${index}`} height='100px' />
                    
                      <Text mt='5px' fontSize='12px'>{content.title}</Text>
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
      
           
              {/* Add new content form */}
 
      </ModalContent>
    </Modal>
  </>
)
}



export default Addvideo;