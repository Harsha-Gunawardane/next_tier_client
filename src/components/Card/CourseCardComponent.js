import { Box, Flex, Text, useColorModeValue, Button, Divider, Avatar, Badge, Image, Stack, Heading } from "@chakra-ui/react";
import React from "react";

function CourseCardComponent({ props }) {
  const textColorPrimary = useColorModeValue("gray.900", "white");
  const textColorSecondary = "gray.600";

  return (
    <Box width={270} border={`0.05px solid ${props.borderColor}`} borderRadius={props.borderRadius}>
      <Box padding={0}>
        <Image src={props.Courseimg} alt='Course Image' />
      </Box>

      <Stack mt='4' spacing='3' textColor={textColorPrimary}>
        <Flex justify="space-between">
          <Box>
            <Heading size='md' fontSize={20} paddingLeft={4} >
              {props.title1}
            </Heading>
          </Box>
          <Box paddingRight={4} display="Flex" flexDirection="column" alignItems="center" >
            <Box>
              <Text fontSize={12}>{props.title2}</Text>
            </Box>
            <Box>
              <Badge variant='solid' colorScheme={props.colorBadge1} >
                {props.studypackID}
              </Badge>
            </Box>
          </Box>
        </Flex>
        <Divider></Divider>
        <Flex gap={3} marginLeft={4}>
          <Box>
            <Avatar src={props.avatar}></Avatar>
          </Box>
          <Box>
            <Text fontSize={13} fontWeight='bold' >
              {props.name}
            </Text>
            <Text fontSize={10} textColor={textColorSecondary}>
              {props.description}
            </Text>
            <Text fontSize={11} textColor={textColorPrimary} fontWeight={props.fontWeight}>
              {props.monthly_fee} per month
            </Text>

            <Badge variant='solid' colorScheme={props.colorBadge2}>
              {props.badgeContent}
            </Badge>

          </Box>
        </Flex>
      </Stack>

      <Box padding={0} paddingTop={3}>
        {props.buttonText && props.onButtonClick && (
          <Button
            width='100%'
            colorScheme='blue'
            borderTopRightRadius={0}
            borderTopLeftRadius={0}
            onClick={props.onButtonClick}
          >
            {props.buttonText}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default CourseCardComponent;
