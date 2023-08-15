import { Box, Image, Text, Flex } from "@chakra-ui/react";
import React from "react";

import Profile from "../../../../assests/images/profile.jpg";
import { useAdminsInfo } from "../../../../store/admin/useAdminsInfo";

function ProfileCard({ profile }) {

  const {
    setSelectedAdmin
  } = useAdminsInfo();

  const handleSelect = () => {
    console.log(profile.username)
    setSelectedAdmin(profile)
  }
  
  return (
    <Box
      boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
      p={3}
      w={240}
      h={270}
      borderRadius={8}
      mb={3}
      cursor={"pointer"}
      onClick={handleSelect}
    >
      <Flex justifyContent={"center"}>
        <Image
          src={Profile}
          w={36}
          h={36}
          borderRadius={"50%"}
          objectFit={"cover"}
          mb={5}
        />
      </Flex>
      <Box>
        <Flex justifyContent={"center"}>
          <Box>
            <Text
              fontWeight={"semibold"}
              fontStyle={"Roboto"}
              fontSize={18}
              color={"#444444"}
              textAlign={"center"}
            >
              {`${profile.first_name} ${profile.last_name}`}
            </Text>
            <Text
              textAlign={"center"}
              fontWeight={"normal"}
              fontStyle={"Roboto"}
              fontSize={13}
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
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default ProfileCard;
