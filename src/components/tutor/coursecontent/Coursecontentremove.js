import React from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,useToast
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";


const Coursecontentremove = ({ studypackId, contentId,part,onContentRemoved }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();



  const handleDelete = (event) => {
    event.preventDefault();
    try {
    axiosPrivate
      .delete(`/tutor/studypack/removecontent/${studypackId}/${part}/${contentId}`)
      .then((response) => {
        console.log(`Content ID ${contentId} removed successfully from study pack!`);
        onClose();
        window.location.reload();
        // Notify parent component about content removal
        // onContentRemoved(contentId); // Pass the removed contentId
      })
      
      toast({
        title: "Content Removed",
        description: "The Content has been removed successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          window.location.reload();
        },
      });
      onClose();
      
    }catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} height='20px' fontSize='12px' p={1.5} size={10}>
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
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Coursecontentremove;
