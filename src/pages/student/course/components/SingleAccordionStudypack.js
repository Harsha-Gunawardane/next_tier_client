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
import MyTag from '../../../common/components/MyTag';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { Loader } from '@mantine/core';




function SingleAccordionStudypack({
    studyPack,
    index,
    enrolled,
    setAccordionIndex,
    accordionIndex,
    content,
    isContentLoading,
    contentIDs,
    key,
    paymentStatus,

}) {

    const [isOpen, setIsOpen] = useState(false)

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (accordionIndex.includes(index)) {
            setIsOpen(true)
        } else {
            setIsOpen(false)
        }
    }, [accordionIndex])

    useEffect(() => {
        console.log(studyPack)
    }, [studyPack])

    return (
        <AccordionItem width={{ base: "100%", xl: "100%" }} >
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
                            <MyTag tagLabel={paymentStatus.label} color={paymentStatus.color} />
                        </Text>
                    </Flex>
                }

            </AccordionButton>

            <AccordionPanel pb={4} bg="white">
                {isContentLoading ?
                    <Loader />
                    :
                    <AccordionContentPanel
                        studyPackId={studyPack.id}
                        contentIDs={contentIDs}
                        isOpen={isOpen}
                        enrolled={enrolled}
                        purchased={paymentStatus.status}
                        studyPackContent={content}
                        studyPackType={true}
                    />
                }

            </AccordionPanel>
        </AccordionItem>
    )
}

export default SingleAccordionStudypack
