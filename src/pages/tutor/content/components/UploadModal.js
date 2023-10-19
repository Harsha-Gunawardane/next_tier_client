import React, { useEffect } from 'react'

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

//icons
import { IoCloseSharp } from "react-icons/io5";
import { MyRichTextEditor } from '../../../student/course/components/Modals';
import { FileInput, RingProgress, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { useUserInfo } from '../../../../store/user/useUserInfo';
import { axiosPrivate } from '../../../../api/axios';

//files
import upload from "../../../../assests/images/upload2.png"
import _ from "lodash"






function UploadModal(props) {

    const {
        isOpen,
        onClose,
        post,
        onLoadMore,
        setPosts,
        onOpenDetails,
    } = props

    const [progress, setProgress] = React.useState(0)

    useEffect(() => {
        console.log(progress)
    }, [progress])


    //get users first name and last name from zustand
    const { fName, lName } = useUserInfo
    const { courseId } = useParams()

    const toast = useToast()

    const form = useForm({
        initialValues: {
            title: "",
            message: "",
            files: [],
        },


        validate: {
            title: (value) => {
                if (value.trim().length < 3) {
                    return "Title must include at least 3 characters"
                }
            },

            files: (value) => {
                if (value.length > 4) {
                    return "You can only upload 4 files"
                }

                if (!allowedFileTypes.includes(value.type)) {
                    return "You can only upload images and pdfs"
                }

            }
        }
    });





    //allowed file types images pdf
    const allowedFileTypes = ["video/*", "video/mp4"]


    const handleFileChange = async (newFiles) => {
        const filesUploaded = await newFiles

        if (filesUploaded.length > 0) {
            let validated
            if (filesUploaded) {
                validated = form.validate()
            }

            if (!validated.hasError) {
                form.setFieldValue("files", newFiles)
            } else {
                toast({
                    title: "Error Occured!",
                    description: validated.error,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }
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

    //send the post to the backend
    // const handleSubmit = async () => {
    //     const isMounted = true
    //     const controller = new AbortController()


    //     // return;
    //     const formData = new FormData();

    //     formData.append('title', form.values.title);
    //     formData.append('message', form.values.message);
    //     form.values.files.forEach((file) => {
    //         formData.append('files', file);
    //     });


    //     try {

    //         const URL = `/forum/${courseId}/posts`

    //         const response = await axiosPrivate.post(URL, formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         });

    //         if (isMounted) {
    //             console.log(response.data)
    //             setPosts((prev) => {
    //                 const newPosts = [response.data.data, ...prev]
    //                 return newPosts
    //             })

    //             onClose()
    //             toast({
    //                 title: "Post created",
    //                 description: "Your post has been created",
    //                 status: "success",
    //                 duration: 5000,
    //                 isClosable: true,
    //             })
    //         }

    //     } catch (error) {
    //         if (isMounted) {
    //             console.log(error)
    //             toast({
    //                 title: "Error",
    //                 description: "Something went wrong",
    //                 status: "error",
    //                 duration: 5000,
    //                 isClosable: true,
    //             })
    //         }

    //     }
    // }

    const handleSubmit = async () => {
        const isMounted = true
        const controller = new AbortController()

        try {
            const URL = `content/upload`
            const formData = new FormData();
            formData.append('title', form.values.files[0].name);
            formData.append('description', 'description');

            // single file
            formData.append('video', form.values.files[0]);


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
                <ModalBody>
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
                        cursor={"pointer"}
                        onClick={handleFileInput}
                        gap="20px"
                        onChange={handleFileChange}
                    >
                        <FileInput
                            id="files"
                            accept="video/*, .mp4"
                            style={{ display: "none" }}
                            multiple={true}
                            onChange={handleFileChange}
                            disabled={form.isSubmitting}
                        />
                        <Flex direction="column" alignItems={"center"} justifyContent={"center"} gap="10px">
                            <Image src={upload} alt="attachment" width={"50%"} opacity={"0.5"} />
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
                    {console.log(form.values.files)}
                    <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"} mt={"10px"}>Selected Files</Text>
                    <Flex direction="column" w="100%" mt={"10px"} gap={"10px"} border={"1px solid"} borderColor={"gray.200"} borderRadius={"5px"} p={"10px"}>
                        {form.values.files.length > 0 ?
                            <Flex w="100%" h="100%" border="1px solid" borderColor={"gray.200"} borderRadius={"5px"} p={"10px"} position={"relative"}>
                                <HStack
                                    justify={"space-between"}
                                >
                                    {/* file name */}
                                    <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"} maxW={"50%"} noOfLines={2}>{form.values.files[0].name}</Text>
                                    {/* file type */}
                                    <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>{form.values.files[0].type}</Text>
                                    {/* size in MB */}
                                    <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>{_.round(form.values.files[0].size / 1000000, 2)} MB</Text>

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
                                        form.setFieldValue("files", [])
                                    }}
                                    borderRadius={"50%"}
                                />
                            </Flex>
                            :
                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} textAlign={"center"}>No files selected</Text>
                        }
                    </Flex>


                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" colorScheme="gray" color={"gray.500"} mr={3} onClick={onClose}> Cancel </Button>
                    <Button colorScheme="blue" onClick={handleSubmit}>Upload & Continue</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default UploadModal