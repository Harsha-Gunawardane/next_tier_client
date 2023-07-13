import ReactDOM from "react-dom";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// import ToastNotification from "../components/ToastNotification";
import {
  FormControl,
  FormLabel,
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

import AuthHeader from "../components/auth/AuthHeader";
import Girl from "../assests/images/girl2.png";
import axios from "../api/axios";

const SEND_OTP_URL = "/send-otp";
const VERIFY_OTP_URL = "/verify-otp";

function UserVerify() {
  const toast = useToast();

  const [isSentOTP, setIsSentOTP] = useState(false);
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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const toastId = toast({
      title: "Warning",
      description: `Verify your account`,
      status: "warning",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    return () => {
      toast.close(toastId);
    };
  }, [toast]);

  useEffect(() => {
    setErrMsg("");
  }, [user, isSentOTP]);

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

          navigate("/login");
        } catch (error) {
          if (!error?.response) {
            setErrMsg("No server response");
          } else if (error.response?.status === 401) {
            setErrMsg("Invalid username");
          } else if (error.response?.status === 406) {
            setErrMsg("OTP has expired");
          } else if (
            // error.response?.status === 402 ||
            error.response?.status === 420
          ) {
            setErrMsg("Invalid OTP");
          } else {
            setErrMsg("Failed verification");
          }
          // errRef.current.focus();

          if (error.response?.status === 411) {
            navigate("/login");
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
        setErrMsg("Please enter a username");
        errRef.current.focus();
      } else {
        console.log("Please enter");

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

          if (error.response?.status === 411) {
            navigate("/login");
          }
        }
      }
    }
  };

  return (
    <>
      <AuthHeader
        message={"Did you already verified?"}
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
            Verify User
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

                <Box mt={5} display={isSentOTP ? "block" : "none"}>
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
                    {isSentOTP ? "Verify" : "Send OTP"}
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

export default UserVerify;
