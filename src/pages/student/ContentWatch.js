import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSidebar from "../../hooks/useSidebar";
import { Flex, Box, SimpleGrid, GridItem, Text, Skeleton, Button, Image } from '@chakra-ui/react';
import VideoList from '../../components/DashboardComponents/VideoList';
import CommentSection from '../../components/student/contentWatch/CommentSection';
import { useOutletContext } from 'react-router-dom';

//icons 
import SearchBar from '../../components/SearchBar';
import VideoView from '../../components/student/contentWatch/VideoView';
import { axiosPrivate } from '../../api/axios';

//image from assests
import NoAccess from '../../assests/images/NoAccess.png'

//back end api endpoints

const videos = [
    {
        title: "Organic Chemistry - Part 1",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://th.bing.com/th/id/R.3524f816b7bfe8841e05601a9dc3faae?rik=kWn5GLgflgRcpA&pid=ImgRaw&r=0&sres=1&sresct=1",
        uploadDateTime: "2023-07-01T10:00:00.000Z"
    },
    {
        title: "Industrial Chemistry - Introduction",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://th.bing.com/th/id/R.8b2bd7781eeb7f7bd2b3b1a2ef9d67d6?rik=XSfD9EsCYw5aFw&pid=ImgRaw&r=0",
        uploadDateTime: "2023-05-01T10:00:00.000Z"
    },
    {
        title: "Trianganometry - Basics",
        tutor: "Ruwan Darshana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://th.bing.com/th/id/OIP.ErMidve2yE1BmCJK0xBvfgHaEK?pid=ImgDet&rs=1",
        uploadDateTime: "2023-01-01T10:00:00.000Z"
    },
    {
        title: "Organic Chemistry - Part 1",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://i.ytimg.com/vi/VEIFRWx-O8g/maxresdefault.jpg",
        uploadDateTime: "2023-07-01T10:00:00.000Z"
    }


]


const ContentWatch = () => {

    const [videoDetails, setVideoDetails] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const { minimizeButtonRef } = useOutletContext();
    const [access, setAccess] = useState(true);
    const [errorFetch, setErrorFetch] = useState(false);


    const { id } = useParams();
    const CONTENT_INFO_URL = "/content/" + id;

    useEffect(() => {
        getContentInfo();
    }, [])

    useEffect(() => {
        minimizeButtonRef.current.click();
    }, [])


    const getContentInfo = async () => {
        let isMounted = true;
        const controller = new AbortController();
        try {
            const response = await axiosPrivate.get(`${CONTENT_INFO_URL}`, {
                signal: controller.signal,
            })


            if (response.status === 200) {
                setVideoDetails(response.data);
                setAccess(true);
                setIsLoaded(true);
            }

        } catch (err) {
            if (!err?.response) {
                setErrorFetch(true);
            }
            if (err?.response?.status === 403) {
                setAccess(false);
                setIsLoaded(true);
            }

        }

    }




    return (
        <Box width="100%" height={"max-content"}>
            {/* <Flex alignItems={"Center"} width={"100%"} justifyContent={"center"}>
                <SearchBar />
            </Flex> */}

            <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"10px"} >

                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} h="max-content">
                    {isLoaded ?
                        access ?

                            <>
                                <VideoView videoDetails={videoDetails} />
                                <CommentSection sectionId={videoDetails.id} comments={videoDetails.comments} commentCount={videoDetails.commentCount} setParentDetails={setVideoDetails} />
                            </>
                            :
                            <>
                                <Flex width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                                    <Image src={NoAccess} width={"50%"} height={"50%"} />
                                    <Text fontSize={"1.8rem"} fontWeight={"bold"}>OOPS!</Text>
                                    <Text fontSize={"1rem"} fontWeight={"semi bold"}>You don't have access to this content</Text>
                                    <Button mt={"10px"} colorScheme={"blue"} onClick={() => { window.location.href = "/stu/content" }}>Explore More Content</Button>
                                </Flex>
                            </>
                        :
                        <Skeleton height={"50px"} width={"100%"} />}


                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }}  >
                    <Flex width={"100%"} height={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                        <Text fontWeight={"bold"}>Recommended Videos</Text>
                        <VideoList videos={videos} thumbnailSize={{ base: "170px", md: "170px", lg: "170px" }} gap={0} />
                    </Flex>
                </GridItem>
            </SimpleGrid>
        </Box>
    )
}


export default ContentWatch;