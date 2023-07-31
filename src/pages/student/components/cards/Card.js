import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

function Card({
  title,
  value,
  color,
  icon,
  iconbg,
  mr,
  size = 36,
  display = "block",
}) {
  return (
    <Box
      display={display}
      mr={mr}
      h={110}
      w={{
        base: "150px",
        sm: "175px",
        md: "180px",
        lg: "200px",
        xl: "200px",
      }}
      border="1px solid #EDEDED"
      borderRadius={5}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
    >
      <Flex mt={4} ml={5} justifyContent="left">
        <Text fontSize={13} color="#555555" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Flex
        mt={1}
        mr={5}
        ml={8}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text mt={1} fontSize={size} fontWeight="semibold" color={color}>
          {value}
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          w={{
            base: 12,
            sm: 16,
            md: 16,
            lg: 16,
            xl: 16,
          }}
          h={{
            base: 12,
            sm: 16,
            md: 16,
            lg: 16,
            xl: 16,
          }}
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
