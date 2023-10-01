import { Flex, Text } from "@chakra-ui/react";
import React from "react";

function Archivement({archivement, val1, val2, val3}) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      pl={10}
      pr={10}
    >
      <Text fontSize={14} fontWeight={"semibold"} color={"#333"}>
        {archivement}
      </Text>
      <Flex>
        <Flex alignItems={"center"} borderRadius={3} bg={"#F4CD95"} m={1}>
          <Text pl={1} pr={1} pt={0.5} pb={0.5} fontSize={13} color={"#555"}>
            {val1}
          </Text>
        </Flex>
        <Flex alignItems={"center"} borderRadius={3} bg={"#89C4FF"} m={1}>
          <Text pl={1} pr={1} pt={0.5} pb={0.5} fontSize={13} color={"#555"}>
            {val2}
          </Text>
        </Flex>
        <Flex alignItems={"center"} borderRadius={3} bg={"#FFDDDD"} m={1}>
          <Text pl={1} pr={1} pt={0.5} pb={0.5} fontSize={13} color={"#555"}>
            {val3}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Archivement;
