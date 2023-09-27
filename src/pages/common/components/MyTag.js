import React from 'react';
import { Box, Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react';

const MyTag = (props) => {

    const { tagLabel, leftIcon, rightIcon, color, ...rest } = props;

    return (
        <Box>
            <Tag bg={color + ".100"} color={color + ".500"} {...rest} borderRadius={"5px"} w={"max-content"}>
                {leftIcon ? <TagLeftIcon as={leftIcon} /> : null}
                <TagLabel>{tagLabel}</TagLabel>
                {rightIcon ? <TagRightIcon as={rightIcon} /> : null}
            </Tag>
        </Box>
    )
}

export default MyTag;