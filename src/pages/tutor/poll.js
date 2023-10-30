
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Addpoll = () => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [pollData, setPollData] = useState(null);
  const [votes, setVotes] = useState({});
  const [userId, setUserId] = useState("");
  const [voteCounts, setVoteCounts] = useState({});

 

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
 



  const getPollData = async () => {
    try {
      const response = await axiosPrivate.get(`/tutor/courses/poll/9ae4acf6-c8a1-456b-be55-c03bd6b1a234`);
      setPollData(response.data.poll);
      setUserId(response.data.userId);

      const initialVoteCounts = {};
      pollData.forEach((poll) => {
        initialVoteCounts[poll.id] = poll.votes;
      });
      setVoteCounts(initialVoteCounts);

    } catch (error) {
      console.log("Error fetching poll data:", error);
    }
  };

  useEffect(() => {
    getPollData();
  }, [axiosPrivate, id]);


  const sendVote = async (pollId, selectedOption) => {
    try {
      await axiosPrivate.put(`/tutor/courses/poll/${pollId}/${selectedOption}`);

      const updatedCounts = { ...voteCounts };
      updatedCounts[pollId][selectedOption]++;

      setVoteCounts(updatedCounts);
    
      toast({
        title: "Vote Submitted",
        description: `You voted for: ${selectedOption}`,
        status: "success",
        duration: 3000, // Adjust the duration as needed
        isClosable: true,
        position:"top",
      });
      // Optionally, you can handle success or display a message to the user.
    } catch (error) {
      console.error("Error sending the vote:", error);
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
   
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent p={5}>
          <DrawerCloseButton />
          <DrawerHeader fontSize="20px">Poll</DrawerHeader>

          <DrawerBody>
        

            <Heading mt="10px" mb="5px" fontSize="20px">
             Polls
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

                  
                  <form>
            {poll.options && poll.options.length > 0 && (
              <Heading fontSize="15px" mt="20px">
                Options:
              </Heading>
            )}
            {poll.options && poll.options.length > 0 && (
              <Box>
                {poll.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <Button
                      colorScheme="blue" 
                      variant="outline" 
                      size="sm" 
                      mt="5px" 
                      onClick={() => {
                    
                        if (poll.user_id.includes(userId)) {
                        
                          return;
                        }
                      
                        sendVote(poll.id, option);
                      }}
                      isDisabled={poll.user_id.includes(userId)}
                    >
                      {option}
                    </Button>
                     
                  </div>
                ))}
              </Box>
            )}
          </form>

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
                
                
                </Box>
              ))
            ) : (
              <Heading fontSize="15px" mt="20px">
                No Poll Data Available
              </Heading>
            )}

          
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Addpoll;

