import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  AvatarBadge,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

function EditHall({ isOpen, onClose, hallData, onSave }) {
  const [hallNo, setHallNo] = useState(hallData.hallNo);
  const [capacity, setCapacity] = useState(hallData.capacity);
  const [facilities, setFacilities] = useState(hallData.facilities);
  const [hallImage, setHallImage] = useState(hallData.hallImage);

  const handleSave = () => {
    const editedHall = {
      hallNo,
      capacity,
      facilities,
      hallImage,
    };
    onSave(editedHall);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHallImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Hall Details</DrawerHeader>
        <DrawerBody>
          <FormControl mt={4}>
            <FormLabel>Profile Image</FormLabel>
            <Avatar width="140px" height="140px" src={hallImage} ml="50px">
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
          <FormControl mt={4}>
            <FormLabel>Hall No</FormLabel>
            <Input value={hallNo} onChange={(e) => setHallNo(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Capacity</FormLabel>
            <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Facilities</FormLabel>
            <Textarea value={facilities} onChange={(e) => setFacilities(e.target.value)} />
          </FormControl>
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditHall;
