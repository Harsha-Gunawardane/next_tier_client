import React,{ useState,useEffect } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";

const Contentremove = ({ course,studypackid, onStudyPackRemoved }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast(); 

  const location = useLocation();
  const id = location.pathname.split("/").pop();



  const handleDelete = () => {
    axiosPrivate
      .delete(`/tutor/course/${id}/${studypackid}`)
      .then((response) => {
        // Show success toast message
        // toast({
        //   title: 'Study Pack Removed',
        //   description: 'The study pack has been successfully removed.',
        //   status: 'success',
        //   duration: 5000,
        //   isClosable: true,
        //   position: 'top',
        // });

        // Persist success message before reloading the window
        window.location.reload();
        localStorage.setItem('studyPackRemoved', 'true');

        
        // onStudyPackRemoved(studypackid);

       
      
        
     
      })
      .catch((error) => {
        console.error('Error deleting study pack:', error);
      });
  };

  useEffect(() => {
    // Check if a study pack was removed and show the toast accordingly
    const isStudyPackRemoved = localStorage.getItem('studyPackRemoved');
    if (isStudyPackRemoved) {
      localStorage.removeItem('studyPackRemoved');
      toast({
        title: 'Study Pack Removed',
        description: 'The study pack has been successfully removed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [toast]);

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} height='20px' fontSize='10px' p={1.5} size={10}>
        Remove
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Confirm Delete
            </AlertDialogHeader>

            <AlertDialogBody fontSize='15px'>
              Are you sure you want to remove this Study Pack? You can't undo this action afterwards.
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

export default Contentremove;
