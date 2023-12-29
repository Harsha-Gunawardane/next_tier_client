import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Addannouncement = ({ setannouncementData }) => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [announcementData, setAnnouncementData] = useState([]);
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [monthly_fee, setMonthlyFee] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const defaultDate = new Date().toISOString().slice(0, 10);
  const defaultTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getAnnouncementData = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/course/${id}`);
      const courseData = response.data;

      setAnnouncementData(courseData.announcements);
      setMonthlyFee(courseData.monthly_fee.toString());
    } catch (error) {
      console.log("Error fetching announcement data:", error);
    }
  };

  useEffect(() => {
    getAnnouncementData();
  }, [axiosPrivate, id]);

  const reversedAnnouncementData = [...announcementData];

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (
      heading.trim() === "" ||
      heading.length > 50 ||
      message.trim() === "" ||
      message.length > 200
    ) {
      return;
    }

    const newAnnouncement = {
      day: defaultDate,
      time: defaultTime,
      heading: heading,
      message: message,
    };

    try {
      await axiosPrivate.put(`/tutor/course/${id}`, {
        monthly_fee: monthly_fee, // Add monthly_fee to the new announcement
        announcements: [...announcementData, newAnnouncement], // Add the new announcement to existing announcements
      });
      getAnnouncementData();
      setannouncementData((prevAnnouncements) => [
        ...prevAnnouncements,
        newAnnouncement,
      ]);
      setHeading("");
      setMessage("");
      onClose();
      setFormSubmitted(false);

      toast({
        title: "Announcement Added",
        description: "Your announcement has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error adding new announcement:", error);
    }
  };

  const handleRemoveAnnouncement = (index) => {
    const updatedAnnouncements = [...announcementData].reverse();
    updatedAnnouncements.splice(index, 1);

    axiosPrivate
      .put(`/tutor/course/${id}`, {
        monthly_fee: monthly_fee,
        announcements: updatedAnnouncements,
      })
      .then(() => {
        setAnnouncementData(updatedAnnouncements);
      })
      .catch((error) => {
        console.error("Error removing announcement:", error);
      });
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        width="60%"
        height="35px"
        mb="10px"
        ml="130px"
        mt="25px"
        fontSize="12px"
        colorScheme="blue"
      >
        Add Announcement
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent p={5}>
          <DrawerCloseButton />
          <DrawerHeader fontSize="20px">Add Announcement</DrawerHeader>
          <form onSubmit={handleAddAnnouncement}>
            <FormControl
              isRequired
              isInvalid={
                formSubmitted &&
                (heading.trim().length === 0 || heading.length > 10) // Check for both conditions
              }
            >
              <FormLabel fontSize="15px">Title</FormLabel>
              <Input
                fontSize="15px"
                height="40px"
                placeholder="Title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              {formSubmitted && heading.trim().length === 0 && (
                <FormErrorMessage>Title is required</FormErrorMessage>
              )}
              {formSubmitted && heading.length > 10 && (
                <FormErrorMessage>
                  Title must not exceed 50 characters
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isRequired
              isInvalid={formSubmitted && message.trim().length === 0}
            >
              <FormLabel fontSize="15px">Message</FormLabel>
              <Textarea
                fontSize="15px"
                height="80px"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <FormErrorMessage>Title is required</FormErrorMessage>
            </FormControl>

            <Button
              colorScheme="blue"
              mr={3}
              fontSize="14px"
              height="30px"
              type="submit"
              mt="10px"
            >
              Save
            </Button>
            <Button onClick={onClose} fontSize="14px" height="30px" mt="10px">
              Cancel
            </Button>
          </form>

          <DrawerBody>
            <Heading fontSize="15px" mt="60px">
              All Announcements
            </Heading>

            {reversedAnnouncementData != null &&
              reversedAnnouncementData.length > 0 ? (
              reversedAnnouncementData.map((item, index) => (
                <Box
                  key={index}
                  bg="white"
                  mt="20px"
                  p={2}
                  boxShadow="0 3px 10px rgb(0 0 0 / 0.2)"
                  borderLeft="6px solid red"
                >
                  <Text fontSize="16px" color="black">
                    {item.heading}
                  </Text>
                  <Text fontSize="12px" color="grey">
                    {item.message}
                  </Text>
                  <HStack mt="8px" spacing="30px">
                    <Text fontSize="12px" color="grey">
                      {item.day}
                    </Text>
                    <Text fontSize="12px" color="grey">
                      {item.time}
                    </Text>
                  </HStack>
                  <Button
                    onClick={() => handleRemoveAnnouncement(index)}
                    size="sm"
                    colorScheme="red"
                    width="58px"
                    fontSize="12px"
                    height="30px"
                    mt='10px'
                  >
                    Remove
                  </Button>
                </Box>
              ))
            ) : (
              <Box mt="10" ml="40px">
                <Heading fontSize="15px" color="grey" ml="30px">
                  No Announcements
                </Heading>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Addannouncement;
