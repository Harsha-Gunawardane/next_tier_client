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
    <Flex minWidth="max-content" h={90} alignItems="center">
      <Box pl={6}>
        <Image src={Logo} maxH={40} maxW={160} alt="logo" />
      </Box>
      <Spacer />
      <Flex
        gap={3}
        minW="max-content"
        alignItems="center"
        pr={8}
        display={{
          base: "none",
          sm: "flex",
          md: "flex",
          lg: "flex",
          xl: "flex",
        }}
      >
        <Text fontSize="14px" fontWeight="medium" color="#555555">
          {message}
        </Text>
        <Link to={url}>
          <Button
            w={85}
            h={35}
            bg="#0074D9"
            color="#ffffff"
            _hover={{ color: "#0074D9", bg: "white" }}
            fontSize={14}
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
