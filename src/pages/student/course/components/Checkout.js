import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Box } from "@chakra-ui/react";

import CheckoutForm from "./CheckoutForm";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import "./styles/checkout.css";
import _ from "lodash";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NqBgDCN3qmJpj2XB32QvTbGjLnOQcvUTgatuhp5LNo0Xux0w3LcYWu9LnZusFWGqz2URdAvjhPK8M9hSxTL1nbK00paYJJmHl");

export default function Checkout({
    active,
    prevStep,
    studypack_id,
    setCourseDetails,
    nextStep,
    setPaymentSuccess,
    setTotalPay
}) {
    const [clientSecret, setClientSecret] = useState("");
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState({});
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (items.length > 0) {
            createPaymentIntent(items);
        }
    }, [items]);

    useEffect(() => {
        if (studypack_id) {
            if (_.isArray(studypack_id)) {
                console.log('array')
                studypack_id.forEach(id => {
                    setItems((items) => {
                        let newItems = [...items, { id: id }]
                        console.log(newItems)
                        return newItems
                    });
                });
            } else {
                console.log('not array')
                console.log(studypack_id)
                setItems((items) => {
                    let newItems = [...items, { id: studypack_id }]
                    console.log(newItems)
                    return newItems
                });
                console.log(items)

            }
        }
    }, [studypack_id])

    const createPaymentIntent = async (items) => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.post(`/stu/payment/create-payment-intent`, {
                items: items
            }, {
                signal: controller.signal
            });

            const data = response.data;
            setTotalPay(data.ammount)
            setOrder(data.order)

            if (isMounted) {
                setClientSecret(data.clientSecret);
            }


        } catch (error) {
            console.log(error);
        }

    }

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <Box className="App" w="100%">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm active={active} prevStep={prevStep} studypack_id={studypack_id} setCourseDetails={setCourseDetails} items={items} nextStep={nextStep} setPaymentSuccess={setPaymentSuccess} order={order} />
                </Elements>
            )}
        </Box>
    );
}