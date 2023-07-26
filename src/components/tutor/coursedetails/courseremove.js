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
 




const Courseremove = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
      
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
          <AlertDialogContent height='10px'>
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
              <Button colorScheme='red' onClick={onClose} ml={3}  fontSize='12px' height='35px'>
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