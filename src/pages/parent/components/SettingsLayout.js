import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";

import ProfileSettings from "./ProfileSettings";
import SecurityInfo from "../../student/components/settings/SecurityInfo";
import Profile from "../../../assests/images/profile.jpg";

function SettingsLayout() {
  
  return (
    <Box w={"calc(100vw - 620px)"} mt={6}>
      <Text
        fontWeight={"semibold"}
        fontStyle={"Roboto"}
        fontSize={20}
        color={"#444444"}
        ml={10}
      >
        Parent Profile
      </Text>
      <Flex>
        <Image
          cursor={"pointer"}
          ml={10}
          mt={3}
          w={36}
          h={36}
          borderRadius={8}
          objectFit={"cover"}
          src={Profile}
        />
      </Flex>
      <Tabs pl={5} pr={5} mt={2} ml={2}>
        <Flex>
          <TabList style={{ borderBottom: "none" }}>
            <Tab>Profile Settings</Tab>
            <Tab>Login & Security</Tab>
          </TabList>
        </Flex>

        <TabPanels>
          <TabPanel>
            <ProfileSettings />
          </TabPanel>
          <TabPanel>
            <SecurityInfo />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SettingsLayout;
