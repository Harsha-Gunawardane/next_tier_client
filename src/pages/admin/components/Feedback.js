import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { HiSpeakerphone } from "react-icons/hi";
import { BsDot } from "react-icons/bs";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ReplyOnFeedback from "./drawers/RplyOnFeedback";
import ModalLayout from "../../../components/ModalLayout";
import { useFeedback } from "../../../store/admin/useFeedback";

const FEEDBACK_URL = "/user/sys/feedback";
const ADMIN_FEEDBACK_URL = "/admin/sys/feedback";

function Feedback({
  timesAgo,
  name,
  role,
  message,
  status,
  id,
  owner_id,
  isFixing = false,
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const { removeFeedback, updateStatus } = useFeedback();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ignoreErrMsg, setIgnoreErrMsg] = useState("");
  const [ignoredMsg, setIgnoredMsg] = useState("");

  const handleIgnore = async () => {
    const queryString = new URLSearchParams({
      id,
      owner_id,
    }).toString();

    try {
      const response = await axiosPrivate.delete(
        `${FEEDBACK_URL}?${queryString}`
      );

      setIgnoredMsg("Successfully ignored");
      removeFeedback(id, status);

      setTimeout(setIsModalOpen(false), 3000);
    } catch (error) {
      console.error(error);
      setIgnoreErrMsg(error?.response?.data?.message);
    }
  };

  const getAction = async () => {
    const queryString = new URLSearchParams({
      id,
    }).toString();

    try {
      const response = await axiosPrivate.patch(
        `${ADMIN_FEEDBACK_URL}?${queryString}`
      );

      console.log(response);
      updateStatus(id);
      toast({
        title: "Success",
        description: "New feedback in action",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
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

  const handleClosedModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenedModal = (user) => {
    setIsModalOpen(true);
  };

  const modalTitle = <Text>Are you sure?</Text>;

  const modalBody = (
    <Box>
      <Flex
        display={ignoreErrMsg === "" ? "none" : "flex"}
        borderRadius={4}
        bg={"#F5D6D3"}
        justifyContent={"center"}
        m={2}
      >
        <Text pl={2} pr={2} pt={1} pb={1} color={"#D93400"}>
          {ignoreErrMsg}
        </Text>
      </Flex>
      <Flex
        display={ignoredMsg === "" ? "none" : "flex"}
        borderRadius={4}
        bg={"#D3FFD2"}
        justifyContent={"center"}
        m={2}
      >
        <Text pl={2} pr={2} pt={1} pb={1} color={"#15BD66"}>
          {ignoredMsg}
        </Text>
      </Flex>
      <Flex mt={3} gap={5} justifyContent={"center"}>
        <Button
          pl={6}
          pr={6}
          bg={"#444"}
          color={"#FFF"}
          _hover={{ background: "#444", color: "#fff" }}
          onClick={handleIgnore}
        >
          Ignore
        </Button>
        <Button
          pl={6}
          pr={6}
          bg={"#E9E9E9"}
          color={"#333"}
          _hover={{ background: "#E9E9E9", color: "#333" }}
          onClick={handleClosedModal}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );

  return (
    <>
      <Flex
        border={status === "NEW" ? "1px solid #FF6E88" : "1px solid #0074D9"}
        borderLeft={
          status === "NEW" ? "5px solid #FF6E88" : "5px solid #0074D9"
        }
        borderRadius={4}
        gap={3}
        w={"100%"}
        p={2.5}
        mt={1}
        mb={3}
        boxShadow="rgba(255, 110, 136, 0.15) 0px 3px 6px -1px, rgba(0, 0, 0, 0.1) 0px 3px 4px"
      >
        <HiSpeakerphone
          fontSize={36}
          color={status === "NEW" ? "#FF6E88" : "#0074D9"}
        />
        <Box>
          <Flex alignItems={"center"}>
            <Text color={"#373737"} fontSize={14}>
              Feedback
            </Text>
            <BsDot />
            <Text fontSize={13} color={"#373737"}>
              {timesAgo}
            </Text>
          </Flex>
          <Flex mt={1} alignItems={"center"}>
            <Text fontWeight={"bold"} color={"#333333"} fontSize={16}>
              {name}
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
              {role}
            </Text>
          </Flex>
          <Text mt={1} mb={1} fontSize={12} color={"#565656"}>
            {message}
          </Text>

          <Flex
            display={isFixing ? "none" : "flex"}
            mt={2}
            justifyContent={"right"}
            gap={2}
            w={72}

          >
            <Button
              h={7}
              _hover={{
                bg: "#e9e9e9",
                color: "#333",
              }}
              bg={"#e9e9e9"}
              fontWeight={"normal"}
              fontSize={13}
              pl={4}
              pr={4}
              pt={1}
              pb={1}
              color={"#333"}
              onClick={handleOpenedModal}
              ref={btnRef}
            >
              Ignore
            </Button>
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
              onClick={status === "NEW" ? getAction : onOpen}
              ref={btnRef}
            >
              {status === "NEW" ? "Get Action" : "Fixed"}
            </Button>
          </Flex>
        </Box>
      </Flex>
      <ReplyOnFeedback
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        name={name}
        message={message}
        role={role}
        timesAgo={timesAgo}
        id={id}
        owner_id={owner_id}
        status={status}
      />
      <ModalLayout
        isOpen={isModalOpen}
        handleCloseModal={handleClosedModal}
        body={modalBody}
        title={modalTitle}
        size="sm"
      />
    </>
  );
}

export default Feedback;
