import React, { useEffect } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

import RecentTutes from "./RecentTutes";
import ScratchPad from "./ScratchPad";
import ScheduleTute from "./ScheduleTute";
import QuoteCard from "./QuoteCard";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useStarredTutes } from "../../../../store/student/useStarredTutes";
import { useArchivedTutes } from "../../../../store/student/useArchivedTutes";

const TUTE_URL = "/stu/tute";
function TuteDashboard() {
  const axiosPrivate = useAxiosPrivate();
  const { setStarredTutes } = useStarredTutes();
  const { setArchivedTutes } = useArchivedTutes();

  const getStarredTutes = async () => {
    try {
      const response = await axiosPrivate.get(`${TUTE_URL}/star`);
      console.log(response.data);
      setStarredTutes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getArchivedTutes = async () => {
    try {
      const response = await axiosPrivate.get(`${TUTE_URL}/archive`);
      console.log(response.data);
      setArchivedTutes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStarredTutes();
    getArchivedTutes();
  }, []);

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
        Tutes overview
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
