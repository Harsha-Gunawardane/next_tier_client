import React from "react";
import { Box, Text } from "@chakra-ui/react";

function FilterTab({ bg, color, onclickHandler, value }) {
  return (
    <Box
      cursor="pointer"
      w="max-content"
      pl={5}
      pr={5}
      mr={3}
      h={9}
      key={value}
      borderRadius={25}
      display="flex"
      alignItems="center"
      bg={bg}
      color={color}
      onClick={() => onclickHandler(value)}
    >
      <Text letterSpacing={0.5} fontSize={13} fontStyle="Roboto">
        {value}
      </Text>
    </Box>
  );
}

export default FilterTab;
