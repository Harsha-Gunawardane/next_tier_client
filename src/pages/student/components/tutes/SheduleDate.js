import { Text, Flex } from "@chakra-ui/react";
import { useDisclosure } from "@mantine/hooks";
import { Popover, Button } from "@mantine/core";

function SheduleDate({ dateName, date, isToday, isSchedule, reminder }) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Popover
      disabled={!isSchedule}
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <Flex
          onMouseEnter={open}
          onMouseLeave={close}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
        >
          <Flex
            flexDirection={"column"}
            alignItems={"center"}
            border={isSchedule ? "none" : "1px solid #E9E9E9"}
            ml={1.5}
            mr={1.5}
            w={12}
            bg={isSchedule ? "#FEEDD3" : "#FFFFFF"}
            borderRadius={12}
            pt={1.5}
            pb={1.5}
          >
            <Text fontSize={13} color={isToday ? "#e25459" : "#444444"}>
              {dateName}
            </Text>
            <Text color={isToday ? "#e25459" : "#444444"}>{date}</Text>
          </Flex>
        </Flex>
      </Popover.Target>

      <Popover.Dropdown md={{ pointerEvents: "none" }}>
        <Text size="md">{reminder}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default SheduleDate;
