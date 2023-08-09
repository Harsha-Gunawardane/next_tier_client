import { Button, Flex, Box, Text } from "@chakra-ui/react";

function LeftPanelTab({ icon, title, onClickHandler }) {

  return (
    <Button
      w={220}
      bg={"#FFFFFF"}
      _hover={{ bg: "#FFFFFF" }}
      h={8}
      onClick={onClickHandler}
    >
      <Flex gap={5} alignItems="center" justifyContent="left" w="70%">
        <Box>{icon}</Box>
        <Text fontWeight="normal" color="#444444" fontSize={14}>
          {title}
        </Text>
      </Flex>
    </Button>
  );
}

export default LeftPanelTab;
