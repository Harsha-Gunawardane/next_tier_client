import { Box, Text, useDisclosure } from "@chakra-ui/react";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import { StatsGroup } from "../../components/Quizzes/StatsGroup";
import QuizzesTab from "../../components/Quizzes/QuizzesTab";
import McqCategoriesTab from "../../components/mcq/McqCategoriesTab";
import ModalPopupCommon from "../../components/Quizzes/ModalPopupCommon";
import QuizCreateForm from "../../components/Quizzes/QuizCreateForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

export default function TutorQuizzes() {

  const tabFontSize = "17px";

  const axiosPrivate = useAxiosPrivate();
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");

  const {
    isOpen: isNewQuizPopupOpen,
    onOpen: onNewQuizPopupOpen,
    onClose: onNewQuizPopupClose,
  } = useDisclosure();

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/quizzes");
        setQuizzes(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getQuizzes();
  }, []);

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
        modalBody={
          <QuizCreateForm
            onClose={onNewQuizPopupClose}
            quizzes={quizzes}
            setQuizzes={setQuizzes}
          />
        }
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
            <QuizzesTab
              onOpen={onNewQuizPopupOpen}
              quizzes={quizzes}
              search={search}
              setSearch={setSearch}
            />
          </TabPanel>
          <TabPanel>
            <McqCategoriesTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
