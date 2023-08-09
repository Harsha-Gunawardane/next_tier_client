import { Flex, Text, Avatar, Button, FormControl, Box, Collapse, useDisclosure, Tag, TagLeftIcon, TagLabel, SimpleGrid, GridItem, Skeleton, SkeletonText, SkeletonCircle, IconButton, MenuButton, Menu, MenuList, MenuItem, Center } from "@chakra-ui/react"
import { Textarea } from "@mantine/core"
import generateTimeAgoString from "../../../utils/timesAgo"
import LikeDislike from "./LikeDislike"
import { useEffect, useRef, useState, Fragment } from "react"
import { axiosPrivate } from "../../../api/axios"

// import Xarrow from "react-xarrows";



//icons
import { MdKeyboardArrowDown } from "react-icons/md"
import { VscMention } from "react-icons/vsc"
import MentionComment from "./MentionComment"
import { SlOptionsVertical } from "react-icons/sl"
import { AiFillFlag } from "react-icons/ai"
import { FaPlus } from "react-icons/fa6"
import { BiSolidSend } from "react-icons/bi"



const renderCommentWithMentions = (comment) => {
    const mentionsRegex = /\@\[(.*?)\]\((.*?)\)/g;
    const mentions = comment.match(mentionsRegex) || [];

    let lastIndex = 0;
    const commentWithTags = [];

    // Iterate over mentions and split the comment text using mentions as delimiters
    mentions.forEach((mention) => {
        const mentionIndex = comment.indexOf(mention, lastIndex);
        if (mentionIndex !== -1) {
            const partBeforeMention = comment.slice(lastIndex, mentionIndex);
            const mentionData = mention.match(/\@\[(.*?)\]\((.*?)\)/);
            const displayText = mentionData ? mentionData[1] : '';

            commentWithTags.push(<Fragment key={mentionIndex}>{partBeforeMention}</Fragment>);
            commentWithTags.push(
                <Tag background={"gray.200"} color={"#3f3f3f"} variant="subtle" mx={1} px="1px" pr="3px">
                    <TagLeftIcon as={VscMention} boxSize={"18px"} mr="0" size={"16px"} />                    {displayText}
                </Tag>
            );

            lastIndex = mentionIndex + mention.length;
        }
    });

    // Add the remaining part of the comment text after the last mention
    if (lastIndex < comment.length) {
        commentWithTags.push(
            <Fragment key={lastIndex}>
                {comment.slice(lastIndex)}
            </Fragment>
        );
    }

    return commentWithTags;
};

const sortCommentsArrByDate = (commentsArr, order) => {
    if (order === "asc") {
        commentsArr.sort((a, b) => {
            return new Date(a.posted_at) - new Date(b.posted_at)
        })
    } else if (order === "desc") {
        commentsArr.sort((a, b) => {
            return new Date(b.posted_at) - new Date(a.posted_at)
        })
    }
    return commentsArr
}




