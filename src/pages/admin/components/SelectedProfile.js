import { Box, Image, Text, Textarea, Flex } from "@chakra-ui/react";
import React from "react";
import { Indicator } from "@mantine/core";

import Profile from "../../../assests/images/profile.jpg";
import Qualification from "./cards/Qualification";

function SelectedProfile({ profile }) {

  console.log(profile);
  return (
    <Box mt={28} ml={10}>
      <Indicator
        position="top-center"
        inline
        color="white"
        label={
          <Box borderRadius={"50%"} border={"5px solid #0074D9"}>
            <Image
              objectFit={"cover"}
              borderRadius={"50%"}
              w={36}
              h={36}
              src={Profile}
            />
          </Box>
        }
        size={28}
      >
        <Box
          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
          p={5}
          pt={24}
          pb={10}
          w={300}
          h={540}
          overflowY={"scroll"}
          borderRadius={8}
          bg={"#E9E9E9"}
        >
          <Box>
            <Flex justifyContent={"center"}>
              <Box>
                <Text
                  fontWeight={"semibold"}
                  fontStyle={"Roboto"}
                  fontSize={22}
                  color={"#444444"}
                  textAlign={"center"}
                >
                  {`${profile.first_name} ${profile.last_name}`}
                </Text>
                <Text
                  textAlign={"center"}
                  fontWeight={"normal"}
                  fontStyle={"Roboto"}
                  fontSize={14}
                  color={"#333333"}
                >
                  {profile.username}
                </Text>
                <Flex justifyContent={"center"}>
                  <Text
                    bg={"#383838"}
                    color={"#FFFFFF"}
                    pl={5}
                    pr={5}
                    pt={2}
                    pb={2}
                    mt={3}
                    mb={2}
                    borderRadius={5}
                    fontSize={14}
                  >
                    {`${profile.admin_role} Administrator`}
                  </Text>
                </Flex>
                <Text
                  mt={3}
                  ontWeight={"normal"}
                  fontStyle={"Roboto"}
                  fontSize={13}
                  color={"#555555"}
                >
                  Phone no:
                </Text>
                <Flex justifyContent={"center"} gap={3}>
                  <Box>
                    <Text
                      ontWeight={"normal"}
                      fontStyle={"Roboto"}
                      fontSize={14}
                      color={"#333333"}
                    >
                      {profile.phone_number}
                    </Text>
                    <Text
                      ontWeight={"normal"}
                      fontStyle={"Roboto"}
                      fontSize={14}
                      color={"#333333"}
                    >
                      {profile.emergency_No}
                    </Text>
                  </Box>
                </Flex>
                <Text
                  mt={3}
                  ontWeight={"normal"}
                  fontStyle={"Roboto"}
                  fontSize={13}
                  color={"#555555"}
                >
                  Address:
                </Text>
                <Text
                  ontWeight={"normal"}
                  fontStyle={"Roboto"}
                  fontSize={14}
                  color={"#333333"}
                  textAlign={"center"}
                >
                  {profile.address}
                </Text>
                <Text
                  mt={3}
                  mb={1}
                  ontWeight={"normal"}
                  fontStyle={"Roboto"}
                  fontSize={13}
                  color={"#555555"}
                >
                  Qualifications:
                </Text>
                <Flex justifyContent={"center"}>
                  <Box>
                    {profile.qualifications && profile.qualifications.map((qualification) => {
                      return (
                        <Qualification qualification={qualification} />
                      )
                    })}
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Indicator>
    </Box>
  );
}

export default SelectedProfile;
