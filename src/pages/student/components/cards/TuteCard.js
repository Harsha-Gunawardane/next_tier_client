import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function TuteCard({ id, title, content, time, icon, bg }) {
  const navigate = useNavigate();

  return (
    <Box
      mr={8}
      p={6}
      shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={8}
      bg={bg}
      border={"1px solid #F2F2F2"}
      onClick={() => navigate(`/stu/tutes/view/${id}`)}
      cursor={"pointer"}
    >
      <Text fontWeight={"bold"} fontSize={18} color={"#444444"} mb={1}>
        {title}
      </Text>

      <Box h={200} p={2}>
        <Text fontSize={14}>{content}</Text>
      </Box>
      <Flex
        gap={10}
        justifyContent={"space-between"}
        alignItems="center"
        mt={5}
      >
        <Text fontSize={13} color={"#666666"}>
          {time}
        </Text>
        {icon}
      </Flex>
    </Box>
  );
}

export default TuteCard;
