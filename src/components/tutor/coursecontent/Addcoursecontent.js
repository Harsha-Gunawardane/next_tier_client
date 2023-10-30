import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  SimpleGrid,
  Box,
  Image,
  Checkbox,
  FormLabel,
  Input,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Addcoursecontent = ({ studypackId, onContentAdded }) => {
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [contentdata, setcontentData] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  useEffect(() => {
    const getCourses = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`/tutor/papers/`, {
          signal: controller.signal,
        });
        setcontentData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourses();
  }, [axiosPrivate]);

  const videoContent = contentdata;

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (contentId) => {
    if (selectedItems.includes(contentId)) {
      setSelectedItems(selectedItems.filter((item) => item !== contentId));
    } else {
      setSelectedItems([...selectedItems, contentId]);
    }
  };
  const [existingVideoIds, setExistingVideoIds] = useState([]);
  const [price, setPrice] = useState([]);
  // console.log(selectedItems);

  useEffect(() => {
    const fetchExistingVideoIds = async () => {
      try {
        const response = await axiosPrivate.get(
          `/tutor/studypack/${studypackId}`
        );
        const contentIds = response.data.content_ids;

        setExistingVideoIds(contentIds);

        setPrice(response.data.price);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExistingVideoIds();
  }, [isOpen]);

  // const handleSave = async (event) => {

  //   event.preventDefault();
  //   try {
  //     const selectedVideoIds = selectedItems.map((index) => videoContent[index].id);
  //     const updatedVideoIds = [...existingVideoIds, ...selectedVideoIds];

  //     // Fetch the existing content_ids structure
  //     const response = await axiosPrivate.get(`/tutor/studypack/${studypackId}`);
  //     const existingContentIds = response.data.content_ids;

  //     // Modify the existing content_ids structure with the updated video IDs
  //     const updatedContentIds = [
  //       {
  //         tute_id: existingContentIds[0].tute_id, // Keep the existing tute_id array
  //         video_id: updatedVideoIds, // Update the video_id array with new values
  //       },
  //     ];

  //     // Update the studypack with the modified content_ids structure and the price
  //     await axiosPrivate.put(`/tutor/studypack/${studypackId}`, {
  //       content_ids: updatedContentIds,
  //       price: price, // Pass the price to the API call
  //     });
  //     onContentAdded(selectedVideoIds);
  //     onClose(); // Close the modal after saving
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSave = async (event) => {
    // event.preventDefault();
    try {
      // Combine selected content IDs with existing ones
      const updatedContentIds = [...existingVideoIds, ...selectedItems];

      // Update the studypack with the modified content_ids structure and the price
      await axiosPrivate.put(`/tutor/studypack/${studypackId}`, {
        content_ids: updatedContentIds.map((id) => id.toString()),
        price: price, // Pass the price to the API call
      });
      // onContentAdded(selectedItems);

      toast({
        title: "Paper Added",
        description: "The Paper has been successfully added.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          window.location.reload();
        },
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton
        fontSize="20px"
        size={20}
        bg="white"
        icon={<SmallAddIcon />}
        onClick={onOpen}
      ></IconButton>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent size="2xl" maxW="60vw">
          <ModalHeader>Add Paper</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSave}>
            <ModalBody pb={6}>
              <SimpleGrid columns={4} spacing={4}>
                {videoContent.map((content, index) => (
                  <Box key={index} p={2} borderWidth={1} borderRadius="md">
                    <Checkbox
                      isChecked={selectedItems.includes(content.paper_id)}
                      onChange={() => handleCheckboxChange(content.paper_id)}
                    />
                    {/* <Image src={content.thumbnail} alt={`Thumbnail ${index}`} /> */}
                    <p>{content.title}</p>
                  </Box>
                ))}
              </SimpleGrid>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                fontSize="18px"
                height="30px"
                type="submit"
              >
                Save
              </Button>
              <Button onClick={onClose} fontSize="18px" height="30px">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addcoursecontent;
