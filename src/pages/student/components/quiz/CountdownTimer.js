import React, { useState, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

function CountdownTimer({time}) {
  const initialTimeInSeconds = time; // 2 hours in seconds
  const [timeRemaining, setTimeRemaining] = useState(
    // Use local storage value if available, or use the initial value
    () => parseInt(localStorage.getItem("timeRemaining")) || initialTimeInSeconds
  );

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
      bg={timeRemaining < 30 ? '#FDE6E6' : '#D3F3D2'}
      ml="10%"
      mr="10%"
      h={14}
      borderRadius={5}
    >
      <Box
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        color={timeRemaining < 30 ? '#EF7373' : '#15BD66'}
      >
        {formatTime(timeRemaining)}
      </Box>
    </Flex>
  );
}

export default CountdownTimer;
