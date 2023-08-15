import React, { useEffect, useState } from "react";
import SelectedProfile from "./components/SelectedProfile";
import { Flex } from "@chakra-ui/react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SettingsLayout from "./components/SettingsLayout"
import { useProfile } from "../../store/admin/useProfile";

const ADMIN_URL = "/admin";

function Settings() {
  const axiosPrivate = useAxiosPrivate();

  const { profile, setProfile } = useProfile();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axiosPrivate.get(ADMIN_URL);
        console.log(response?.data?.data?.qualifications);

        setProfile(response?.data?.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    console.log(profile)
  }, [profile])

  return (
    <Flex gap={3}>
      <SelectedProfile profile={profile} />
      <SettingsLayout />
    </Flex>
  );
}

export default Settings;
