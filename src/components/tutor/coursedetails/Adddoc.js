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
  Checkbox,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Adddoc = ({ studypackId }) => {
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

  const tuteContent = contentdata.filter((content) => content.type === "TUTE");

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
        const response = await axiosPrivate.get(`/tutor/course/${studypackId}`);
        const contentIds = response.data.content_ids;

        // Extract video_ids from content_ids array
        const tuteIds = contentIds.map((item) => item.tute_id).flat();

        // Set existing video IDs
        setExistingTuteIds(tuteIds);

        // Set price
        setPrice(response.data.monthly_fee); // Assuming 'price' is a state variable

        console.log(tuteIds);
        console.log(response.data.monthly_fee); // Log the price
      } catch (error) {
        console.log(error);
      }
    };

    fetchExistingTuteIds();
  }, [isOpen]);

  const handleSave = async (event) => {
    // event.preventDefault();

    try {
      const selectedTuteIds = selectedItems.map(
        (index) => tuteContent[index].id
      );
      const updatedTuteIds = [...existingTuteIds, ...selectedTuteIds];

      // Fetch the existing content_ids structure
      const response = await axiosPrivate.get(`/tutor/course/${studypackId}`);
      const existingContentIds = response.data.content_ids;
      const price = response.data.monthly_fee;

      // Modify the existing content_ids structure with the updated video IDs
      const updatedContentIds = [
        {
          video_id: existingContentIds[0].video_id, // Keep the existing tute_id array
          tute_id: updatedTuteIds, // Update the video_id array with new values
        },
      ];

      // Update the studypack with the modified content_ids structure and the price
      await axiosPrivate.put(`/tutor/course/${studypackId}`, {
        content_ids: updatedContentIds,
        monthly_fee: price, // Pass the price to the API call
      });
      toast({
        title: "Tute Added",
        description: "The Tute has been successfully Added.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          // Reload the page after the toast is manually closed
          window.location.reload();
        },
      });
      onClose(); // Close the modal after saving
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        fontSize="12px"
        height="20px"
        colorScheme="white"
        color="black"
        ml="320%"
        onClick={onOpen}
      >
        Add New +
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent size="2xl" maxW="60vw">
          <ModalHeader>Add Tute Content</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSave}>
            <ModalBody pb={6}>
              <SimpleGrid columns={4} spacing={4}>
                {tuteContent.map((content, index) => (
                  <Box key={index} p={2} borderWidth={1} borderRadius="md">
                    <Checkbox
                      isChecked={selectedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />

                    <Image
                      src={content.thumbnail}
                      alt={`Thumbnail ${index}`}
                      height="100px"
                    />

                    <Text mt="5px" fontSize="12px">
                      {content.title}
                    </Text>
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

          {/* Add new content form */}
          {/* ... (rest of the code remains the same) */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Adddoc;
