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
  FormControl,
  FormLabel,
  FormHelperText,
  calc,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

import Profile from "../assests/images/profile.jpg";
import Cloud from "../assests/images/cloud.png";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isEditable, setIsEditable] = useState(false);

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
      <Box h="calc(100vh - 64px)" overflowY="scroll">
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
              w="40px"
              h="40px"
              borderRadius="50%"
              bg="#0074D9"
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              _hover={{ color: "#0074D9" }}
              p={0}
            >
              <AddIcon fontWeight="bold" color="#ffffff" />
            </Button>
          </Box>
          <Box ml={12} mt={3}>
            <Text color="#333333" fontSize={40} fontWeight="semibold">
              Nipuna Rahal
            </Text>
            <Text ml={2} mb={3} fontSize={12} fontWeight="medium">
              at Royal College
            </Text>
            <hr />
            <Text mt={3} mb={2} fontWeight="meduim">
              Contact Info
            </Text>
            <Text fontSize={14} color="#444444">
              Phone number : <span>+94712342345</span>
            </Text>
            <Text fontSize={14} color="#444444">
              Adress : <span>No/201, Wellawaththa Road, Dehiwala</span>
            </Text>
          </Box>
        </Flex>

        <Box>
          <Flex ml={5} mt={10}>
            <Button fontSize={14} bg="#0074D9" mr={3} color="#ffffff">
              Personal Info
            </Button>
            <Button fontSize={14} bg="#E9E9E9" mr={3} color="#333333">
              Guardian Info
            </Button>
            <Button fontSize={14} bg="#E9E9E9" mr={3} color="#333333">
              Login & Security
            </Button>
          </Flex>
          <Box w={500} ml={10} mt={5}>
            <hr w="90%" />
            <Flex justifyContent="right" mt={3} mr={5}>
              <Flex>
                <Flex
                  display={isEditable ? "flex" : "none"}
                  cursor="pointer"
                  w={85}
                  h={35}
                  mr={15}
                  mb={5}
                  bg="#15BD96"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={5}
                >
                  <Text color="#ffffff" fontWeight="medium" mr={2}>
                    Save
                  </Text>
                  <CheckIcon color="#ffffff" />
                </Flex>
                <Flex
                  cursor="pointer"
                  w={85}
                  h={35}
                  mr={15}
                  mb={5}
                  bg={isEditable ? "#E9E9E9" : "#0074D9"}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={5}
                  onClick={
                    isEditable
                      ? () => setIsEditable(false)
                      : () => setIsEditable(true)
                  }
                >
                  <Text
                    color={isEditable ? "#444444" : "#ffffff"}
                    fontWeight="medium"
                    mr={2}
                  >
                    {isEditable ? "cancel" : "edit"}
                  </Text>
                  {isEditable ? (
                    <CloseIcon color="#444444" />
                  ) : (
                    <EditIcon color="#ffffff" />
                  )}
                </Flex>
              </Flex>
            </Flex>
            <Box ml={5}>
              <form>
                <FormControl>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      First Name
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="Nipuna"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                  </Flex>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      Last Name
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="Rahal"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                  </Flex>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      Phone Number
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="+9478713783"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                  </Flex>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      Stream
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="Mathematics"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                  </Flex>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      College
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="Royal College"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                  </Flex>
                  <Flex align="center">
                    <FormLabel
                      w={200}
                      fontWeight="regular"
                      color="#333333"
                      fontSize={15}
                    >
                      medium
                    </FormLabel>
                    <Input
                      border="none"
                      h={15}
                      fontWeight="medium"
                      value="English"
                      borderRadius={2}
                      disabled={isEditable ? false : true}
                    />
                    <Flex align="center">
                      <FormLabel
                        w={200}
                        fontWeight="regular"
                        color="#333333"
                        fontSize={15}
                      >
                        DOB
                      </FormLabel>
                      <Input
                        type="date"
                        border="none"
                        h={15}
                        fontWeight="medium"
                        value="English"
                        borderRadius={2}
                        disabled={isEditable ? false : true}
                      />
                    </Flex>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
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
              <Box
                style={{
                  width: "100%",
                  height: "200px",
                  border: "2px dashed gray",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onDrop={handleImageDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                <Box display="flex" justifyContent="center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="48"
                    height="48"
                  >
                    <path d="M12 5v14M5 12l7-7 7 7" />
                  </svg>
                  <Text>Upload your image here</Text>
                </Box>
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              color="white"
              bg="#0074D9"
              mr={3}
              onClick={handleCloseModal}
            >
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
