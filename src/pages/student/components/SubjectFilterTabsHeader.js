import { Flex } from "@chakra-ui/react";
import FilterTab from "./tabs/FilterTab";

function SubjectFilterTabsHeader({
  subjects,
  focusedSubject,
  setFocusedSubject,
}) {
  return (
    <Flex
      mb={3}
      mt={2}
      ml={{
        base: 3,
      }}
    >
      {subjects.map((subject) => (
        <FilterTab
          bg={focusedSubject === subject ? "#383838" : "#E9E9E9"}
          color={focusedSubject === subject ? "#FFFFFF" : "#383838"}
          value={subject}
          onclickHandler={setFocusedSubject}
        />
      ))}
    </Flex>
  );
}

export default SubjectFilterTabsHeader;
