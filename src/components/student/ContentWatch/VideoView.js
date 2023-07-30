import React, { useState } from 'react';
import { Flex, AspectRatio, Text, Avatar, Box, Button, Collapse, Divider, useDisclosure } from '@chakra-ui/react';
import generateTimeAgoString from '../../../utils/timesAgo';
import LikeDislike from './LikeDislike';

import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import CommentSection from './CommentSection';





const VideoView = (props) => {

    const { videoDetails, ...rest } = props;

    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });



    return (
        <Flex width={"100%"} height={"max-content"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
            <AspectRatio minW="100%" ratio={16 / 9} overflow={"hidden"}>
                {/* <iframe
                    title="naruto"
                    src="https://www.youtube.com/embed/QhBnZ6NPOY0"
                    allowFullScreen
                /> */}
                <Player
                    src={[
                        {
                            quality: "Full HD",
                            url:
                                "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/1080.mp4",
                        },
                        {
                            quality: 720,
                            url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/720.mp4",
                        },
                        {
                            quality: 480,
                            url: "https://cdn.glitch.me/cbf2cfb4-aa52-4a1f-a73c-461eef3d38e8/480.mp4",
                        },
                    ]}
                    subtitles={[
                        {
                            lang: "en",
                            language: "English",
                            url:
                                "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/en.vtt",
                        },
                        {
                            lang: "fr",
                            language: "French",
                            url:
                                "https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/fr.vtt",
                        },
                    ]}
                    poster="https://cdn.jsdelivr.net/gh/naptestdev/video-examples@master/poster.png"

                    keyboardShortcut={{
                        pause: false,
                        forward: false,
                        rewind: false,
                        fullScreen: false,
                        mute: false,
                        subtitle: false,
                    }}
                />
            </AspectRatio>
            <Flex w={"100%"} mt="5px" px="5px" color={"#3f3f3f"}>
                <Text w={"100%"} fontSize={22} fontWeight={"bold"}>{videoDetails.title}</Text>
            </Flex>
            <Flex w={"100%"} px="5px" justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={16} fontWeight={"semi-bold"} color={"gray.400"}>
                    {videoDetails.views} Views • {generateTimeAgoString(videoDetails.uploadDate)}
                </Text>
                <Flex justifyContent={"flex-end"} alignItems={"center"} gap={"10px"} likes={videoDetails.reactions.likes} dislikes={videoDetails.reactions.dislikes} liked={videoDetails.liked} >
                    <LikeDislike h="40px" w="40px" />
                </Flex>
            </Flex>
            <Flex w={"100%"} direction='column' p={"10px"} bg="gray.100" mt="5px" borderRadius={"10px"}>
                <Flex w={"100%"} px="5px" justifyContent={"space-between"} alignItems={"center"}>
                    <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"10px"} direction={"row"}>
                        <Avatar h="48px" w="48px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Flex alignItems={"flex-start"} justifyContent={"center"} direction={"column"}>
                            <Text fontSize={16} fontWeight={"bold"} color={"#3f3f3f"}>
                                Samitha Rathnayake
                            </Text>
                            <Text fontSize={12} fontWeight={"semi-bold"} color={"gray.600"}>
                                BSc. in Physics
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={"flex-end"} alignItems={"center"} gap={"10px"}>
                        <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm">
                            Follow
                        </Button>
                    </Flex>
                </Flex>
                <Divider mt={"10px"} mb={"10px"} />
                <Flex w={"100%"} px="5px" h="auto" justifyContent={"space-between"} alignItems={"center"} direction={"column"}>
                    <Collapse startingHeight={80} in={isOpen}>
                        <Text w={"100%"} fontSize={16} fontWeight={"semi-bold"}>{videoDetails.description}</Text>
                    </Collapse>
                    <Button variant={"link"} color={"gray.400"} fontWeight={"semi-bold"} fontSize={16} size="sm" onClick={() => { onToggle() }} _hover={{ color: "gray.600" }} >
                        Show {isOpen ? "Less" : "More"}
                    </Button>
                </Flex>
            </Flex>
            <Divider my="10px" />
            <CommentSection comments={videoDetails.comments} />

        </Flex>
    )

}

export default VideoView;


