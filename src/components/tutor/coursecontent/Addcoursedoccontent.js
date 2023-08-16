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
  FormLabel,Input, IconButton
} from '@chakra-ui/react'
import { SmallAddIcon} from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import React,{useEffect,useState} from "react";
import { useDisclosure } from '@chakra-ui/react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";





const Addcoursecontent = ({ studypackId }) => {

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

const tuteContent = contentdata.filter((content) => content.type === 'TUTE');

const [selectedItems, setSelectedItems] = useState([]);

const handleCheckboxChange = (index) => {
  if (selectedItems.includes(index)) {
    setSelectedItems(selectedItems.filter((item) => item !== index));
  } else {
    setSelectedItems([...selectedItems, index]);
  }
};

const [existingTuteIds, setExistingTuteIds] = useState([]); 
const [price, setPrice] = useState([]); 


useEffect(() => {
  const fetchExistingTuteIds = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
      const contentIds = response.data.content_ids;

      // Extract video_ids from content_ids array
      const tuteIds = contentIds.map((item) => item.tute_id).flat();

      // Set existing video IDs
      setExistingTuteIds(tuteIds);

      // Set price
      setPrice(response.data.price); // Assuming 'price' is a state variable

      console.log(tuteIds);
      console.log(response.data.price); // Log the price
    } catch (error) {
      console.log(error);
    }
  };

  fetchExistingTuteIds();
}, [isOpen]);



const handleSave = async (event) => {
  // event.preventDefault();


  try {
    const selectedTuteIds = selectedItems.map((index) => tuteContent[index].id);
    const updatedTuteIds = [...existingTuteIds, ...selectedTuteIds];

    // Fetch the existing content_ids structure
    const response = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
    const existingContentIds = response.data.content_ids;

    // Modify the existing content_ids structure with the updated video IDs
    const updatedContentIds = [
      {
        video_id: existingContentIds[0].video_id, // Keep the existing tute_id array
        tute_id: updatedTuteIds, // Update the video_id array with new values
      },
    ];

    // Update the studypack with the modified content_ids structure and the price
    await axiosPrivate.put(`/tutor/studypack/${studypackId}`, {
      content_ids: updatedContentIds,
      price: price, // Pass the price to the API call
    });

    // onClose(); // Close the modal after saving
  } catch (error) {
    console.log(error);
  }
};




return (
  <>
    <IconButton fontSize='20px' size={20}   bg='white'   icon={<SmallAddIcon/>} onClick={onOpen}></IconButton>

    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Video Content</ModalHeader>
        <ModalCloseButton />

        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab fontSize='15px'>Add existing content</Tab>
            <Tab fontSize='15px'>Add new content</Tab>
          </TabList>
          <TabPanels>
          <form onSubmit={handleSave}>
            <TabPanel>
              <ModalBody pb={6}>
              <SimpleGrid columns={2} spacing={4}>
                  {tuteContent.map((content, index) => (
                    <Box key={index} p={2} borderWidth={1} borderRadius='md'>
                      <Checkbox
                        isChecked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                      <img src={content.thumbnail} alt={`Thumbnail ${index}`} />
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
            </TabPanel>
            </form>
            <TabPanel>
           
              {/* Add new content form */}
              {/* ... (rest of the code remains the same) */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  </>
)
}



export default Addcoursecontent;