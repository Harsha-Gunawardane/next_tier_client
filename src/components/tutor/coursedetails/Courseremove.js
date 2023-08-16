import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useToast
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
    const toast = useToast(); 

    const handleRemoveCourse = () => {
      // Show a confirmation dialog before proceeding with deletion
    
        axiosPrivate
          .delete(`/tutor/course/${courseid}`) // Use '/courses/:id' to match the server route
          .then((response) => {
            // Optionally, you can navigate to a different page after deletion
         // Change the path to the desired destination after deletion
            // localStorage.setItem("courseremoved", "true");
            window.location.reload();
            navigate("/tutor/courses"); 
        
          })
          .catch((error) => {
            console.error('Error Removing Course:', error);
          });
      };
    
      // Check if a study pack was removed and show the toast accordingly
    //   const isStudyPackRemoved = localStorage.getItem("courseremoved");
    //   if (isStudyPackRemoved) {
    //     localStorage.removeItem("courseremoved");
    //     toast({
    //       title: "Course Removed Successfully",
    //       description: "The Course has been removed successfully.",
    //       status: "success",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "top",
    //     });
      
    // };
      
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
              Are you sure you want to Remove this course? You can't undo this action afterwards.
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