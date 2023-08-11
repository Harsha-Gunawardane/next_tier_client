import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSidebar from "../../hooks/useSidebar";
import { Flex, Box, SimpleGrid, GridItem, Text, Skeleton, Button } from '@chakra-ui/react';
import VideoList from '../../components/DashboardComponents/VideoList';
import CommentSection from '../../components/student/ContentWatch/CommentSection';
import { useOutletContext } from 'react-router-dom';

//icons 
import SearchBar from '../../components/SearchBar';
import VideoView from '../../components/student/ContentWatch/VideoView';
import { axiosPrivate } from '../../api/axios';

//back end api endpoints

const videos = [
    {
        title: "Organic Chemistry - Part 1",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        uploadDateTime: "2023-07-01T10:00:00.000Z"
    },
    {
        title: "Industrial Chemistry - Introduction",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        uploadDateTime: "2023-05-01T10:00:00.000Z"
    },
    {
        title: "Trianganometry - Basics",
        tutor: "Ruwan Darshana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        uploadDateTime: "2023-01-01T10:00:00.000Z"
    },
    {
        title: "Organic Chemistry - Part 1",
        tutor: "Prasanna Baddewithana",
        time: "2:30",
        viewcount: "1.2k",
        link: "/stu/content",
        image: "https://images.unsplash.com/photo-1612833603929-5b7b3e7b7b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBwYXJ0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        uploadDateTime: "2023-07-01T10:00:00.000Z"
    }


]


const ContentWatch = () => {

    const [videoDetails, setVideoDetails] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [minimizeButtonRef] = useOutletContext();


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

            // const contentInfo = response.data;
            if (isMounted) {
                setVideoDetails(response.data);
                setIsLoaded(true);
            }

        } catch (err) {
            console.log(err);
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
                        <>
                            <VideoView videoDetails={videoDetails} />
                            <CommentSection sectionId={videoDetails.id} comments={videoDetails.comments} commentCount={videoDetails.commentCount} setParentDetails={setVideoDetails} />
                        </>

                        : <Skeleton height={"50px"} width={"100%"} />}


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