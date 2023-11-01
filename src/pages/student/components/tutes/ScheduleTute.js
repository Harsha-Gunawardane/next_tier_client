import { Box, Flex, Text } from "@chakra-ui/react";
import { FcReading } from "react-icons/fc";
import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import SheduleDate from "./SheduleDate";
import ScheduleReading from "../drawers/ScheduleReading";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const TUTE_SCHEDULE_URL = "/stu/tute/schedule";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCurrentWeekDates() {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startDate = new Date(today); // Clone the current date object

  // Calculate the start date (Sunday) of the current week
  startDate.setDate(today.getDate() - currentDayOfWeek);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    weekDates.push(currentDate.getDate());
  }

  return weekDates;
}

function ScheduleTute() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const dates = getCurrentWeekDates();
  const today = new Date();
  const currentDayOfWeek = today.getDay();

  const [reminders, setReminders] = useState([]);

  const getReminders = async () => {
    try {
      const response = await axiosPrivate.get(TUTE_SCHEDULE_URL);
      console.log(response);
      setReminders(response.data?.schedule);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <>
      <Flex
        w={392}
        justifyContent={"center"}
        display={{
          sm: "none",
          md: "none",
          lg: "flex",
        }}
      >
        <Box mt={5}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mr={3}
            mb={5}
          >
            <Text
              ml={3}
              fontSize={18}
              fontWeight="bold"
              color={"#555555"}
              fontStyle="Roboto"
            >
              Schedule Reading
            </Text>
            <Flex
              p={0.5}
              pl={1.5}
              pr={1.5}
              bg={"#F5F5F5"}
              border={"1px solid #E9E9E9"}
              borderRadius={3}
              gap={2}
              ref={btnRef}
              cursor={"pointer"}
              onClick={onOpen}
              alignItems={"center"}
            >
              <Text fontSize={13}>Schedule</Text>
              <FcReading size={22} />
            </Flex>
          </Flex>
          <Flex>
            {dates.map((date, index) => (
              <SheduleDate
                key={index}
                date={date}
                dateName={days[index]}
                isToday={currentDayOfWeek === index}
                isSchedule={reminders && reminders[days[index]]}
                reminder={reminders[days[index]]}
              />
            ))}
          </Flex>
        </Box>
      </Flex>

      <ScheduleReading
        setReminders={setReminders}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
      />
    </>
  );
}

export default ScheduleTute;
