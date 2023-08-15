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
import { TextInput, Textarea } from "@mantine/core"
import "../../../../assests/css/RTE.css"

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
import { DeleteIcon } from "@chakra-ui/icons"
import { useUserInfo } from "../../../../store/user/useUserInfo"


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

const MyRichTextEditor = () => {

    const [content, setContent] = useState('')
    const [editorHtmlContent, setEditorHtmlContent] = useState('')


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
        content,
        onUpdate: ({ editor }) => {
            setEditorHtmlContent(editor.getHTML())
            console.log(editor.getHTML())
            console.log(content)
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

    } = props


    //get users first name and last name from zustand
    const { fName, lName } = useUserInfo


    const [files, setFiles] = useState([])
    const [fileError, setFileError] = useState(false)
    const toast = useToast()

    useEffect(() => {
        console.log(fName)
        console.log(lName)
    }, [])



    useEffect(() => {
        console.log(files)
    }, [files])

    //allowed file types images pdf
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]


    const handleFileChange = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target.files)

        handleFileUpload(e.target.files[0])

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

        handleFileUpload(e.dataTransfer.files[0])
    }

    const handleFileUpload = async (file) => {
        if (files.length > 3) {
            setFileError(true)
            console.log("too many files")
            toast({
                title: "Too many files",
                description: "You can only upload 4 files",
                status: "error",
                duration: 5000,
                isClosable: true,
            })


        }
        //check if the file is of allowed type
        else if (!allowedFileTypes.includes(file.type)) {
            setFileError(true)
            console.log("wrong file type")
            toast({
                title: "Wrong file type",
                description: "You can only upload images and pdfs",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

        }
        //check if the file size is less than 10mb
        else if (file.size > 10000000) {
            setFileError(true)
            console.log("file too big")

            toast({
                title: "File too big",
                description: "You can only upload files less than 10mb",
                status: "error",
                duration: 5000,
                isClosable: true,
            })

        }
        else {
            setFileError(false)
            setFiles((prev) => {
                const newFiles = [...prev, file]
                return newFiles
            })
        }

    }


    //no use of input. but a button to trigger input
    const handleFileInput = () => {
        document.getElementById("fileInput").click()
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
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Flex direction="column" gap="10px">
                                <TextInput
                                    placeholder="Title"
                                    label="Title"
                                    fontSize={"1.2rem"}
                                    size="lg"
                                />
                                <label htmlFor="description">Description</label>
                                <MyRichTextEditor />
                                <Flex direction="column" w="100%">
                                    <label htmlFor="description">Attachments</label>
                                    <Flex direction="row" w="100%" border="1px solid" borderColor={"gray.200"} borderRadius={"5px"} p={"10px"} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleFileInput} gap="20px">
                                        <input type="file" id="fileInput" multiple hidden onChange={handleFileChange} />
                                        <Image src={attachment} alt="attachment" width={"50px"} opacity={"0.5"} />
                                        <Box>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"}>Drag and drop files here or click to upload</Text>
                                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"}>Allowed file types: jpg, png, pdf</Text>
                                        </Box>
                                    </Flex>
                                    {/* list the uploaded files */}
                                    <SimpleGrid direction="column" w="100%" mt={"10px"} gap={"10px"} columns={4}>
                                        {files.length > 0 && files.map((file, index) => {
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
                                                    <IconButton aria-label="delete" icon={<IoCloseSharp />} size="sm" variant="solid" colorScheme="red" position={"absolute"} top={"5px"} right={"5px"} onClick={() => { setFiles((prev) => prev.filter((f) => f !== file)) }} borderRadius={"50%"} />
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
                    <Button colorScheme="blue" onClick={onClose}> Submit </Button>
                </ModalFooter>
            </ModalContent>
        </Modal >

    )

}

export { PostViewModal, PostCreateModal }






