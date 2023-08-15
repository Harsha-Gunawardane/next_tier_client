import React, { useRef, useState } from "react";
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
} from "@chakra-ui/react";
import { ActionIcon, MultiSelect } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

const data = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

function ScheduleReading({ isOpen, onClose, btnRef }) {
  const ref = useRef();

  const [note, setNote] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState([]);

  const onSaveHandler = () => {
    console.log(note, time, date);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
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

              <FormLabel>Choose a time</FormLabel>
              <TimeInput
                value={time}
                onChange={(e) => setTime(e.target.value)}
                ref={ref}
                rightSection={
                  <ActionIcon onClick={() => ref.current.showPicker()}>
                    <IconClock size="1rem" stroke={1.5} />
                  </ActionIcon>
                }
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
          <Button fontWeight={"normal"} bg={"#666666"} color={"#FFFFFF"} mr={5} onClick={onClose}>
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
