import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Image,
  Box,
  Text,
  textDecoration,
  Button,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  InputGroup,
  InputLeftAddon,
  SimpleGrid
} from "@chakra-ui/react";

import AuthHeader from "../../components/auth/AuthHeader";
import Girl from "../../assests/images/girl2.png";

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
          phoneNo : '+94'+phoneNo,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setUser("");
      setPwd("");
      setMatchPwd("");

      navigate('/login');

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
      <AuthHeader
        message={"Already registered?"}
        action={"Login"}
        url={"/login"}
      />

      <Flex mt={5} gap={10} minW="max-content" justifyContent="center">
        <Image
          w="35%"
          src={Girl}
          display={{
            base: "none",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "block",
          }}
        />
        <Box
          w={900}
          //   mr={{ base: "0px", sm: "0px", md: "0px", lg: "0px", xl: "5px" }}
          mt={10}
        >
          <Text
            textAlign="center"
            fontWeight="semibold"
            fontStyle="Roboto"
            color="#333333"
            fontSize={45}
            mb={10}
          >
            Register
          </Text>
          <Box>
            <Alert borderRadius={8} mb={5} status="error" ref={errRef} display={errMsg ? 'flex' : 'none'}>
              <AlertIcon />
              <AlertTitle>Registration failed</AlertTitle>
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Flex minW="max-content" gap={10}>
                  <Box w="50%">
                    <FormLabel
                      fontSize={22}
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
                      h={12}
                      mb={!fName || validFName ? 7 : 0}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter first name"
                    />
                    <FormHelperText
                      mb={1}
                      display={
                        fName && !validFName ? "block" : "none"
                      }
                    >
                      First name require 3 to 24 characters.
                    </FormHelperText>
                    <FormLabel
                      htmlFor="username"
                      color="#555555"
                      fontSize={22}
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
                      h={12}
                      mb={!user || validName ? 7 : 0}
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
                    />
                    <FormHelperText
                      mb={1}
                      display={
                        user && !validName ? "block" : "none"
                      }
                    >
                      username not allowed numbers, underscores, hyphens.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="password"
                      color="#555555"
                      fontSize={22}
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
                      mb={!pwd || validPwd ? 7 : 0}
                      h={12}
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
                    />
                    <FormHelperText
                      mb={1}
                      display={
                        pwd && !validPwd ? "block" : "none"
                      }
                    >
                      Ex : Passwd@123
                    </FormHelperText>
                  </Box>
                  <Box w="50%">
                    <FormLabel
                      fontSize={22}
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
                      mb={!lName || validLName ? 7 : 0}
                      h={12}
                      bg="#eeeeee"
                      border="none"
                      placeholder="Enter last name"
                      onChange={(e) => setLName(e.target.value)}
                      value={lName}
                      aria-invalid={validLName ? "false" : "true"}
                      aria-describedby="namingnote"
                      onFocus={() => setLNameFocus(true)}
                      onBlur={() => setLNameFocus(false)}
                    />
                    <FormHelperText
                      mb={1}
                      display={
                        lName && !validLName ? "block" : "none"
                      }
                    >
                      Last name require 3 to 24 characters.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="phoneNo"
                      color="#555555"
                      fontSize={22}
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
                      <InputLeftAddon h={12} children="+94" />
                      <Input
                        h={12}
                        mb={!phoneNo || validPhoneNo ? 7 : 0}
                        type="tel"
                        placeholder="Enter phone number"
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
                      mb={1}
                      display={
                        phoneNo && !validPhoneNo ? "block" : "none"
                      }
                    >
                      Please enter valid phone no in Sri Lanka.
                    </FormHelperText>

                    <FormLabel
                      htmlFor="confirm_pwd"
                      color="#555555"
                      fontSize={22}
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
                      mb={!matchPwd || validMatch ? 7 : 0}
                      h={12}
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
                    />
                    <FormHelperText
                      mb={1}
                      display={
                        matchPwd && !validMatch ? "block" : "none"
                      }
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
                    w={250}
                    h={12}
                    bg="#0074D9"
                    color="#ffffff"
                    _hover={{
                      color: "#0074D9",
                      bg: "white",
                      border: "0.5px solid #0074D9",
                    }}
                    fontSize={24}
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
