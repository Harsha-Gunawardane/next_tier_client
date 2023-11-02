// Chakra imports
import { Flex, Image, Text } from "@chakra-ui/react";

// Custom components
import React from "react";
import Announcement from "./Announcement.js";
import AnnouncementImg from "../../assests/images/Announcement.png";
import _ from "lodash";

export default function AnnouncementList(props) {
    const { events } = props;

    const colorList = ["red"];

    return (
        <Flex direction={"column"} mb={{ base: "0px", "2xl": "20px" }} gap="5px" w="100%" h={"100%"} p="10px" overflowY={"scroll"}>
            {!_.isEmpty(events)
                ? events.map((event, index) => {
                    // console.log(event);
                    return <Announcement key={index} startTime={event.startTime} endTime={event.endTime} date={event.date} title={event.title} location={event.location} color={"red"} />
                })

                :

                <Flex justifyContent="center" alignItems="center" w="100%" h="100%" direction="column" >
                    <Image src={AnnouncementImg} alt="Announcement" w={"60%"} />
                    <Text textAlign="center" color="gray.500" fontWeight="500" fontSize="14px" mt="10px">
                        No Announcements Yet!
                    </Text>
                </Flex>

            }
        </Flex>
    );
}
