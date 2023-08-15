import { IconButton } from "@chakra-ui/button"
import { FormControl } from "@chakra-ui/form-control"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Flex } from "@chakra-ui/layout"
import { useEditor, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';

//icons 
import { FaPlus } from "react-icons/fa6"
import { Textarea } from "@mantine/core"

const InputBoxButton = (props) => {

    const { placeholder, icon, onFocus, onClick, ...rest } = props

    const editor = useEditor({
        extensions: [StarterKit, Link],
        content: '<p>Enter a new line to see floating menu</p>',
    });

    return (
        <Flex
            w="100%"
            justifyContent={"center"}
            alignItems={"center"}
            p="10px"
            bg="white"
            borderRadius={"10px"}
            boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px;"}
            _hover={{ bg: "gray.100", cursor: "pointer" }}
            onClick={onClick}

        >
            <FormControl>
                <InputGroup justifyContent={"center"} alignItems={"center"} borderRadius={"10px"}>
                    <Input
                        variant={"filled"}
                        placeholder={placeholder}
                        border={"none"}
                        bg="transparent"
                        _hover={{ border: "none", bg: "transparent", cursor: "pointer" }}
                        _focus={{ border: "none", outline: "none", bg: "none" }}
                        __css={{ "_focus": "none" }}
                        onClick={onClick}
                        pointerEvents={"none"}
                        isDisabled
                    />
                    {/* <RichTextEditor editor={editor}>
                        {editor && (
                            <FloatingMenu editor={editor}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.BulletList />
                                </RichTextEditor.ControlsGroup>
                            </FloatingMenu>
                        )}
                        <RichTextEditor.Content />
                    </RichTextEditor> */}
                    <InputRightElement>
                        <IconButton
                            icon={icon ? icon : <FaPlus />}
                            bg={"accent"}
                            color={"white"}
                            _hover={{ color: "white", bg: "accent" }}
                            boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                        // size={"lg"}
                        />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Flex>
    )
}


const InputBoxComment = (props) => {
    const { placeholder, icon, onFocus, onClick, ...rest } = props

    return (
        <Flex w="100%" justifyContent={"center"} alignItems={"center"} p="10px" bg="white" borderRadius={"10px"} boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px;"}>
            <FormControl>
                <InputGroup justifyContent={"center"} alignItems={"center"} borderRadius={"10px"}>
                    <Textarea
                        variant={"filled"}
                        placeholder={placeholder}
                        border={"none"}
                        bg="white"
                        _hover={{ border: "none" }}
                        _focus={{ border: "none", outline: "none" }}
                        __css={{ "_focus": "none" }}
                    />
                    {/* <RichTextEditor editor={editor}>
                        {editor && (
                            <FloatingMenu editor={editor}>
                                <RichTextEditor.ControlsGroup>
                                    <RichTextEditor.H1 />
                                    <RichTextEditor.H2 />
                                    <RichTextEditor.BulletList />
                                </RichTextEditor.ControlsGroup>
                            </FloatingMenu>
                        )}
                        <RichTextEditor.Content />
                    </RichTextEditor> */}
                    <InputRightElement>
                        <IconButton
                            icon={icon ? icon : <FaPlus />}
                            bg={"accent"}
                            color={"white"}
                        // _hover={{ color: "accent", bg: "gray.100" }}
                        // size={"lg"}
                        />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
        </Flex>

    )
}

export { InputBoxButton, InputBoxComment }