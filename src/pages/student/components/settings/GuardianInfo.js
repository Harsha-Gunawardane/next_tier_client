import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useGuardianInfo } from "../../../../store/student/useGuardianInfo";

const NAMING_REGEX = /^[a-zA-Z]{3,20}(?: [a-zA-Z]{3,20}){0,}$/;
const PHONENO_REGEX = /^\+94\d{9}$/;

const GUARDIAN_INFO_URL = "/parent/info";

const GuardianInfo = () => {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  const [isEditable, setIsEditable] = useState(false);
  const { fName, address, phoneNo, setFName, setAddress, setPhoneNo } =
    useGuardianInfo();

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

  useEffect(() => {
    const getGuardianInfo = async () => {
      let isMounted = true;
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get(`${GUARDIAN_INFO_URL}`, {
          signal: controller.signal,
        });
        console.log(response.data);
        const guardianInfo = response.data;

        setFName(guardianInfo.fName ? guardianInfo.fName : "");
        setAddress(guardianInfo.address);
        setPhoneNo(guardianInfo.phoneNo ? guardianInfo.phoneNo : "");
      } catch (error) {
        console.log(error);
      }
    };
    getGuardianInfo();
  }, []);

  const [localFName, setLocalFName] = useState(fName);
  const [localPhoneNo, setLocalPhoneNo] = useState(phoneNo);

  const [validFName, setValidFName] = useState(true);
  const [validPhoneNo, setValidPhoneNo] = useState(true);

  useEffect(() => {
    setValidFName(NAMING_REGEX.test(localFName));
  }, [localFName]);

  useEffect(() => {
    setValidPhoneNo(PHONENO_REGEX.test(localPhoneNo));
  }, [localPhoneNo]);

  const onCancel = () => {
    setIsEditable(false);

    console.log(fName)

    setLocalFName(fName);
    setLocalPhoneNo(phoneNo);
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (validFName && validPhoneNo) {
      try {
        const response = await axiosPrivate.put(GUARDIAN_INFO_URL, {
          fName: localFName,
          phoneNo: localPhoneNo,
        });

        console.log("Request successful:", response.data);
        const updatedGuardianInfo = response.data;

        setFName(updatedGuardianInfo.fName);
        setPhoneNo(updatedGuardianInfo.phoneNo);

        toast({
          title: "Guardian info updated successfully",
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
              <FormLabel style={labelStyle}>Full Name</FormLabel>
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
              <FormLabel style={labelStyle}>Mobile Number</FormLabel>
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
              <FormLabel style={labelStyle}>Address</FormLabel>
              <Textarea
                value={address}
                disabled
                style={inputStyle}
              />
            </Flex>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default GuardianInfo;
