import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { AiOutlineHourglass } from "react-icons/ai";

function CardT({ title, value, color, icon }) {
  return (
    <Box
      mt={10}
      ml={10}
      h={110}
      w={200}
      border="1px solid #EEEEEE"
      borderRadius={5}
    >
      <Flex mt={4} ml={5} justifyContent="left">
        <Text fontSize={13} color="#555555" fontWeight="semibold">
          Average Mark
        </Text>
      </Flex>
      <Flex mt={1} mr={5} ml={8} h={16} justifyContent="space-between">
        <Text mt={1} fontSize={36} fontWeight="bold" color="#FFC83B">
          52
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          w={16}
          h={16}
          borderRadius="50%"
          bg="#FDF4E6"
        >
          <AiOutlineHourglass
            fontSize="30px"
            fontWeight="bold"
            color="#FFC83B"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardT;
