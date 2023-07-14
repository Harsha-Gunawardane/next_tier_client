import ReactDOM from "react-dom";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// import ToastNotification from "../components/ToastNotification";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Image,
  Box,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import AuthHeader from "../components/auth/AuthHeader";
import Girl from "../assests/images/girl2.png";
import axios from "../api/axios";

const SEND_OTP_URL = "/forgot-password/send-otp";
const VERIFY_OTP_URL = "/forgot-password/verify-otp";
const RESET_PWD_URL = "/forgot-password/reset-password";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function ForgottenPassword() {
  const toast = useToast();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [repeatPwd, setRepeatPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState(false);
  const [repeatPwdFocus, setRepeatPwdFocus] = useState(false);

  const [isSentOTP, setIsSentOTP] = useState(false);
  const [validUser, setValidUser] = useState(false);
  const [user, setUser] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const [isPinComplete, setIsPinComplete] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errRef = useRef();
  const pinRef = useRef();

  const navigate = useNavigate();

  // Custom component to handle the toast effect
  const ToastEffectComponent = ({ toast }) => {
    useEffect(() => {
      const toastId = toast({
        title: "Success",
        description: `OTP code sent successfully ${phoneNo}`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      return () => {
        toast.close(toastId);
      };
    }, [toast]);

    return null; // or any JSX you want
  };

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setMatchPwd(pwd === repeatPwd);
  }, [pwd, repeatPwd]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, validUser, pwd, repeatPwd]);

  const handlePinChange = (value, index) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);

    // Check if all PIN fields have values
    const isComplete = newPinValues.every((val) => val !== "");
    setIsPinComplete(isComplete);
  };

  const handleSubmit = async (e) => {
    console.log("IsSent: ", isSentOTP);
    e.preventDefault();

    if (validUser) {
      const v2 = PWD_REGEX.test(pwd);
      if (!v2 || !repeatPwd) {
        setErrMsg("Invalid Entry");
        return;
      }

      try {
        const response = await axios.post(
          RESET_PWD_URL,
          JSON.stringify({ user, pwd, confirmPwd: repeatPwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        navigate("/login");
      } catch (error) {
        if (!error?.response) {
          setErrMsg("No server response");
        } else if (error.response?.status === 400) {
          setErrMsg(error.message);
        } else if (error.response?.status === 401) {
          setErrMsg("Username is not valid");
        } else if (error.response?.status === 402) {
          setErrMsg("OTP has expired");
        } else {
          setErrMsg("Failed reset password");
        }
      }
    } else {
      if (isSentOTP) {
        if (isPinComplete) {
          console.log(user, pinValues.join(""));

          try {
            const response = await axios.post(
              VERIFY_OTP_URL,
              JSON.stringify({ otp: pinValues.join(""), user }),
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            setValidUser(true);
          } catch (error) {
            if (!error?.response) {
              setErrMsg("No server response");
            } else if (error.response?.status === 401) {
              setErrMsg("Invalid username");
            } else if (error.response?.status === 406) {
              setErrMsg("OTP has expired");
            } else if (
              error.response?.status === 402 ||
              error.response?.status === 420
            ) {
              setErrMsg("Invalid OTP");
            } else {
              setErrMsg("Failed verification");
            }
          }

          // Reset the form after submission
          setPinValues([null, null, null, null]);
          setIsPinComplete(false);

          // Clear the input values
          const inputFields = document.querySelectorAll(
            'input[name="pin-input-field"]'
          );
          inputFields.forEach((field) => {
            field.value = "";
          });
        } else {
          setErrMsg("Enter a valid code");
          errRef.current.focus();
        }
      } else {
        if (!user || user.trim() === "") {
          setErrMsg("Enter valid username");
          errRef.current.focus();
        } else {
          setIsSentOTP(true);
          pinRef.current.focus();

          console.log(user);

          try {
            const response = await axios.post(
              SEND_OTP_URL,
              JSON.stringify({ user }),
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            );

            const userPhoneNo = response?.data?.userPhoneNo;
            setPhoneNo(userPhoneNo);

            // Render the ToastEffectComponent within handleSubmit
            ReactDOM.render(
              <ToastEffectComponent toast={toast} />,
              document.createElement("div")
            );
          } catch (error) {
            setIsSentOTP(false);

            if (!error?.response) {
              setErrMsg("No server response");
            } else if (error.response?.status === 401) {
              setErrMsg("Invalid username");
              errRef.current.focus();
            } else {
              setErrMsg("Unexpected response");
            }
          }
        }
      }
    }
  };

  return (
    <>
      <AuthHeader
        message={"Did you remember the password?"}
        action={"Login"}
        url={"/login"}
      />

      <Flex gap={25} mt={5} minW="max-content" justifyContent="center">
        <Image
          w="35%"
          src={Girl}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          }}
          mr={32}
        />
        <Box
          w={350}
          mr={{ base: "0px", sm: "0px", md: "0px", lg: "50px", xl: "20px" }}
          mt={20}
        >
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontStyle="Roboto"
            color="#333333"
            fontSize={32}
            mb={7}
          >
            {validUser ? "Reset Password" : "Forgot Password"}
          </Text>
          <Box>
            <Alert
              borderRadius={8}
              mb={3}
              status="error"
              ref={errRef}
              display={errMsg ? "flex" : "none"}
            >
              <AlertIcon />
              <AlertTitle fontSize={16}>Verification failed</AlertTitle>
              <AlertDescription fontSize={15}>{errMsg}</AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel
                  fontSize={16}
                  color="#555555"
                  fontWeight="regular"
                  fontStyle="Roboto"
                  htmlFor="username"
                >
                  Username or Register ID :
                </FormLabel>
                <Input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  mb={4}
                  h={9}
                  bg="#eeeeee"
                  border="none"
                  placeholder="Enter username or register ID"
                  fontSize={14}
                />

                <Box
                  mt={5}
                  display={isSentOTP && !validUser ? "block" : "none"}
                >
                  <hr />
                  <Text textAlign="center" mt={3} fontSize={13}>
                    Please enter 4 digit code sent to {phoneNo}
                  </Text>
                  <Flex
                    mt={8}
                    gap={3}
                    minW="max-content"
                    justifyContent="space-around"
                  >
                    <HStack>
                      <PinInput otp>
                        <PinInputField
                          ref={pinRef}
                          size="lg"
                          placeholder="1"
                          value={pinValues[0]}
                          onChange={(e) => handlePinChange(e.target.value, 0)}
                        />
                        <PinInputField
                          size="lg"
                          placeholder="2"
                          value={pinValues[1]}
                          onChange={(e) => handlePinChange(e.target.value, 1)}
                        />
                        <PinInputField
                          size="lg"
                          placeholder="3"
                          value={pinValues[2]}
                          onChange={(e) => handlePinChange(e.target.value, 2)}
                        />
                        <PinInputField
                          size="lg"
                          placeholder="4"
                          value={pinValues[3]}
                          onChange={(e) => handlePinChange(e.target.value, 3)}
                        />
                      </PinInput>
                    </HStack>
                  </Flex>

                  <Text
                    mt={6}
                    textAlign="right"
                    color="#032068"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight="medium"
                    fontSize={14}
                    onClick={() => setIsSentOTP(false)}
                  >
                    Resend Code
                  </Text>
                </Box>

                <Box mt={5} display={validUser ? "block" : "none"}>
                  <hr />
                  <FormLabel
                    mt={5}
                    fontSize={16}
                    color="#555555"
                    fontWeight="regular"
                    fontStyle="Roboto"
                    htmlFor="pwd"
                  >
                    <Flex justifyContent="space-between">
                      Password :
                      <CheckIcon
                        color="#15BD66"
                        fontWeight="bold"
                        display={validPwd ? "flex" : "none"}
                      />
                      <CloseIcon
                        color="#D93400"
                        fontWeight="bold"
                        display={validPwd || !pwd ? "none" : "flex"}
                      />
                    </Flex>
                  </FormLabel>
                  <Input
                    type="password"
                    id="pwd"
                    autoComplete="off"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    h={9}
                    mb={!pwd || validPwd ? 6 : 0}
                    bg="#eeeeee"
                    border="none"
                    placeholder="Enter new password"
                    fontSize={14}
                  />
                  <FormHelperText
                    display={pwd && !validPwd ? "block" : "none"}
                    fontSize={13}
                  >
                    Ex : Passwd@123
                  </FormHelperText>

                  <FormLabel
                    fontSize={16}
                    color="#555555"
                    fontWeight="regular"
                    fontStyle="Roboto"
                    htmlFor="repeatPwd"
                  >
                    <Flex justifyContent="space-between">
                      Confirm password :
                      <CheckIcon
                        color="#15BD66"
                        fontWeight="bold"
                        display={matchPwd ? "flex" : "none"}
                      />
                      <CloseIcon
                        color="#D93400"
                        fontWeight="bold"
                        display={matchPwd || !repeatPwd ? "none" : "flex"}
                      />
                    </Flex>
                  </FormLabel>
                  <Input
                    type="password"
                    id="repeatPwd"
                    autoComplete="off"
                    value={repeatPwd}
                    onChange={(e) => setRepeatPwd(e.target.value)}
                    onFocus={() => setRepeatPwdFocus(true)}
                    onBlur={() => setRepeatPwdFocus(false)}
                    h={9}
                    mb={!repeatPwd || matchPwd ? 6 : 0}
                    bg="#eeeeee"
                    border="none"
                    placeholder="Confirm Password"
                    fontSize={14}
                  />
                  <FormHelperText
                    display={repeatPwd && !matchPwd ? "block" : "none"}
                    fontSize={13}
                  >
                    Must match the first password input field.
                  </FormHelperText>
                </Box>

                <Flex justifyContent="center" mt={10}>
                  <Button
                    w={200}
                    h={10}
                    bg="#0074D9"
                    color="#ffffff"
                    _hover={{
                      color: "#0074D9",
                      bg: "white",
                      border: "0.5px solid #0074D9",
                    }}
                    fontSize={19}
                    borderRadius={6}
                    fontWeight={"medium"}
                    type="submit"
                  >
                    {validUser
                      ? "Reset Password"
                      : isSentOTP
                      ? "Verify"
                      : "Send OTP"}
                  </Button>
                </Flex>
                <Flex
                  gap={2}
                  mt={5}
                  justifyContent="center"
                  display={{
                    base: "flex",
                    sm: "none",
                    md: "none",
                    lg: "none",
                    xl: "none",
                  }}
                >
                  <Text fontSize={14}>Did you already verified?</Text>
                  <Link to="/login">
                    <Text
                      color="032068"
                      fontSize={14}
                      fontWeight="semibold"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Login
                    </Text>
                  </Link>
                </Flex>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ForgottenPassword;
