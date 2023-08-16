//contains all the modals used in the forum page

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


} from "@chakra-ui/react"
import Post from "./Post"
import { FileInput, TextInput, Textarea } from "@mantine/core"
import "../../../../assests/css/RTE.css"
import { useForm } from "@mantine/form";


//image
import pdf from "../../../../assests/images/pdf.jpg"
import attachment from "../../../../assests/images/cloud.png"
import { IoCloseSharp } from "react-icons/io5"

//rte
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { useUserInfo } from "../../../../store/user/useUserInfo"
import { axiosPrivate } from "../../../../api/axios"
import { useParams } from "react-router-dom"
// import { use } from "video.js/dist/types/tech/middleware";


const PostViewModal = (props) => {

    const {
        isOpen,
        onClose,
        post,
        onLoadMore,

    } = props

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={"3xl"}
            scrollBehavior={"inside"}
            maxH="80%"
            isCentered
            width={"600px"}
        >
            < ModalOverlay />
            <ModalContent px="0">
                <ModalHeader borderBottom={"1px solid"} borderColor={"gray.100"} textAlign={"center"}>
                    <Text>Forum Post</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Post post={post} boxShadow={"none"} p={"0"} onLoadMore={onLoadMore} openComments={true} type={"post"} />
                </ModalBody>
            </ModalContent>
        </Modal >
    )

}

const MyRichTextEditor = (props) => {

    const {
        form,
    } = props

    // const [content, setContent] = useState('')


    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        onUpdate: ({ editor }) => {
            form.setFieldValue("message", editor.getHTML())
        },
    });





    return (
        <Box maxH="300px" id="postInput">
            <RichTextEditor editor={editor} >
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>

                    {/* <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup> */}

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    {/* <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup> */}
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </Box>
    )
}



const PostCreateModal = (props) => {

    const {
        isOpen,
        onClose,
        post,
        onLoadMore,
        setPosts
    } = props


    //useForm Mantine





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

                value.forEach((file) => {
                    if (!allowedFileTypes.includes(file.type)) {
                        return "You can only upload images and pdfs"
                    }
                })

                value.forEach((file) => {
                    if (file.size > 10000000) {
                        return "You can only upload files less than 10mb"
                    }
                })
            }
        }
    });





    //allowed file types images pdf
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]


    const handleFileChange = (newFiles) => {
        const validated = form.validateField("files")
        console.log(validated)
        if (validated.hasError === false) {
            form.setFieldValue("files", [...form.values.files, ...newFiles])
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


    // const handleFileUpload = async (file) => {
    //     if (files.length + file.length > 3) {
    //         setFileError(true)
    //         console.log("too many files")
    //         toast({
    //             title: "Too many files",
    //             description: "You can only upload 4 files",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         })


    //     }
    //     //check if the file is of allowed type
    //     else if (!allowedFileTypes.includes(file.type)) {
    //         setFileError(true)
    //         console.log("wrong file type")
    //         toast({
    //             title: "Wrong file type",
    //             description: "You can only upload images and pdfs",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         })

    //     }
    //     //check if the file size is less than 10mb
    //     else if (file.size > 10000000) {
    //         setFileError(true)
    //         console.log("file too big")

    //         toast({
    //             title: "File too big",
    //             description: "You can only upload files less than 10mb",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //         })

    //     }
    //     else {
    //         setFileError(false)
    //         setFiles((prev) => {
    //             const newFiles = [...prev, file]
    //             return newFiles
    //         })
    //     }

    // }
    const handleFileInput = () => {
        document.getElementById("files").click()
    }

    //send the post to the backend
    const handleSubmit = async () => {
        const isMounted = true
        const controller = new AbortController()


        // return;
        const formData = new FormData();

        formData.append('title', form.values.title);
        formData.append('message', form.values.message);
        form.values.files.forEach((file) => {
            formData.append('files', file);
        });


        try {

            const URL = `/courses/${courseId}/forum/posts`

            const response = await axiosPrivate.post(URL, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (isMounted) {
                console.log(response.data)
                setPosts((prev) => {
                    const newPosts = [response.data.data, ...prev]
                    return newPosts
                })

                onClose()
                toast({
                    title: "Post created",
                    description: "Your post has been created",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            }

        } catch (error) {
            if (isMounted) {
                console.log(error)
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            }

        }
    }






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
                    <Text>Create Forum Post</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex w="100%" direction={"column"} gap="10px">
                        {/* creating as small */}
                        <Box>
                            <Text fontSize={"0.9rem"} fontWeight={"normal"} color={"gray.500"}>Creating post as:</Text>
                            <Flex justifyContent={"space-between"} alignItems={"center"} direction={"row"} py="5px">
                                <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"10px"} direction={"row"}>
                                    <Avatar size="xs" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                    <Flex alignItems={"flex-start"} justifyContent={"center"} direction={"column"}>
                                        <Text fontWeight={"bold"} color={"#3f3f3f"}>
                                            {fName} {lName}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} pointer={"pointer"}>2024 AL Theory</Text>
                            </Flex>
                        </Box>
                        <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
                            <Flex direction="column" gap="10px">
                                <TextInput
                                    placeholder="Title"
                                    label="Title"
                                    fontSize={"1.2rem"}
                                    size="lg"
                                    {...form.getInputProps("title")}
                                />
                                <label htmlFor="description">Description</label>
                                <MyRichTextEditor
                                    form={form}
                                />
                                <Flex direction="column" w="100%">
                                    <label htmlFor="description">Attachments</label>
                                    <Flex direction="row" w="100%" border="1px solid" borderColor={"gray.200"} borderRadius={"5px"} p={"10px"} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleFileInput} gap="20px">

                                        <FileInput
                                            id="files"
                                            accept="image/*, .pdf"
                                            style={{ display: "none" }}
                                            multiple={true}
                                            onChange={handleFileChange}
                                        />

                                        <Image src={attachment} alt="attachment" width={"50px"} opacity={"0.5"} />
                                        <Box>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"}>Drag and drop files here or click to upload</Text>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"}>Allowed file types: jpg, png, pdf</Text>
                                        </Box>
                                    </Flex>
                                    {/* list the uploaded files */}
                                    <SimpleGrid direction="column" w="100%" mt={"10px"} gap={"10px"} columns={4}>
                                        {form.values.files.length > 0 && form.values.files.map((file, index) => {
                                            return (
                                                <GridItem key={index} colSpan={1} rowSpan={1} w="100%" h="100%" border="1px solid" borderColor={"gray.200"} borderRadius={"5px"} p={"10px"} position={"relative"}>
                                                    {file.type === "application/pdf" ?
                                                        <Center w="100%" h="100%">
                                                            <Image src={pdf} alt="pdf" objectFit={"cover"} />
                                                        </Center>
                                                        :
                                                        <Center w="100%" h="100%">
                                                            <Image src={URL.createObjectURL(file)} alt="pdf" objectFit={"cover"} />
                                                        </Center>
                                                    }
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
                                                            const newFiles = [...form.values.files]
                                                            newFiles.splice(index, 1)
                                                            form.setFieldValue("files", newFiles)
                                                        }}
                                                        borderRadius={"50%"}
                                                    />
                                                </GridItem>
                                            )
                                        })}
                                    </SimpleGrid>
                                </Flex>

                            </Flex>
                        </form>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    {/* cancel button */}
                    <Button variant="ghost" colorScheme="gray" mr={3} onClick={onClose}> Cancel </Button>
                    {/* submit button */}
                    <Button colorScheme="blue" onClick={handleSubmit}> Submit </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >

    )

}

export { PostViewModal, PostCreateModal }





