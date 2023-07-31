import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  moveNextQuestion,
  movePrevQuestion,
  resetQuiz
} from "../../../../hooks/fetchQuestions";
import ModalLayout from "../../../../components/ModalLayout";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const STUDENT_QUIZ_DONE_URL = '/stu/quiz'

const getNoOfMissedQuestions = (result, noOfQuestions) => {
  // if thers is no any one answer then return count of all questions
  if (result.length == 0) return noOfQuestions;

  // count undefined answers
  let count = result.filter((answer) => typeof answer === "undefined").length;

  if (result.length !== noOfQuestions) count += noOfQuestions - result.length;
  return count;
};

function QuizFooter() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const { trace, queue, mcqName, subject } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  const handleSubmit = async () => {
    let currentTime = new Date()
    currentTime = currentTime.toISOString()

    try {
      const response = await axiosPrivate.patch(STUDENT_QUIZ_DONE_URL, {
        subject,
        quizName: mcqName,
        result,
        startTime: localStorage.getItem('startTime'),
        endTime: currentTime
      })

      console.log(localStorage.getItem('startTime'))
      localStorage.removeItem('startTime')
      dispatch(resetQuiz())
      navigate(`/stu/quizzes/${subject}/${mcqName}/review`)

    } catch (error) {
      console.log(error);
      handleCloseModal()
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const totalQuestions = queue.length;
  const missedQuestions = getNoOfMissedQuestions(result, totalQuestions);
  const answeredQuestions = totalQuestions - missedQuestions;

  const body = (
    <Box mt={2} mb={5} w='100%'>
      <Text>Greate work buddy!</Text>
      <Box mt={5}>
        <Flex w='100%' justifyContent='space-between' pr={5} pl={5} >
          <Text>{`Total MCQs`} </Text>
          <Text>{totalQuestions}</Text>
        </Flex>
        <Flex borderRadius={4} pt={2} pb={2} bg={answeredQuestions === totalQuestions ? '#D3F3D2' : '#FFFFFF'} w='100%' justifyContent='space-between' pr={5} pl={5}>
          <Text>{`You have answerd`}</Text>
          <Text>{answeredQuestions}</Text>
        </Flex>
        <Flex bg='#FDE6E6' borderRadius={4} pt={2} pb={2} display={missedQuestions ? 'flex' : 'none'} w='100%' justifyContent='space-between' pr={5} pl={5}>
          <Text>{`You have missed`}</Text>
          <Text>{missedQuestions}</Text>
        </Flex>
      </Box>
    </Box>
  );
  const footer = (
    <Flex mb={3} mr={3}>
      <Button onClick={handleSubmit} color='#444444' fontStyle='Roboto'>Submit</Button>
    </Flex>
  );

  const onNext = () => {
    console.log(trace);
    if (trace < queue.length - 1) {
      dispatch(moveNextQuestion());
    }
  };

  const onPrev = () => {
    console.log("on prev");
    if (trace > 0) {
      dispatch(movePrevQuestion());
    }
  };

  return (
    <>
      <Flex mt={3} w='100%' justifyContent="space-around">
        {trace ? (
          <Flex
            color="#444444"
            fontWeight="medium"
            borderRadius={6}
            justifyContent="center"
            alignItems="center"
            h={12}
            w={120}
            bg="#E9E9E9"
            cursor="pointer"
            onClick={onPrev}
          >
            <Text>Prev</Text>
          </Flex>
        ) : (
          <Flex></Flex>
        )}
        <Flex
          bg="#0074D9"
          color="#FFFFFF"
          fontWeight="medium"
          borderRadius={6}
          justifyContent="center"
          alignItems="center"
          h={12}
          w={120}
          cursor="pointer"
          onClick={trace === queue.length - 1 ? handleOpenModal : onNext}
        >
          <Text>{trace === queue.length - 1 ? "Submit" : "Next"}</Text>
        </Flex>
      </Flex>
      <ModalLayout
        title="Submit quiz!"
        body={body}
        footer={footer}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default QuizFooter;
