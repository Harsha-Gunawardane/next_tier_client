import React from "react";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  ButtonGroup,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Logo from "../../assests/images/logo.png";

function AuthHeader({ message, url, action }) {
  return (
    <Flex minWidth="max-content" h={120} alignItems="center" gap="2">
      <Box pl={8}>
        <Image src={Logo} maxH={70} maxW={200} alt="logo" />
      </Box>
      <Spacer />
      <Flex gap="4" minW="max-content" alignItems="center" pr={10}>
        <Text fontSize="19px" fontWeight="medium" color="#555555">
          {message}
        </Text>
        <Link to={url}>
          <Button
            w={120}
            bg="#0074D9"
            color="#ffffff"
            _hover={{ color: "#0074D9", bg: "white" }}
            fontSize={18}
            borderRadius={6}
            fontWeight={"medium"}
          >
            {action}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default AuthHeader;
