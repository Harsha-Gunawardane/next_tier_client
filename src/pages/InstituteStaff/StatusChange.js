import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const StatusChange = ({ isOpen, onClose, tutor, onSwitchChange }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {tutor ? `Confirm ${tutor.active ? "Disable" : "Enable"} Tutor` : ""}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {tutor && (
            <Text>
              Do you want to{" "}
              {tutor.active ? "disable" : "enable"} {tutor.fName}{" "}
              {tutor.lName}?
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          {tutor && (
            <Button
              colorScheme={tutor.active ? "red" : "green"}
              mr={3}
              onClick={() => {
                onSwitchChange(tutor.tutor_id);
                onClose(); // Close the modal after changing status
              }}
            >
              {tutor.active ? "Disable" : "Enable"}
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StatusChange;
