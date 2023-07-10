import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Profile from "../assests/images/profile.jpg";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
  };

  return (
    <>
      <Box>
        <Text
          mt={2}
          ml={3}
          mb={3}
          fontWeight="semibold"
          fontSize={20}
          fontStyle="Roboto"
        >
          Account settings
        </Text>
        <Flex>
          <Box ml={5} w={200} h={200} position="relative">
            <Image
              borderRadius={10}
              src={Profile}
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Button
              onClick={handleOpenModal}
              position="absolute"
              top={175}
              left={175}
              w='40px'
              h='40px'
              borderRadius="50%"
              bg="#0074D9"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              p={0}
            >
              <AddIcon fontWeight="bold" color="#ffffff" />
            </Button>
          </Box>
          <Box></Box>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Profile Image</ModalHeader>
          <ModalBody>
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected Image"
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <Input
                type="file"
                accept="image/*"
                onDrop={handleImageDrop}
                onChange={(event) =>
                  setSelectedImage(URL.createObjectURL(event.target.files[0]))
                }
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setSelectedImage(null)}>
              Clear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Settings;
