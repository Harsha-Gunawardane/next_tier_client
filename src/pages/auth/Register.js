import { useRef, useState, useEffect } from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

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
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

import Header from "./components/Header";
import Girl from "../../assests/images/girl2.png";
import axios from "../../api/axios";

// regex patterns
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAMING_REGEX = /^[a-zA-Z]{3,13}$/;
const PHONENO_REGEX = /^\d{9}$/;

const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fName, setFName] = useState("");
  const [validFName, setValidFName] = useState(false);
  const [fNameFocus, setFNameFocus] = useState(false);

  const [lName, setLName] = useState("");
  const [validLName, setValidLName] = useState(false);
  const [lNameFocus, setLNameFocus] = useState(false);

  const [phoneNo, setPhoneNo] = useState("");
  const [validPhoneNo, setValidPhoneNo] = useState(false);
  const [phoneNoFocus, setPhoneNoFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidFName(NAMING_REGEX.test(fName));
  }, [fName]);

  useEffect(() => {
    setValidLName(NAMING_REGEX.test(lName));
  }, [lName]);

  useEffect(() => {
    setValidPhoneNo(PHONENO_REGEX.test(phoneNo));
  }, [phoneNo]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, fName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user, pwd, matchPwd, fName, lName, phoneNo);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          user,
          pwd,
          repeatPwd: matchPwd,
          fName,
          lName,
          phoneNo: "+94" + phoneNo,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      setSuccess(true);

      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");

      navigate("/verify");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username is already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Header
        message={"Already registered?"}
        action={"Login"}
        url={"/login"}
      />

      <Flex mt={5} gap={10} minW="max-content" justifyContent="center">
        <Image
          w="32%"
          src={Girl}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "block",
            xl: "block",
          }}
          mr={14}
        />
        <Box
          w={700}
          mr={{ base: "0px", sm: "0px", md: "0px", lg: "15px", xl: "15px" }}
          mt={10}
        >
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontStyle="Roboto"
            color="#333333"
            fontSize={32}
            mb={7}
          >
            Register
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
              <AlertTitle fontSize={16}>Registration failed</AlertTitle>
              <AlertDescription fontSize={15}>{errMsg}</AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Flex minW="max-content" gap={10}>
                  <Box w="50%">
                    <FormLabel
                      fontSize={16}
                      color="#555555"
                      fontWeight="regular"
                      fontStyle="Roboto"
                      htmlFor="fName"
                    >
                      <Flex justifyContent="space-between">
                        First Name:
                        <CheckIcon
                          color="#15BD66"
                          fontWeight="bold"
                          display={validFName ? "flex" : "none"}
                        />
                        <CloseIcon
                          color="#D93400"
                          fontWeight="bold"
                          display={validFName || !fName ? "none" : "flex"}
                        />
                      </Flex>
                    </FormLabel>
                    <Input
                      type="text"
                      id="fName"
                      ref={userRef}
                      autoComplete="off"
                      value={fName}
                      onChange={(e) => setFName(e.target.value)}
                      onFocus={() => setFNameFocus(true)}
                      onBlur={() => setFNameFocus(false)}
                      aria-invalid={validFName ? "false" : "true"}
                      aria-describedby="namingnote"
                      h={9}
                      mb={!fName || validFName ? 6 : 0}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter first name"
                      fontSize={14}
                    />
                    <FormHelperText
                      display={fName && !validFName ? "block" : "none"}
                      fontSize={13}
                    >
                      First name require 3 to 24 characters.
                    </FormHelperText>
                    <FormLabel
                      htmlFor="username"
                      color="#555555"
                      fontSize={16}
                      fontWeight="regular"
                      fontStyle="Roboto"
                    >
                      <Flex justifyContent="space-between">
                        Username :
                        <CheckIcon
                          color="#15BD66"
                          fontWeight="bold"
                          display={validName ? "flex" : "none"}
                        />
                        <CloseIcon
                          color="#D93400"
                          fontWeight="bold"
                          display={validName || !user ? "none" : "flex"}
                        />
                      </Flex>
                    </FormLabel>
                    <Input
                      h={9}
                      mb={!user || validName ? 6 : 0}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter username"
                      type="text"
                      id="username"
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      fontSize={14}
                    />
                    <FormHelperText
                      display={user && !validName ? "block" : "none"}
                      fontSize={13}
                    >
                      username not allowed numbers, underscores, hyphens.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="password"
                      color="#555555"
                      fontSize={16}
                      fontWeight="regular"
                      fontStyle="Roboto"
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
                      mb={!pwd || validPwd ? 6 : 0}
                      h={9}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter password"
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      fontSize={14}
                    />
                    <FormHelperText
                      display={pwd && !validPwd ? "block" : "none"}
                      fontSize={13}
                    >
                      Ex : Passwd@123
                    </FormHelperText>
                  </Box>
                  <Box w="50%">
                    <FormLabel
                      fontSize={16}
                      color="#555555"
                      fontWeight="regular"
                      fontStyle="Roboto"
                      htmlFor="lName"
                    >
                      <Flex justifyContent="space-between">
                        Last Name :
                        <CheckIcon
                          color="#15BD66"
                          fontWeight="bold"
                          display={validLName ? "flex" : "none"}
                        />
                        <CloseIcon
                          color="#D93400"
                          fontWeight="bold"
                          display={validLName || !lName ? "none" : "flex"}
                        />
                      </Flex>
                    </FormLabel>
                    <Input
                      type="text"
                      id="lName"
                      autoComplete="off"
                      mb={!lName || validLName ? 6 : 0}
                      h={9}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter last name"
                      onChange={(e) => setLName(e.target.value)}
                      value={lName}
                      aria-invalid={validLName ? "false" : "true"}
                      aria-describedby="namingnote"
                      onFocus={() => setLNameFocus(true)}
                      onBlur={() => setLNameFocus(false)}
                      fontSize={14}
                    />
                    <FormHelperText
                      display={lName && !validLName ? "block" : "none"}
                      fontSize={13}
                    >
                      Last name require 3 to 24 characters.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="phoneNo"
                      color="#555555"
                      fontSize={16}
                      fontWeight="regular"
                      fontStyle="Roboto"
                    >
                      <Flex justifyContent="space-between">
                        Phone Number :
                        <CheckIcon
                          color="#15BD66"
                          fontWeight="bold"
                          display={validPhoneNo ? "flex" : "none"}
                        />
                        <CloseIcon
                          color="#D93400"
                          fontWeight="bold"
                          display={validPhoneNo || !phoneNo ? "none" : "flex"}
                        />
                      </Flex>
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon h={9} children="+94" />
                      <Input
                        h={9}
                        mb={!phoneNo || validPhoneNo ? 6 : 0}
                        type="tel"
                        placeholder="Enter phone number"
                        fontSize={14}
                        autoComplete="off"
                        value={phoneNo}
                        onChange={(e) => {
                          setPhoneNo(e.target.value);
                        }}
                        aria-invalid={validPhoneNo ? "false" : "true"}
                        aria-describedby="contactnote"
                        onFocus={() => setPhoneNoFocus(true)}
                        onBlur={() => setPhoneNoFocus(false)}
                      />
                    </InputGroup>
                    <FormHelperText
                      fontSize={13}
                      display={phoneNo && !validPhoneNo ? "block" : "none"}
                    >
                      Please enter valid phone no in Sri Lanka.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="confirm_pwd"
                      color="#555555"
                      fontSize={16}
                      fontWeight="regular"
                      fontStyle="Roboto"
                    >
                      <Flex justifyContent="space-between">
                        Confirm Password :
                        <CheckIcon
                          color="#15BD66"
                          fontWeight="bold"
                          display={validMatch && matchPwd ? "flex" : "none"}
                        />
                        <CloseIcon
                          color="#D93400"
                          fontWeight="bold"
                          display={validMatch || !matchPwd ? "none" : "flex"}
                        />
                      </Flex>
                    </FormLabel>
                    <Input
                      mb={!matchPwd || validMatch ? 6 : 0}
                      h={9}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Repeat password"
                      type="password"
                      id="confirm_pwd"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      fontSize={14}
                    />
                    <FormHelperText
                      fontSize={13}
                      display={matchPwd && !validMatch ? "block" : "none"}
                    >
                      Must match the first password input field.
                    </FormHelperText>
                  </Box>
                </Flex>

                <Flex justifyContent="center" mt={10}>
                  <Button
                    disabled={
                      !validName || !validPwd || !validMatch ? true : false
                    }
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
                    Sign Up
                  </Button>
                </Flex>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
