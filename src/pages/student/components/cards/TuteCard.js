import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

function TuteCard({ title, content, time, icon, bg }) {
  return (
    <Box
      h={300}
      w={48}
      p={2.5}
      shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={8}
      bg={bg}
      border={"1px solid #F2F2F2"}
    >
      <Text fontWeight={"bold"} fontSize={18} color={"#444444"} mb={1}>
        {title}
      </Text>

      <Box h={200} p={2}>
        <Text fontSize={14}>{content}</Text>
      </Box>
      <Flex gap={10} justifyContent={"space-around"} alignItems="center" mt={5}>
        <Text fontSize={13} color={"#666666"}>
          {time}
        </Text>
        {icon}
      </Flex>
    </Box>
  );
}

export default TuteCard;
