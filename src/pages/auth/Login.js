import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Image,
  Box,
  Text,
  Button,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

import Header from "./components/Header";
import Girl from "../../assests/images/girl2.png";

import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import axios from "../../api/axios";
import { ROLES } from "../../config/roles";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;

      setAuth({ user, accessToken });

      // resetUser();
      setPwd("");

      if (from === "/") {
        // navigate based on the role
        const decoded = jwtDecode(accessToken);
        const roles = decoded.UserInfo.roles;

        console.log(roles);

        if (roles.includes(ROLES.Student)) {
          navigate("/stu/dashboard");
        } else if (roles.includes(ROLES.Tutor)) {
          navigate("/tutor/dashboard")
        }
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err.response?.status === 410) {
        setErrMsg("User is not verified");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      if (err.response?.status === 410) navigate("/verify");
    }
  };

  return (
    <>
      <Header
        message={"Do you haven't registered yet?"}
        action={"Sign Up"}
        url={"/register"}
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
            Login
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
              <AlertTitle fontSize={16}>Login failed</AlertTitle>
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
                  // onChange={(e) => setUser(e.target.value)}
                  // value={user}
                  {...userAttribs}
                  mb={4}
                  h={9}
                  bg="#eeeeee"
                  border="none"
                  placeholder="Enter username or register ID"
                  fontSize={14}
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                <FormLabel
                  htmlFor="password"
                  color="#555555"
                  fontSize={16}
                  fontWeight="regular"
                  fontStyle="Roboto"
                >
                  Password :
                </FormLabel>
                <Input
                  mb={4}
                  h={9}
                  bg="#eeeeee"
                  border="none"
                  placeholder="Enter password"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  fontSize={14}
                />
                <Box display="flex" ml={2}>
                  <Checkbox
                    mr={2}
                    mb={1}
                    type="checkbox"
                    id="persist"
                    onChange={toggleCheck}
                    checked={check}
                  />
                  <FormLabel
                    color="#555555"
                    fontSize={16}
                    fontWeight="regular"
                    fontStyle="Roboto"
                    htmlFor="persist"
                  >
                    Trust device
                  </FormLabel>
                </Box>
                <Link to="/forgot-password">
                  <Text
                    textAlign="right"
                    color="#032068"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    fontWeight="medium"
                    fontSize={14}
                  >
                    Forgotten Password?
                  </Text>
                </Link>

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
                    Login
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
                  <Text fontSize={14}>Do you haven't register yet?</Text>
                  <Link to="/register">
                    <Text
                      color="032068"
                      fontSize={14}
                      fontWeight="semibold"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Sign Up
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
};

export default Login;
