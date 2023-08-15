import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import FeedbackFilters from "./FeedbackFilters";
import Feedback from "./Feedback";

function FeedbackArea() {
  return (
    <Box mt={6}>
      <Text
        fontWeight={"semibold"}
        fontStyle={"Roboto"}
        fontSize={20}
        color={"#444444"}
        ml={2}
      >
        Feedbacks
      </Text>
      <Box mt={4}>
        <FeedbackFilters />
        <Flex
          w={360}
          mt={2}
          justifyContent={"center"}
          style={
            {
              // boxShadow: "rgba(0, 0, 0, 0.24) 0.5px 1px 5px",
            }
          }
          border={"1px solid #E2E2E2"}
          borderTop={"none"}
          pt={3}
          pb={3}
          borderRadius={8}
        >
          <Box w={"90%"}>
            <Feedback />
            <Feedback />
            <Feedback />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default FeedbackArea;
