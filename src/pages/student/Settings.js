import React from "react";
import { useState, useEffect } from "react";
import { Button, Text, Box, Flex, Image } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import PersonalInfo from "./components/PersonalInfo";
import Profile from "../../assests/images/profile.jpg";
import ModalLayout from "../../components/ModalLayout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useStudentInfo } from "../../store/student/useStudentInfo";

const STUDENT_INFO_URL = "/stu/info";

function Settings() {
  const axiosPrivate = useAxiosPrivate();

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();
    const imageFile = event.dataTransfer.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
  };

  const modalTitle = "Upload Profile Image";
  const modalBody = (
    <>
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
    </>
  );

  const modalFooter = (
    <>
      <Button color="white" bg="#0074D9" mr={3} onClick={handleCloseModal}>
        Save
      </Button>
      <Button variant="ghost" onClick={() => setSelectedImage(null)}>
        Clear
      </Button>
    </>
  );

  const {
    fName,
    lName,
    phoneNo,
    address,
    college,
    stream,
    medium,
    dob,
    setFName,
    setLName,
    setPhoneNo,
    setAddress,
    setCollege,
    setStream,
    setMedium,
    setDob
  } = useStudentInfo();

  useEffect(async () => {
    let isMounted = true;
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(`${STUDENT_INFO_URL}`, {
        signal: controller.signal,
      });
      console.log(response.data);
      const studentInfo = response.data;

      setFName(studentInfo.fName);
      setLName(studentInfo.lName);
      setAddress(studentInfo.address);
      setPhoneNo(studentInfo.phoneNo);
      setCollege(studentInfo.college);
      setMedium(studentInfo.medium);
      setStream(studentInfo.stream);
      setDob(studentInfo.dob);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [focusedTab, setFocusedTab] = useState("Personal Info")

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
          <Box ml={12} mt={3} maxW={415}>
            <Text color="#333333" fontSize={40} fontWeight="semibold">
              {`${fName} ${lName}`}
            </Text>
            <Text ml={2} mb={3} fontSize={12} fontWeight="medium">
              {`at ${college}`}
            </Text>
            <hr />
            <Text mt={3} mb={2} fontWeight="meduim">
              Contact Info
            </Text>
            <Text fontSize={14} color="#444444">
              Phone number : <span>{phoneNo}</span>
            </Text>
            <Text fontSize={14} color="#444444">
              Adress : <span>{address}</span>
            </Text>
          </Box>
        </Flex>

        <Box>
          <Flex ml={5} mt={10}>
            <Button onClick={() => setFocusedTab("Personal Info")} fontSize={14} bg="#0074D9" mr={3} color="#ffffff">
              Personal Info
            </Button>
            <Button fontSize={14} bg="#E9E9E9" mr={3} color="#333333">
              Guardian Info
            </Button>
            <Button fontSize={14} bg="#E9E9E9" mr={3} color="#333333">
              Login & Security
            </Button>
          </Flex>
        </Box>
        {
          focusedTab === "Personal Info"
          ? <PersonalInfo />
          : null
        }
        
      </Box>

      <ModalLayout
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
        title={modalTitle}
        body={modalBody}
        footer={modalFooter}
      />
    </>
  );
}

export default Settings;
