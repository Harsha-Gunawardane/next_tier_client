import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
// import { useOutletContext } from 'react-router-dom';

import RecentTutes from "./RecentTutes";
import ScratchPad from "./ScratchPad";
import ScheduleTute from "./ScheduleTute";
import QuoteCard from "./QuoteCard";

function TuteDashboard() {
  // const [minimizeButtonRef] = useOutletContext();


  // useEffect(() => {
  //   minimizeButtonRef.current.click();
  // }, [])

  return (
    <Box h={"calc(100vh - 65px)"}>
      <Text
        fontSize={20}
        fontWeight="bold"
        color={"#444444"}
        fontStyle="Roboto"
        ml={5}
        mt={4}
        mb={1}
      >
        Tute Dashboard
      </Text>
      <Flex gap={6} mb={5}>
        <QuoteCard />
        <ScheduleTute />
      </Flex>
      <Flex gap={6}>
        <RecentTutes />
        <ScratchPad />
      </Flex>

    </Box>
  );
}

export default TuteDashboard;
