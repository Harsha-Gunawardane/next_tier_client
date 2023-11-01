import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    AspectRatio,
    Box,
    Flex,
    GridItem,
    Heading,
    SimpleGrid,
    Skeleton,
    Text,
    Button,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,


} from "@chakra-ui/react";
import BreadCrumbForum from "../student/course/components/BreadCrumbForum";
import TutorProfileRightPanel from "./components/TutorProfileRightPanel";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Courses from "./Courses";
import StudyPacks from "./StudyPacks";


//components

const TutorProfileForStudent = (props) => {

    const { tutorId } = useParams();
    var _ = require('lodash');

    const [tutorDetails, setTutorDetails] = useState({});
    const [courses, setCourses] = useState([]);
    const [studyPacks, setStudyPacks] = useState([]);

    useEffect(() => {
        // getTutorDetails();
        console.log("here in TutorP")
        fetchTutorDetails();
    }, []);

    const axiosPrivate = useAxiosPrivate();

    const fetchTutorDetails = async () => {

        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/tutors/${tutorId}`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                // setTutorDetails(data);
                console.log(data)
                setTutorDetails(data);
                setCourses(data.courses);
                setStudyPacks(data.study_pack);

            }
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <>
            <SimpleGrid h={"100vh - 64px"} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(12, 1fr)" }} gap={5} p={"0 10px"} >
                <GridItem colSpan={{ base: 1, md: 12, lg: 8 }} bg="white"  >

                    <Box position={'sticky'} top={0}>
                        {_.isEmpty(tutorDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <BreadCrumbForum
                                courseTitle={tutorDetails.title}
                                title={tutorDetails.user.first_name + " " + tutorDetails.user.last_name}
                                id={"tutorId"}
                            />
                        }

                    </Box>
                    <Tabs>
                        <TabList w="100%">
                            <Tab>Courses</Tab>
                            <Tab>Study Packs</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {_.isEmpty(courses) ?
                                    <Skeleton height={"100%"} width={"100%"} />
                                    :
                                    <Courses courses={courses} type={"noTutor"} columns={{ base: 1, sm: 2, md: 2, lg: 2 }} />
                                }
                            </TabPanel>
                            <TabPanel>
                                {_.isEmpty(studyPacks) ?
                                    <Skeleton height={"100%"} width={"100%"} />
                                    :
                                    <StudyPacks studyPacks={studyPacks} type={"noTutor"} columns={{ base: 1, sm: 2, md: 2, lg: 2 }} />
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                        {_.isEmpty(tutorDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <TutorProfileRightPanel courseTutorDetails={tutorDetails} />
                        }
                    </Flex>
                </GridItem>

            </SimpleGrid >
        </>
    )
}






export default TutorProfileForStudent;