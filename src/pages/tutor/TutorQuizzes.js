import { Box, Text, useDisclosure } from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { StatsGroup } from "../../components/Quizzes/StatsGroup";
import QuizzesTab from "../../components/Quizzes/QuizzesTab";
import McqCategoriesTab from "../../components/mcq/McqCategoriesTab";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import QuizCreateForm from "../../components/Quizzes/QuizCreateForm";

export default function TutorQuizzes() {
  const tabFontSize = "17px";

  const {
    isOpen: isNewQuizPopupOpen,
    onOpen: onNewQuizPopupOpen,
    onClose: onNewQuizPopupClose,
  } = useDisclosure();

  return (
    <Box w="100%">
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="25px"
        paddingTop="15px"
      >
        Overview
      </Text>
      <StatsGroup />
      <ModalPopupCommon
        isOpen={isNewQuizPopupOpen}
        onOpen={onNewQuizPopupOpen}
        onClose={onNewQuizPopupClose}
        modalHeader={"Create a quiz"}
        modalBody={<QuizCreateForm onClose={onNewQuizPopupClose} />}
        size={"2xl"}
      />

      <Tabs mt="10px">
        <TabList mb="">
          <Tab fontSize={tabFontSize} fontWeight={500}>
            Quizzes
          </Tab>
          <Tab fontSize={tabFontSize} fontWeight={500}>
            MCQ Categories
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <QuizzesTab onOpen={onNewQuizPopupOpen} />
          </TabPanel>
          <TabPanel>
            <McqCategoriesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
