import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
} from "@chakra-ui/react";

import AuthHeader from "../../components/auth/AuthHeader";
import Girl from "../../assests/images/girl2.png";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;

      setAuth({ user, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <AuthHeader
        message={"Do you haven't registered yet?"}
        action={"Sign Up"}
        url={"/register"}
      />

      <Flex mt={5} gap={40} minW="max-content" justifyContent="center">
        <Image
          w="40%"
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
          w={500}
          mr={{ base: "0px", sm: "0px", md: "0px", lg: "0px", xl: "20px" }}
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
            Login
          </Text>
          <Box>
            <Alert borderRadius={8} mb={5} status="error" ref={errRef} display={errMsg ? 'flex' : 'none'}>
              <AlertIcon />
              <AlertTitle>Login failed</AlertTitle>
              <AlertDescription>{errMsg}</AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel
                  fontSize={22}
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
                  mb={6}
                  h={12}
                  bg="#eeeeee"
                  border="none"
                  placeholder="Enter username or register ID"
                />
                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                <FormLabel
                  htmlFor="password"
                  color="#555555"
                  fontSize={22}
                  fontWeight="regular"
                  fontStyle="Roboto"
                >
                  Password :
                </FormLabel>
                <Input
                  mb={6}
                  h={12}
                  bg="#eeeeee"
                  border="none"
                  placeholder="Enter password"
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  
                />
                <Box display="flex" ml={2}>
                  <Checkbox
                    mr={2}
                    mb={1}
                    type="checkbox"
                    id="persist"
                    onChange={togglePersist}
                    checked={persist}
                    defaultChecked
                  />
                  <FormLabel
                    color="#555555"
                    fontSize={22}
                    fontWeight="regular"
                    fontStyle="Roboto"
                    htmlFor="persist"
                  >
                    Trust device
                  </FormLabel>
                </Box>
                <Text
                  textAlign="right"
                  color="#032068"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  fontWeight="medium"
                >
                  Forgotten Password?
                </Text>

                <Flex justifyContent="center" mt={10}>
                  <Button
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
                    Login
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

export default Login;
