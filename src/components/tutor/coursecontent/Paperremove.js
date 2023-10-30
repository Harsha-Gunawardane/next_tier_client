import { Button } from "@chakra-ui/react";
import axios from "axios";

import React from "react";
import { useDisclosure } from "@chakra-ui/react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

const Paperremove = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = () => {
    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your backend endpoint for paper deletion
    const apiEndpoint = "http://localhost:8000/paperclasscontent";

    // Assuming 'props.item.id' is the unique identifier of the paper to be removed
    const paperId = props.item.id;

    // Make the API call to delete the paper using Axios
    axios
      .delete(`${apiEndpoint}/${paperId}`)
      .then((response) => {
        // If deletion was successful, you can perform any necessary actions here
        // (e.g., updating the UI, refreshing data, etc.)
        console.log("Paper deleted successfully!");
        onClose(); // Close the modal after deleting the paper
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occurred during the deletion process
        console.error("Error deleting paper:", error);
      });

    onClose(); // Close the modal after deleting the paper
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        height="5px"
        fontSize="10px"
        width="5px"
        p={2}
      >
        -
      </Button>

      <AlertDialog
        mt="100px"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="sm"
              fontWeight="bold"
            ></AlertDialogHeader>

            <AlertDialogBody fontSize="15px">
              Are you sure You want to remove this paper? You can't undo this
              action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                fontSize="12px"
                height="35px"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                fontSize="12px"
                height="35px"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Paperremove;
