import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSidebar from "../../hooks/useSidebar";
import { Flex, Box, SimpleGrid, GridItem, Text } from '@chakra-ui/react';
import VideoList from '../../components/DashboardComponents/VideoList';
import CommentSection from '../../components/student/ContentWatch/CommentSection';

//icons
import SearchBar from '../../components/SearchBar';
import VideoView from '../../components/student/ContentWatch/VideoView';

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


]


const videoDetails = {
    title: "Naruto Shippuden Q Opening 16",
    // Long Description
    description: "Naruto Shippuden Opening 16. Silhouette by KANA-BOONWatch Naruto Shippuden on Crunchyroll: https://got.cr/Watch-ShippudenCrunchyroll Collection brings you the latest clips, OPs, and more from your favorite anime! Don't have time for a full episode but want to catch up on the best scenes? We've got them!FREE 14-DAY CRUNCHYROLL TRIAL 🌟 https://got.cr/14DaysFree",
    views: "1.2M",
    // dateformat in string according to the Date()
    uploadDate: "2021-05-01",
    reactions: { likes: 100, dislikes: 10, views: 1000, comments: 100 },
    url: "https://www.youtube.com/embed/QhBnZ6NPOY0",
    liked: false,
    disliked: false,
    comments: [
        {
            id: 1,
            user: {
                id: 1,
                name: "Samitha Rathnayake",
                profilePic: "https://bit.ly/dan-abramov",
            },
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero vitae eros ultricies facilisis. Sed euismod, nisl quis ali quam, quis aliquet elit.",
            parent_id: null,
            root_id: null,
            reply_count: 1,
        },
        {
            id: 2,
            user: {
                id: 1,
                name: "Samitha Rathnayake",
                profilePic: "https://bit.ly/dan-abramov",
            },
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero vitae eros ultricies facilisis. Sed euismod, nisl quis ali quam, quis aliquet elit.",
            parent_id: 1,
        },
        {
            id: 3,
            user: {
                id: 1,
                name: "Samitha Rathnayake",
                profilePic: "https://bit.ly/dan-abramov",
            },
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero vitae eros ultricies facilisis. Sed euismod, nisl quis ali quam, quis aliquet elit.",
            parent_id: null,
        },
        {
            id: 4,
            user: {
                id: 1,
                name: "Samitha Rathnayake",
                profilePic: "https://bit.ly/dan-abramov",
            },
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero vitae eros ultricies facilisis. Sed euismod, nisl quis ali quam, quis aliquet elit.",
            parent_id: 3,
        },
    ]
}


const ContentWatch = () => {


    const { setSidebarOptionHandler } = useSidebar();

    useEffect(() => {
        setSidebarOptionHandler("content");
    }, [setSidebarOptionHandler]);

    const { id } = useParams();
    useEffect(() => {
        console.log(id);
    }, [])

    return (
        <Box width="100%" height={"max-content"}>
            {/* <Flex alignItems={"Center"} width={"100%"} justifyContent={"center"}>
                <SearchBar />
            </Flex> */}

            <SimpleGrid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={10} >
                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} h="max-content">
                    <VideoView videoDetails={videoDetails} />
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }}  >
                    <Flex width={"100%"} height={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"}>
                        <Text fontWeight={"bold"}>Recommended Videos</Text>
                        <VideoList videos={videos} thumbnailSize={"170px"} gap={0} />
                    </Flex>
                </GridItem>

            </SimpleGrid>
        </Box>
    )
}

export default ContentWatch;