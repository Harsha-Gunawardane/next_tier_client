import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Avatar,
  AvatarBadge,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const ButtonStyles = {
  backgroundColor: 'green.400',
  color: 'white',
  borderRadius: '5px',
  _hover: {
    backgroundColor: 'green.300',
  },
};

function AddClass({ onAddClass }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [number, setNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = () => {
    // Validate and submit form data
    if (number && capacity && details && image) {
      // Call the onAddClass function with the form data
      onAddClass({ number, capacity, details, image });

      setNumber('');
      setCapacity('');
      setDetails('');
      setImage('');

      // Close the modal
      onClose();
    } else {
      // Show validation error message if form data is incomplete
      alert('Please fill in all the fields');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button size={{ base: 'sm', md: 'md' }}  sx={ButtonStyles} onClick={onOpen} >
      Add Hall
    </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Hall</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Hall Image</FormLabel>
              <Avatar
                value={image}
                onChange={(e) => setImage(e.target.value)}
                width="160px"
                height="160px"
                src={image || 'https://s40123.pcdn.co/wp-content/uploads/2020/05/empty-college-lecture-hall.jpg.optimal.jpg'}
                ml="50px"
              >
                <AvatarBadge boxSize="1.25em" bg="gray.400">
                  <label htmlFor="file-upload">
                    <IconButton
                      as="span"
                      borderRadius="30px"
                      width="3em"
                      height="3em"
                      aria-label="Change Image"
                      bg="gray.400"
                      icon={<EditIcon boxSize="20px" />}
                    />
                  </label>
                </AvatarBadge>
              </Avatar>
              {/* input to allow image selection */}
              <Input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Hall Number</FormLabel>
              <Input value={number} onChange={(e) => setNumber(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Student Capacity</FormLabel>
              <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} defaultValue={15} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Facilities Available</FormLabel>
              <Textarea placeholder="Provide Details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Add
            </Button>
            <Button ml="2" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddClass;
