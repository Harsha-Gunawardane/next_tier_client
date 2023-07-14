import React from "react";
import { Flex } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

export default function IconBox(props) {
	const { icon: iconComponent, ...rest } = props;

	return (
		<Flex alignItems={"center"} justifyContent={"center"} borderRadius={"50%"} {...rest}>
			<Icon fontSize="24" as={iconComponent} />
		</Flex>
	);
}
