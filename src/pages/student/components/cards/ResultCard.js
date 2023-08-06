import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { AiTwotoneTrophy } from "react-icons/ai";

function ResultCard({mark, quizname, dateDetails}) {
  const color = mark < 35 ? '#D93400' : mark < 65 ? '#FFD466' : '#15BD66'
  
  return (
    <Box
      border="1px solid #DDDDDD"
      borderRadius={8}
      boxShadow="rgba(0, 0, 0, 0.2) 0px 4px 10px;"
      bg='#FFFFFF'
      p={5}
      pt={2}
      w='100%'
    >
      <Flex
        w='100%'
        h={14}
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Text fontSize={22} color="#666666" fontWeight="semibold">
          {quizname}
        </Text>
        <AiTwotoneTrophy size={40} color={color} />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
      >
        <CircularProgress
          display="flex"
          alignItems="center"
          thickness={12}
          value={mark}
          color={color}
        >
          <CircularProgressLabel>{mark}%</CircularProgressLabel>
        </CircularProgress>
        <Box>
          <Flex>
            <Text fontSize={13}>Date : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              {dateDetails.date}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={13}>Time : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              {dateDetails.timeRange}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={13}>Spent time : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              {dateDetails.spentTime}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ResultCard;
