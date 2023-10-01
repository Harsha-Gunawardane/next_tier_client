import React, { useEffect, useState } from 'react';
import {
    Flex,
    AccordionPanel,
    Text,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    HStack,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Box


} from "@chakra-ui/react";

import AccordionContentPanel from './AccordionContentPanel';
// import MyTag from '../../../common/components/MyTag';




function SingleAccordion({
    studyPack,
    index,
    enrolled,
    setAccordionIndex,
    accordionIndex

}) {

    const [paymentStatus, setPaymentStatus] = useState({
        status: "",
        color: "",
        label: ""
    })
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (accordionIndex.includes(index)) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [accordionIndex])


    useEffect(() => {
        const latestpayment = studyPack.student_purchase_studypack.filter((purchase) => purchase.status === "PAID").sort((a, b) => new Date(b.purchased_at) - new Date(a.purchased_at))[0]


        if (latestpayment) {
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
            setPaymentStatus({
                status: "Not Paid",
                color: "gray",
                label: "Not Paid"
            })
        }

    }, [studyPack])

    return (
        <AccordionItem width={{ base: "100%", xl: "100%" }} key={index} >
            <AccordionButton
                bg="#eee"
                // borderRadius="5px"
                height="50px"
                mb="5px"
                onClick={() => {
                    setAccordionIndex((prev) => {
                        if (prev.includes(index)) {
                            return prev.filter((item) => item !== index)
                        } else {
                            return [...prev, index]
                        }
                    })

                }}
            >
                <AccordionIcon />
                <Box as="span" flex="1" textAlign="left" height="30px">
                    <Text p={1} ml="20px" fontSize="1rem" fontWeight={'semibold'}>
                        {studyPack.title}
                    </Text>
                </Box>
                {!enrolled ?
                    <Flex alignItems="center" justifyContent={"center"} gap={1}>
                        <Text p={1} mr="20px" fontSize="0.9rem" color="gray.500">
                            view only
                        </Text>
                    </Flex> :
                    <Flex alignItems="center" justifyContent={"center"} gap={1}>
                        <Text p={1} mr="20px" fontSize="0.9rem" color="green.500">
                            {/* <MyTag tagLabel={paymentStatus.label} color={paymentStatus.color} /> */}
                        </Text>
                    </Flex>
                }

            </AccordionButton>

            <AccordionPanel pb={4} bg="white">
                <Tabs variant="soft-rounded" colorScheme="blue">
                    <TabList gap={"10px"}>
                        {studyPack.content_ids.map((content, contentIndex) => (
                            <Tab
                                key={contentIndex}
                                // onClick={() => setSelectedWeekTab(contentIndex + 1)}
                                _selected={{ color: "#FFFFFF", bg: "accent" }}
                                color={"#3f3f3f"}
                                bg={"gray.100"}
                                fontWeight={"medium"}
                                borderRadius={"md"}
                            >
                                <Text fontSize="12px">
                                    {content.title}
                                </Text>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {studyPack.content_ids.map((content, contentIndex) => (
                            <TabPanel key={contentIndex} px={0}>
                                <AccordionContentPanel
                                    studyPackId={studyPack.id}
                                    contentIDs={content}
                                    isOpen={isOpen}
                                    enrolled={enrolled}
                                    purchased={paymentStatus.status}
                                />
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            </AccordionPanel>
        </AccordionItem>
    )
}

export default SingleAccordion
