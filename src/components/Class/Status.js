import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useBreakpointValue,
  Stack,
} from "@chakra-ui/react";

function Status({ isOpen, onClose, teacher, onApprove, onReject }) {
  const modalSize = useBreakpointValue({ base: "xs", sm: "md", md: "lg" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to {teacher && teacher.actionType}{" "}
          {teacher && teacher.tutor.user.first_name}{" "}
          {teacher && teacher.tutor.user.last_name}'s class request for{" "}
          {teacher && teacher.title}?
        </ModalBody>

        <ModalFooter>
          <Stack direction={["row", "row"]} spacing="2">
            <Button colorScheme="green" flex="1" onClick={onApprove}>
              Approve
            </Button>
            <Button colorScheme="red" flex="1" onClick={onReject}>
              Reject
            </Button>
            <Button flex="1" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Status;
