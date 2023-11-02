import React, { forwardRef, useEffect } from 'react'
import { useState } from 'react'
import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    GridItem,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Text,
    Heading,
    List,
    ListItem,
    Icon,
    AspectRatio,
    VStack,
    HStack,
    Card,



} from "@chakra-ui/react"
import {
    Stepper,
    Group,
    TextInput,
    PasswordInput,
    Select,

} from '@mantine/core';

import { useForm } from '@mantine/form';
import Checkout from './Checkout';
import { BiWallet } from 'react-icons/bi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import getYearMonth from '../../../../utils/getYearMonth';
import _ from 'lodash';
import MyTag from '../../../common/components/MyTag';
import { is } from 'date-fns/locale';
import paymentImg from '../../../../assests/images/payment.png'
import Success from './Success';
import paymentdone from '../../../../assests/images/paymentdone.png'
import { useOutletContext } from 'react-router-dom';


const SelectItem = forwardRef(
    function ({ type, month, title, ...others }, ref) {
        return (
            <Flex ref={ref} direction={"row"} justifyContent={"space-between"} alignItems={"center"} w={"100%"} p={"10px"} {...others}>
                <Text fontSize={"14px"} color={"gray.600"}>{title}</Text>
                <Flex gap={"5px"} justifyContent={"flex-end"} alignItems={"center"}>
                    <MyTag tagLabel={type} color={type === "purchase" ? "blue" : type === "monthly payment" ? "gray" : "yellow"} />
                    <MyTag tagLabel={month} color={"green"} />
                </Flex>
            </Flex>
        );
    }
);

const data = [
    {
        title: "Physics Theory",
        type: "Monthly",
        month: "2023 SEP",
        value: "c1",
        label: "Physics Theory",
    },
    {
        title: "Physics Theory",
        type: "Monthly",
        month: "2023 SEP",
        value: "c2",
        label: "Physics Theory",
    },
]



