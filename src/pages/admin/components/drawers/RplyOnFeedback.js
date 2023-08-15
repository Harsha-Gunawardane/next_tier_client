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
import Feedback from "../Feedback";

function ReplyOnFeedback({ isOpen, onClose, btnRef }) {
  const ref = useRef();

  return (
    <Drawer size={'md'} isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Feedbacks</DrawerHeader>

        <DrawerBody>
          <Feedback />
        </DrawerBody>

        <DrawerFooter>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ReplyOnFeedback;
