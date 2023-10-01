import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  InputGroup,
  InputRightElement,
  Divider,
  useToast,
} from "@chakra-ui/react";
import {
  Box,
  Grid,
  GridItem,
  Avatar,
  Text,
  Badge,
  Flex,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const TUTOR_INFO_URL = "/tutor/tutordetails";

function Resetpassword() {
    const toast = useToast();
    {
      /**re set pw */
    }
    const [currentPwd, setCurrentPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
  
    const [currentPwdError, setCurrentPwdError] = useState("");
    const [newPwdError, setNewPwdError] = useState("");
    const [confirmPwdError, setConfirmPwdError] = useState("");
    const [currentPwdValidation, setCurrentPwdValidation] = useState("");
    const [newPwdValidation, setNewPwdValidation] = useState("");
    const [confirmPwdValidation, setConfirmPwdValidation] = useState("");
  
    const [validCurrentPwd, setValidCurrentPwd] = useState(false);
    const [validNewPwd, setValidNewPwd] = useState(false);
    const [validConfirmPwd, setValidConfirmPwd] = useState(false);
  
    useEffect(() => {
      setValidCurrentPwd(PWD_REGEX.test(currentPwd));
    }, [currentPwd]);
  
    useEffect(() => {
      setValidNewPwd(PWD_REGEX.test(newPwd));
      setValidConfirmPwd(newPwd === confirmPwd);
    }, [newPwd, confirmPwd]);
  
    const resetPwd = async (e) => {
      e.preventDefault();
      // Reset error messages on form submit attempt
      setCurrentPwdError("");
      setNewPwdError("");
      setConfirmPwdError("");
      // Check for empty fields and set error messages
      if (!currentPwd) {
        setCurrentPwdError("Please enter your current password.");
      }
      if (!newPwd) {
        setNewPwdError("Please enter a new password.");
      }
      if (!confirmPwd) {
        setConfirmPwdError("Please confirm the new password.");
      }
  
      // Validate passwords using regex and set error messages
      if (currentPwd && !PWD_REGEX.test(currentPwd)) {
        setCurrentPwdValidation(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 to 24 characters long."
        );
      } else {
        setCurrentPwdValidation("");
      }
  
      if (newPwd && !PWD_REGEX.test(newPwd)) {
        setNewPwdValidation(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 to 24 characters long."
        );
      } else {
        setNewPwdValidation("");
      }
  
      if (confirmPwd && !PWD_REGEX.test(confirmPwd)) {
        setConfirmPwdValidation(
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 to 24 characters long."
        );
      } else if (newPwd !== confirmPwd) {
        setConfirmPwdError("Passwords do not match.");
      } else {
        setNewPwdValidation("");
      }
  
      if (
        validCurrentPwd &&
        validNewPwd &&
        validConfirmPwd &&
        newPwd === confirmPwd
      ) {
        try {
          const response = await axiosPrivate.patch(TUTOR_INFO_URL, {
            currentPwd,
            newPwd,
            confirmPwd,
          });
  
          console.log("Request successful:", response.data);
  
          toast({
            title: "Password reset successfully",
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
  
          toast({
            title: errorMessage,
            status: "error",
            isClosable: true,
            position: "top-right",
          });
        }
      }
    };

    const axiosPrivate = useAxiosPrivate();

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleToggleCurrentPassword = () => {
        setShowCurrentPassword((prev) => !prev);
      };
    
      const handleToggleNewPassword = () => {
        setShowNewPassword((prev) => !prev);
      };
    
      const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((prev) => !prev);
      };
  return (
    <Box>
      <Box>
        <Text fontSize="small" color="gray.500" mt={2} mb={3}>
          Please Enter your current password to reset password
        </Text>
        {/* <FormControl>
                      <Flex>
                      <FormLabel fontSize={12} width={250} mt={1.5}>Current password</FormLabel>
                      <Input bg="white" width={250}/>
                      </Flex>
                    </FormControl> */}
        <Divider></Divider>
        <FormControl mt={2}>
          <Flex>
            <FormLabel
              fontSize="small"
              width={250}
              mt={1.5}
              htmlFor="currentPwd"
            >
              Current password
            </FormLabel>
            <InputGroup width={250}>
              <Input
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                type={showCurrentPassword ? "text" : "password"}
                bg="white"
                pr="4rem"
                width={250}
              />
              <InputRightElement width="4rem">
                {showCurrentPassword ? (
                  <ViewIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleCurrentPassword}
                    color="gray.500"
                  />
                ) : (
                  <ViewOffIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleCurrentPassword}
                    color="gray.500"
                  />
                )}
              </InputRightElement>
            </InputGroup>

            <CheckIcon
              color="#15BD66"
              ml={2}
              bottom={1}
              display={validCurrentPwd ? "block" : "none"}
            />
            <CloseIcon
              color="#D93400"
              ml={2}
              bottom={1}
              display={currentPwd && !validCurrentPwd ? "block" : "none"}
            />
          </Flex>
          {/* Display error messages for confirmPwd */}
          {currentPwdError && (
            <Text fontSize="sm" color="red.500">
              {currentPwdError}
            </Text>
          )}
          {currentPwdValidation && (
            <Text fontSize="sm" color="red.500">
              {currentPwdValidation}
            </Text>
          )}
        </FormControl>

        <FormControl mt={5}>
          <Flex>
            <FormLabel fontSize={12} width={250} mt={1.5} htmlFor="newPwd">
              New password
            </FormLabel>
            <InputGroup width={250}>
              <Input
                id="newPwd"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                type={showCurrentPassword ? "text" : "password"}
                bg="white"
                pr="4rem"
                width={250}
                // ...other props as needed
              />
              <InputRightElement width="4rem">
                {showNewPassword ? (
                  <ViewIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleNewPassword}
                    color="gray.500"
                  />
                ) : (
                  <ViewOffIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleNewPassword}
                    color="gray.500"
                  />
                )}
              </InputRightElement>
            </InputGroup>

            <CheckIcon
              color="#15BD66"
              ml={2}
              bottom={1}
              display={validNewPwd ? "block" : "none"}
            />
            <CloseIcon
              color="#D93400"
              ml={2}
              bottom={1}
              display={newPwd && !validNewPwd ? "block" : "none"}
            />
          </Flex>
          {/* Display error messages for confirmPwd */}
          {newPwdError && (
            <Text fontSize="sm" color="red.500">
              {newPwdError}
            </Text>
          )}
          {/* Display error messages for confirmPwdValidation */}
          {newPwdValidation && (
            <Text fontSize="sm" color="red.500">
              {newPwdValidation}
            </Text>
          )}
        </FormControl>

        <FormControl mt={3}>
          <Flex>
            <FormLabel fontSize={12} width={250} mt={1.5} htmlFor="confirmPwd">
              Confirm password
            </FormLabel>
            <InputGroup width={250}>
              <Input
                type={showCurrentPassword ? "text" : "password"}
                bg="white"
                pr="4rem"
                width={250}
                id="confirmPwd"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                // ...other props as needed
              />
              <InputRightElement width="4rem">
                {showConfirmPassword ? (
                  <ViewIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleConfirmPassword}
                    color="gray.500"
                  />
                ) : (
                  <ViewOffIcon
                    h="100%"
                    cursor="pointer"
                    onClick={handleToggleConfirmPassword}
                    color="gray.500"
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <CheckIcon
              color="#15BD66"
              ml={2}
              bottom={1}
              display={confirmPwd && validConfirmPwd ? "block" : "none"}
            />
            <CloseIcon
              color="#D93400"
              ml={2}
              bottom={1}
              display={!validConfirmPwd ? "block" : "none"}
            />
          </Flex>
          {/* Display error messages for confirmPwd */}
          {confirmPwdError && (
            <Text fontSize="sm" color="red.500">
              {confirmPwdError}
            </Text>
          )}
          {/* Display error messages for confirmPwdValidation */}
          {confirmPwdValidation && (
            <Text fontSize="sm" color="red.500">
              {confirmPwdValidation}
            </Text>
          )}
        </FormControl>
      </Box>
      <Box>
        <Button
          cursor="pointer"
          w={85}
          h={35}
          mr={15}
          mb={5}
          colorScheme="blue"
          color="#ffffff"
          fontWeight="medium"
          justifyContent="center"
          alignItems="center"
          borderRadius={5}
          onClick={resetPwd}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}

export default Resetpassword;
