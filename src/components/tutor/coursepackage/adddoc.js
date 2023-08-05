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
 




const Addcoursedoccontent = (props) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
   <Button fontSize='12px' size={20} width='80px' height='30px' colorScheme='white' color='black'  icon={<SmallAddIcon/>} onClick={onOpen}>+ Add Document</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Document Content</ModalHeader>
          <ModalCloseButton />

    

    <ModalBody pb={6}>

    <FormControl>
              <FormLabel fontSize='15px'>File</FormLabel>
              <Input fontSize='15px' height='40px' ref={initialRef} placeholder='Title' />
            </FormControl>

            <FormControl>
              <FormLabel fontSize='15px'>Title</FormLabel>
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



export default Addcoursedoccontent;