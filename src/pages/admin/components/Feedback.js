import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useRef } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import ReplyOnFeedback from "./drawers/RplyOnFeedback";

function Feedback() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Flex
        border={"1px solid #FF6E88"}
        borderLeft={"5px solid #FF6E88"}
        borderRadius={4}
        gap={3}
        w={"100%"}
        p={2.5}
        mt={1}
        mb={3}
        boxShadow="rgba(255, 110, 136, 0.15) 0px 3px 6px -1px, rgba(0, 0, 0, 0.1) 0px 3px 4px"
      >
        <HiSpeakerphone fontSize={36} color="#FF6E88" />
        <Box>
          <Flex alignItems={"center"}>
            <Text color={"#373737"} fontSize={14}>
              Feedback
            </Text>
            <BsDot />
            <Text fontSize={13} color={"#373737"}>
              3 min ago
            </Text>
          </Flex>
          <Flex mt={1} alignItems={"center"}>
            <Text fontWeight={"bold"} color={"#333333"} fontSize={16}>
              Harsha Gunawardane
            </Text>
            <Text
              borderRadius={3}
              ml={3}
              color={"#333333"}
              pl={2}
              pr={2}
              bg={"#E9E9E9"}
              fontSize={12}
            >
              Student
            </Text>
          </Flex>
          <Text mt={1} mb={1} fontSize={12} color={"#565656"}>
            Due to unavoidable reason Monday (June 25th) class has been
            cancelled
          </Text>

          <Flex mt={1} justifyContent={"right"}>
            <Button
              h={7}
              _hover={{
                bg: "#444444",
                color: "#FFFFFF",
              }}
              bg={"#444444"}
              fontWeight={"normal"}
              fontSize={13}
              pl={4}
              pr={4}
              pt={1}
              pb={1}
              color={"#EEEEEE"}
              onClick={onOpen}
              ref={btnRef}
            >
              Reply
            </Button>
          </Flex>
        </Box>
      </Flex>
      <ReplyOnFeedback isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}

export default Feedback;
