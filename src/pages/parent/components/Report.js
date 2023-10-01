import {
  Box,
  Flex,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

import Profile from "../../../assests/images/profile.jpg";
import PreviousQuizCard from "../../student/components/cards/PreviousQuizCard";
import GradeAnalysis from "../../../components/DashboardComponents/GradeAnalysis";
import QuizAnalysisChart from "./QuizAnalysisChart";

function Report() {
  const headingStyle = {
    fontSize: "14px",
    color: "#555",
  };

  return (
    <Box w={"100%"} pl={5} pr={5} pt={8}>
      <Flex mb={5} justifyContent={"center"}>
        <Text
          fontSize={18}
          fontFamily={"Roboto"}
          fontWeight={"semibold"}
          color={"#333"}
        >
          Student Report
        </Text>
      </Flex>
      <Flex gap={8}>
        <Box w={"55%"}>
          <Text m={4} style={headingStyle} fontWeight={"semibold"}>
            Overview
          </Text>
          <Flex gap={3} ml={10} alignItems={"center"}>
            <Image
              src={Profile}
              w={54}
              h={54}
              objectFit={"cover"}
              borderRadius={"50%"}
            />
            <Box>
              <Text fontSize={16} fontWeight={"semibold"} color={"#444444"}>
                Harsha Gunawardane
              </Text>
              <Text fontSize={12} color={"#555555"}>
                Physical stream
              </Text>
            </Box>
          </Flex>

          <Text m={4} style={headingStyle} fontWeight={"semibold"}>
            Average performance
          </Text>
          <Box ml={10}>
            <Flex>
              <PreviousQuizCard
                value={52}
                color={"#FFD466"}
                quizname={"Physics"}
              />
            </Flex>
            <Flex>
              <PreviousQuizCard
                value={78}
                color={"#15BD66"}
                quizname={"Chemistry"}
              />
            </Flex>
            <Flex>
              <PreviousQuizCard
                value={32}
                color={"#D93400"}
                quizname={"Mathematics"}
              />
            </Flex>
          </Box>
          <Text m={4} style={headingStyle} fontWeight={"semibold"}>
            Performance Analysis
          </Text>
          <GradeAnalysis />
        </Box>
        <Box w={"40%"}>
          <Text m={4} style={headingStyle} fontWeight={"semibold"}>
            Archivements
          </Text>
          <Box>
            <QuizAnalysisChart />
          </Box>
          <Text m={4} style={headingStyle} fontWeight={"semibold"}>
            Weak areas
          </Text>
          <Box ml={8}>
            <Flex gap={5} mb={4}>
              <Text fontSize={14} w={36}>
                Physics
              </Text>
              <UnorderedList>
                <ListItem fontSize={13}>Electronics</ListItem>
                <ListItem fontSize={13}>Power</ListItem>
              </UnorderedList>
            </Flex>
            <Flex gap={5} mb={4}>
              <Text fontSize={14} w={36} mt={3}>
                Chemistry
              </Text>
              <UnorderedList>
                <ListItem fontSize={13}>Organic Chemistry</ListItem>
              </UnorderedList>
            </Flex>
            <Flex gap={5} mb={4}>
              <Text fontSize={14} w={36} mt={3}>
                Mathematics
              </Text>
              <UnorderedList>
                <ListItem fontSize={13}>Statistics</ListItem>
                <ListItem fontSize={13}>Derivation</ListItem>
              </UnorderedList>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Report;
