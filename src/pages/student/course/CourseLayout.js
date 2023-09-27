import { Box } from "@chakra-ui/layout"
import { Outlet } from "react-router"
import { axiosPrivate } from "../../../api/axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const CourseLayout = (props) => {
    const { courseId } = useParams();


    // const course = {
    //     id: 1,
    //     tutor_id: 1,
    //     title: "2025 AL Physics",
    //     description: "This is a course for 2025 AL Physics students. This Course will cover all the topics in the syllabus.",
    //     subject: "Physics",
    //     medium: "English",
    //     grade: "Advanced Level",
    //     thumbnail: "https://images.unsplash.com/photo-1621574539437-4b3b8b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljdXJpb3VzJTIwc3R1ZGVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    //     monthly_fee: 5000,
    //     hall_id: 1,
    //     start_date: "2021-06-01T00:00:00.000Z",
    //     studypack_ids: [],
    //     schedule: [],

    //     tutor: {
    //         id: 1,
    //         name: "Samitha Rathnayake",
    //         qualification: "BSc. Eng. (Hons)",
    //         profile_pic: "https://images.unsplash.com/photo-1621574539437-4b3b8b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljdXJpb3VzJTIwc3R1ZGVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",

    //     }

    // }

    const [courseDetails, setCourseDetails] = useState({})

    useEffect(() => {
        fetchCourseDetails();
    }, [])

    useEffect(() => {
        console.log(courseDetails);
    }, [courseDetails])

    const fetchCourseDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/courses/${courseId}`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                setCourseDetails(data);
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <Box width="100%" height={"max-content"}>
            <Outlet context={{ courseDetails, setCourseDetails }} />
        </Box>
    )
}

export default CourseLayout
