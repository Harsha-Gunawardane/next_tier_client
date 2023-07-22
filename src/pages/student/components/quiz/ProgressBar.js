import { Box, Text, Flex } from "@chakra-ui/react";
import { Progress } from "@mantine/core";
import { AiOutlineCaretDown } from "react-icons/ai";

function ProgressBar({ color, width, value }) {

  let valueWidth = value + 3;
  valueWidth = valueWidth + "%";

  return (
    <Box ml={2} width={width}>
      <Flex width={valueWidth} justifyContent="right">
        <Box>
          <Text
            borderRadius={4}
            bg={color}
            color="#FFFFFF"
            pl={2}
            pr={2}
            pt={1}
            pb={1}
            fontSize="14px"
            fontWeight="medium"
          >
            {value}%
          </Text>
          <Flex justifyContent="center">
            <AiOutlineCaretDown color={color} />
          </Flex>
        </Box>
      </Flex>
      <Progress color={color} value={value} size="lg" radius="xl" />
    </Box>
  );
}

export default ProgressBar;
