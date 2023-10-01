import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements,

} from "@stripe/react-stripe-js";

import {
    Box,
    Button,
    Flex,
    ModalFooter
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function CheckoutForm({
    active,
    prevStep,
    studypack_id,
    setCourseDetails,
    items,
    nextStep,
    setPaymentSuccess
}) {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPrivate = useAxiosPrivate();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            console.log(paymentIntent);
            switch (paymentIntent.status) {
                case "succeeded":
                    console.log("success Inside Use Effect");
                    setMessage("Payment succeeded!");
                    updatePaymentDatabase();
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });

    }, [stripe]);

    useEffect(() => {
        console.log(message);
    }, [message]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/student/courses'
                // Make sure to change this to your payment completion page
            },
            redirect: 'if_required',

        });


        console.log(error);

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else {
            console.log("success");
            setMessage("Payment succeeded!");
            updatePaymentDatabase();
            setPaymentSuccess(true);
            nextStep();
        }

        setIsLoading(false);
    };

    const updatePaymentDatabase = async () => {
        const controller = new AbortController();
        const isMounted = true;

        try {
            const response = await axiosPrivate.post(`/stu/payment/confirmPayment`, {
                items: items
            }, {
                signal: controller.signal
            });

            const data = response.data.data;
            console.log(data);

            if (isMounted) {
                setCourseDetails((prevState) => {
                    const newCourseDetails = { ...prevState };
                    newCourseDetails.study_pack.filter((pack) => {
                        if (pack.id === data.pack_id) {
                            pack.student_purchase_studypack = [...pack.student_purchase_studypack, data];
                        }
                    });
                    console.log(newCourseDetails);
                    return newCourseDetails;
                })
            };

        } catch (error) {
            console.log(error);
        }
    }




    const paymentElementOptions = {
        type: "card",
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <>
                {/* <LinkAuthenticationElement
                id="link-authentication-element"
                onChange={(e) => { }}
            /> */}
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <ModalFooter px="0">
                    <Box w={"100%"}>
                        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                            <Button variant="ghost" colorScheme="gray" mr={3} onClick={prevStep}>Cancel</Button>
                            <button className="payBtn" disabled={isLoading || !stripe || !elements} id="submit">
                                <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                                </span>
                            </button>
                        </Flex>
                        {/* Show any error or success messages */}
                        {message && <div id="payment-message">{message}</div>}
                    </Box>
                </ModalFooter>
            </>
        </form>
    );
}