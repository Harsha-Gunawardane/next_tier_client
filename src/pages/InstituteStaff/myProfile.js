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

const STAFF_INFO_URL = "/staff/profile";

function Profile() {
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
        const response = await axiosPrivate.patch(STAFF_INFO_URL, {
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
  const [profileInfo, setProfileInfo] = useState(null);

  const imageUrl = "/InstituteStaffAssets/avtr7.jpg";

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

  // State variable to track whether the form is in edit mode or not
  const [isEditable, setIsEditable] = useState(false);
  // Create a separate state variable to hold the edited form data
  const [editedProfile, setEditedProfile] = useState({});

  // Handle form input changes when in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Save the edited form data
  const handleSubmit = async () => {
    try {
      await axiosPrivate.put("/staff/profile", editedProfile);
      setProfileInfo((prevProfile) => ({ ...prevProfile, ...editedProfile }));
      setIsEditable(false); // Disable edit mode after saving
    } catch (error) {
      console.log(error);
    }
  };

  // Cancel the edit mode and revert to read-only mode
  const handleCancelEdit = () => {
    setEditedProfile({}); // Clear the edited data
    setIsEditable(false); // Disable edit mode
  };

  // ...Other code...

  {
    /**view personal info */
  }
  useEffect(() => {
    const getStaffProfile = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get("/staff/profile", {
          signal: controller.signal,
        });
        // Process the join_date to extract the date part
      if (response.data.join_date) {
        response.data.join_date = response.data.join_date.split('T')[0];
      }
      if (response.data.DOB) {
        response.data.DOB = response.data.DOB.split('T')[0];
      }

        console.log(response.data);
        setProfileInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStaffProfile();
  }, []);

  

  if (!profileInfo) {
    return <div>Loading...</div>;
  }
  const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
    border-radius: 10px;
    background-color: #f5f5f5;
    margin-left: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
    border: 1px solid white;
    height: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

  return (
    <Box backgroundColor="#F9F9F9" width="100%">
      <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
        {/**Grid Item 1 */}
        <GridItem
          w="100%"
          h={{ base: "50vh", lg: "50vh" }}
          as="aside"
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          marginLeft={4}
          borderRadius={15}
        >
          <Box
            height="53vh"
            borderWidth="1px"
            borderRadius={15}
            shadow="md"
            bg="white"
            mb="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={3}
          >
            <Avatar width={200} height={200} mt={4} src={imageUrl}></Avatar>
            <Text fontWeight="bold" fontSize={20} mt={3}>
              {profileInfo.first_name} {profileInfo.last_name}
            </Text>
            <Text fontSize={13} mt={1}>
              Female
            </Text>
            <Text fontSize={13} mt={1}>
              Staff
            </Text>
            <Text fontSize={13} mt={1}>
              Joined Date: {profileInfo.join_date}
            </Text>
            <Flex mt={3}>
              {/* <Text fontSize={13} >Account status:</Text> */}
              {/* <Badge colorScheme="green" fontSize={15}>
                Enabled
              </Badge> */}
            </Flex>
          </Box>
        </GridItem>

        {/**Grid Item 2 */}
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: "88.3vh", lg: "88.3vh" }}
          marginRight={4}
          marginLeft={3}
        >
          <Tabs
            height="88.3vh"
            mt={3}
            borderRadius={0}
            overflowY="scroll"
            css={scrollbarStyles}
            variant="enclosed"
          >
            <TabList>
              <Tab
                fontSize={14}
                fontWeight="bold"
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Personal Information
              </Tab>

              <Tab
                fontSize={14}
                fontWeight="bold"
                marginLeft={3}
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Login and Security
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={1} minChildWidth={300}>
                  <Box borderRadius={15} p={5}>
                    {/* Personal Info */}
                    {/* <Text fontSize={14} mb={2} fontWeight="bold">Personal Information</Text> */}
                    <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                      <FormControl>
                        <FormLabel fontSize="small">First Name</FormLabel>
                        {isEditable ? (
                          <Input
                            border="1.5px solid #3943d4"
                            name="first_name"
                            value={
                              editedProfile.first_name || profileInfo.first_name
                            }
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Input
                            value={profileInfo.first_name}
                            fontSize="small"
                            bg="white"
                            readOnly
                          ></Input>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize={12}>Last Name</FormLabel>
                        {isEditable ? (
                          <Input
                            border="1.5px solid #3943d4"
                            name="last_name"
                            value={
                              editedProfile.last_name || profileInfo.last_name
                            }
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Input
                            value={profileInfo.last_name}
                            fontSize="small"
                            bg="white"
                            readOnly
                          ></Input>
                        )}
                      </FormControl>
                     
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Date of Birth
                        </FormLabel>
                        {isEditable ? (
                          <Input
                            border="1.5px solid #3943d4"
                            name="DOB"
                            value={editedProfile.DOB || profileInfo.DOB}
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Input
                            value={profileInfo.DOB}
                            fontSize="small"
                            bg="white"
                            readOnly
                          ></Input>
                        )}
                       
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          NIC
                        </FormLabel>
                        {isEditable ? (
                          <Input
                            border="1.5px solid #3943d4"
                            name="NIC"
                            value={editedProfile.NIC || profileInfo.NIC}
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Input
                            value={profileInfo.NIC}
                            fontSize="small"
                            bg="white"
                            readOnly
                          ></Input>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Phone Number
                        </FormLabel>
                        {isEditable ? (
                          <Input
                            border="1.5px solid #3943d4"
                            name="phone_number"
                            value={
                              editedProfile.phone_number ||
                              profileInfo.phone_number
                            }
                            bg="white"
                            fontSize={12}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Input
                            value={profileInfo.phone_number}
                            fontSize={12}
                            bg="white"
                            readOnly
                          ></Input>
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Role
                        </FormLabel>
                        <Input value="Staff" bg="white" fontSize="small" />
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          {" "}
                          Address
                        </FormLabel>
                        {isEditable ? (
                          <Textarea
                            border="1.5px solid #3943d4"
                            name="first_name"
                            value={editedProfile.address || profileInfo.address}
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Textarea
                            value={profileInfo.address}
                            fontSize="small"
                            bg="white"
                            readOnly
                          />
                        )}
                      </FormControl>
                      <FormControl>
                        <FormLabel fontSize="small" mt={3}>
                          Qualification
                        </FormLabel>
                        {isEditable ? (
                          <Textarea
                            border="1.5px solid #3943d4"
                            name="qualifications"
                            // value={editedProfile.address || profileInfo.address}
                            bg="white"
                            fontSize="small"
                            onChange={handleInputChange}
                          />
                        ) : (
                          <Textarea
                            value={profileInfo.address}
                            fontSize="small"
                            bg="white"
                            readOnly
                          />
                        )}
                      </FormControl>
                    </SimpleGrid>

                    {isEditable ? (
                      <Flex mt={3} marginLeft={680}>
                        <Button
                          onClick={handleCancelEdit}
                          mr={4}
                          colorScheme="blue"
                          size="md"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSubmit}
                          colorScheme="blue"
                          size="md"
                        >
                          Save
                        </Button>
                      </Flex>
                    ) : (
                      <Button
                        onClick={() => setIsEditable(true)}
                        mt={3}
                        colorScheme="blue"
                        size="md"
                        marginLeft={770}
                      >
                        Edit
                      </Button>
                    )}
                  </Box>
                </SimpleGrid>
              </TabPanel>

              <TabPanel>
                {/* More Info */}
                {/* <Text fontSize={14} mt={3} mb={2} fontWeight="bold">More Information</Text> */}
                <SimpleGrid columns={1} spacingX={4} spacingY={2}>
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
                          display={
                            currentPwd && !validCurrentPwd ? "block" : "none"
                          }
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
                        <FormLabel
                          fontSize={12}
                          width={250}
                          mt={1.5}
                          htmlFor="newPwd"
                        >
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
                        <FormLabel
                          fontSize={12}
                          width={250}
                          mt={1.5}
                          htmlFor="confirmPwd"
                        >
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
                          display={
                            confirmPwd && validConfirmPwd ? "block" : "none"
                          }
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
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Profile;
