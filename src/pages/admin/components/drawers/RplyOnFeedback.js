import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Flex,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Feedback from "../Feedback";
import { useFeedback } from "../../../../store/admin/useFeedback";

const ADMIN_FEEDBACK_URL = "/admin/sys/feedback";

function ReplyOnFeedback({
  isOpen,
  onClose,
  btnRef,
  timesAgo,
  name,
  role,
  message,
  id,
  owner_id,
  status,
}) {


  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const { removeFeedback } = useFeedback();

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  const closeIssue = async () => {
    try {
      if (input !== "") {
        const response = await axiosPrivate.delete(ADMIN_FEEDBACK_URL, {
          data: {
            message: input,
            owner_id: owner_id,
            id: id,
          },
        });

        console.log(response);
        removeFeedback(id, status);

        onClose();

        toast({
          title: "Success",
          description: "Close issue successfully",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Warning",
        description: error?.response?.data?.message,
        status: "warning",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <Drawer
      size={"sm"}
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Feedbacks</DrawerHeader>

        <DrawerBody>
          <Flex justifyContent={"center"}>
            <Feedback
              name={name}
              message={message}
              role={role}
              timesAgo={timesAgo}
              id={id}
              owner_id={owner_id}
              isFixing={true}
            />
          </Flex>
          <Box mt={5}>
            <FormControl isInvalid={isError}>
              <FormLabel>Reply on feedback</FormLabel>
              <Input type="text" value={input} onChange={handleInputChange} />
              {!isError ? (
                <FormHelperText>
                  Thank to user for providing feedback
                </FormHelperText>
              ) : (
                <FormErrorMessage>Reply is required.</FormErrorMessage>
              )}
            </FormControl>
            <Flex mt={3} justifyContent={"right"} gap={3}>
              <Button
                _hover={{
                  bg: "#e9e9e9",
                  color: "#333",
                }}
                bg={"#e9e9e9"}
                color={"#333"}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                _hover={{
                  bg: "#444",
                  color: "#fff",
                }}
                bg={"#444"}
                color={"#fff"}
                onClick={closeIssue}
              >
                Close Issue
              </Button>
            </Flex>
          </Box>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ReplyOnFeedback;
