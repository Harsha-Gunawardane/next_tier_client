import React from "react";
import { Flex, Spacer, Box, Heading, Button, ButtonGroup } from "@chakra-ui/react";

function AuthHeader({message, url, action}) {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">Chakra App</Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <Button colorScheme="teal">Sign Up</Button>
        <Button colorScheme="teal">Log in</Button>
      </ButtonGroup>
    </Flex>
  );
}

export default AuthHeader;
