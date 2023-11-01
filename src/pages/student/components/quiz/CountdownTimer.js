import React, { useState, useEffect } from "react";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { resetQuiz } from "../../../../hooks/reduxReducers/fetchQuestions";
const STUDENT_QUIZ_DONE_URL = "/stu/quiz";

function CountdownTimer({ time }) {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const initialTimeInSeconds = time; // 2 hours in seconds
  const [timeRemaining, setTimeRemaining] = useState(
    // Use local storage value if available, or use the initial value
    () =>
      parseInt(localStorage.getItem("timeRemaining")) || initialTimeInSeconds
  );

  const { mcqName, subject } = useSelector((state) => state.questions);
  const { result } = useSelector((state) => state.result);

  const handleSubmit = async () => {
    let currentTime = new Date();
    currentTime = currentTime.toISOString();

    try {
      await axiosPrivate.patch(STUDENT_QUIZ_DONE_URL, {
        subject,
        quizName: mcqName,
        result,
        startTime: localStorage.getItem("startTime"),
        endTime: currentTime,
      });

      console.log(localStorage.getItem("startTime"));
      localStorage.removeItem("startTime");
      dispatch(resetQuiz());

      toast({
        title: "Quiz is timed out",
        description: "The time has passed. Try to finish early on next time",
        status: "warning",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      navigate(`/stu/quizzes/${subject}/${mcqName}/review`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Timer function to update time remaining every second
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0)); // Decrement the time by 1 second
    }, 1000);

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    // Save the remaining time to local storage whenever it changes
    localStorage.setItem("timeRemaining", timeRemaining.toString());

    if (timeRemaining < 1) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={timeRemaining < 30 ? "#FDE6E6" : "#D3F3D2"}
      ml="10%"
      mr="10%"
      h={14}
      borderRadius={5}
    >
      <Box
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        color={timeRemaining < 30 ? "#EF7373" : "#15BD66"}
      >
        {formatTime(timeRemaining)}
      </Box>
    </Flex>
  );
}

export default CountdownTimer;
