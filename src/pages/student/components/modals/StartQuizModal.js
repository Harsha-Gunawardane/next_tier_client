import { Flex, Text, Box } from "@chakra-ui/react";
import Card from "../cards/Card";
import { AiOutlineSnippets, AiOutlineHistory } from "react-icons/ai";

import ModalLayout from "../../../../components/ModalLayout";

function StartQuizModal({ isOpen, handleCloseModal }) {
  const modalheader = "Physics  >  #Quiz 22";
  const modalbody = (
    <Box mr={5} ml={5}>
      <Flex w="100%" justifyContent="center" >
        <Text fontSize={13}>
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts." - Winston Churchill
        </Text>
      </Flex>
      <Flex mt={5} mb={5}>
        <Card
          title="No of MCQs"
          value={10}
          icon={
            <AiOutlineSnippets
              fontSize="30px"
              fontWeight="bold"
              color="#15BD66"
            />
          }
          color="#15BD66"
          iconbg="#D3F3D2"
          mr={8}
        />
        <Card
          title="Time"
          value="30"
          icon={
            <AiOutlineHistory
              fontSize="30px"
              fontWeight="bold"
              color="#D93400"
            />
          }
          color="#D93400"
          iconbg="#FDE6E6"
        />
      </Flex>
    </Box>
  );
  const modalfooter = (
    <Flex mb={2} w="100%" justifyContent="center">
      <Text pl={10} pr={10} pt={2} pb={2} color="#FFFFFF" bg="#0074D9" borderRadius={10}>
        Start now
      </Text>
    </Flex>
  );

  return (
    <ModalLayout
      title={modalheader}
      body={modalbody}
      footer={modalfooter}
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
    />
  );
}

export default StartQuizModal;
