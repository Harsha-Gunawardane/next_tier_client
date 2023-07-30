import React, { useEffect, useState } from 'react';
import { Flex, Button, Text, IconButton, Box } from '@chakra-ui/react';
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from 'react-icons/bi';
import { set } from 'date-fns';

const LikeDislike = (props) => {

    const { liked, disliked, likeCount, ...rest } = props;

    const [like, setLike] = useState(liked);
    const [dislike, setDislike] = useState(disliked);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        // console.log(like);
    });


    const handleLike = () => {
        if (dislike) {
            setDislike(!dislike);
            setLikes(likes + 1);
        } else if (!like) {
            setLikes(likes + 1);
        } else if (like) {
            setLikes(likes - 1);
        }
        setLike(!like);
    }

    const handleDislike = () => {
        if (like) {
            setLike(!like);
            handleLike();
        }
        setDislike(!dislike);
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
            bg={"gray.200"}
            overflow={"hidden"}
        >
            <Box _hover={{ bg: "gray.300" }}>
                <Button
                    {...buttonProps}
                    leftIcon={like && !dislike ? <BiSolidLike size={"17px"} /> : <BiLike size={"17px"} />}
                    onClick={() => {
                        handleLike();
                    }}
                    color={like ? "accent" : "gray.600"}
                    borderRight={"1px solid"}
                    borderColor={"gray.400"}
                >
                    {likes > 0 ? <Text>{likes}</Text> : <Text>Like</Text>}
                </Button>
            </Box>
            <Box _hover={{ bg: "gray.300" }}>
                <IconButton
                    {...buttonProps}
                    icon={dislike && !like ? <BiSolidDislike size={"17px"} /> : <BiDislike size={"17px"} />}
                    onClick={() => {
                        handleDislike();
                    }}
                    color={dislike ? "red.600" : "gray.600"}
                />
            </Box>
        </Flex >
    )

}

export default LikeDislike;