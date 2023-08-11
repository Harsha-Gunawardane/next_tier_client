import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, GridItem, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router";
import { useDisclosure } from "@chakra-ui/react";

//components
import Post from "./components/Post";
import BreadCrumbForum from "./components/BreadCrumbForum";
import { InputBoxButton, InputBoxComment } from "./components/InputBoxBotton";
import { PostCreateModal, PostViewModal } from "./components/Modals";
import RightPanel from "./components/RightPanel";
import { axiosPrivate } from "../../../api/axios";




const posts = [
    {
        id: "1",
        forum_id: "1",
        user_id: "1",
        title: "This is a post 1",
        message: "This is a post message",
        posted_at: "2021-08-01T00:00:00.000Z",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        post_reactions: [],
        forum: {},
        user: {
            id: "12",
            first_name: "Nipuna",
            last_name: "Rahal",
            role: "Student"
        },
        commentCount: 3,
        comments: [
            {
                id: "1",
                content_id: "1",
                user_id: "1",
                message: "This is a comment",
                posted_at: "2021-08-01T00:00:00.000Z",
                reactions: { like: 0, dislike: 0, replies: 0 },
                comment_reactions: [],
                commenter: {
                    id: "12",
                    first_name: "Nipuna",
                    last_name: "Rahal",
                    role: "Student"
                },
                replies: [],
                reply_count: 0,
                parent_id: null,
                post_id: null,
                replied_to: null,
                _count: { replies: 0, comment_reactions: 0 }
            },
            {
                id: "2",
                content_id: "1",
                user_id: "1",
                message: "This is a comment",
                posted_at: "2021-08-01T00:00:00.000Z",
                reactions: { like: 0, dislike: 0, replies: 0 },
                comment_reactions: [],
                commenter: {
                    id: "12",
                    first_name: "Nipuna",
                    last_name: "Rahal",
                    role: "Student"
                },
                replies: [],
                reply_count: 0,
                parent_id: null,
                post_id: null,
                replied_to: null,
                _count: { replies: 0, comment_reactions: 0 }
            },
            {
                id: "2",
                content_id: "1",
                user_id: "1",
                message: "This is a comment",
                posted_at: "2021-08-01T00:00:00.000Z",
                reactions: { like: 0, dislike: 0, replies: 0 },
                comment_reactions: [],
                commenter: {
                    id: "12",
                    first_name: "Nipuna",
                    last_name: "Rahal",
                    role: "Student"
                },
                replies: [],
                reply_count: 0,
                parent_id: null,
                post_id: null,
                replied_to: null,
                _count: { replies: 0, comment_reactions: 0 }
            },
            {
                id: "2",
                content_id: "1",
                user_id: "1",
                message: "This is a comment",
                posted_at: "2021-08-01T00:00:00.000Z",
                reactions: { like: 0, dislike: 0, replies: 0 },
                comment_reactions: [],
                commenter: {
                    id: "12",
                    first_name: "Nipuna",
                    last_name: "Rahal",
                    role: "Student"
                },
                replies: [],
                reply_count: 0,
                parent_id: null,
                post_id: null,
                replied_to: null,
                _count: { replies: 0, comment_reactions: 0 }
            },
        ],
        attachments: []
    },
    {
        id: "1",
        forum_id: "1",
        user_id: "1",
        title: "This is a post",
        message: "This is a post message",
        posted_at: "2021-08-01T00:00:00.000Z",
        reactions: { like: 0, dislike: 0, views: 0, comments: 0 },
        post_reactions: [],
        forum: {},
        user: {
            id: "12",
            first_name: "Nipuna",
            last_name: "Rahal",
            role: "Student"
        },
        comments: [],
        attachments: []
    },
]

const Forum = () => {

    const { courseDetails } = useOutletContext();
    const { courseId } = useParams();
    var _ = require('lodash');


    //useStates
    const [postOnModal, setPostOnModal] = useState(null);
    const [forumDetails, setForumDetails] = useState();

    //useDisclosure
    const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();

    //functions 
    const onLoadMore = (index) => {
        setPostOnModal(index);
        onPostOpen();
    }

    //useEffects
    useEffect(() => {
        fetchForumDetails();
        console.log(forumDetails);
    }, [])


    const fetchForumDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/courses/${courseId}/forum`, {
                signal: controller.signal
            });

            const data = response.data;

            console.log(response.data);
            if (isMounted) {
                setForumDetails(data);
            }
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"10px"} >
            <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} h="max-content" bg="white" >
                <Box>
                    <BreadCrumbForum courseTitle={courseDetails.title} />
                </Box>
                <Box w="100%" my="10px" px="10px">
                    <InputBoxButton placeholder="Write a post..." onClick={onCreatePostOpen} />
                </Box>
                <Flex w="100%" my="10px" mt="40px" px="10px" direction={"column"} gap="15px" >

                    {forumDetails ?
                        forumDetails.posts.map((post, index) => (
                            <Post index={index} key={post.id} post={post} onLoadMore={onLoadMore} renderLimit={2} />
                        ))
                        :
                        <Skeleton height={"100%"} width={"100%"} />
                    }
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"relative"}>
                <Flex width={"100%"} height={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} position={"relative"}>
                    {_.isEmpty(forumDetails) ?
                        <Skeleton height={"100%"} width={"100%"} />
                        :
                        <RightPanel forumDetails={forumDetails} />
                    }
                </Flex>
            </GridItem>
            <PostViewModal isOpen={isPostOpen} onOpen={onPostOpen} onClose={onPostClose} post={forumDetails && forumDetails.posts[postOnModal]} />
            <PostCreateModal isOpen={isCreatePostOpen} onOpen={onCreatePostOpen} onClose={onCreatePostClose} />
        </SimpleGrid>
    )
}

export default Forum