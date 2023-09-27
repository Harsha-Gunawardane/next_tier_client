import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import TutorCard from "./cards/TutorCard";

function TutorList({ tutors }) {

    const { minimized } = useOutletContext();
    useEffect(() => {
        console.log(minimized);
    }, []);

    return (
        <Box w={"100%"}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={8}>
                {tutors.map((tutor) => {
                    return (
                        <GridItem colSpan={1}>
                            <TutorCard tutor={tutor} />
                        </GridItem>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}

export default TutorList;
