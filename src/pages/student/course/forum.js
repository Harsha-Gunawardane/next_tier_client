import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Flex,
    GridItem,
    SimpleGrid,
    Skeleton,


} from "@chakra-ui/react";
import { useOutletContext } from "react-router";
import { useDisclosure } from "@chakra-ui/react";


//components
import Post from "./components/Post";
import BreadCrumbForum from "./components/BreadCrumbForum";
import { InputBoxButton } from "./components/InputBoxBotton";
import { PostCreateModal, PostViewModal } from "./components/Modals";
import RightPanel from "./components/RightPanel";
import { axiosPrivate } from "../../../api/axios";
import PdfModal from "./PdfViewer";





const Forum = () => {

    const { courseDetails } = useOutletContext();
    const { courseId } = useParams();
    var _ = require('lodash');


    //useStates
    const [postOnModal, setPostOnModal] = useState(null);
    const [forumDetails, setForumDetails] = useState();
    const [posts, setPosts] = useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);

    //useDisclosure
    const { isOpen: isPostOpen, onOpen: onPostOpen, onClose: onPostClose } = useDisclosure();
    const { isOpen: isCreatePostOpen, onOpen: onCreatePostOpen, onClose: onCreatePostClose } = useDisclosure();
    const { isOpen: isPdfOpen, onOpen: onPdfOpen, onClose: onPdfClose } = useDisclosure();

    //functions 
    const onLoadMore = (index) => {
        setPostOnModal(index);
        onPostOpen();
    }

    //useEffects
    useEffect(() => {
        fetchForumDetails();
    }, [])

    useEffect(() => {
        console.log("forumDetails", forumDetails);
    }, [forumDetails])


    const fetchForumDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/courses/${courseId}/forum`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                setForumDetails(data);
                setPosts(data.posts);
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

                    {posts ?
                        posts.map((post, index) => (
                            <Post
                                index={index}
                                key={post.id}
                                post={post}
                                onLoadMore={onLoadMore}
                                renderLimit={2}
                                setPdfUrl={setPdfUrl}
                                onPdfOpen={onPdfOpen}
                            />
                        ))
                        :
                        <Skeleton height={"100%"} width={"100%"} />
                    }
                </Flex>
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                    {_.isEmpty(forumDetails) ?
                        <Skeleton height={"100%"} width={"100%"} />
                        :
                        <RightPanel forumDetails={forumDetails} />
                    }
                </Flex>
            </GridItem>
            <PostViewModal isOpen={isPostOpen} onOpen={onPostOpen} onClose={onPostClose} post={forumDetails && forumDetails.posts[postOnModal]} />
            <PostCreateModal isOpen={isCreatePostOpen} onOpen={onCreatePostOpen} onClose={onCreatePostClose} setPosts={setPosts} />
            <PdfModal isOpen={isPdfOpen} onClose={onPdfClose} pdfUrl={pdfUrl} />
        </SimpleGrid >
    )
}






export default Forum