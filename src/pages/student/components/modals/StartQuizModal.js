import { Flex, Text, Box, Button, useBreakpointValue } from "@chakra-ui/react";
import { AiOutlineHistory } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../cards/Card";
import ModalLayout from "../../../../components/ModalLayout";
import NumberInput from "../NumberInput";
import { initializeQuiz, resetQuiz } from "../../../../hooks/fetchQuestions";
import formatTime from "../../../../utils/timeFormat";

function StartQuizModal({ isOpen, handleCloseModal, subject }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const [value, setValue] = useState(10);
  const [time, setTime] = useState(20);

  const handleStart = () => {
    dispatch(resetQuiz())
    dispatch(initializeQuiz(value, subject, "quiz"));
    console.log(value);

    localStorage.removeItem("timeRemaining");

    // set start time to local storage
    let currentTime = new Date();
    currentTime = currentTime.toISOString();

    localStorage.setItem("startTime", currentTime);

    navigate(`/stu/quizzes/${subject}/quiz`);
  };

  useEffect(() => {
    setTime(value * 2);
  }, [value]);

  const modalheader = "Physics  >  Quiz";

  const modalbody = (
    <Box mr={isMobile ? 2 : 5} ml={isMobile ? 2 : 5}>
      <Flex w="100%" justifyContent="center">
        <Text fontSize={13}>
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts." - Winston Churchill
        </Text>
      </Flex>
      <Flex mt={isMobile ? 2 : 5} mb={isMobile ? 2 : 5}>
        <Box
          mr={isMobile ? 4 : 8}
          h={110}
          w={{
            base: 150,
            sm: 175,
            md: 180,
            lg: 200,
            xl: 200,
          }}
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
          value={formatTime(time)}
          icon={
            <AiOutlineHistory
              fontSize="30px"
              fontWeight="bold"
              color="#D93400"
            />
          }
          color="#D93400"
          iconbg="#FDE6E6"
          size={15}
        />
      </Flex>
    </Box>
  );

  const modalfooter = (
    <Flex w="100%" justifyContent="center">
      <Button
        mb={2}
        justifyContent="center"
        cursor="pointer"
        onClick={handleStart}
        pl={10}
        pr={10}
        pt={2}
        pb={2}
        color="#FFFFFF"
        bg="#0074D9"
        _hover={{color: "#555555" , backgroundColor: "#E9E9E9"}}
        disabled={value === 0}
      >
        Start now
      </Button>
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
