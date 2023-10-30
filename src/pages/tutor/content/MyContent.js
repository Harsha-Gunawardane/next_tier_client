import React, { useEffect } from "react";
import {
    Box,
    Flex,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Select,
    Button,
    IconButton,
    ButtonGroup,
    Text,
    useDisclosure,

} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import SearchBar from "../../../components/SearchBar";

//icons
import { IoChevronBackSharp } from "react-icons/io5";
import { axiosPrivate } from "../../../api/axios";
import { Loader } from "@mantine/core";
import VideoList from "./components/VideoList";
import { MdCloudUpload } from "react-icons/md";
import DetailsModal from "./components/DetailsModal";
import UploadModal from "./components/UploadModal";


// content db structure
// model content {
//     id                String              @id @default(uuid())
//     title             String
//     description       String
//     user_id           String
//     type              content_type?
//     subject           String
//     subject_areas     String[]
//     uploaded_at       DateTime?           @default(now())
//     status            content_status?     @default(PUBLIC)
//     file_path         String?
//     thumbnail         String?
//     reactions         Json?               @default("{}") // {like: 0, dislike: 0, views: 0 ,comments: 0}
//     content_reactions content_reactions[]
//     content_views     content_views[]
//     comments          comments[]

//     user users @relation(fields: [user_id], references: [id])
//   }

function MyContent() {
    // const [focusedTab, setFocusedTab] = useState("New");
    const { minimized } = useOutletContext();

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(100);
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(true);

    const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();
    const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure()

    useEffect(() => {
        fetchMyVideos(skip, take, "", "", "");
    }, [])

    const navigate = useNavigate();

    const navigateToCourses = () => {
        navigate(`/stu/courses`);
    }

    const fetchMyVideos = async (skip, limit, search, grade, subject) => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const VIDEOS_FETCH_URL = `/tutor/videos?skip=${skip}&limit=${limit}`;
            if (search) {
                VIDEOS_FETCH_URL += `&search=${search}`
            }
            if (grade) {
                VIDEOS_FETCH_URL += `&grade=${grade}`
            }
            if (subject) {
                VIDEOS_FETCH_URL += `&subject=${subject}`
            }
            const response = await axiosPrivate.get(`${VIDEOS_FETCH_URL}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                signal: controller.signal
            })
            console.log(response.data)
            const studyPacks = response.data;
            console.log(studyPacks)
            setSkip(skip + (studyPacks.length))
            if (isMounted) {
                setVideos((prevState) => {
                    const newState = [...prevState, ...studyPacks]
                    return newState
                })
                setVideosLoading(false)

            }
        } catch (error) {
            setVideosLoading(false)

        }
    }

    return (
        <Box>
            <Box position={"sticky"} top={"64px"} backdropBlur={"20px"} bg={"white"} zIndex={2} >
                <Flex justifyContent={"space-between"} alignItems={"center"} >
                    <Text fontSize={"1.2rem"} fontWeight={"bold"}>My Content</Text>
                </Flex>
                <Flex p="5px" my="5px" justifyContent={"space-between"} alignItems={"center"} >
                    <Flex w={"100%"} p="5px" gap="20px" justifyContent={"flex-start"} alignItems={"center"} >
                        <SearchBar />
                        <Flex justifyContent={"space-between"} alignItems={"center"} gap="10px">
                            <Select placeholder='Filter by course' w="200px" size={"sm"}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select placeholder='Visibility' w="200px" size={"sm"}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Flex>
                    </Flex>
                    {/* upload video btn */}
                    <Flex justifyContent={"flex-end"} alignItems={"center"} gap="10px" mr={"10px"}>
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            size="md"
                            onClick={onDetailsOpen}
                            leftIcon={<MdCloudUpload />}
                        >
                            Upload New
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <Box p={5}>
                {videosLoading ?
                    <Loader /> :
                    <VideoList videos={videos} />
                }
            </Box>
            <UploadModal isOpen={isUploadOpen} onClose={onUploadClose} onOpenDetails={onDetailsOpen} />
            <DetailsModal isOpen={isDetailsOpen} onClose={onDetailsClose} setVideos={setVideos} />
        </Box >

    );
}

export default MyContent;