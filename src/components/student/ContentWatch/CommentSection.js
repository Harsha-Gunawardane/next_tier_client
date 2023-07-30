import { Flex, Text, Avatar, Button, FormControl, Textarea, Box, Collapse, useDisclosure } from "@chakra-ui/react"
import generateTimeAgoString from "../../../utils/timesAgo"
import LikeDislike from "./LikeDislike"
import { useRef, useState } from "react"


//icons
import { MdKeyboardArrowDown } from "react-icons/md"

//process comments array

const processComments = (comments) => {
    let processedComments = []
    comments.forEach(comment => {
        if (comment.parent_id === null) {
            processedComments.push(comment)
        }

        if (comment.parent_id !== null) {
            processedComments.forEach(processedComment => {
                if (processedComment.id === comment.root_id) {
                    // processedComment.replies.push(comment)
                }
            })
        }
    })
    return processedComments
}

const comment = {
    id: 1,
    user: {
        id: 1,
        name: "Samitha Rathnayake",
        profilePic: "https://bit.ly/dan-abramov",
    },
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero vitae eros ultricies facilisis. Sed euismod, nisl quis ali quam, quis aliquet elit.",
    parent_id: null,
    date: "2021-05-01"
}

const Comment = (props) => {

    const { children, onReplyToggle, ...rest } = props

    const [replyCommentVal, setReplyCommentVal] = useState("")

    const [isFocused, setIsFocused] = useState(false)
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

    const handleCommentCancel = () => {
        setReplyCommentVal("")
        setIsFocused(false)
        onToggle()
    }






    return (
        <Flex w="100%" direction={"row"} gap="5px" p="5px">
            <Avatar h="32px" w="32px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Flex w="100%" direction={"column"} gap="10px">
                <Box w={"100%"}>
                    <Flex w="100%" alignItems={"center"} gap="10px">
                        <Text fontSize={14} fontWeight={"bold"} color={"#3f3f3f"}>
                            {props.user.name}
                        </Text>
                        <Text fontSize={12} fontWeight={"semi-bold"} color={"gray.500"} >
                            {generateTimeAgoString(props.date)}
                        </Text>
                    </Flex>
                    <Text fontSize={16} fontWeight={"semi-bold"} color={"#3f3f3f"} w="100%" mt="5px">
                        {props.message}
                    </Text>
                </Box>
                <Flex gap="10px">
                    <LikeDislike />
                    <Button variant={"ghost"} color={"gray.400"} fontWeight={"semi-bold"} fontSize={16} size="sm" _hover={{ color: "gray.600" }} onClick={onToggle}>
                        Reply
                    </Button>
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <Flex w="100%" direction={"row"} gap="5px" >
                        <Avatar h="24px" w="24px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <FormControl gap="5px">
                            <Textarea placeholder="Write a comment..." onChange={(e) => { setReplyCommentVal(e.target.value) }} value={replyCommentVal} onFocus={() => setIsFocused(true)} />
                            <Flex w="100%" justifyContent={"flex-end"} alignItems={"center"} gap={"10px"} mt="5px" display={isFocused ? "flex" : "none"}>
                                <Button variant={"ghost"} color={"gray.600"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" onClick={() => handleCommentCancel()}>
                                    Cancel
                                </Button>
                                <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" isActive={typeof commentVal === "string" && replyCommentVal.trim().length === 0 > 0 ? true : false} >
                                    Comment
                                </Button>
                            </Flex>
                        </FormControl>
                    </Flex>
                </Collapse>
                {children}
            </Flex>
        </Flex>
    )
}

const CommentWithReplies = (props) => {

    const { comment, children, ...rest } = props

    const { isOpen: isReplyOpen, onToggle: onReplyToggle } = useDisclosure({ defaultIsOpen: false });

    return (
        <Comment onReplyToggle={onReplyToggle}  {...props}>
            <Box>
                <Button leftIcon={<MdKeyboardArrowDown size="24px" />} variant={"link"} color={"gray.400"} fontWeight={"semi-bold"} fontSize={16} size="sm" _hover={{ color: "gray.600" }} onClick={onReplyToggle} >
                    View Replies
                </Button>
            </Box>
            <Collapse in={isReplyOpen} animateOpacity>
                <Comment {...props} />
            </Collapse>
        </Comment>
    )
}

const CommentSection = (props) => {

    const { comments, ...rest } = props

    const [commentVal, setCommentVal] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const handleCommentCancel = () => {
        setCommentVal("")
        setIsFocused(false)

    }


    const processedComments = processComments(comments)


    return (
        <Flex w="100%" {...rest} direction={"column"} gap="5px">
            <Text>
                {comments.length} Comments
            </Text>
            <Flex w="100%" direction={"row"} gap="5px" >
                <Avatar h="40px" w="40px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <FormControl gap="5px">
                    <Textarea placeholder="Write a comment..." onChange={(e) => { setCommentVal(e.target.value) }} value={commentVal} onFocus={() => setIsFocused(true)} />
                    <Flex w="100%" justifyContent={"flex-end"} alignItems={"center"} gap={"10px"} mt="5px" display={isFocused ? "flex" : "none"}>
                        <Button variant={"ghost"} color={"gray.600"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" onClick={() => handleCommentCancel()}>
                            Cancel
                        </Button>
                        <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" isActive={typeof commentVal === "string" && commentVal.trim().length === 0 > 0 ? true : false} >
                            Comment
                        </Button>
                    </Flex>
                </FormControl>
            </Flex>
            <Flex w="100%" direction={"column"} gap="10px" mt="10px">
                <CommentWithReplies {...comment} />
                <Comment {...comment} />
            </Flex>
        </Flex>
    )
}

export default CommentSection