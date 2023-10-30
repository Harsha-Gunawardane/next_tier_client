import React, { useEffect, useState } from 'react'
import {
    Box,
    Text,
    HStack,
    Image,
    Button,
    AspectRatio,
    Flex,
    IconButton,
    VStack,
    StackDivider,

} from '@chakra-ui/react'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import _ from 'lodash';
import { Loader } from '@mantine/core';
import { is } from 'date-fns/locale';
import { initializeQuizById } from "../../../../hooks/reduxReducers/fetchQuestions";

//icons
import { IoPlay } from 'react-icons/io5';
import { HiDocumentText } from 'react-icons/hi';
import { HiOutlineDocumentMagnifyingGlass } from 'react-icons/hi2';
import { MdOndemandVideo, MdOutlineQuiz } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { BiSolidLockAlt } from 'react-icons/bi';
import { FcSurvey } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

const AccordionContentPanel = (props) => {

    const dispatch = useDispatch();
    const {
        studyPackId,
        contentIDs,
        isOpen,
        enrolled,
        purchased,
        studyPackType = false,
        studyPackContent,
        contentLoading

    } = props;

    const [content, setContent] = useState({});
    const [isContentLoading, setIsContentLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        if (isOpen && isContentLoading && !studyPackType) {
            fetchStudyPackContent(studyPackId);
        } else if (studyPackType) {
            setContent(studyPackContent);
            setIsContentLoading(contentLoading)
        }
    }, [isOpen]);



    const fetchStudyPackContent = async (studyPackId) => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/studypacks/${studyPackId}/content`, {
                signal: controller.signal
            });

            const data = response.data;
            console.log(data);

            if (isMounted) {
                setContent(data);
                setIsContentLoading(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleAttemtQuiz = (quizId) => {
        console.log(quizId);

        console.log("here");
        dispatch(initializeQuizById(quizId));


    }



    return (
        <VStack
            divider={<StackDivider borderColor='gray.200' my={"5px"} />}
            spacing={4}
            align='stretch'
        >
            <Flex w="100%" direction={"column"}>
                <HStack spacing={{ base: 220, xl: 300 }} >
                    <Box >
                        <Text fontSize="15px">Video Content</Text>
                    </Box>
                </HStack>
                {
                    // first check if contentIDs.video_id is not empty
                    contentIDs.video_id.length > 0 ?
                        //check if content is loaded
                        !isContentLoading ?
                            contentIDs.video_id.map((videoId, videoIndex) => {
                                return (
                                    <Flex
                                        bg="gray.100"
                                        p="10px"
                                        key={videoId}
                                        borderRadius="5px"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <Flex gap={2} alignItems={"center"}>
                                            <AspectRatio ratio={16 / 9} minW={"80px"} borderRadius={"5px"}>
                                                <Image
                                                    objectFit="cover"
                                                    src={content[videoId].thumbnail}
                                                />
                                            </AspectRatio>
                                            <Text
                                                fontSize="14px"
                                                className="box2"
                                            >
                                                {content[videoId].title}
                                            </Text>
                                        </Flex>

                                        <Flex alignItems={"center"} gap={2}>
                                            {enrolled && purchased === "Paid" ?
                                                <Button
                                                    borderRadius={"md"}
                                                    size={"sm"}
                                                    color={"white"}
                                                    bg={"blue.500"}
                                                    leftIcon={<IoPlay />}
                                                >
                                                    Play
                                                </Button> :
                                                <IconButton
                                                    variant={"ghost"}
                                                    borderRadius={"md"}
                                                    size={"md"}
                                                    icon={<BiSolidLockAlt />}
                                                >
                                                </IconButton>
                                            }
                                        </Flex>
                                    </Flex>
                                )
                            }) :
                            <Loader /> :
                        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} color={"gray.300"} bg={"gray.50"} borderRadius={"5px"} p="10px" gap={5}>
                            <MdOndemandVideo size={"26px"} />
                            <Text noOfLines={1} fontSize={"0.9rem"}>No Video Content Added</Text>
                        </Flex>

                }
            </Flex>

            <Flex w="100%" direction={'column'}>
                <HStack spacing={{ base: 220, xl: 300 }} >
                    <Box >
                        <Text fontSize="15px">Document Content</Text>
                    </Box>
                </HStack>

                {
                    // first check if contentIDs.video_id is not empty
                    contentIDs.tute_id.length > 0 ?
                        //check if content is loaded
                        !isContentLoading ?
                            contentIDs.tute_id.map((tuteId, videoIndex) => {
                                return (
                                    <Flex
                                        bg="gray.100"
                                        p="10px"
                                        key={tuteId}
                                        borderRadius="5px"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <Flex gap={2} alignItems={"center"}>
                                            <Flex justifyContent={"center"} alignItems={"center"} >
                                                <HiDocumentText size={"24px"} />
                                            </Flex>
                                            <Text
                                                fontSize="14px"
                                            >
                                                {content[tuteId].title}
                                            </Text>
                                        </Flex>

                                        <Flex alignItems={"center"} gap={2}>
                                            {enrolled ?
                                                <Button
                                                    borderRadius={"md"}
                                                    size={"sm"}
                                                    color={"white"}
                                                    bg={"blue.500"}
                                                    leftIcon={<AiOutlineEye />}
                                                >
                                                    View
                                                </Button> :
                                                <IconButton
                                                    variant={"ghost"}
                                                    borderRadius={"md"}
                                                    size={"md"}
                                                    icon={<BiSolidLockAlt />}
                                                >
                                                </IconButton>
                                            }

                                        </Flex>
                                    </Flex>
                                )
                            }) :
                            <Loader /> :
                        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} color={"gray.300"} bg={"gray.50"} borderRadius={"5px"} p="10px" gap={5}>
                            <HiOutlineDocumentMagnifyingGlass size={"26px"} />
                            <Text noOfLines={1} fontSize={"0.9rem"}>No Document Content Added</Text>
                        </Flex>

                }
            </Flex>

            <Flex w="100%" direction={'column'}>
                <HStack spacing={{ base: 220, xl: 300 }} >
                    <Box >
                        <Text fontSize="15px">Quizzes</Text>
                    </Box>
                </HStack>

                {
                    // first check if contentIDs.video_id is not empty
                    contentIDs.quiz_id.length > 0 ?
                        //check if content is loaded
                        !isContentLoading ?
                            contentIDs.quiz_id.map((quizId, videoIndex) => {
                                return (
                                    <Flex
                                        bg="gray.100"
                                        p="10px"
                                        key={quizId}
                                        borderRadius="5px"
                                        justifyContent={"space-between"}
                                        alignItems={"center"}
                                    >
                                        <Flex gap={2} alignItems={"center"}>
                                            <Flex justifyContent={"center"} alignItems={"center"} >
                                                <FcSurvey size={"24px"} />
                                            </Flex>
                                            <Text
                                                fontSize="14px"
                                            >
                                                {content[quizId].title}
                                            </Text>
                                        </Flex>

                                        <Flex alignItems={"center"} gap={2}>
                                            {enrolled && purchased === "Paid" ?
                                                <Button
                                                    borderRadius={"md"}
                                                    size={"sm"}
                                                    color={"white"}
                                                    bg={"blue.500"}
                                                    onClick={() => handleAttemtQuiz(quizId)}
                                                    isDisabled={!content[quizId].available}
                                                >
                                                    {content[quizId].available ? "Attempt" : "Not Available"}
                                                </Button> :
                                                <IconButton
                                                    variant={"ghost"}
                                                    borderRadius={"md"}
                                                    size={"md"}
                                                    icon={<BiSolidLockAlt />}
                                                >
                                                </IconButton>
                                            }

                                        </Flex>
                                    </Flex>
                                )
                            }) :
                            <Loader /> :
                        <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} color={"gray.300"} bg={"gray.50"} borderRadius={"5px"} p="10px" gap={5}>
                            <MdOutlineQuiz size={"26px"} />
                            <Text noOfLines={1} fontSize={"0.9rem"}>No Quizzes Added</Text>
                        </Flex>

                }
            </Flex>
        </VStack>
    )
}


export default AccordionContentPanel
