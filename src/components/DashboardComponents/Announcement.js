// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "../Card/Card";
import React from "react";
// Assets
import dateText from "../../utils/dateText";

export default function Announcement(props) {
    const { title, startTime, endTime, date, location, color, ...rest } = props;
    // Chakra Color Mode
    const textColorPrimary = useColorModeValue("gray.900", "white");
    const textColorSecondary = "gray.600";
    const bg = useColorModeValue("white", "white");
    const bgLine = useColorModeValue(color + ".300", "gray.700");
    return (
        <Card bgColor={bg} w="100%" p="5px" {...rest} >
            <Flex gap="8px">
                <Flex mb={{ base: "0px", "2xl": "20px" }} borderRadius={"10px"} w="5px" bg={bgLine} h={"100%"} ></Flex>
                <Flex align="center" direction={{ base: "column", md: "row" }} width={"full"}>
                    <Flex direction={"column"} py="10px" width={"full"}>
                        <Flex direction={"row"} alignItems="center" justifyContent={"space-between"} w="100%" pr={"10px"}>
                            <Text fontWeight="500" color={textColorSecondary} fontSize="12px" >
                                {startTime + " - " + endTime}
                            </Text>
                            <Text fontWeight="500" color={textColorSecondary} fontSize="12px" >
                                {dateText(date)}
                            </Text>
                        </Flex>
                        <Text color={textColorPrimary} fontWeight="semi-bold" fontSize="14px">
                            {title}
                        </Text>
                        <Text fontWeight="500" color={textColorSecondary} fontSize="12px" me="4px">
                            {location}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}
