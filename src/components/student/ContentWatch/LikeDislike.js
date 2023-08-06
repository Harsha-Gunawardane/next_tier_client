import React, { useEffect, useState } from 'react';
import { Flex, Button, Text, IconButton, Box } from '@chakra-ui/react';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { set } from 'date-fns';
import { axiosPrivate } from '../../../api/axios';

const LikeDislike = (props) => {

    const { liked, likeCount, refid, type, ...rest } = props;

    const [like, setLike] = useState();
    const [dislike, setDislike] = useState();
    const [likes, setLikes] = useState(likeCount);

    useEffect(() => {
        setLike(() => liked === null ? null : liked);
        setDislike(() => liked === null ? null : !liked);
    }, [liked]);


    const handleLike = () => {
        try {
            handleReact(type, true)
            if (dislike) {
                setDislike(!dislike);
                setLikes(likes + 1);
            } else if (!like) {
                setLikes(likes + 1);
            } else if (like) {
                setLikes(likes - 1);
            }
            setLike(!like);
        } catch (error) {
            console.log(error)
        }

    }

    const handleDislike = () => {
        try {
            handleReact(type, false)
            if (like) {
                setLike(!like);
                handleLike();
            }
            setDislike(!dislike);
        } catch (error) {
            console.log(error)
        }

    }

    const handleReact = async (type, reaction) => {
        let isMounted = true;
        const controller = new AbortController();


        try {
            const formData = new FormData()
            formData.append("islike", JSON.stringify(reaction))

            var REACTION_API = `/${type}/${refid}/react`
            console.log(REACTION_API)
            console.log(type)
            const response = await axiosPrivate.post(REACTION_API, formData, {
                signal: controller.signal,
                content_type: "multipart/form-data"
            })

            const commentReaction = response.data ? response.data : null

            if (isMounted) {
                return true;
            }

        } catch (error) {
            console.log(error)
            throw error;
        }
    }


    const buttonProps = {
        variant: "ghost",
        margin: 0,
        h: "100%",
        minWidth: "max-content",
        p: "10px",
        "_hover": "none",
        padding: "10px",
        borderRadius: "0px",
        size: "lg",
        h: "30px",
        w: "30px",
        ...rest
    }


    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"max-content"}
            h={"max-content"}
            borderRadius={"20px"}
            bg={"gray.100"}
            overflow={"hidden"}
        >
            <Box _hover={{ bg: "gray.300" }}>
                <Button
                    {...buttonProps}
                    leftIcon={like && !dislike ? <BiSolidLike size={"17px"} /> : <BiLike size={"17px"} />}
                    onClick={() => {
                        // handleReact()
                        handleLike();
                    }}
                    color={like ? "accent" : "gray.600"}
                    borderRight={"1px solid"}
                    borderColor={"gray.400"}
                >
                    {likes > 0 ? <Text fontSize={"0.9rem"}>{likes}</Text> : <Text fontSize={"0.9rem"}>Like</Text>}
                </Button>
            </Box>
            <Box _hover={{ bg: "gray.300" }}>
                <IconButton
                    {...buttonProps}
                    icon={dislike && !like ? <BiSolidDislike size={"17px"} /> : <BiDislike size={"17px"} />}
                    onClick={() => {
                        // handleReact()
                        handleDislike();
                    }}
                    color={dislike ? "red.600" : "gray.600"}
                />
            </Box>
        </Flex >
    )

}

export default LikeDislike;