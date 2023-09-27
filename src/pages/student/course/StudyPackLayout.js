import { Box } from "@chakra-ui/layout"
import { Outlet } from "react-router"
import { axiosPrivate } from "../../../api/axios"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import _ from "lodash"

const StudypackLayout = (props) => {
    const { studypackId } = useParams();

    const [studypackDetails, setstudypackDetails] = useState({})
    const [paymentStatus, setPaymentStatus] = useState({})

    useEffect(() => {
        fetchstudypackDetails();
    }, [])

    useEffect(() => {
        console.log(studypackDetails);
    }, [studypackDetails])

    const fetchstudypackDetails = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/stu/studypacks/${studypackId}`, {
                signal: controller.signal
            });

            const data = response.data;
            console.log(data);

            if (isMounted) {
                setstudypackDetails(data);
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        console.log(studypackDetails.student_purchase_studypack)
        if (!_.isEmpty(studypackDetails)) {
            console.log(studypackDetails.student_purchase_studypack)
            const latestpayment = studypackDetails.student_purchase_studypack[0]

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


    return (
        <Box width="100%" height={"max-content"}>
            <Outlet context={{ studypackDetails, setstudypackDetails, paymentStatus }} />
        </Box>
    )
}

export default StudypackLayout
