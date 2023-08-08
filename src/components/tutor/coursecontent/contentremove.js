import React,{ useState } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Contentremove = ({ course,studypackid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const id = location.pathname.split("/").pop();

  const handleDelete = () => {
    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your backend endpoint for removing the month

    // Make the API call to delete the month using Axios
    axiosPrivate
      .delete(`/tutor/course/${id}/${studypackid}`)
      .then((response) => {
        onClose(); // Close the modal after deleting the month
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting month:', error);
      });
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} height='5px' fontSize='12px' p={1.5} size={10}>
        -
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='sm' fontWeight='bold'>
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody fontSize='15px'>
              Are you sure you want to remove this month? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} fontSize='12px' height='35px'>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3} fontSize='12px' height='35px'>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Contentremove;
