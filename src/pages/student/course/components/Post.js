import {
    Flex,
    Box,
    Avatar,
    Text,
    Heading,
    Divider,
    IconButton,
    Collapse,
    useDisclosure,
    Tag,
    TagLeftIcon,
    TagLabel,
    TagRightIcon,
    SimpleGrid,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react"

import generateTimeAgoString from "../../../../utils/timesAgo";
import LikeDislike from "../../../../components/student/contentWatch/CommentSection"

//icons
import { MdOutlineComment } from "react-icons/md"
import { PiChatCircleBold } from "react-icons/pi"
import { TbPinnedFilled } from "react-icons/tb"
import CommentSection from "../../../../components/student/contentWatch/CommentSection";
import { AiFillFlag } from "react-icons/ai";
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { PostViewModal } from "./Modals";
import { useEffect } from "react";

const CustomLikeDislike = (props) => {

    return (
        <LikeDislike
            bg="white"
            hover={{ bg: "none", color: "accent" }}
            iconSize="22px"
            buttonDivider={false}
            liked={null}
        />
    )
}

const MyTag = (props) => {

    const { tagLabel, leftIcon, rightIcon, color, ...rest } = props;

    return (
        <Box>
            <Tag bg={color + ".100"} color={color + ".500"} {...rest} borderRadius={"15px"}>
                {leftIcon ? <TagLeftIcon as={leftIcon} /> : null}
                <TagLabel>{tagLabel}</TagLabel>
                {rightIcon ? <TagRightIcon as={rightIcon} /> : null}
            </Tag>
        </Box>
    )
}


const Post = (props) => {

    const {
        post,
        onLoadMore,
        index,
        renderLimit = null,
        openComments = false,
        ...rest
    } = props;
    // const { user, title, message, posted_at, reactions, post_reactions, forum, comments, attachments } = post;

    //use Disclosure
    const { isOpen, onToggle, onOpen } = useDisclosure();

    useEffect(() => {
        if (openComments) {
            onOpen();
        }
    })


    return (
        <Box w="100%" bg="white" borderRadius={"10px"} boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px;"} px="10px" py="15px" {...rest} minH={"100px"}>
            <Flex w="100%" justifyContent={"space-between"} alignItems={"center"} direction="column" gap="15px" position={"relative"}>
                <SimpleGrid w="100%" columns={1} gap="10px">
                    <Flex w={"100%"} px="5px" justifyContent={"space-between"} alignItems={"flex-start"}>
                        <Flex justifyContent={"flex-start"} alignItems={"center"} gap={"10px"} direction={"row"}>
                            <Avatar h="40px" w="40px" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                            <Flex alignItems={"flex-start"} justifyContent={"center"} direction={"column"}>
                                <Text fontSize={"1rem"} fontWeight={"bold"} color={"#3f3f3f"}>
                                    {post.user.first_name} {post.user.last_name}
                                </Text>
                                <Text fontSize={12} fontWeight={"semi-bold"} color={"gray.600"}>
                                    {generateTimeAgoString(post.posted_at)}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={"10px"} direction={"row"}>
                            <MyTag leftIcon={TbPinnedFilled} tagLabel={"Pinned"} color={"red"} />
                            <Menu >
                                <MenuButton as={IconButton} size={"sm"} bg={"white"} icon={<SlOptions />} />
                                <MenuList>
                                    <MenuItem icon={<AiFillFlag />} >
                                        Report
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                    <Flex w="100%" direction={"column"} px="30px" gap="8px">
                        <Text textAlign={"left"} w="100%" fontSize={"1.2rem"} fontWeight={"bold"}>{post.title}</Text>
                        <Text fontWeight={"normal"} fontSize={"0.9rem"}>{post.message}</Text>
                    </Flex>
                    <Flex w="100%" direction={"row"} justifyContent={"space-between"} alignItems={"center"} px="15px">
                        <CustomLikeDislike />
                        <Flex
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                            gap={"10px"}
                            direction={"row"}
                            _hover={{ color: "accent" }}
                        >
                            <Text fontSize={"0.9rem"} fontWeight={"semi-bold"} color={"gray.400"} pointer={"pointer"}>
                                {post.reactions.comments} Comments
                            </Text>
                            <IconButton
                                icon={<PiChatCircleBold size="24px" fontWeight={500} />}
                                bg="none"
                                color={"gray.600"}
                                _hover={{ color: "accent" }}
                                onClick={onToggle}
                            />
                        </Flex>
                    </Flex>
                    {/* <Flex w={"100%"} gap={"10px"} as="comments" position={"relative"}> */}
                    <Collapse in={isOpen} animateOpacity w="100%">
                        <Divider />
                        <CommentSection
                            comments={post.comments}
                            w={"inherit"}
                            mt="10px"
                            commentLiking={false}
                            renderLimit={renderLimit}
                            onLoadMore={onLoadMore}
                            commentCount={3}
                            parentIndex={index}
                            commentStyles={{ bg: "gray.100", borderRadius: "10px" }}
                            type="post"
                            inputAvatar={false}
                        />
                    </Collapse>
                    {/* </Flex> */}
                </SimpleGrid>
            </Flex>
        </Box>
    )
}

export default Post