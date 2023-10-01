// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/Card/Card";
import React from "react";
// Assets
import dateText from "../../../../utils/dateText";

export default function AnnouncementCard(props) {
    const { title, time, date, color, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("gray.900", "white");
    const textColorSecondary = "gray.600";
    const bg = useColorModeValue(color + "white", "navy.700");
    const bgLine = useColorModeValue(color + ".300", "gray.700");
    return (
        <Card bgColor={bg} w="100%" p="5px" {...rest} >
            <Flex gap="8px" h={"min-content"}>
                <Box h={"100%"} borderRadius={"10px"} w="5px" bg={bgLine} overflow={"hidden"}>
                    <Flex borderRadius={"10px"} w="5px" bg={bgLine} h={"60px"} ></Flex>
                </Box>
                <Flex align="center" direction={{ base: "column", md: "row" }} width={"full"} h={"max-content"}>
                    <Flex direction={"column"} py="10px" width={"full"}>
                        <Text color={textColorPrimary} fontWeight="semi-bold" fontSize="14px">
                            {title}
                        </Text>
                        <Flex direction={"row"} alignItems="center" justifyContent={"space-between"} w="100%" pr={"10px"}>
                            <Text fontWeight="500" color={textColorSecondary} fontSize="12px" >
                                {dateText(date)}
                            </Text>
                            <Text fontWeight="500" color={textColorSecondary} fontSize="12px" >
                                {time}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
