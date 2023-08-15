import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button
  } from '@chakra-ui/react'

  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
  import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
  import { useNavigate, useParams } from "react-router-dom";
 




const Courseremove = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const { courseid } = useParams();

    const handleRemoveCourse = () => {
      // Show a confirmation dialog before proceeding with deletion
    
        axiosPrivate
          .delete(`/tutor/course/${courseid}`) // Use '/courses/:id' to match the server route
          .then((response) => {
            alert("Course removed successfully.");
            onClose();
            // Optionally, you can navigate to a different page after deletion
            navigate("/tutor/courses"); // Change the path to the desired destination after deletion
          })
          .catch((error) => {
            console.log(error.message);
          });
      
    };
      
        return (
          <>
     
     <Button colorScheme='red' fontSize='12px' height='30px' onClick={onOpen}>
        Remove
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent height='200px'>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Remove Course
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} fontSize='12px' height='35px'>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleRemoveCourse} ml={3}  fontSize='12px' height='35px'>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

          </>
        )
      }



export default Courseremove;