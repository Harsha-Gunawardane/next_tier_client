import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Box,
  Progress,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Addpoll = () => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const [isOpen, setIsOpen] = useState(false);
  const [pollData, setPollData] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [courseId, setCourseId] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [pollToRemoveId, setPollToRemoveId] = useState(null);

  const openConfirmation = (pollId) => {
    setPollToRemoveId(pollId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setPollToRemoveId(null);
    setIsConfirmationOpen(false);
  };

  const getPollData = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/courses/poll/${id}`);
      setPollData(response.data);
    } catch (error) {
      console.log("Error fetching poll data:", error);
    }
  };

  useEffect(() => {
    getPollData();
  }, [axiosPrivate, id]);

  const handleAddPoll = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (
      question.trim() === "" ||
      question.length > 1000 ||
      options.length < 2
    ) {
      return;
    }

    const newPoll = {
      question: question,
      options: options,
      course_id: id,
    };

    try {
      await axiosPrivate.post(`/tutor/courses/poll`, newPoll);
      getPollData();
      setQuestion("");
      setOptions([]);
      onClose();
      setFormSubmitted(false);
    } catch (error) {
      console.error("Error adding new poll:", error);
    }
  };

  const handleRemovePoll = async () => {
    try {
      await axiosPrivate.delete(`/tutor/courses/poll/${pollToRemoveId}`);
      getPollData();
      closeConfirmation();
    } catch (error) {
      console.error("Error removing poll:", error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        width="60%"
        height="35px"
        mb="10px"
        ml="130px"
        mt="25px"
        fontSize="12px"
        colorScheme="blue"
      >
        Create Poll
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent p={5}>
          <DrawerCloseButton />
          <DrawerHeader fontSize="20px">Poll</DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleAddPoll}>
              <FormControl
                isRequired
                isInvalid={formSubmitted && question.trim().length === 0}
              >
                <Heading fontSize="15px">Poll Question</Heading>
                <Input
                  fontSize="15px"
                  height="40px"
                  placeholder="Enter your poll question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <FormErrorMessage>Poll question is required</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={formSubmitted && options.length < 2}
              >
                <Heading fontSize="15px" mt="20px">
                  Poll Options
                </Heading>
                <Textarea
                  fontSize="15px"
                  height="80px"
                  placeholder="Enter your poll options (separated by line breaks)"
                  value={options.join("\n")}
                  onChange={(e) => setOptions(e.target.value.split("\n"))}
                />
                <FormErrorMessage>
                  At least two poll options are required
                </FormErrorMessage>
              </FormControl>

              <Button
                colorScheme="blue"
                mr={3}
                fontSize="14px"
                height="30px"
                type="submit"
                mt="10px"
              >
                Add Poll
              </Button>
              <Button onClick={onClose} fontSize="14px" height="30px" mt="10px">
                Cancel
              </Button>
            </form>

            <Heading mt="10px" mb="5px" fontSize="20px">
              Previously created polls{" "}
            </Heading>
            {pollData && pollData.length > 0 ? (
              pollData.map((poll, index) => (
                <Box
                  key={index}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                  mt="10px"
                >
                  <Heading fontSize="15px">Question: {poll.question}</Heading>
                  {poll.options && poll.options.length > 0 && (
                    <Heading fontSize="15px" mt="20px">
                      Options:
                    </Heading>
                  )}
                  {poll.options && poll.options.length > 0 && (
                    <Box>
                      {poll.options.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <p>{option}</p>
                        </div>
                      ))}
                    </Box>
                  )}
                  <Heading fontSize="15px" mt="20px">
                    Votes:
                  </Heading>
                  <Box>
                    {Object.entries(poll.votes).map(([option, count]) => (
                      <div key={option}>
                        <p>
                          {option}: {count}
                        </p>
                        <Progress
                          value={count}
                          colorScheme="teal"
                          mt={2}
                          size="sm"
                        />
                      </div>
                    ))}
                  </Box>
                  <Button
                    colorScheme="red"
                    fontSize="14px"
                    height="30px"
                    onClick={() => openConfirmation(poll.id)}
                    mt="10px"
                  >
                    Remove
                  </Button>
                </Box>
              ))
            ) : (
              <Heading fontSize="15px" mt="20px">
                No Poll Data Available
              </Heading>
            )}

            <AlertDialog
              isOpen={isConfirmationOpen}
              leastDestructiveRef={null}
              onClose={closeConfirmation}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirm Remove
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to remove this poll?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button
                      onClick={() => handleRemovePoll()}
                      colorScheme="red"
                      ml={3}
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={closeConfirmation}
                      colorScheme="blue"
                      ml={3}
                    >
                      Cancel
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Addpoll;
