import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";

import Profile from "../../assests/images/profile.jpg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useProfile } from "../../store/parent/useProfile";
import SettingsLayout from "./components/SettingsLayout";

const PARENT_PROFILE_URL = "/parent/profile";

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const { setParentProfile, parentProfile } = useProfile();

  const getProfileInfo = async () => {
    try {
      const response = await axiosPrivate.get(PARENT_PROFILE_URL);
      setParentProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  console.log(parentProfile);
  return (
    <Box>
      {/* <Flex> */}
      {/* <Flex justifyContent={"center"}>
          <Image
            w={36}
            h={36}
            borderRadius={8}
            objectFit={"cover"}
            src={Profile}
          />
        </Flex> */}
      <SettingsLayout />
      {/* </Flex> */}
    </Box>
  );
}

export default Settings;
