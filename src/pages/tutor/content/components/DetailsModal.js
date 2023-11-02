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
    Button,
    Image,
    Center,
    IconButton,
    useToast,
    HStack,
    Progress
} from "@chakra-ui/react"

import _ from "lodash"

//icons
import { IoCloseSharp } from "react-icons/io5";
import { FileInput, Stepper, TextInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { axiosPrivate } from '../../../../api/axios';

///images
import upload from "../../../../assests/images/upload2.png"


import { Textarea, Select, MultiSelect } from '@mantine/core';
import Success from '../../../student/course/components/Success';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';



const subjects = ['Math', 'English', 'Science']; // Add your subjects here
const subjectAreas = ['Algebra', 'Calculus', 'Geometry']; // Add your subject areas here


function DetailsModal(props) {

    const {
        isOpen,
        onClose,
        setVideos,

    } = props

    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState(false)
    const [contentId, setContentId] = useState(null)
    const [contentDetails, setContentDetails] = useState({})
    const [notificationId, setNotificationId] = useState(null)





    const toast = useToast()

    const form = useForm({
        initialValues: {
            title: "",
            message: "",
            files: null,
        },


        validate: (values) => {
            console.log("validating")
            console.log(values.files)
            if (active === 0) {
                if (!values.files) {
                    console.log("empty")
                    return { files: "Please select a file" };
                }

                if (values.files && !allowedFileTypes.includes(values.files.type)) {
                    console.log("not allowed")
                    return { files: "Please select a valid file type" };
                }
            }
        }
    });

    const form2 = useForm({
        initialValues: {
            title: "",
            description: "",
            subject: "",
            subject_areas: [],
            thumbnail: null,
            status: "PUBLIC",
        },
        validate: (values) => {
            if (active === 1) {
                if (!values.title) {
                    return { title: "Please enter a title" };
                }

                if (!values.description) {
                    return { description: "Please enter a description" };
                }

                if (!values.subject) {
                    return { subject: "Please select a subject" };
                }

                if (values.subject_areas.length === 0) {
                    return { subject_areas: "Please select at least one subject area" };
                }
            }
        }
    });

    useEffect(() => {
        form2.values.title = contentDetails.title
        form2.values.description = contentDetails.description
        form2.values.subject = contentDetails.subject
        form2.values.subject_areas = contentDetails.subject_areas
        form2.values.thumbnail = contentDetails.thumbnail
        form2.values.status = contentDetails.status
    }, [contentDetails])




    const nextStep = () =>
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            return current < 3 ? current + 1 : current;
        });

    const nextStep2 = () =>
        setActive((current) => {
            if (form2.validate().hasErrors) {
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
        if (event.target.files.length > 0) {
            form.setFieldValue("files", event.target.files[0])
        }

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


    const createContent = async () => {
        const isMounted = true
        const controller = new AbortController()


        console.log(form.validate())
        console.log(form.validate().hasErrors)
        console.log(form.errors)


        if (form.validate().hasErrors) {
            //toast
            toast({
                title: "Validation Error!",
                description: form.errors.files,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            })

            return false;
        }

        try {
            const URL = `content`
            const formData = new FormData();

            formData.append('title', form.values.files.name);
            formData.append('description', "description");

            const response = await axiosPrivate.post(URL, formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(response)

            return response
        } catch (error) {
            console.log(error)
        }
    }


    const handleSubmit = async () => {
        const isMounted = true
        const controller = new AbortController()

        const response = await createContent()

        console.log(response)
        if (!response) {
            console.log("error")
            return
        }


        if (response.status === 201) {

            setContentDetails(response.data.data)
            setContentId(response.data.data.id)
            setVideos((prevState) => {
                const newState = [...prevState, response.data.data]
                return newState
            })

            setUploading(true)

            if (form.validate().hasErrors) {
                toast({
                    title: "Something went wrong",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return
            }

            //create notification
            const id = Math.random().toString(36).substr(2, 9);
            notifications.show({
                id,
                loading: true,
                title: 'Video Upload in Progress ... ' + progress + '%',
                message: 'Your video is currently uploading. Please do not close this page',
                autoClose: false,
                withCloseButton: false,
            });

            nextStep()

            try {
                const URL = `content/upload_direct`
                const formData = new FormData();
                formData.append('title', form.values.files.name);
                formData.append('description', 'description');
                formData.append('files', form.values.files);
                formData.append('contentId', response.data.data.id);

                console.log(form.values.files)



                const responseUpload = await axiosPrivate.post(URL, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percent = Math.floor((loaded * 100) / total);
                        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

                        if (percent < 100) {
                            setProgress(percent)
                            setUploading(true)
                        } else {
                            setProgress(percent)
                        }

                        notifications.update({
                            id,
                            loading: true,
                            title: 'Video Upload in Progress ...',
                            message: 'Your video is currently uploading. Please do not close this page',
                            autoClose: false,
                            withCloseButton: false,
                        });
                    },
                    signal: controller.signal
                });

                console.log(responseUpload)


                if (responseUpload.status === 200) {
                    form.setFieldValue("files", null)
                    setContentDetails(() => {
                        return { ...contentDetails, ...responseUpload.data.data }
                    })

                    setVideos((prevState) => {
                        const newState = prevState.filter((video) => {
                            return video.id !== contentDetails.id
                        })

                        const newState2 = [...newState, responseUpload.data.data]
                        return newState2
                    })

                    setUploading(false)

                    notifications.update({
                        id,
                        color: 'teal',
                        title: 'Successfully Uploaded',
                        message: 'Your video has been uploaded successfully',
                        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                        loading: false,
                        autoClose: 2000,
                    });

                }
                else {
                    notifications.update({
                        id,
                        color: 'red',
                        title: 'Upload Failed',
                        message: 'Your video failed to upload. Please try again',
                        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
                        loading: false,
                        autoClose: 2000,
                    });


                    form.setFieldValue("files", null)
                }


                if (isMounted) {
                    console.log(responseUpload.data)
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            toast({
                title: "Upload failed!",
                description: "Please try again",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            form.setFieldValue("files", null)

        }
    }

    // send the data on the form 2 to the backend in put request
    const handleUpdateContentDetails = async () => {
        const isMounted = true
        const controller = new AbortController()

        if (form2.validate().hasErrors) {
            return
        }


        try {
            const URL = `content`
            const formData = new FormData();

            console.log("cid", contentId)
            formData.append('content_id', contentId);
            formData.append('title', form2.values.title);
            formData.append('description', form2.values.description);
            formData.append('subject', form2.values.subject);
            formData.append('subject_areas', form2.values.subject_areas);
            formData.append('thumbnail', form2.values.thumbnail);
            formData.append('status', form2.values.status);


            const response = await axiosPrivate.put(URL, formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );


            if (response.status === 200) {
                setUploadSuccess(true)
                nextStep()
                setContentDetails(response.data.data)
                setVideos((prevState) => {
                    const newState = prevState.filter((video) => {
                        return video.id !== contentId
                    })

                    const newState2 = [...newState, response.data]
                    return newState2
                })

                //reset form values
                form2.reset()
                form.reset()
                setActive(0)
                setProgress(0)
                setUploading(null)

            }

        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }




    useEffect(() => {
        console.log("notID", notificationId)
    }, [notificationId])


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
                                        disabled={uploading === "UPLOADING" || uploading === "UPLOADED"}
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
                        {/* Input form to add video details. Title(TextInput) description(TextArea). subject(Select option). subject_areas(MultiSelect), thumbnail(FileInput) */}

                        <Stepper.Step label="Second step" description="Content Information">
                            <TextInput
                                label="Title"
                                placeholder="Title"
                                {...form2.getInputProps('title')}
                            />
                            <Textarea
                                mt="md"
                                label="Description"
                                placeholder="Description"
                                {...form2.getInputProps('description')}
                            />
                            <Select
                                mt="md"
                                label="Subject"
                                placeholder="Subject"
                                data={subjects}
                                {...form2.getInputProps('subject')}
                            />

                            <MultiSelect
                                mt="md"
                                label="Subject Areas"
                                placeholder="Subject Areas"
                                data={subjectAreas}
                                creatable
                                searchable
                                {...form2.getInputProps('subject_areas')}
                            />


                        </Stepper.Step>

                        <Stepper.Step label="Final step" description="Thumbnail & Visiility">
                            <FileInput
                                mt="md"
                                label="Thumbnail"
                                placeholder="Thumbnail"
                                {...form2.getInputProps('thumbnail')}
                            />
                            <Select
                                mt="md"
                                label="Status"
                                description="Add a status to your content to make it more discoverable"
                                placeholder="Status"
                                data={['PUBLIC', 'PAID', 'HOLD']}
                                {...form2.getInputProps('status')}
                            />
                        </Stepper.Step>
                        <Stepper.Completed>
                            {/* create success message */}
                            <Center>
                                {uploadSuccess ?
                                    <Flex className='paymentForm' direction="column" align="center" justify="center" w={"100%"} gap="20px">
                                        <Flex width={"100%"} direction={"row"} justifyContent={"center"} alignItems={"center"} p="10px" borderRadius={"10px"} gap={6} h="300px">
                                            <Success />
                                        </Flex>
                                        <Flex direction={"column"} align="center" justify="center" w={"100%"} gap="20px">
                                            <Text fontSize={"1.2rem"} color={"gray.600"}>Successfully Uploaded</Text>
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
                            </Center>
                        </Stepper.Completed>
                    </Stepper>
                </ModalBody>
                <ModalFooter>
                    <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex>
                            {
                                active === 1 ?
                                    uploading === false ?
                                        // success fully uploaded with right icon
                                        <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Upload Successful</Text>
                                        </Flex>

                                        :
                                        uploading === true ?
                                            // uploading with progress bar
                                            <Flex w={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>Uploading | {progress}%</Text>
                                                <Progress size="sm" value={progress} />
                                            </Flex>
                                            :
                                            <></>
                                    :
                                    <></>

                            }
                        </Flex>

                        <Flex gap={2}>
                            {(active === 0 || active === 1) && <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}> Cancel </Button>}
                            {active === 0 && <Button colorScheme="blue" onClick={handleSubmit} isDisabled={uploading === "UPLOADING" || uploading === "UPLOADED"}>Upload & Continue</Button>}
                            {(active === 2) && <Button colorScheme="blue" onClick={prevStep}> Back </Button>}
                            {(active === 1) && <Button colorScheme="blue" onClick={nextStep2}> Next </Button>}
                            {(active === 2) && <Button colorScheme="blue" onClick={handleUpdateContentDetails}> Finish </Button>}
                            {(active === 3) && <Button variant={"outline"} colorScheme="blue" onClick={() => {
                                onClose();
                                // reset stepper
                                setActive(0)
                                // reset form values
                                form.reset()
                                form2.reset()
                            }}> Close </Button>}
                        </Flex>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default DetailsModal
