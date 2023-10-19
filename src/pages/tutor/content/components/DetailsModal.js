import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Flex,
    Text,
    Avatar,
    Button,
    Image,
    Center,
    IconButton,
    SimpleGrid,
    GridItem,
    useToast,
    HStack
} from "@chakra-ui/react"

import _ from "lodash"

//icons
import { IoCloseSharp } from "react-icons/io5";
import { MyRichTextEditor } from '../../../student/course/components/Modals';
import { Code, FileInput, RingProgress, Stepper, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../../../store/user/useUserInfo';
import { axiosPrivate } from '../../../../api/axios';

///images
import upload from "../../../../assests/images/upload2.png"





function DetailsModal(props) {

    const {
        isOpen,
        onClose,
        post,
        onLoadMore,
        setPosts
    } = props

    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    //get users first name and last name from zustand
    const { fName, lName } = useUserInfo
    const { courseId } = useParams()

    const toast = useToast()

    const form = useForm({
        initialValues: {
            title: "",
            message: "",
            files: null,
        },


        validate: (values) => {
            if (active === 0) {
                if (!values.files) {
                    return { files: "Please select a file" };
                }

                if (values.files && !allowedFileTypes.includes(values.files.type)) {
                    return { files: "Please select a valid file type" };
                }
            }
        }
    });

    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));




    useEffect(() => {
        console.log(form.values.files)
    }, [form.values.files])


    //allowed file types videos
    const allowedFileTypes = ["video/mp4", "video/mov", "video/avi", "video/flv", "video/wmv", "video/mkv", "video/3gp", "video/mpeg", "video/ogg", "video/webm", "video/quicktime", "video/x-ms-wmv"]


    const handleFileChange = (event) => {
        if (form.validateField("files").hasError) {
            form.values.files = null
        }
    }

    //drag and drop
    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        handleFileChange(e.dataTransfer.files)
    }


    const handleFileInput = () => {
        document.getElementById("files").click()
    }


    const handleSubmit = async () => {
        const isMounted = true
        const controller = new AbortController()

        if (form.validate().hasErrors) {
            toast({
                title: "Please select a file",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return
        }

        try {
            const URL = `content/upload_direct`
            const formData = new FormData();
            formData.append('title', form.values.files.name);
            formData.append('description', 'description');
            // single file
            formData.append('files', form.values.files);


            const response = await axiosPrivate.post(URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                    if (percent < 100) {
                        setProgress(percent)
                    }
                },
                signal: controller.signal
            });


            if (isMounted) {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"4xl"}
            scrollBehavior={"inside"}
            maxH="80%"
            isCentered
            width={"600px"}
        >
            < ModalOverlay />
            <ModalContent px="0">
                <ModalHeader borderBottom={"1px solid"} borderColor={"gray.100"} textAlign={"center"}>
                    <Text>Upload Video</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflow={"hidden"}>
                    <Stepper active={active} overflow="scroll" >
                        <Stepper.Step label="First step" description="Upload" >
                            {/* <Flex
                                direction="row"
                                w="100%"
                                border="1px solid"
                                borderColor={"gray.200"}
                                borderRadius={"5px"}
                                p={"10px"}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                alignItems={"center"}
                                justifyContent={"center"}
                                cursor={"pointer"}
                                onClick={handleFileInput}
                                gap="20px"
                            >
                                <FileInput
                                    id="files"
                                    accept="image/*, .pdf"
                                    style={{ display: "none" }}
                                    multiple={true}
                                    onChange={handleFileChange}
                                />
                                <Flex direction="column" alignItems={"center"} justifyContent={"center"} gap="10px">
                                    <Image src={upload} alt="attachment" width={"200px"} opacity={"0.5"} />
                                    <Box>
                                        <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Drag and drop files here or click to upload</Text>
                                        <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Allowed file types: jpg, png, pdf</Text>
                                    </Box>
                                    <Button
                                        colorScheme="blue"
                                        variant="solid"
                                        size="md"
                                        onClick={handleFileInput}
                                    >
                                        Select Files
                                    </Button>
                                </Flex>
                            </Flex> */}
                            <Box w={"100%"}>
                                <Flex
                                    direction="row"
                                    w="100%"
                                    borderRadius={"5px"}
                                    p={"10px"}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    gap="20px"
                                    onChange={handleFileChange}
                                >
                                    <FileInput
                                        id="files"
                                        accept="video/*, .mp4"
                                        style={{ display: "none" }}
                                        multiple={false}
                                        onChange={handleFileChange}
                                        disabled={form.isSubmitting}
                                        {...form.getInputProps("files")}
                                    />
                                    <Flex direction="column" alignItems={"center"} justifyContent={"center"} gap="10px">
                                        <Image src={upload} alt="attachment" width={"40%"} opacity={"0.5"} />
                                        <Box>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Drag and drop files here or click to upload</Text>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Allowed file types: mp4</Text>
                                        </Box>
                                        <Button
                                            colorScheme="blue"
                                            variant="outline"
                                            size="md"
                                            onClick={handleFileInput}
                                        >
                                            Select Files
                                        </Button>
                                    </Flex>
                                </Flex>
                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"} mt={"10px"}>Selected Files</Text>
                                <Flex direction="column" w="100%" mt={"10px"} gap={"10px"} border={"1px solid"} borderColor={"gray.200"} borderRadius={"5px"} p={"10px"}>
                                    {console.log(form.values.files)}
                                    {form.values.files ?
                                        <Flex w="100%" h="100%" border="1px solid" borderColor={"gray.200"} borderRadius={"5px"} p={"10px"} position={"relative"}>
                                            <HStack
                                                justify={"space-between"}
                                            >
                                                {/* file name */}
                                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"left"} maxW={"50%"} noOfLines={2}>{form.values.files.name}</Text>
                                                {/* file type */}
                                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>{form.values.files.type}</Text>
                                                {/* size in MB */}
                                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>{_.round(form.values.files.size / 1000000, 2)} MB</Text>

                                            </HStack>
                                            <IconButton
                                                aria-label="delete"
                                                icon={<IoCloseSharp />}
                                                size="sm"
                                                variant="solid"
                                                colorScheme="red"
                                                position={"absolute"}
                                                top={"5px"}
                                                right={"5px"}
                                                onClick={() => {
                                                    form.setFieldValue("files", null)
                                                }}
                                                borderRadius={"50%"}
                                            />
                                        </Flex>
                                        :
                                        <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>No files selected</Text>
                                    }
                                </Flex>
                            </Box>
                        </Stepper.Step>

                        <Stepper.Step label="Second step" description="Personal information">
                            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                            <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                        </Stepper.Step>

                        <Stepper.Step label="Final step" description="Social media">
                            <TextInput label="Website" placeholder="Website" {...form.getInputProps('website')} />
                            <TextInput
                                mt="md"
                                label="GitHub"
                                placeholder="GitHub"
                                {...form.getInputProps('github')}
                            />
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed! Form values:
                            <Code block mt="xl">
                                {JSON.stringify(form.values, null, 2)}
                            </Code>
                        </Stepper.Completed>
                    </Stepper>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}> Cancel </Button>
                    {active === 0 && <Button colorScheme="blue" onClick={handleSubmit}>Upload & Continue</Button>}
                    {(active === 1) && <Button colorScheme="blue" onClick={handleSubmit}> Next </Button>}
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DetailsModal