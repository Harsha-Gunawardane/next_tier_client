import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

function Event({ isOpen, onClose, event }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState(event);

  // Reset the updatedEvent state whenever a new event is received
  useEffect(() => {
    setUpdatedEvent(event);
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent({
      ...updatedEvent,
      [name]: value,
    });
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelChanges = () => {
    setUpdatedEvent(event); // Revert the changes by setting the updatedEvent back to the original event
    setIsEditing(false); 
  };

  const handleSaveChanges = () => {
    // Perform any necessary actions to save the updated event data
    console.log("Updated Event:", updatedEvent);

    setIsEditing(false);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditing ? "Edit Event Details" : event && event.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isEditing && event && (
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Teacher</FormLabel>
                <Input
                  name="teacher"
                  value={updatedEvent.teacher}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Hall No</FormLabel>
                <Input
                  name="hall"
                  value={updatedEvent.hall}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input
                  name="start"
                  value={new Date(updatedEvent.start).toLocaleTimeString()}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input
                  name="end"
                  value={new Date(updatedEvent.end).toLocaleTimeString()}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Stack>
          )}

          {!isEditing && event && (
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Teacher</FormLabel>
                <Input value={event.teacher} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Hall No</FormLabel>
                <Input value={event.hall} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input value={new Date(event.start).toLocaleTimeString()} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input value={new Date(event.end).toLocaleTimeString()} isReadOnly />
              </FormControl>
            </Stack>
          )}
        </ModalBody>
        <ModalFooter>
          {isEditing ? (
            <>
              <Button colorScheme="red" mr={3} onClick={handleCancelChanges}>
                Cancel
              </Button>
              <Button colorScheme="green" mr={3} onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleEditButtonClick}>
              Edit
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Event;
