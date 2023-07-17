// Chakra imports
// Chakra imports
import { Flex, Stat, StatLabel, StatNumber, useColorModeValue, Text } from "@chakra-ui/react";
// Custom components
import Card from "./Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
	const { startContent, endContent, name, growth, value } = props;
	const textColor = useColorModeValue("#333", "white");
	const textColorSecondary = "gray.600";

	return (
		<Card py="15px" h="100px">
			<Flex my="auto" h="100%" align={{ base: "center", xl: "center" }} justifyContent={{ base: "center", xl: "center" }} pt="0">
				{startContent}
				<Flex h="100%" alignItems="flex-start">
					<Stat my="auto" ms={startContent ? "18px" : "0px"}>
						<StatLabel
							lineHeight="100%"
							color={textColorSecondary}
							fontSize={{
								base: "0.9rem",
							}}
							fontWeight={"bold"}>
							{name}
						</StatLabel>
						<StatNumber
							color={textColor}
							fontSize={{
								base: "2xl",
								lg: "4xl",
							}}
							fontWeight={"semi-bold"}
						>
							{value}
						</StatNumber>
						{growth ? (
							<Flex align="center">
								<Text color="green.500" fontSize="xs" fontWeight="700" me="5px">
									{growth}
								</Text>
								<Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
									since last month
								</Text>
							</Flex>
						) : null}
					</Stat>
				</Flex>
				<Flex ms="auto" w="max-content" h="100%" justifyContent={{ base: "center", xl: "center" }} alignItems={"center"}>
					{endContent}
				</Flex>
			</Flex>
		</Card>
	);
}