const Comment = (props) => {

    const {
        comment,
        keyVal,
        commentsArr,
        updateComments,
        setParentComment,
        likes = true,
        type = "content",
        ...rest
    } = props

    //commentDetails state
    const [commentDetails, setCommentDetails] = useState(comment)

    //reply state
    const [replyCommentVal, setReplyCommentVal] = useState("")
    const [mentions, setMentions] = useState([])
    const [mentionUsers, setMentionUsers] = useState()
    const [lastAddedMentionIndex, setLastAddedMentionIndex] = useState(0)

    //element states
    const [hover, setHover] = useState(false)
    const [isFocused, setIsFocused] = useState(true)
    const [isRepliesLoaded, setIsRepliesLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
    const { isOpen: isReplyOpen, onOpen: onReplyOpen, onToggle: onReplyToggle } = useDisclosure({ defaultIsOpen: false });

    //element refs
    const commentAvatarRef = useRef(null)

    //pagination states
    const [skip, setSkip] = useState(0)
    const [exceptions, setExceptions] = useState([])
    const limit = 5

    useEffect(() => {
        if (commentDetails.parent_id === null && commentDetails.replies.length > 0) {
            setIsRepliesLoaded(true)
        }
        setMentionUsers([{ id: commentDetails.commenter.id, display: commentDetails.commenter.first_name + " " + commentDetails.commenter.last_name }])
        getMentionUsers()
    }, [commentDetails])


    const getMentionUsers = () => {
        commentDetails.replies && commentDetails.replies.length > 0 ?
            //start from the last added mention index
            commentDetails.replies.slice(lastAddedMentionIndex).forEach(reply => {
                setMentionUsers((prevState) => {
                    var newState = prevState
                    //push unique users
                    if (!newState.find(user => user.id === reply.commenter.id)) {
                        //{id: 1, display: "John Doe"}
                        newState.push({ id: reply.commenter.id, display: reply.commenter.first_name + " " + reply.commenter.last_name })
                    }
                    return newState
                })
            })
            : <></>
    }

    const handleReplyToggle = async () => {
        onReplyToggle()
        if (commentDetails._count.replies > commentDetails.replies.length) {
            setIsLoading(true)
            await fetchReplies();
            setIsRepliesLoaded(true)
            setIsLoading(false)
        }
    }

    const fetchReplies = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.patch(`/comments/${commentDetails.id}/replies/?skip=${skip}&limit=${limit}`, { except: exceptions }, {
                signal: controller.signal
            })

            const commentReplies = response.data

            setSkip(skip + (commentReplies.length))

            if (isMounted) {
                if (commentDetails.parent_id === null) {
                    setCommentDetails((prevState) => {
                        prevState.replies.push(...commentReplies)
                        return prevState
                    })
                }
                else {
                    setParentComment((prevState) => {
                        prevState.replies.push(...commentReplies)
                        return prevState
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleReplyInputToggle = () => {
        onToggle()
        if (commentDetails.parent_id !== null && isOpen === false) {
            setReplyCommentVal("@[" + commentDetails.commenter.first_name + " " + commentDetails.commenter.last_name + "](" + commentDetails.commenter.id + ") ")
        }
    }


    const handleCommentCancel = () => {
        setReplyCommentVal("")
        onToggle()
    }

    const addReply = async () => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const formData = new FormData()
            formData.append("message", replyCommentVal)
            formData.append("parent_id", commentDetails.parent_id)
            formData.append("replied_to", commentDetails.commenter.id)

            const response = await axiosPrivate.post(`/comments/${commentDetails.id}/replies`, formData, {
                signal: controller.signal
            })

            const newComment = response.data.data


            if (commentDetails.parent_id === null) {
                setCommentDetails((prevState) => {
                    const newState = { ...prevState }
                    newState.replies.push(newComment)
                    newState._count.replies += 1
                    return newState
                })
            } else {
                setParentComment((prevState) => {
                    const newState = { ...prevState }
                    newState.replies.push(newComment)
                    newState._count.replies += 1
                    return newState
                })
            }


            // handleReplyToggle()
            setExceptions((prevState) => { var newState = prevState; newState.push(newComment.id); return newState })
            onReplyOpen()
            fetchReplies()
            setReplyCommentVal("")
            setIsLoading(false)
            setIsRepliesLoaded(true)
            onToggle()




        } catch (error) {
            console.log(error)
        }
    }


    return (
        <SimpleGrid w="100%" gap="5px" position={"relative"} columns={12} templateColumns={"max-content repeat(11, 1fr)"} px="5px" {...rest}>
            {/* <Flex w="100%" direction={"row"} gap="5px" p="5px" > */}
            <GridItem colSpan={1} w="max-content" pt="5px">
                <Avatar id={"avatar-" + commentDetails.id} h="32px" w="32px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </GridItem>
            <GridItem colSpan={11} px="5px" >
                <Flex w="100%" direction={"column"} gap="6px">
                    <Flex w="100%" direction="column" gap="10px" p="5px" borderRadius={"10px"} onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} position={"relative"}>
                        <Box w={"100%"}>
                            <Flex w="100%" alignItems={"center"} gap="10px">
                                <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3f3f3f"}>
                                    {commentDetails.commenter ? `${commentDetails.commenter.first_name} ${commentDetails.commenter.last_name}` : null}
                                </Text>
                                <Text fontSize={12} fontWeight={"semi-bold"} color={"gray.500"} >
                                    {generateTimeAgoString(commentDetails.posted_at)}
                                </Text>
                            </Flex>
                            <Text fontSize={"1rem"} fontWeight={"semi-bold"} color={"#3f3f3f"} w="100%" mt="5px">
                                {renderCommentWithMentions(commentDetails.message)}
                            </Text>
                        </Box>
                        <Flex gap="10px" >
                            {likes ? <LikeDislike
                                likeCount={commentDetails._count.comment_reactions}
                                liked={commentDetails.comment_reactions.length > 0 ? commentDetails.comment_reactions[0].islike : null}
                                type={"comments"}
                                // refid={commentDetails.id}
                                buttonDivider={false}
                            /> : <></>}
                            <Button variant={"link"} color={"gray.400"} fontWeight={"semi-bold"} fontSize={16} size="sm" _hover={{ color: "gray.600" }} onClick={handleReplyInputToggle} px={0}>
                                Reply
                            </Button>
                        </Flex>
                        <Menu >
                            <MenuButton as={IconButton} size={"sm"} bg={"white"} icon={<SlOptionsVertical />} position={"absolute"} top={0} right={0} display={hover ? "flex" : "none"} />
                            <MenuList>
                                <MenuItem icon={<AiFillFlag />} >
                                    Report
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                    <Collapse in={isOpen} animateOpacity width="100%">
                        <SimpleGrid w="100%" gap="5px" position={"relative"} columns={12} templateColumns={"max-content repeat(11, 1fr)"}>
                            <GridItem colSpan={1} w="max-content">
                                <Avatar h="24px" w="24px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                            </GridItem>
                            <GridItem colSpan={11} px="5px">
                                <FormControl gap="5px" w="100%">
                                    {/* <Textarea placeholder="Write a comment..." onChange={(e) => { setReplyCommentVal(e.target.value) }} value={replyCommentVal} onFocus={() => setIsFocused(true)} /> */}
                                    <MentionComment
                                        setReplyCommentVal={setReplyCommentVal}
                                        value={replyCommentVal}
                                        setIsFocused={setIsFocused}
                                        mentionUsers={mentionUsers}
                                        setMentionUsers={setMentionUsers}
                                        mentions={mentions}
                                        setMentions={setMentions}
                                    />
                                    <Flex w="100%" justifyContent={"space-between"} alignItems={"center"} mt="5px" display={isFocused ? "flex" : "none"}>
                                        <Flex gap={"10px"}>

                                        </Flex>
                                        <Flex gap={"10px"} >
                                            <Button variant={"ghost"} color={"gray.600"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" onClick={() => handleCommentCancel()} >
                                                Cancel
                                            </Button>
                                            <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" isDisabled={replyCommentVal !== "" ? false : true} onClick={() => addReply()} type="submit">
                                                Reply
                                            </Button>
                                        </Flex>
                                    </Flex>
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                    </Collapse>
                    {commentDetails._count.replies > 0 ?
                        <Flex w="100%" direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"}>
                            {/* <Box> */}
                            <Button
                                leftIcon={
                                    <MdKeyboardArrowDown
                                        size="24px"
                                        style={{
                                            transform: isReplyOpen ? "rotate(-180deg)" : "rotate(0deg)",
                                            transition: "transform 0.3s ease-in-out"
                                        }}
                                    />
                                }
                                isLoading={isLoading}
                                loadingText={"View Replies • " + commentDetails._count.replies}
                                variant={"link"}
                                color={"blue.400"}
                                fontWeight={"semi-bold"}
                                fontSize={16}
                                size="sm"
                                _hover={{ color: "blue.500" }}
                                onClick={handleReplyToggle}
                            >
                                View Replies • {commentDetails._count.replies}
                            </Button>
                            {/* </Box> */}
                            <Box position={"relative"} w="100%">
                                <Collapse in={isReplyOpen} animateOpacity>
                                    {isRepliesLoaded && commentDetails.replies.length > 0
                                        ? commentDetails.replies.map((reply, index) => (
                                            <Comment key={reply.id} comment={reply} setParentComment={setCommentDetails} />
                                        ))
                                        :
                                        <Flex w="100%" direction={"row"} gap="10px" p="10px" >
                                            <SkeletonCircle size="10" />
                                            <SkeletonText noOfLines={3} w="90%" mt="5px" />
                                        </Flex>
                                    }
                                </Collapse>
                            </Box>
                        </Flex>
                        : <></>
                    }

                </Flex>
            </GridItem>
            {/* </Flex > */}
        </SimpleGrid>
    )
}


const CommentSection = (props) => {

    const {
        comments,
        commentCount,
        sectionId,
        setParentDetails,
        commentLiking = true,
        renderLimit = null,
        type = "content",
        onLoadMore = null,
        parentIndex = null,
        inputAvatar = true,
        ...rest
    } = props

    const [commentsArr, setCommentsArr] = useState([])
    const [commentVal, setCommentVal] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const [exceptions, setExceptions] = useState([])
    const [skip, setSkip] = useState(comments.length)
    const limit = 10


    useEffect(() => {
        setCommentsArr(comments)
    }, [comments])

    const handleCommentCancel = () => {
        setCommentVal("")
        setIsFocused(false)
    }

    const fetchComments = async (sectionId, skip, limit) => {
        let isMounted = true;
        const controller = new AbortController();

        try {
            const response = await axiosPrivate.get(`/content/${sectionId}/comment/?skip=${skip}&limit=${limit}`, {
                signal: controller.signal
            })

            const commentsWithCount = response.data
            const commentsOnly = commentsWithCount.comments

            setSkip(skip + (commentsOnly.length))

            if (isMounted) {
                setCommentsArr((prevState) => {
                    const newState = [...prevState, ...commentsOnly]
                    console.log(newState)
                    return newState
                })

                setParentDetails((prevState) => {
                    const newState = prevState
                    newState.comments = [commentsArr]
                    console.log(newState)
                    return newState
                })
            }


        } catch (error) {
            console.log(error)
        }
    }


    const addComment = async () => {
        try {
            const formData = new FormData();
            formData.append("message", commentVal);

            const CONTENT_COMMENT_URL = `/content/${sectionId}/comment`;
            const POST_COMMENT_URL = `/forum/${sectionId}/comment`;

            var url;

            switch (type) {
                case "content":
                    url = CONTENT_COMMENT_URL;
                    break;
                case "forum":
                    url = POST_COMMENT_URL;
                    break;
                default:
                    url = CONTENT_COMMENT_URL;
                    break;
            }



            const response = await axiosPrivate.post(url, formData);
            const newComment = response.data.data;

            await setCommentsArr((prevState) => {
                const newState = [...prevState];
                newState.unshift(newComment);
                console.log(newState);
                return newState;
            });

            await setParentDetails((prevState) => {
                const newState = { ...prevState };
                newState.comments = commentsArr;
                console.log(newState);
                return newState;
            });


            await setExceptions((prevState) => {
                var newState = prevState;
                newState.push(newComment.id);
                return newState;
            });

            setCommentVal("");
            setIsFocused(false);

        } catch (error) {
            console.log(error);
        }
    };

    var iteratorCount = 0


    return (
        <Flex w="100%" direction={"column"} gap="5px" px="10px" {...rest}>
            <Text>
                {commentCount} Comments
            </Text>
            <Flex w="100%" direction={"row"} gap="5px" my="10px">
                {inputAvatar ? <Avatar h="40px" w="40px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" /> : <></>}
                <FormControl gap="5px" position={"relative"}>
                    <Box
                        position={"relative"}
                        mx={inputAvatar ? "0px" : "15px"}
                    >
                        <Textarea
                            placeholder="Write a comment..."
                            radius="md"
                            size="md"
                            onChange={(e) => { setCommentVal(e.target.value) }}
                            value={commentVal}
                            onFocus={() => setIsFocused(true)}
                            rightSection={MdKeyboardArrowDown}
                            height={"20px"}
                        />
                        {type === "post" ?
                            <IconButton
                                icon={<BiSolidSend />}
                                bg={"accent"}
                                color={"white"}
                                position={"absolute"}
                                bottom={"5px"}
                                right={"5px"}
                                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                                _hover={{ color: "white", bg: "accent" }}
                                size={"sm"}
                                isDisabled={commentVal !== "" ? false : true}
                                onClick={addComment}
                            />
                            :
                            <Flex w="100%" justifyContent={"flex-end"} alignItems={"center"} mt="5px" gap={"10px"} display={isFocused ? "flex" : "none"}>
                                <Button variant={"ghost"} color={"gray.600"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" onClick={() => handleCommentCancel()}>
                                    Cancel
                                </Button>
                                <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" isDisabled={commentVal !== "" ? false : true} onClick={addComment} >
                                    Comment
                                </Button>
                            </Flex>
                        }
                    </Box>

                    {/* <Button variant={"solid"} bg={"accent"} color={"white"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={16} size="sm" isDisabled={commentVal !== "" ? false : true} onClick={addComment}
                        position={"absolute"}
                        right={2}
                        top={2}
                        display={isFocused ? "" : "flex"}
                    >
                        Comment
                    </Button> */}
                </FormControl>
            </Flex>
            <Flex w="100%" direction={"column"} gap="15px" mt="10px">

                {commentsArr.length > 0 ? commentsArr.map((commentDetails, index) => {
                    if (renderLimit !== null && iteratorCount < renderLimit) {
                        iteratorCount += 1
                        return <Comment key={commentDetails.id} keyVal={index} comment={commentDetails} updateComments={setCommentsArr} likes={commentLiking} />
                    }
                    else if (renderLimit === null) {
                        return <Comment key={commentDetails.id} keyVal={index} comment={commentDetails} updateComments={setCommentsArr} likes={commentLiking} />
                    };
                })
                    : <Center>No Comments yet. Be the first to comment</Center>
                }

            </Flex>
            {console.log(commentsArr.length, commentCount, renderLimit, iteratorCount)}
            {(commentsArr.length < commentCount) || (renderLimit !== 0 && iteratorCount < commentCount) ?
                <Flex w="100%" justifyContent={"center"} alignItems={"center"} my="10px">
                    <Button variant={"ghost"} color={"gray.400"} colorScheme='blue' fontWeight={"semi-bold"} fontSize={12} size="xs" onClick={() => onLoadMore ? onLoadMore(parentIndex) : fetchComments(sectionId, skip, limit)} >
                        View More Comments
                    </Button>
                </Flex>

                : <></>
            }



        </Flex>
    )
}

export default CommentSection