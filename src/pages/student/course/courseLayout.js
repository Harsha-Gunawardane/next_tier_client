import { Box } from "@chakra-ui/layout"
import { Outlet } from "react-router"

const CourseLayout = (props) => {

    // model courses {
    //     id            String   @id @default(uuid())
    //     tutor_id      String
    //     title         String
    //     description   String
    //     subject       String
    //     medium        String
    //     grade         String
    //     thumbnail     String?
    //     monthly_fee   Int
    //     hall_id       String
    //     start_date    DateTime @default(now())
    //     studypack_ids Json[]   @default([]) // [{video_id: [], tute_id: []},{video_id: [], tute_id: "tute_id"}] 
    //     schedule      Json[]   @default([]) // [{day: "monday", start_time: "10:00", end_time: "12:00"},{day: "monday", start_time: "10:00", end_time: "12:00"}]

    //     tutor                   tutor                     @relation(fields: [tutor_id], references: [tutor_id])
    //     hall                    halls                     @relation(fields: [hall_id], references: [id])
    //     study_pack              study_pack[]
    //     student_enrolled_course student_enrolled_course[]
    //     student_attendance      student_attendance[]
    //     hall_schedule           hall_schedule[]
    //     quiz                    quiz[]
    //     forum                   forum[]
    //     poll                    poll[]
    //   }

    const courseDetails = {
        id: 1,
        tutor_id: 1,
        title: "2025 AL Physics",
        description: "This is a course for 2025 AL Physics students. This Course will cover all the topics in the syllabus.",
        subject: "Physics",
        medium: "English",
        grade: "Advanced Level",
        thumbnail: "https://images.unsplash.com/photo-1621574539437-4b3b8b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljdXJpb3VzJTIwc3R1ZGVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
        monthly_fee: 5000,
        hall_id: 1,
        start_date: "2021-06-01T00:00:00.000Z",
        studypack_ids: [],
        schedule: [],

        tutor: {
            id: 1,
            name: "Samitha Rathnayake",
            qualification: "BSc. Eng. (Hons)",
            profile_pic: "https://images.unsplash.com/photo-1621574539437-4b3b8b0b5b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGh5c2ljdXJpb3VzJTIwc3R1ZGVudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",

        }

    }

    return (
        <Box width="100%" height={"max-content"}>
            <Outlet context={{ courseDetails }} />
        </Box>
    )
}

export default CourseLayout
