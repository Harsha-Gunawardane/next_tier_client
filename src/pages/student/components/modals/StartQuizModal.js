import { Flex, Text, Box } from "@chakra-ui/react";
import { AiOutlineHistory } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../cards/Card";
import ModalLayout from "../../../../components/ModalLayout";
import NumberInput from "../NumberInput";
import { initializeQuiz } from "../../../../hooks/fetchQuestions";

function StartQuizModal({ isOpen, handleCloseModal, subject, quizname }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [value, setValue] = useState(10);
  const [time, setTime] = useState(20);

  const handleStart = () => {
    dispatch(initializeQuiz(value, subject, quizname))
    console.log(value);

    localStorage.removeItem("timeRemaining");
    navigate(`/stu/quizzes/${subject}/${quizname}`)
  }

  useEffect(() => {
    setTime(value * 2);
  }, [value]);

  const modalheader = "Physics  >  #Quiz 22";

  const modalbody = (
    <Box mr={5} ml={5}>
      <Flex w="100%" justifyContent="center">
        <Text fontSize={13}>
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts." - Winston Churchill
        </Text>
      </Flex>
      <Flex mt={5} mb={5}>
        <Box
          mr={8}
          h={110}
          w={200}
          border="1px solid #EDEDED"
          borderRadius={5}
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
        >
          <Flex mt={4} ml={5} justifyContent="left">
            <Text fontSize={13} color="#555555" fontWeight="semibold">
              No of MCQs
            </Text>
          </Flex>
          <Flex mt={1} mr={5} ml={8} h={16} justifyContent="center">
            <NumberInput value={value} setValue={setValue} />
          </Flex>
        </Box>

        <Card
          title="Time"
          value={time}
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
    <Flex
      mb={2}
      w="100%"
      justifyContent="center"
      cursor="pointer"
      onClick={handleStart}
    >
      <Text
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        color="#FFFFFF"
        bg="#0074D9"
        borderRadius={10}
      >
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