function PaymentPopup(props) {

    const {
        isOpen,
        onClose,
        courseDetails,
        paymentDetails,
        paymentList,
        setCourseDetails,
        type = "course" //course | studypack | bulk
    } = props;
    const [active, setActive] = useState(0);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [totalPay, setTotalPay] = useState(0);
    const [orderId, setOrderId] = useState('');


    useEffect(() => {
        console.log(paymentDetails)
        if (!_.isEmpty(paymentDetails.nextPayment)) {
            form.setValues({
                //push to studypack_id array
                studypack_id: paymentDetails.nextPayment.id,
            })
        }
        console.log(paymentList)
    }, [paymentDetails])

    const form = useForm({
        initialValues: {
            studypack_id: '',
            password: '',
            name: '',
            email: '',
            website: '',
            github: '',
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    // make studypack_id required
                    studypack_id: values.studypack_id.length < 1 ? 'Please select a payment option' : null,
                };
            }

            if (active === 1) {
                return {
                    // name: values.name.trim().length < 2 ? 'Name must include at least 2 characters' : null,
                    // email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
                };
            }

            return {};
        },
    });

    const totalPayment = () => {
        let total = 0;
        paymentList.filter((item) => item.value === form.values.studypack_id).map((item) => {
            total = total + item.price;
        })
        return total;
    }

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            console.log(form.values.studypack_id);
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"2xl"}
            scrollBehavior={"inside"}
            maxH="80%"
            isCentered
            width={"600px"}
        >
            < ModalOverlay />
            <ModalContent px="0">
                <ModalHeader borderBottom={"1px solid"} borderColor={"gray.100"} textAlign={"center"}>
                    <Text>Payment</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {paymentList.length === 0 ?
                        <>
                            <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                <Image src={paymentdone} alt="Payment done" width={"80%"} />
                                <Text fontSize={"1.2rem"} color={"gray.600"}>You have done all the payments!</Text>
                            </Flex>
                            <ModalFooter px={0}>
                                <Flex w={"100%"} justifyContent={"flex-end"} alignItems={"center"}>
                                    <Button colorScheme="blue" onClick={onClose}>Close</Button>
                                </Flex>
                            </ModalFooter>
                        </>
                        :
                        <>
                            <Stepper active={active} breakpoint="sm">
                                <Stepper.Step label="First step" description="Course Details">
                                    <Flex direction={"column"} justify={"flex-start"} alignItems={"center"} gap="20px">
                                        <Flex width={"100%"} direction={"row"} justify={"flex-start"} alignItems={"center"} p="10px" bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                            <AspectRatio ratio={16 / 9} w={"40%"} overflow={"hidden"} borderRadius={"10px"}>
                                                <Image src={courseDetails.thumbnail} objectFit={"cover"} />
                                            </AspectRatio>
                                            <Flex direction={"column"} justify={"flex-start"} alignItems={"center"} w="60%">
                                                <VStack spacing={"10px"} align={"flex-start"} w={"100%"}>
                                                    <Box>
                                                        <Text fontSize={"0.9rem"} color={"gray.600"}>Course/Study Pack Name</Text>
                                                        <Text fontWeight={"bold"} fontSize={"1.2rem"} color={"gray.800"}>{courseDetails.title}</Text>
                                                    </Box>
                                                    <HStack spacing={"20px"}>
                                                        {type === "course" ? (
                                                            <Box>

                                                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Monthly Fee</Text>
                                                                <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                                                    <BiWallet size={"20px"} color="gray.600" />
                                                                    <Flex gap="0" direction={"column"}>
                                                                        <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. {courseDetails.monthly_fee}</Text>
                                                                        {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                                                    </Flex>
                                                                </Flex>
                                                            </Box>
                                                        ) : type === "studypack" ? (
                                                            <Box>
                                                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Price</Text>
                                                                <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                                                    <BiWallet size={"20px"} color="gray.600" />
                                                                    <Flex gap="0" direction={"column"}>
                                                                        <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>Rs. {courseDetails.price}</Text>
                                                                        {/* <Text fontSize={"12px"} color="gray.800" textAlign={"center"} fontWeight={300}>2023</Text> */}
                                                                    </Flex>
                                                                </Flex>
                                                            </Box>
                                                        ) : (
                                                            <></>
                                                        )}
                                                        <Box>
                                                            <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Last Payment</Text>
                                                            <Flex gap={"5px"} justifyContent={"center"} alignItems={"center"}>
                                                                <AiOutlineClockCircle size={"20px"} color="gray.600" />
                                                                <Flex gap="0" direction={"column"}>
                                                                    <Text fontSize={"16px"} color="gray.800" textAlign={"center"} fontWeight={"bold"}>
                                                                        {!_.isEmpty(paymentDetails.payments) ? getYearMonth(paymentDetails.payments[0].pack.start_date) : "N/A"}
                                                                    </Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Box>
                                                    </HStack>
                                                </VStack>
                                            </Flex>
                                        </Flex>
                                        <Select
                                            w="100%"
                                            label="Payment For:"
                                            placeholder="Pick one"
                                            data={paymentList}
                                            size='lg'
                                            itemComponent={SelectItem}
                                            required
                                            {...form.getInputProps('studypack_id')}
                                        />
                                        <VStack spacing={"10px"} align={"flex-start"} w={"100%"}>
                                            <Box>
                                                <Text fontSize={"1rem"} color={"gray.600"}>Payment Overview</Text>
                                            </Box>
                                            {_.isEmpty(form.values.studypack_id) ?
                                                <Flex justifyContent={"center"} alignItems={"center"} w={"100%"} p={"10px"} bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                                    <Text fontWeight={"semibold"} fontSize={"1rem"} color={"gray.800"}>No Option Selected</Text>
                                                </Flex> :
                                                paymentList.filter((item) => item.value === form.values.studypack_id).map((item) => (
                                                    <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"} p={"10px"} bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                                        <Text fontWeight={"semibold"} fontSize={"1rem"} color={"gray.800"}>{item.month}</Text>
                                                        <Text fontWeight={"semibold"} fontSize={"1rem"} color={"gray.800"}>Rs. {item.price}</Text>
                                                    </Flex>
                                                ))
                                            }
                                        </VStack>
                                    </Flex>
                                    <ModalFooter px={0}>
                                        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Text fontSize={"14px"} color={"gray.600"}>Total Payment: Rs. {totalPayment()}</Text>
                                            <Button colorScheme="blue" onClick={nextStep}>Next step</Button>
                                        </Flex>
                                    </ModalFooter>
                                </Stepper.Step>

                                <Stepper.Step label="Second step" description="Payment Details">
                                    <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                        <Box w="100%" px="40px">
                                            <Card
                                                width={"100%"}
                                                justifyContent={"flex-start"}
                                                alignItems={"flex-start"}
                                                direction={"column"}
                                                p="10px"
                                                gap="10px"
                                                boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                                                bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                                                mt={"20px"}
                                            >
                                                <Flex w="100%" p="15px" position={"relative"}>
                                                    <Flex direction={"column"} width={"70%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                                                        <Flex direction={"column"} gap={"5px"}>
                                                            <Text fontSize={"1.2rem"} color={"gray.600"}>Total to Pay</Text>
                                                            <Text fontWeight={"bold"} fontSize={"1.5rem"} color={"gray.800"}>Rs. {totalPay / 100}</Text>
                                                        </Flex>
                                                    </Flex>
                                                    {/* <Flex width={"40%"} overflow={"visible"} position={"relative"}> */}
                                                    <Image src={paymentImg} alt="Segun Adebayo" position={"absolute"} width={"20%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} />
                                                    {/* </Flex> */}
                                                </Flex>
                                            </Card>
                                        </Box>
                                        <Checkout active={active} prevStep={prevStep} studypack_id={form.values.studypack_id} setCourseDetails={setCourseDetails} nextStep={nextStep} setPaymentSuccess={setPaymentSuccess} setTotalPay={setTotalPay} />
                                        {/* </form> */}
                                    </Flex>
                                </Stepper.Step>
                                {/* <Stepper.Step label="Third step" description="Confirmation">
                                {paymentSuccess ?
                                    <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                        <Flex width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} p="30px" borderRadius={"10px"} gap={6} >
                                            <Success />
                                        </Flex>
                                        <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                            <Text fontSize={"1.2rem"} color={"gray.600"}>Payment Successful</Text>
                                        </Flex>
                                    </Flex> :
                                    <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                        <Flex width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} p="10px" bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                            <Text fontWeight={"semibold"} fontSize={"1rem"} color={"gray.800"}>Payment Failed</Text>
                                        </Flex>
                                        <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                            <Text fontSize={"1.2rem"} color={"gray.600"}>Payment Failed</Text>
                                        </Flex>
                                    </Flex>

                                }
                            </Stepper.Step> */}
                                <Stepper.Completed>
                                    {paymentSuccess ?
                                        <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                            <Flex width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} p="10px" bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                                <Success />
                                            </Flex>
                                            <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                                <Text fontSize={"1.2rem"} color={"gray.600"}>Payment Successful</Text>
                                            </Flex>
                                        </Flex> :
                                        <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                            <Flex width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} p="10px" bg={"gray.100"} borderRadius={"10px"} gap={6}>
                                                <Text fontWeight={"semibold"} fontSize={"1rem"} color={"gray.800"}>Payment Failed</Text>
                                            </Flex>
                                            <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                                <Text fontSize={"1.2rem"} color={"gray.600"}>Payment Failed</Text>
                                            </Flex>
                                        </Flex>

                                    }
                                </Stepper.Completed>
                            </Stepper>
                        </>
                    }
                </ModalBody>

            </ModalContent>
        </Modal >
    )

}

export default PaymentPopup
