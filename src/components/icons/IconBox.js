import React from "react";
import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

export default function IconBox(props) {
	const { children, ...rest } = props;

	return (
		<Flex alignItems={"center"} justifyContent={"center"} {...rest}>
			{children}
		</Flex>
	);
}
