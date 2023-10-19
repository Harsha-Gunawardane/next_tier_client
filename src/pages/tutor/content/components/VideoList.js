import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import VideoCard from "./VideoCard";

function VideoList({ videos }) {

    const { minimized } = useOutletContext();
    useEffect(() => {
        console.log(minimized);
    }, []);

    return (
        <Box w={"100%"}>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={8}>
                {videos.map((video) => {
                    return (
                        <GridItem colSpan={1}>
                            <VideoCard video={video} />
                        </GridItem>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
}

export default VideoList;