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

} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import CoursesList from "../common/Courses";
import SearchBar from "../../components/SearchBar";
import TutorList from "./TutorList";

//icons
import { IoChevronBackSharp } from "react-icons/io5";
import { axiosPrivate } from "../../api/axios";
import { Loader } from "@mantine/core";


function Tutors() {
    // const [focusedTab, setFocusedTab] = useState("New");
    const { minimized } = useOutletContext();

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(100);
    const [tutors, setTutors] = useState([]);
    const [tutorsLoading, setTutorsLoading] = useState(true);

    useEffect(() => {
        fetchTutors(skip, take, "", "", "");
    }, [])

    const newCourses = [
        {
            courseName: "Physics 2024 Theory",
            tutorName: "Mr. Nilantha Jayasooriya",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
        {
            courseName: "Chemistry 2024 Theory",
            tutorName: "Mr. Jeewaka C Perera",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
        {
            courseName: "Mathematics 2025 Paper",
            tutorName: "Mr. Manoj Solangaarachchi",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
        {
            courseName: "Physics 2025 Paper",
            tutorName: "Mr. Samitha Rathnayeka",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
    ];

    const inProgressCourses = [
        {
            courseName: "Chemistry 2024 Theory",
            tutorName: "Mr. Jeewaka C Perera",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
        {
            courseName: "Mathematics 2025 Paper",
            tutorName: "Mr. Manoj Solangaarachchi",
            tutorDegree: "Bsc Engineering at University of Moratuwa",
            fee: 3500.00,
        },
    ];

    const navigate = useNavigate();

    const navigateToCourses = () => {
        navigate(`/stu/courses`);
    }

    const fetchTutors = async (skip, limit, search, grade, subject) => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const TUTORS_FETCH_URL = `/stu/tutors?skip=${skip}&limit=${limit}`;
            if (search) {
                TUTORS_FETCH_URL += `&search=${search}`
            }
            if (grade) {
                TUTORS_FETCH_URL += `&grade=${grade}`
            }
            if (subject) {
                TUTORS_FETCH_URL += `&subject=${subject}`
            }
            const response = await axiosPrivate.get(`${TUTORS_FETCH_URL}`, {
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
                setTutors((prevState) => {
                    const newState = [...prevState, ...studyPacks]
                    console.log(newState)
                    return newState
                })
                setTutorsLoading(false)

            }
        } catch (error) {
            setTutorsLoading(false)

        }
    }

    return (
        <Box>
            <Box position={"sticky"} top={"64px"} backdropBlur={"20px"} bg={"white"} zIndex={2} >
                <Flex justifyContent={"space-between"} alignItems={"center"} >
                    <Button
                        leftIcon={<IoChevronBackSharp />}
                        variant="ghost"
                        onClick={navigateToCourses}
                        size={"sm"}
                        color={"gray.500"}
                    >
                        Back to Courses
                    </Button>
                </Flex>
                <Flex p="5px" my="5px" justifyContent={"space-between"} alignItems={"center"} >
                    <Flex w={"100%"} p="5px" gap="20px" justifyContent={"flex-start"} alignItems={"center"} >
                        <SearchBar />
                        <Flex justifyContent={"space-between"} alignItems={"center"} gap="10px">
                            <Select placeholder='Grade' w="200px" size={"sm"}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                            <Select placeholder='Subject' w="200px" size={"sm"}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
            <Box p={5}>
                {tutorsLoading ?
                    <Loader /> :
                    <TutorList tutors={tutors} />
                }
            </Box>
        </Box >

    );
}

export default Tutors;
