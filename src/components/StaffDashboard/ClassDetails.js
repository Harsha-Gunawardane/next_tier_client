import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Avatar,
} from "@chakra-ui/react";

function ClassDetails({ isOpen, onClose, classItem }) {
  if (!classItem) {
    // Return some fallback UI when classItem is null
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Class Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>No class selected.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Class Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} alignItems="flex-start">
            <Avatar
              name={classItem.name}
              src={classItem.tutor.user.profile_picture}
              mb="2"
              size="xl"
            />
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Teacher:</strong>{" "}
              {` ${classItem.tutor.user.first_name} ${classItem.tutor.user.last_name}`}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Email:</strong> {classItem.tutor.email}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Teaching Medium:</strong> {classItem.tutor.medium}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Subject:</strong> {classItem.subject}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Class:</strong> {classItem.title}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2}>
              <strong>Hall Name:</strong> {classItem.hall.name}
            </Text>
            <Text fontSize={["8px", "11px", "14px"]} mt={2} mb={5}>
              <strong>Description:</strong> {classItem.description}
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ClassDetails;
