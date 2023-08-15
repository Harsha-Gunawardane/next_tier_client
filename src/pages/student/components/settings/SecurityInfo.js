import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Button,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const STUDENT_INFO_URL = "/user/info";

const SecurityInfo = () => {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  const inputStyle = {
    height: "36px",
    width: "225px",
    fontWeight: "medium",
    borderRadius: "2px",
    bottom: "1px",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const labelStyle = {
    width: "175px",
    fontWeight: "regular",
    color: "#333333",
    fontSize: "15px",
  };

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

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

    if (validNewPwd && validConfirmPwd && validCurrentPwd) {
      try {
        const response = await axiosPrivate.patch(STUDENT_INFO_URL, {
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
      } finally {
        setCurrentPwd("")
        setNewPwd("")
        setConfirmPwd("")
      }
    }
  };

  return (
    <Box w={500} ml={10} mt={5}>
      <hr w="90%" />
      <Flex justifyContent="right" mt={3} mr={5}>
        <Button
          cursor="pointer"
          w={85}
          h={35}
          mr={15}
          mb={5}
          bg="#444444"
          color="#ffffff"
          fontWeight="medium"
          justifyContent="center"
          alignItems="center"
          borderRadius={5}
          onClick={resetPwd}
        >
          Reset
        </Button>
      </Flex>
      <Text fontStyle="Roboto" fontSize={13} mb={4} color="#333333">
        Please enter your current password to reset your password
      </Text>
      <Box ml={5} mr={40} w={480}>
        <form>
          <FormControl>
            <Flex align="center">
              <FormLabel htmlFor="currentPwd" style={labelStyle}>
                Current password
              </FormLabel>
              <Input
                id="currentPwd"
                type="password"
                style={inputStyle}
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
              />
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

            <hr style={{ marginTop: "10px", marginBottom: "15px" }} />

            <Flex align="center">
              <FormLabel htmlFor="newPwd" style={labelStyle}>
                New password
              </FormLabel>
              <Input
                id="newPwd"
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                style={inputStyle}
              />
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

            <Flex align="center">
              <FormLabel htmlFor="confirmPwd" style={labelStyle}>
                Confirm password
              </FormLabel>
              <Input
                id="confirmPwd"
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                style={inputStyle}
              />
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
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default SecurityInfo;
