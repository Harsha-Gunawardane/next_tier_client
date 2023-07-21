import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,Input,Button
  } from '@chakra-ui/react'


  import React from "react";
  import { useDisclosure } from '@chakra-ui/react'
  import { IconButton } from '@chakra-ui/react'
  import { HamburgerIcon ,EditIcon} from '@chakra-ui/icons'

  import { useForm, isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Group, TextInput, NumberInput, Box,FileInput,Select,Radio,Text } from '@mantine/core';

 




const Addcontent = (props) => {



  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
      course: '',
      visibility: '',
    },

    validate: {
      video:isNotEmpty('video'),
      title:isNotEmpty('Required'),
      description: isNotEmpty('Required'),
      thumbnail:  isNotEmpty('Required'),
      course:  isNotEmpty('Required'),
      visibility:  isNotEmpty('Required'),
    },
  });






  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('1')

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
    <Button aria-label='Search database'colorScheme='blue' fontSize='15px' width='150px' height='35px'  onClick={onOpen} >+Add Content</Button>
     
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

   



       <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit(() => {})}>
        

       <FileInput
            {...form.getInputProps('video')}
      placeholder="Pick file"
      label="Upload the video"
      withAsterisk
    />
      <TextInput  label="Title" placeholder="Title" withAsterisk {...form.getInputProps('title')} />

      <TextInput
      
        label="Description"
        placeholder="Your job"
        withAsterisk
        mt=""
      
        {...form.getInputProps('description')}
      />
      <TextInput
        label="Thumbnail"
        placeholder="Your email"
        withAsterisk
        mt="md"
        {...form.getInputProps('thumbnail')}
      />
  
  <Select
    {...form.getInputProps('course')}
      label="Course"
      placeholder="Course"
      data={[
        { value: 'react', label: 'Physics 2024 Theory' },
        { value: 'ng', label: 'Physics 2024 Theory' },
        { value: 'svelte', label: 'Physics 2024 Theory' },
        { value: 'vue', label: 'Physics 2024 Theory' },
      ]}
    />


<Radio.Group
  {...form.getInputProps('visibility')}
      name="favoriteFramework"
      label="Visibility"
    
      withAsterisk
    >
      <Group mt="xs">
        <Radio value="react" label="Public" />
        <Radio value="svelte" label="Private" />
  
      </Group>
    </Radio.Group>

      <Group position="right" mt="md">
      <Button onClick={onClose} fontSize='12px' height='30px'>Cancel</Button>
        <Button type="submit" fontSize='12px' height='30px' colorScheme='blue'>Submit</Button>
      </Group>
    </Box>



          </ModalBody>

          <ModalFooter>
        
         
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}



export default Addcontent;