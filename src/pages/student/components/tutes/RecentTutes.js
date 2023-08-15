import { Box, Text, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import FilterTab from "../tabs/FilterTab";
import TuteCard from "../cards/TuteCard";
import truncate from "../../../../utils/truncateString";
import TuteCardList from "./TuteCardList";

function RecentTutes() {
  const [focusedTab, setFocusedTab] = useState("Recent");

  const recentCards = [
    {
      title: truncate("Important of Power", 12),
      time: "24 min ago",
      icon: <AiFillStar color="#ECC330" fontSize={22} />,
      content: truncate(
        "Overview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk though and close checklist and one it search title and find it so now",
        170
      ),
    },
    {
      title: truncate("Important of Power", 12),
      time: "24 min ago",
      icon: <AiFillStar color="#ECC330" fontSize={22} />,
      content: truncate(
        "Overview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk though and close checklist and one it search title and find it so now",
        170
      ),
    },
    {
      title: truncate("Important of Power", 12),
      time: "24 min ago",
      icon: <AiFillStar color="#ECC330" fontSize={22} />,
      content: truncate(
        "Overview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk though and close checklist and one it search title and find it so now",
        170
      ),
    },
    {
      title: truncate("Important of Power", 12),
      time: "24 min ago",
      icon: <AiFillStar color="#ECC330" fontSize={22} />,
      content: truncate(
        "Overview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk thoughOverview everithing is here ti for final waslk though and close checklist and one it search title and find it so now",
        170
      ),
    },
  ];
  return (
    <Box
      shadow={
        "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      }
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
      <TuteCardList tuteList={recentCards} />
    </Box>
  );
}

export default RecentTutes;
