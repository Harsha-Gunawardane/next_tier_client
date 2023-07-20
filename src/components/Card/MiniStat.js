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
		<Card py="15px" h="120px">
			<Flex my="auto" h="100%" align={{ base: "center", xl: "center" }} justifyContent={{ base: "center", xl: "center" }} pt="0">
				{startContent}
				<Flex h="100%" w="100%" direction={"column"}>
					<Text
						lineHeight="100%"
						color={textColorSecondary}
						fontSize={{
							base: "0.9rem",
						}}
						fontWeight={"bold"}>
						{name}
					</Text>
					<Flex h="100%" alignItems="center" justifyContent="center">
						<Flex>
							<Text
								color={textColor}
								fontSize={{
									base: "3rem",
									lg: "3rem",
								}}
								fontWeight={"semi-bold"}
							>
								{value}
							</Text>
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
						</Flex>
						<Flex ms="auto" w="max-content" h="100%" justifyContent={{ base: "center", xl: "center" }} alignItems={"center"}>
							{endContent}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}


