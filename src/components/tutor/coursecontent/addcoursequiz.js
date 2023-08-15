import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,FormControl,
    FormLabel,Input, IconButton
  } from '@chakra-ui/react'
  import { SmallAddIcon} from '@chakra-ui/icons'
  import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
 




const Addcoursequiz = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <IconButton fontSize='20px' size={20}   bg='white'   icon={<SmallAddIcon/>} onClick={onOpen}></IconButton>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Quiz</ModalHeader>
          <ModalCloseButton />

    

    <ModalBody pb={6}>

    <FormControl>
              <FormLabel fontSize='15px'>Upload Quiz</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px'>Title</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px'>Details</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

       

           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} fontSize='18px' height='30px'>
              Save
            </Button>
            <Button onClick={onClose} fontSize='18px' height='30px'>Cancel</Button>
          </ModalFooter>


       
        </ModalContent>
      </Modal>
    </>
  )
}



export default Addcoursequiz;