import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";

import ProfileSettings from "./ProfileSettings";
import SecurityInfo from "../../student/components/settings/SecurityInfo";

function SettingsLayout() {
  return (
    <Box w={'calc(100vw - 620px)'} mt={6}>
      <Text
        fontWeight={"semibold"}
        fontStyle={"Roboto"}
        fontSize={20}
        color={"#444444"}
        ml={10}
      >
        Admin Profile
      </Text>
      <Tabs pl={5} pr={5} mt={2} ml={2}>
        <TabList style={{ borderBottom: "none" }}>
          <Tab>Profile Settings</Tab>
          <Tab>Login & Security</Tab>
        </TabList>

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
