
import {

    Button,FormControl,
    FormLabel,Input, IconButton,Box, Heading
  } from '@chakra-ui/react'
  import React from "react";
  import { useDisclosure,Text } from '@chakra-ui/react'
  import announcement from "./announcement";



  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    HStack,Textarea
  } from '@chakra-ui/react'
import Announcement from './announcement';
import { useEffect,useState } from "react";

const Addannouncement = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()



    const[announcementdata,announcementdatachange]=useState(null);
    
  

   
    useEffect(() => {
      fetch("http://localhost:8000/announcement").then((res) => {
          return res.json();
      }).then((resp) => {
          announcementdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [])
  


 


    return (

        <>
      <Button ref={btnRef}  onClick={onOpen}  width='60%' height='35px' mb='10px' ml='130px' mt='25px' fontSize='12px' colorScheme='blue'>
        Add Announcement
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize='20px'>Add Announcement</DrawerHeader>

          <DrawerBody>
         
            <Input fontSize='15px' placeholder='Heading' />
          
            <Textarea fontSize='15px' mt='10px' placeholder='Message' />
            <Button variant='outline' mr={3} onClick={onClose} fontSize='15px' height='30px' mt='20px'>
              Cancel
            </Button>
            <Button colorScheme='blue' fontSize='15px' height='30px' mt='20px'>Publish</Button>

<Heading fontSize='15px' mt='60px'>All Announcement</Heading>

{announcementdata != null && announcementdata.length>0 ? announcementdata.map(item => (
            <Box bg='white' mt='20px' p={2} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)' borderLeft='6px solid red'>
        <Text fontSize='16px' color='grey'>{item.Heading}</Text>
        <Text fontSize='12px' color='grey'>{item.message}</Text>
        <HStack mt='8px' spacing='30px'>
          <Text fontSize='12px'  color='grey'>{item.date}</Text>
          <Text fontSize='12px'  color='grey'>{item.time}</Text>
        </HStack>
      </Box>
      )): <Box mt='10' ml='40px' ><Heading fontSize='15px' color='grey'>No Announcements</Heading>
    </Box>}
          </DrawerBody>

          <DrawerFooter>
       
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}




export default Addannouncement;