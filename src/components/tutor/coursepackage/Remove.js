import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Remove = ({  contentId,month,onContentRemove  }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const axiosPrivate = useAxiosPrivate();
  const part = decodeURIComponent(month);
  console.log(part);
  const location = useLocation();
  const studentpackId = location.pathname.split("/").pop();

  const url = `/tutor/studypack/remove/${studentpackId}/${decodeURIComponent(month)}/${contentId}`;
  console.log(url);

  

  const handleDelete = () => {

    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your backend endpoint for removing the content
    axiosPrivate
      .delete(url)
      .then((response) => {
        console.log(`Tute ID ${contentId} removed successfully from study pack!`);
        onClose(); 
        onContentRemove(month, contentId);// Close the modal after removing the content
        // Notify parent component about content removal
      })
      .catch((error) => {
        console.error('Error removing content:', error);
      });
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} height='20px' fontSize='10px' p={1.5} size={10}>
        Remove
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='sm' fontWeight='bold'>
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody fontSize='15px'>
              Are you sure you want to remove this content? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} fontSize='12px' height='35px'>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3} fontSize='12px' height='35px'>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Remove;
