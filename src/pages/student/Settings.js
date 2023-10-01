import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Text,
  Box,
  Flex,
  Image,
  useToast,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import PersonalInfo from "./components/settings/PersonalInfo";
import GuardianInfo from "./components/settings/GuardianInfo";
import SecurityInfo from "./components/settings/SecurityInfo";

import ModalLayout from "../../components/ModalLayout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useStudentInfo } from "../../store/student/useStudentInfo";
import useSidebar from "../../hooks/useSidebar";

const STUDENT_INFO_URL = "/stu/info";
const PROFILE_UPLOAD_URL = "/user/profile-image";

function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const { setSidebarOptionHandler } = useSidebar();

  const {
    fName,
    lName,
    phoneNo,
    address,
    college,
    stream,
    medium,
    dob,
    profile,
    setFName,
    setLName,
    setPhoneNo,
    setAddress,
    setCollege,
    setStream,
    setMedium,
    setDob,
    setProfile,
  } = useStudentInfo();

  useEffect(() => {
    setSidebarOptionHandler("settings");
  }, [setSidebarOptionHandler]);

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleImageDrop = (event) => {
    event.preventDefault();

    console.log(event.target);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setSelectedImage(URL.createObjectURL(selectedFile));
  };
  const clearImage = (event) => {
    event.preventDefault();

    setSelectedImage(null);
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      const response = await axiosPrivate.post(
        `${PROFILE_UPLOAD_URL}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProfile(response.data?.profile);
      console.log(response.data);

      setFile(null);
      setSelectedImage(null);
      handleCloseModal();
    }
  };

  console.log(file);
  const modalTitle = "Upload Profile Image";
  const modalBody = selectedImage ? (
    <Image
      src={selectedImage}
      alt="Selected Image"
      style={{ maxWidth: "100%" }}
    />
  ) : (
    <form onSubmit={handleSubmit}>
      <Input id="file" h={100} type="file" onChange={handleImageDrop} />
      <FormLabel htmlFor="file">Upload image here...</FormLabel>

      {/* <div style={{ display: "inline-block" }}>
        
        <Input
          type="file"
          display="none"
          onChange={handleImageDrop}
          id="image"
        />
        
        <label htmlFor="image">

          <Flex w={250} justifyContent="center" border='1px solid black'>
            <Box
              style={{
                width: "300px",
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
                <Text>Click here to add image...</Text>
              </Box>
            </Box>
          </Flex>
        </label>
      </div> */}

    </form>
  );

  const modalFooter = (
    <>
      <Button
        type="submit"
        color="white"
        bg="#0074D9"
        mr={3}
        onClick={handleSubmit}
      >
        Save
      </Button>
      <Button variant="ghost" onClick={clearImage}>
        Clear
      </Button>
    </>
  );

  useEffect(() => {
    const getUserInfo = async () => {
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
        setProfile(studentInfo.profile);

        console.log(profile);
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
  }, []);

  const [focusedTab, setFocusedTab] = useState("Personal Info");

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
              src={profile}
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
            <Button
              onClick={() => setFocusedTab("Personal Info")}
              fontSize={14}
              bg={focusedTab === "Personal Info" ? "#0074D9" : "#E9E9E9"}
              mr={3}
              color={focusedTab === "Personal Info" ? "#ffffff" : "#333333"}
            >
              Personal Info
            </Button>
            <Button
              onClick={() => setFocusedTab("Guardian Info")}
              fontSize={14}
              bg={focusedTab === "Guardian Info" ? "#0074D9" : "#E9E9E9"}
              mr={3}
              color={focusedTab === "Guardian Info" ? "#ffffff" : "#333333"}
            >
              Guardian Info
            </Button>
            <Button
              onClick={() => setFocusedTab("Login Info")}
              fontSize={14}
              bg={focusedTab === "Login Info" ? "#0074D9" : "#E9E9E9"}
              mr={3}
              color={focusedTab === "Login Info" ? "#ffffff" : "#333333"}
            >
              Login & Security
            </Button>
          </Flex>
        </Box>
        {focusedTab === "Personal Info" ? (
          <PersonalInfo />
        ) : focusedTab === "Guardian Info" ? (
          <GuardianInfo />
        ) : (
          <SecurityInfo />
        )}
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
