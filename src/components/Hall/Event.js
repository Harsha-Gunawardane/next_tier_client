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
  useBreakpointValue,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

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

  const handleDateChange = (date, fieldName) => {
    setUpdatedEvent({
      ...updatedEvent,
      [fieldName]: date,
    });
  };

  const handleEditButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelChanges = () => {
    setUpdatedEvent(event);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    // Perform any necessary actions to save the updated event data
    console.log("Updated Event:", {
      ...updatedEvent,
      start: updatedEvent.start.toISOString(),
      end: updatedEvent.end.toISOString(),
    });

    setIsEditing(false);
    onClose();
  };

  const modalSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
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
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={new Date(updatedEvent.start)}
                  onChange={(date) => handleDateChange(date, "start")}
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
                <DatePicker
                  selected={new Date(updatedEvent.start)}
                  onChange={(date) => handleDateChange(date, "start")}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="h:mm aa"
                  dateFormat="HH:mm"
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <DatePicker
                  selected={new Date(updatedEvent.end)}
                  onChange={(date) => handleDateChange(date, "end")}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeFormat="h:mm aa"
                  dateFormat="HH:mm"
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
                <FormLabel>Date</FormLabel>
                <Input value={format(new Date(event.start), "MM/dd/yyyy")} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>Hall No</FormLabel>
                <Input value={event.hall} isReadOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Start Time</FormLabel>
                <Input
                  value={format(new Date(event.start), "HH:mm aa")}
                  isReadOnly
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Time</FormLabel>
                <Input
                  value={format(new Date(event.end), "HH:mm aa")}
                  isReadOnly
                />
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
