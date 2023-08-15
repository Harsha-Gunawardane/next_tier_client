import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

function Status({ isOpen, onClose, teacher, onApprove }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Approval</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to approve {teacher && teacher.fullName}'s request?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onApprove}>
            Approve
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Status;
