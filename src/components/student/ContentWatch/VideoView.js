import React, { useEffect, useState } from 'react';
import { Flex, AspectRatio, Text, Avatar, Skeleton, Button, Collapse, Divider, useDisclosure } from '@chakra-ui/react';
import generateTimeAgoString from '../../../utils/timesAgo';
import LikeDislike from "./LikeDislike";

import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { Spoiler } from '@mantine/core';

import VideoJS from './VideoPlayer'
import videojs from 'video.js'
import ReactVideoPlayer from './ReactVideoPlayer';




const VideoView = (props) => {

    const { videoDetails, isLoaded, ...rest } = props;

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

    useEffect(() => {
        console.log(videoDetails);
    }, [])


    const playerRef = React.useRef(null);


    const videoUrl = "https://storage.googleapis.com/hls-streaming-gcp-processed-files-fluted-clock-395620/sample.mp4/manifest.m3u8"

    return (
        <Flex width={"100%"} height={"max-content"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
            <AspectRatio minW="100%" w="100%" ratio={16 / 9} overflow={"hidden"} position={"relative"} borderRadius={"10px"}>
                <ReactVideoPlayer videoUrl={videoUrl} />
            </AspectRatio>

            <Flex w={"100%"} mt="5px" px="5px" color={"#3f3f3f"}>
                <Text w={"100%"} fontSize={"1.2rem"} fontWeight={"bold"}>{videoDetails.title}</Text>
            </Flex>
            <Flex w={"100%"} px="5px" justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"}>
                    {videoDetails.views ? videoDetails.view : "No Views Yet"} • {generateTimeAgoString(videoDetails.uploadDate)}
                </Text>
                <Flex justifyContent={"flex-end"} alignItems={"center"} gap={"10px"} likes={videoDetails.reactions.likes} dislikes={videoDetails.reactions.dislikes} liked={videoDetails.liked} >
                    <LikeDislike
                        h="32px"
                        w="40px"
                        liked={videoDetails.liked}
                        likeCount={videoDetails.likes}
                        type={"content"}
                        refid={videoDetails.id}
                    />
                </Flex>
            </Flex>
            <Flex w={"100%"} direction='column' p={"10px"} bg="gray.100" mt="5px" borderRadius={"10px"}>
                <Flex w={"100%"} px="5px" justifyContent={"space-between"} alignItems={"center"}>
                    <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"10px"} direction={"row"}>
                        <Avatar h="48px" w="48px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Flex alignItems={"flex-start"} justifyContent={"center"} direction={"column"}>
                            <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3f3f3f"}>
                                {videoDetails.uploader.first_name} {videoDetails.uploader.last_name}
                            </Text>
                            <Text fontSize={12} fontWeight={"semi-bold"} color={"gray.600"}>
                                BSc. in Physics
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={"flex-end"} alignItems={"center"} gap={"10px"}>
                        <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={"0.9rem"} size="sm">
                            Follow
                        </Button>
                    </Flex>
                </Flex>
                <Divider mt={"10px"} mb={"10px"} color={"gray.100"} />
                <Flex w={"100%"} px="10px" h="auto" justifyContent={"space-between"} alignItems={"flex-start"} direction={"column"}>
                    {/* <Collapse in={isOpen} startingHeight={20}>
                        <Text w={"100%"} fontSize={"1rem"} fontWeight={"semi-bold"}>{videoDetails.description}</Text>
                    </Collapse>
                    <Button variant={"link"} color={"gray.400"} fontWeight={"semi-bold"} fontSize={"0.9rem"} size="sm" onClick={() => { onToggle() }} _hover={{ color: "gray.600" }} >
                        Show {isOpen ? "Less" : "More"}
                    </Button> */}
                    <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                        <Text w={"100%"} fontSize={"1rem"} fontWeight={"semi-bold"}>{videoDetails.description}</Text>
                    </Spoiler>
                </Flex>
            </Flex>
            <Divider my="10px" />
            {/* </Skeleton> */}

            {/* <CommentSection comments={videoDetails.comments} /> */}

        </Flex>
    )

}

export default VideoView;


