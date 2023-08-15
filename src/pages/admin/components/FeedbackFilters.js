import { Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";

function FeedbackFilters() {
  const [focusedTab, setFocusedTab] = useState("New");

  const tabs = [
    { value: "New", label: "New" },
    { value: "All", label: "All" },
    { value: "In Action", label: "In Action" },
  ];

  return (
    <Flex mt={3}>
      {tabs.map((tab) => (
        <Button
          key={tab.value}
          onClick={() => setFocusedTab(tab.value)}
          style={{
            background: focusedTab === tab.value ? "#383838" : "#E9E9E9",
            color: focusedTab === tab.value ? "#FFFFFF" : "#383838",
            _hover: {
              bg: focusedTab === tab.value ? "#0074D9" : "#E9E9E9",
              color: focusedTab === tab.value ? "#FFFFFF" : "#383838",
            },
            fontWeight: "normal",
            marginRight: "16px",
          }}
          pl={6}
          pr={6}
          pt={1}
          pb={1}
        >
          {tab.label}
        </Button>
      ))}
    </Flex>
  );
}

export default FeedbackFilters;
