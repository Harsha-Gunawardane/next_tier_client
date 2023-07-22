import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function Card({ title, value, color, icon, iconbg, mr }) {
  return (
    <Box
      mr={mr}
      h={110}
      w={200}
      border="1px solid #EDEDED"
      borderRadius={5}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
    >
      <Flex mt={4} ml={5} justifyContent="left">
        <Text fontSize={13} color="#555555" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Flex mt={1} mr={5} ml={8} h={16} justifyContent="space-between">
        <Text mt={1} fontSize={36} fontWeight='semibold' color={color}>
          {value}
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          w={16}
          h={16}
          borderRadius="50%"
          bg={iconbg}
        >
          {icon}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Card;
