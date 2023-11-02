import { Flex, Text } from "@chakra-ui/react";
import Card from "../Card/Card";
import AnnouncementList from "./AnnouncementList";

const Announcements = (props) => {
    const { ...rest } = props;

    // <Event time={event.time} link={event.link} title={event.title} location={event.location}

    const eventList = [

    ];

    return (
        <Card h={{ base: "680px", md: "340px", lg: "340px" }} p="5px" {...rest} >
            <Flex h={"100%"} direction={{ base: "column", md: "row", lg: "row" }} >
                <Flex w={{ base: "100%", lg: "100%" }} overflow={"hidden"} direction={"column"}>
                    <AnnouncementList events={eventList} />
                </Flex>
            </Flex>
        </Card>
    );
};

export default Announcements;
