import { Box, Text, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import FeedbackFilters from "./FeedbackFilters";
import Feedback from "./Feedback";
import { useFeedback } from "../../../store/admin/useFeedback";
import timesAgo from "../../../utils/timesAgo";

const FEEDBACK_URL = "/user/sys/feedback";

function FeedbackArea() {
  const axiosPrivate = useAxiosPrivate();
  const { allFeedbacks, newFeedbacks, inActionFeedbacks, setAllFeedbacks } =
    useFeedback();

  const [feedbacks, setFeedbacks] = useState(newFeedbacks || []);
  const [filter, setFilter] = useState("New");

  const getAllFeedbacks = async () => {
    try {
      const response = await axiosPrivate.get(FEEDBACK_URL);
      setAllFeedbacks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  useEffect(() => {
    switch (filter) {
      case "New":
        setFeedbacks(newFeedbacks);
        break;
      case "All":
        setFeedbacks(allFeedbacks);
        break;
      case "In Action":
        setFeedbacks(inActionFeedbacks);
        break;
      default:
        break;
    }
  }, [allFeedbacks, filter, inActionFeedbacks, newFeedbacks]);

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
        <FeedbackFilters setFilter={setFilter} />
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
            {feedbacks.length ? (
              feedbacks.map((feedback, index) => {

                return (
                  <Feedback
                    key={index}
                    name={feedback.name}
                    message={feedback.message}
                    role={feedback.role}
                    timesAgo={timesAgo(feedback.posted_at)}
                    status={feedback.status}
                    id={feedback.id}
                    owner_id={feedback.user_id}
                  />
                );
              })
            ) : (
              <Text fontSize={14}>No feedbacks yet!!</Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default FeedbackArea;
