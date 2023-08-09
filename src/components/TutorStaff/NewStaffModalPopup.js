import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import NewStaffStepper from "./NewStaffStepper";

export default function NewStaffModalPopup({ isOpen, onOpen, onClose }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Staff Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewStaffStepper/>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
