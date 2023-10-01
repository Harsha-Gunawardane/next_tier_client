import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { MultiSelect } from "@mantine/core";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const data = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const TUTE_SCHEDULE_URL = "/stu/tute/schedule";

function ScheduleReading({ isOpen, onClose, btnRef, setReminders }) {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const [note, setNote] = useState("");
  const [date, setDate] = useState([]);

  const onSaveHandler = async () => {
    try {
      const response = await axiosPrivate.post(TUTE_SCHEDULE_URL, {
        message: note,
        days: date,
      });

      toast({
        title: "Scheduled reading",
        description: note + " is scheduled",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });

      onClose();
      console.log(response.data);
      setReminders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Schedule reading</DrawerHeader>

        <DrawerBody>
          <form>
            <FormControl>
              <FormLabel>Add remind note</FormLabel>
              <Textarea
                mb={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="text"
                placeholder="Enter remind note"
              />

              <FormLabel mt={3}>Pick day for reading</FormLabel>
              <MultiSelect
                value={date}
                onChange={(values) => setDate(values)}
                mb={3}
                data={data}
                placeholder="Pick days..."
              />
            </FormControl>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button
            fontWeight={"normal"}
            bg={"#666666"}
            color={"#FFFFFF"}
            mr={5}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            bg={"#0074D9"}
            pl={5}
            pr={5}
            color={"#FFFFFF"}
            fontWeight={"normal"}
            onClick={onSaveHandler}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ScheduleReading;
