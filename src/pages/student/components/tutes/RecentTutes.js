import { Box, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import FilterTab from "../tabs/FilterTab";
import TuteCardList from "./TuteCardList";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const TUTE_ACTIVITY_URL = "stu/dash/tutes";

const cheerio = require("cheerio");

function RecentTutes() {
  const content = "<p>final test</p>";

  // Load the content into cheerio
  const $ = cheerio.load(content);

  // Remove all HTML tags and get plain text
  const plainText = $.text();

  console.log(plainText);

  const [focusedTab, setFocusedTab] = useState("Recent");
  const [recentTuteCards, setRecentTuteCards] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const getRecentTutes = async () => {
    try {
      const response = await axiosPrivate.get(TUTE_ACTIVITY_URL);
      console.log(response.data);
      setRecentTuteCards(response.data);

      recentTuteCards.forEach((tuteCard) => {
        const test = cheerio.load(tuteCard.content);
        tuteCard.content = test.text();
      });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(recentTuteCards)
  
  useEffect(() => {
    getRecentTutes();
  }, []);


  return (
    <Box
      shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      p={3}
      borderRadius={8}
      mt={3}
      bg={"#F2F2F2"}
    >
      <Text
        ml={3}
        mb={2}
        fontSize={18}
        fontWeight="bold"
        color={"#333333"}
        fontStyle="Roboto"
      >
        Tute overview
      </Text>

      <Flex ml={3}>
        <FilterTab
          bg={focusedTab === "Recent" ? "#383838" : "#C9C9C9"}
          color={focusedTab === "Recent" ? "#FFFFFF" : "#555555"}
          value={"Recent"}
          onclickHandler={setFocusedTab}
        />
        <FilterTab
          bg={focusedTab === "Suggested" ? "#383838" : "#C9C9C9"}
          color={focusedTab === "Suggested" ? "#FFFFFF" : "#555555"}
          value={"Suggested"}
          onclickHandler={setFocusedTab}
        />
      </Flex>
      <TuteCardList tuteList={recentTuteCards} />
    </Box>
  );
}

export default RecentTutes;
