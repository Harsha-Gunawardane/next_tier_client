import React from "react";
import {
    Accordion,
} from "@chakra-ui/react";

import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import _ from "lodash";
import SingleAccordion from "./SingleAccordion";

const CourseContent = (props) => {

    const { courseDetails } = useOutletContext();

    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const id = location.pathname.split("/").pop();

    const [studyPackDetails, setStudyPackDetails] = useState(null);
    const [studyPackDetailsLoading, setStudyPackDetailsLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [accordionIndex, setAccordionIndex] = useState([])

    useEffect(() => {
        setStudyPackDetails(courseDetails.study_pack);
        setEnrolled(_.isEmpty(courseDetails.student_enrolled_course) ? false : true);
    }, [courseDetails, studyPackDetails]);

    useEffect(() => {
        setStudyPackDetails(courseDetails.study_pack)
    }, [courseDetails]);

    useEffect(() => {
        if (studyPackDetails) {
            setStudyPackDetailsLoading(false);
        }
        console.log(studyPackDetails);
    }, [studyPackDetails]);



    return (
        <Accordion w="100%" allowMultiple index={accordionIndex}>
            {studyPackDetailsLoading ?
                <Loader />
                :
                studyPackDetails.map((studyPack, index) => {

                    return (
                        <SingleAccordion
                            studyPack={studyPack}
                            enrolled={enrolled}
                            index={index}
                            accordionIndex={accordionIndex}
                            setAccordionIndex={setAccordionIndex}
                            key={studyPack.id}
                        />
                    )
                })
            }
        </Accordion >
    );
};

export default CourseContent;
