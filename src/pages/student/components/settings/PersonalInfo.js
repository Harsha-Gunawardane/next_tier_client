import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Wrap,
  WrapItem,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useStudentInfo } from "../../../../store/student/useStudentInfo";

const NAMING_REGEX = /^[a-zA-Z]{3,20}$/;
const PHONENO_REGEX = /^\+94\d{9}$/;
const NIC_REGEX = /^(?:\d{9}[Vv]|\d{11}(?![Vv]))$/

const STUDENT_INFO_URL = "/stu/info";

const PersonalInfo = () => {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [isEditable, setIsEditable] = useState(false);
  const {
    fName,
    lName,
    phoneNo,
    address,
    college,
    stream,
    medium,
    dob,
    NIC,
    setFName,
    setLName,
    setPhoneNo,
    setAddress,
    setCollege,
    setStream,
    setMedium,
    setDob,
    setNIC
  } = useStudentInfo();

  const inputStyle = {
    border: "none",
    height: "15px",
    width: "225px",
    fontWeight: "medium",
    borderRadius: "2px",
    bottom: "1px",
  };

  const labelStyle = {
    width: "175px",
    fontWeight: "regular",
    color: "#333333",
    fontSize: "15px",
  };

  const streamOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Bio", label: "Bio" },
    { value: "Commerce", label: "Commerce" },
    { value: "Art", label: "Art" },
  ];

  const mediumOptions = [
    { value: "English", label: "English" },
    { value: "Sinhala", label: "Sinhala" },
  ];

  const [localFName, setLocalFName] = useState(fName);
  const [localLName, setLocalLName] = useState(lName);
  const [localPhoneNo, setLocalPhoneNo] = useState(phoneNo);
  const [localStream, setLocalStream] = useState(stream);
  const [localCollege, setLocalCollege] = useState(college);
  const [localMedium, setLocalMedium] = useState(medium);
  const [localDob, setLocalDob] = useState(dob);
  const [localAddress, setLocalAddress] = useState(address);
  const [localNIC, setLocalNIC] = useState(NIC);

  const [validFName, setValidFName] = useState(true);
  const [validLName, setValidLName] = useState(true);
  const [validPhoneNo, setValidPhoneNo] = useState(true);
  const [validNIC, setValidNIC] = useState(true);

  useEffect(() => {
    setValidFName(NAMING_REGEX.test(localFName));
  }, [localFName]);

  useEffect(() => {
    setValidLName(NAMING_REGEX.test(localLName));
  }, [localLName]);

  useEffect(() => {
    setValidPhoneNo(PHONENO_REGEX.test(localPhoneNo));
  }, [localPhoneNo]);

  useEffect(() => {
    setValidNIC(NIC_REGEX.test(localNIC));
  }, [localNIC]);

  const onCancel = () => {
    setIsEditable(false);

    setLocalFName(fName);
    setLocalLName(lName);
    setLocalPhoneNo(phoneNo);
    setLocalStream(stream);
    setLocalDob(dob);
    setLocalAddress(address);
    setLocalCollege(college);
    setLocalMedium(medium);
    setLocalNIC(NIC);
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (validFName && validLName && validPhoneNo) {

      try {
        const response = await axiosPrivate.put(STUDENT_INFO_URL, {
          fName: localFName,
          lName: localLName,
          phoneNo: localPhoneNo,
          dob: localDob,
          address: localAddress,
          stream: localStream,
          college: localCollege,
          medium: localMedium,
          nic: localNIC
        });

        console.log("Request successful:", response.data);
        const updatedStudentInfo = response.data;

        setFName(updatedStudentInfo.fName);
        setLName(updatedStudentInfo.lName);
        setAddress(updatedStudentInfo.address);
        setPhoneNo(updatedStudentInfo.phoneNo);
        setCollege(updatedStudentInfo.college);
        setMedium(updatedStudentInfo.medium);
        setStream(updatedStudentInfo.stream);
        setDob(updatedStudentInfo.dob);
        setNIC(updatedStudentInfo.nic)

        toast({
          title: "Personal info updated successfully",
          status: "success",
          isClosable: true,
          position: "top-right",
        });

      } catch (error) {
        let errorMessage = "An error occurred";

        if (error.response) {
          console.log("Server responded with an error:", error.response.data);
          errorMessage = error.response.data.error || errorMessage;
        } else if (error.request) {
          console.log("No response received from the server");
          errorMessage = "No response received from the server";
        } else {
          console.log("Error occurred during request:", error.message);
          errorMessage = error.message || errorMessage;
        }

        onCancel();

        toast({
          title: errorMessage,
          status: "error",
          isClosable: true,
          position: "top-right",
        });

      } finally {
        setIsEditable(false);
      }
    }
  };

  return (
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
            onClick={onSave}
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
            onClick={isEditable ? () => onCancel() : () => setIsEditable(true)}
          >
            <Text
              color={isEditable ? "#444444" : "#ffffff"}
              fontWeight="medium"
              mr={2}
            >
              {isEditable ? "Cancel" : "Edit"}
            </Text>
            {isEditable ? (
              <CloseIcon color="#444444" />
            ) : (
              <EditIcon color="#ffffff" />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Box ml={5} mr={40} w={480}>
        <form>
          <FormControl>
            <Flex align="center">
              <FormLabel style={labelStyle}>First Name</FormLabel>
              <Input
                style={inputStyle}
                value={localFName}
                onChange={(e) => setLocalFName(e.target.value)}
                disabled={!isEditable}
              />
              <CheckIcon
                color="#15BD66"
                ml={2}
                bottom={1}
                display={isEditable && validFName ? "block" : "none"}
              />
              <CloseIcon
                color="#D93400"
                ml={2}
                bottom={1}
                display={isEditable && !validFName ? "block" : "none"}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>Last Name</FormLabel>
              <Input
                value={localLName}
                onChange={(e) => setLocalLName(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
              <CheckIcon
                color="#15BD66"
                ml={2}
                bottom={1}
                display={isEditable && validLName ? "block" : "none"}
              />
              <CloseIcon
                color="#D93400"
                ml={2}
                bottom={1}
                display={isEditable && !validLName ? "block" : "none"}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>Phone Number</FormLabel>
              <Input
                value={localPhoneNo}
                onChange={(e) => setLocalPhoneNo(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
              <CheckIcon
                color="#15BD66"
                ml={2}
                bottom={1}
                display={isEditable && validPhoneNo ? "block" : "none"}
              />
              <CloseIcon
                color="#D93400"
                ml={2}
                bottom={1}
                display={isEditable && !validPhoneNo ? "block" : "none"}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>Stream</FormLabel>
              <Wrap>
                <WrapItem>
                  <Select
                    style={inputStyle}
                    value={localStream}
                    onChange={(e) => setLocalStream(e.target.value)}
                    disabled={!isEditable}
                  >
                    {streamOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </WrapItem>
              </Wrap>
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>College</FormLabel>
              <Input
                value={localCollege}
                onChange={(e) => setLocalCollege(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>Medium</FormLabel>
              <Wrap>
                <WrapItem>
                  <Select
                    style={inputStyle}
                    value={localMedium}
                    onChange={(e) => setLocalMedium(e.target.value)}
                    disabled={!isEditable}
                  >
                    {mediumOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </WrapItem>
              </Wrap>
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>DOB</FormLabel>
              <Input
                type="date"
                value={localDob}
                onChange={(e) => setLocalDob(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>NIC</FormLabel>
              <Input
                value={localNIC}
                onChange={(e) => setLocalNIC(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
              <CheckIcon
                color="#15BD66"
                ml={2}
                bottom={1}
                display={isEditable && validNIC ? "block" : "none"}
              />
              <CloseIcon
                color="#D93400"
                ml={2}
                bottom={1}
                display={isEditable && !validNIC ? "block" : "none"}
              />
            </Flex>
            <Flex align="center">
              <FormLabel style={labelStyle}>Address</FormLabel>
              <Textarea
                value={localAddress}
                onChange={(e) => setLocalAddress(e.target.value)}
                disabled={!isEditable}
                style={inputStyle}
              />
            </Flex>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
