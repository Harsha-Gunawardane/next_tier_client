import React from "react";
import {
    Accordion,
} from "@chakra-ui/react";

import { useLocation, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import _ from "lodash";
import SingleAccordionStudypack from "./SingleAccordionStudypack";


const StudypackContent = (props) => {

    const { studypackDetails } = useOutletContext();

    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const id = location.pathname.split("/").pop();

    const [studyPackDetailsLoading, setStudyPackDetailsLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [accordionIndex, setAccordionIndex] = useState([])
    const [content, setContent] = useState([]);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState()
    const [paid, setPaid] = useState({});

    const [isOpenAccordions, setIsOpenAccordions] = useState({})

    useEffect(() => {
        setEnrolled(_.isEmpty(studypackDetails.student_purchase_studypack) ? false : true);
    }, [studypackDetails]);



    useEffect(() => {
        if (!_.isEmpty(studypackDetails)) {
            fetchStudyPackContent(studypackDetails.id)
            setStudyPackDetailsLoading(false)
        }

    }, [studypackDetails]);




    const fetchStudyPackContent = async (studyPackId) => {
        console.log('fetching content')
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/studypacks/${studyPackId}/content`, {
                signal: controller.signal
            });

            const data = response.data;

            if (isMounted) {
                setContent(data);
                setIsContentLoading(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(studypackDetails.student_purchase_studypack)
        if (!_.isEmpty(studypackDetails)) {
            console.log(studypackDetails.student_purchase_studypack)
            const latestpayment = studypackDetails.student_purchase_studypack[studypackDetails.student_purchase_studypack.length - 1]

            console.log(latestpayment)

            if (latestpayment !== undefined) {
                const today = new Date()
                const expiryDate = new Date(latestpayment.expire_date)

                if (today > expiryDate) {
                    setPaymentStatus({
                        status: "Expired",
                        color: "orange",
                        label: "Expired"
                    })
                } else {
                    setPaymentStatus({
                        status: "Paid",
                        color: "green",
                        label: "Available"
                    })
                }
            } else {
                console.log('not paid')
                setPaymentStatus({
                    status: "Not Paid",
                    color: "gray",
                    label: "Not Paid"
                })
                console.log(paymentStatus)
            }
        }

    }, [studypackDetails])

    useEffect(() => {
        console.log(paymentStatus)
    }, [paymentStatus])

    return (
        <Accordion w="100%" allowMultiple>
            {studyPackDetailsLoading && isContentLoading ?
                <Loader />
                :
                studypackDetails.content_ids.map((studyPack, index) => {

                    return (
                        <SingleAccordionStudypack
                            studyPack={studyPack}
                            enrolled={enrolled}
                            index={index}
                            accordionIndex={accordionIndex}
                            setAccordionIndex={setAccordionIndex}
                            key={index}
                            content={content}
                            isContentLoading={isContentLoading}
                            contentIDs={studyPack}
                            paymentStatus={paymentStatus}
                        />
                    )
                })
            }
        </Accordion >
    );
};

export default StudypackContent;
