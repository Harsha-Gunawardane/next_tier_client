import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { AiTwotoneTrophy } from "react-icons/ai";

function ResultCard() {
  return (
    <Box
      border="1px solid #EDEDED"
      borderRadius={8}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
      p={5}
      pt={2}
      mb={5}
    >
      <Flex
        w="100%"
        h={14}
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Text fontSize={22} color="#666666" fontWeight="semibold">
          # Quiz 22
        </Text>
        <AiTwotoneTrophy size={40} color="#15BD66" />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
      >
        <CircularProgress
          display="flex"
          alignItems="center"
          thickness={12}
          value={62}
          color="#15BD66"
        >
          <CircularProgressLabel>62%</CircularProgressLabel>
        </CircularProgress>
        <Box>
          <Flex>
            <Text fontSize={13}>Date : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              23-07-2023
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={13}>Time : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              13.00 - 14.00
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={13}>Spent time : </Text>
            <Text fontSize={12} color="#666666" ml={2}>
              16min
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default ResultCard;
