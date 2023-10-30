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
import BreadCrumbForum from "../../student/course/components/BreadCrumbForum";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ViewContentRightPanel from "./components/ViewContentRightPanel";
import ContentDetailsForm from "./components/ContentDetailsForm";
import CommentSection from "../../../components/student/contentWatch/CommentSection";


//components

const ViewContent = (props) => {

    const { contentId } = useParams();
    var _ = require('lodash');

    const [contentDetails, setContentDetails] = useState({});
    const [courses, setCourses] = useState([]);
    const [studyPacks, setStudyPacks] = useState([]);

    useEffect(() => {
        // getcontentDetails();
        console.log("here in TutorP")
        fetchContentDetails();
    }, []);

    const axiosPrivate = useAxiosPrivate();

    const fetchContentDetails = async () => {

        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/content/${contentId}`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                // setContentDetails(data);
                console.log(data)
                setContentDetails(data);

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
                        {_.isEmpty(contentDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <BreadCrumbForum
                                courseTitle={contentDetails.title}
                                title={contentDetails.title}
                                id={"contentId"}
                            />
                        }

                    </Box>
                    <Tabs>
                        <TabList w="100%">
                            <Tab>Details</Tab>
                            <Tab>Comments</Tab>
                            <Tab>Usage</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {_.isEmpty(contentDetails) ?
                                    <Skeleton height={"100%"} width={"100%"} />
                                    :
                                    <ContentDetailsForm contentDetails={contentDetails} setContentDetails={setContentDetails} />
                                }
                            </TabPanel>
                            <TabPanel>
                                {_.isEmpty(contentDetails) ?
                                    <Skeleton height={"100%"} width={"100%"} />
                                    :
                                    <CommentSection sectionId={contentDetails.id} comments={contentDetails.comments} commentCount={contentDetails.commentCount} setParentDetails={setContentDetails} />

                                }
                            </TabPanel>
                            <TabPanel>
                                {_.isEmpty(studyPacks) ?
                                    <Skeleton height={"100%"} width={"100%"} />
                                    :
                                    <></>
                                }
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 12, lg: 4 }} position={"sticky"} top={"64px"} height={"calc(100vh - 64px)"} >
                    <Flex width={"100%"} justifyContent={"flex-start"} alignItems={"flex-start"} direction={"column"} >
                        {_.isEmpty(contentDetails) ?
                            <Skeleton height={"100%"} width={"100%"} />
                            :
                            <></>
                            // <ViewContentRightPanel coursecontentDetails={contentDetails} />
                        }
                    </Flex>
                </GridItem>

            </SimpleGrid >
        </>
    )
}






export default ViewContent;