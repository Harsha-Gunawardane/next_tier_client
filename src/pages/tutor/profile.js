import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Avatar,
  Text,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Input,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { CheckIcon } from "@chakra-ui/icons";
import ResetPassowrd from "../../components/tutor/Resetpassword";
import * as Yup from "yup";

const STAFF_INFO_URL = "/tutor/tutordetails";

function Profile() {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();
  const [profileInfo, setProfileInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To control the edit state

  const imageUrl = "/tutor/img1.jpg";

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("Required"),
    last_name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Only letters allowed")
      .required("Required"),
    NIC: Yup.string()
      .matches(/^(?:\d{9}[Vv]|\d{12}(?![Vv]))$/, "Invalid NIC format")
      .required("Required"),
    phone_number: Yup.string()
      .required("Phone number is required")
      .matches(
        /^\+94\d{9}$/,
        "Invalid phone number format. Please enter +94 followed by 9 digits"
      ),
    DOB: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

  useEffect(() => {
    const getStaffProfile = async () => {
      const controller = new AbortController();
      try {
        const response = await axiosPrivate.get("/tutor/tutordetails", {
          signal: controller.signal,
        });
        if (response.data.join_date) {
          response.data.join_date = response.data.join_date.split("T")[0];
        }
        setProfileInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStaffProfile();
  }, []);

  const onSave = async (values) => {
    console.log("Save button clicked");
    try {
      const response = await axiosPrivate.put(STAFF_INFO_URL, values);
      setProfileInfo(response.data);

      toast({
        title: "Profile updated successfully",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      toast({
        title: "An error occurred",
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const onCancel = () => {
    setIsEditing(false); // Exit edit mode
  };

  if (!profileInfo) {
    return <div>Loading...</div>;
  }

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
              Joined Date: {profileInfo.join_date}
            </Text>
            <Flex mt={3}></Flex>
          </Box>
        </GridItem>

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
                _selected={{ color: "white", bg: "blue.500" }}
              >
                Login and Security
              </Tab>
              {/* ... (Other tabs) */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <Formik
                  initialValues={{
                    first_name: profileInfo.first_name,
                    last_name: profileInfo.last_name,
                    DOB: profileInfo.DOB
                      ? new Date(profileInfo.DOB).toLocaleDateString()
                      : "",
                    NIC: profileInfo.NIC,
                    phone_number: profileInfo.phone_number,
                    address: profileInfo.address,
                    description:
                      profileInfo.tutor && profileInfo.tutor[0]
                        ? profileInfo.tutor[0].description
                        : "",
                    qualifications:
                      profileInfo.tutor && profileInfo.tutor[0]
                        ? profileInfo.tutor[0].qualifications.join(", ")
                        : "",
                  }}
                  onSubmit={onSave}
                  validationSchema={validationSchema}
                >
                  {/* {({ isSubmitting, errors }) => ( */}
                  {(formikProps) => (
                    <Form>
                      <Box borderRadius={15} p={5}>
                        <SimpleGrid columns={2} spacingX={4} spacingY={2}>
                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              First Name
                            </FormLabel>
                            <Field
                              type="text"
                              name="first_name"
                              as={Input}
                              fontSize="small"
                              readOnly={!isEditing} // Read-only unless editing
                              bg="white"
                            />

                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.first_name}
                            </div>
                          </FormControl>
                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Last Name
                            </FormLabel>
                            <Field
                              type="text"
                              name="last_name"
                              as={Input}
                              fontSize="small"
                              readOnly={!isEditing} // Read-only unless editing
                              bg="white"
                            />

                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.last_name}
                            </div>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Phone Number
                            </FormLabel>
                            <InputGroup>
                              <Field
                                type="text"
                                name="phone_number"
                                as={Input}
                                fontSize="small"
                                readOnly={!isEditing}
                                bg="white"
                              />
                            </InputGroup>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.phone_number}
                            </div>
                          </FormControl>
                          {!isEditing && (
                            <FormControl>
                              <FormLabel fontSize="small" mt={3}>
                                E-mail
                              </FormLabel>
                              <InputGroup>
                                <Field
                                  type="text"
                                  name="username"
                                  value={profileInfo.username}
                                  as={Input}
                                  fontSize="small"
                                  readOnly
                                  bg="white"
                                />
                              </InputGroup>
                            </FormControl>
                          )}

                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Description
                            </FormLabel>
                            <Field
                              type="text"
                              name="description"
                              as={Input}
                              fontSize="small"
                              readOnly={!isEditing} // Read-only unless editing
                              bg="white"
                            />
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.description}
                            </div>
                          </FormControl>

                          <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Qualifications:
                            </FormLabel>
                            <Field
                              type="text"
                              name="qualifications"
                              as={Input}
                              fontSize="small"
                              readOnly={!isEditing}
                              bg="white"
                            />
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.qualifications}
                            </div>
                          </FormControl>

                          {/*  
                            <FormControl>
                            <FormLabel fontSize="small" mt={3}>
                              Description
                            </FormLabel>
                            <Field
                              type="text"
                              name="description"
                              as={Input}
                              fontSize="small"
                              readOnly={!isEditing} // Read-only unless editing
                              bg="white"
                            />

                            <div style={{ color: "red", fontSize: "12px" }}>
                              {formikProps.errors.description}
                            </div>
                          </FormControl> 

                      
                            <FormControl>
                              <FormLabel fontSize="small" mt={3}>
                                Qualifications:
                              </FormLabel>
                              <Field
                                as={Textarea}
                                bg="white"
                                fontSize="small"
                                readOnly={!isEditing}
                                value={
                                  profileInfo.tutor &&
                                  profileInfo.tutor.map((tutor) =>
                                    tutor.qualifications
                                      .map(
                                        (qualification, index) =>
                                          `${qualification}${
                                            index !==
                                            tutor.qualifications.length - 1
                                              ? ", "
                                              : ""
                                          }`
                                      )
                                      .join("")
                                  )
                                }
                              />
                            </FormControl> */}
                        </SimpleGrid>

                        {isEditing ? ( // Show Save and Cancel buttons when editing
                          <>
                            <Button
                              mt={3}
                              colorScheme="blue"
                              size="md"
                              type="submit"
                              onClick={() => onSave(formikProps.values)}
                            >
                              Save
                            </Button>
                            <Button
                              mt={3}
                              colorScheme="gray"
                              size="md"
                              onClick={onCancel}
                              ml={2}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            mt={3}
                            colorScheme="blue"
                            size="md"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit
                          </Button>
                        )}
                      </Box>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              <TabPanel>
                <ResetPassowrd />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Profile;

// import React, { useEffect, useState } from "react";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import {
//   Box,
//   Grid,
//   GridItem,
//   SimpleGrid,
//   Avatar,
//   Text,
//   Flex,
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Button,
//   Input,
//   Textarea,
//   useToast,
//   FormControl,
//   FormLabel,
//   InputGroup,
//   InputRightElement,
//   InputLeftAddon,
//   FormErrorMessage,
// } from "@chakra-ui/react";
// import { Formik, Field, ErrorMessage, Form } from "formik";
// import { CheckIcon } from "@chakra-ui/icons";
// import ResetPassowrd from "../../components/tutor/Resetpassword";
// import * as Yup from "yup";

// const STAFF_INFO_URL = "/tutor/tutordetails";

// function Profile() {
//   const toast = useToast();
//   const axiosPrivate = useAxiosPrivate();
//   const [profileInfo, setProfileInfo] = useState(null);
//   const [isEditing, setIsEditing] = useState(false); // To control the edit state

//   const imageUrl = "/InstituteStaffAssets/avtr7.jpg";

//   const validationSchema = Yup.object().shape({
//     first_name: Yup.string()
//       .matches(/^[A-Za-z]+$/, "Only letters allowed")
//       .required("Required"),
//     last_name: Yup.string()
//       .matches(/^[A-Za-z]+$/, "Only letters allowed")
//       .required("Required"),
//     NIC: Yup.string()
//       .matches(/^(?:\d{9}[Vv]|\d{12}(?![Vv]))$/, "Invalid NIC format")
//       .required("Required"),
//     phone_number: Yup.string()
//       .required("Phone number is required")
//       .matches(
//         /^\+94\d{9}$/,
//         "Invalid phone number format. Please enter +94 followed by 9 digits"
//       ),
//     DOB: Yup.string().required("Required"),
//     address: Yup.string().required("Required"),
//   });

//   useEffect(() => {
//     const getStaffProfile = async () => {
//       const controller = new AbortController();
//       try {
//         const response = await axiosPrivate.get("/tutor/tutordetails", {
//           signal: controller.signal,
//         });
//         if (response.data.join_date) {
//           response.data.join_date = response.data.join_date.split("T")[0];
//         }
//         setProfileInfo(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getStaffProfile();
//   }, []);

//   const onSave = async (values) => {
//     try {
//       const response = await axiosPrivate.put(`/tutor/tutordetails`, values);
//       setProfileInfo(response.data);

//       toast({
//         title: "Profile updated successfully",
//         status: "success",
//         isClosable: true,
//         position:"top-right"
//       });
//       setIsEditing(false); // Exit edit mode
//     } catch (error) {
//       toast({
//         title: "An error occurred",
//         status: "error",
//         isClosable: true,
//         position:"top-right"
//       });
//     }
//   };

//   const onCancel = () => {
//     setIsEditing(false); // Exit edit mode
//   };

//   if (!profileInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box backgroundColor="#F9F9F9" width="100%">
//       <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
//         {/**Grid Item 1 */}
//         <GridItem
//           w="100%"
//           h={{ base: "50vh", lg: "50vh" }}
//           as="aside"
//           colSpan={{ base: 8, lg: 2, xl: 2 }}
//           marginLeft={4}
//           borderRadius={15}
//         >
//           <Box
//             height="53vh"
//             borderWidth="1px"
//             borderRadius={15}
//             shadow="md"
//             bg="white"
//             mb="1"
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             mt={3}
//           >
//             <Avatar width={200} height={200} mt={4} src={imageUrl}></Avatar>
//             <Text fontWeight="bold" fontSize={20} mt={3}>
//               {profileInfo.first_name} {profileInfo.last_name}
//             </Text>

//             <Text fontSize={13} mt={1}>
//               Joined Date: {profileInfo.join_date}
//             </Text>
//             <Flex mt={3}></Flex>
//           </Box>
//         </GridItem>

//         <GridItem
//           colSpan={{ base: 8, lg: 6, xl: 6 }}
//           h={{ base: "88.3vh", lg: "88.3vh" }}
//           marginRight={4}
//           marginLeft={3}
//         >
//           <Tabs
//             height="88.3vh"
//             mt={3}
//             borderRadius={0}
//             overflowY="scroll"
//             variant="enclosed"
//           >
//             <TabList>
//               <Tab
//                 fontSize={14}
//                 fontWeight="bold"
//                 _selected={{ color: "white", bg: "blue.500" }}
//               >
//                 Personal Information
//               </Tab>
//               <Tab
//                 fontSize={14}
//                 fontWeight="bold"
//                 _selected={{ color: "white", bg: "blue.500" }}
//               >
//                 Login and Security
//               </Tab>
//               {/* ... (Other tabs) */}
//             </TabList>
//             <TabPanels>
//               <TabPanel>
//                 <Formik
//                   initialValues={{
//                     first_name: profileInfo.first_name,
//                     last_name: profileInfo.last_name,
//                     // DOB: profileInfo.DOB ? new Date(profileInfo.DOB).toLocaleDateString() : '',
//                     // NIC: profileInfo.NIC,
//                     phone_number: profileInfo.phone_number,
//                     // email: profileInfo.tutor[0].email,
//                     // description: profileInfo.tutor[0].description,
//                   }}
//                   onSubmit={onSave}
//                   validationSchema={validationSchema}
//                 >
//                   {/* {({ isSubmitting, errors }) => ( */}
//                   {(formikProps) => (
//                     <Form>
//                       <Box borderRadius={15} p={5}>
//                         <SimpleGrid columns={2} spacingX={4} spacingY={2}>
//                           <FormControl>
//                             <FormLabel fontSize="small" mt={3}>
//                               First Name
//                             </FormLabel>
//                             <Field
//                               type="text"
//                               name="first_name"
//                               as={Input}
//                               fontSize="small"
//                               readOnly={!isEditing} // Read-only unless editing
//                               bg="white"
//                             />

//                             <div style={{ color: "red", fontSize: "12px" }}>
//                               {formikProps.errors.first_name}
//                             </div>
//                           </FormControl>
//                           <FormControl>
//                             <FormLabel fontSize="small" mt={3}>
//                               Last Name
//                             </FormLabel>
//                             <Field
//                               type="text"
//                               name="last_name"
//                               as={Input}
//                               fontSize="small"
//                               readOnly={!isEditing} // Read-only unless editing
//                               bg="white"
//                             />

//                             <div style={{ color: "red", fontSize: "12px" }}>
//                               {formikProps.errors.last_name}
//                             </div>
//                           </FormControl>

//                           <FormControl>
//                             <FormLabel fontSize="small" mt={3}>
//                               Phone Number
//                             </FormLabel>
//                             <InputGroup>
//                               <Field
//                                 type="text"
//                                 name="phone_number"
//                                 as={Input}
//                                 fontSize="small"
//                                 readOnly={!isEditing}
//                                 bg="white"
//                               />
//                             </InputGroup>
//                             <div style={{ color: "red", fontSize: "12px" }}>
//                               {formikProps.errors.phone_number}
//                             </div>
//                           </FormControl>

//                           {!isEditing && (
//                             <FormControl>
//                               <FormLabel fontSize="small" mt={3}>
//                                 E-mail
//                               </FormLabel>
//                               <InputGroup>
//                                 <Field
//                                   type="text"
//                                   name="email"

//                                   as={Input}
//                                   fontSize="small"
//                                   readOnly

//                                   bg="white"
//                                 />
//                               </InputGroup>
//                             </FormControl>
//                           )}

//                           {/* <FormControl>
//                             <FormLabel fontSize="small" mt={3}>
//                               address
//                             </FormLabel>
//                             <Field
//                               type="text"
//                               name="address"
//                               as={Textarea}
//                               fontSize="small"
//                               readOnly={!isEditing} // Read-only unless editing
//                               bg="white"
//                             />

//                             <div style={{ color: "red", fontSize: "12px" }}>
//                               {formikProps.errors.address}
//                             </div>
//                           </FormControl> */}

// {/*
//                             <FormControl>
//                               <FormLabel fontSize="small" mt={3}>
//                                 Qualifications:
//                               </FormLabel>
//                               <Field
//                                 as={Textarea}
//                                 bg="white"
//                                 fontSize="small"
//                                readOnly={!isEditing}
//                                 value={
//                                   profileInfo.tutor &&
//                                   profileInfo.tutor.map((staff) =>
//                                     staff.qualifications
//                                       .map(
//                                         (qualification, index) =>
//                                           `${qualification}${
//                                             index !==
//                                             staff.qualifications.length - 1
//                                               ? ", "
//                                               : ""
//                                           }`
//                                       )
//                                       .join("")
//                                   )
//                                 }
//                               />
//                             </FormControl>  */}

//                             {/* <FormControl>
//                               <FormLabel fontSize="small" mt={3}>
//                                 Description:
//                               </FormLabel>
//                               <Field
//                                 as={Textarea}
//                                   type="text"
//                                   name="description"
//                                 readOnly={!isEditing}

//                                   fontSize="small"

//                                   bg="white"

//                               />
//                             </FormControl> */}

//                         </SimpleGrid>

//                         {isEditing ? ( // Show Save and Cancel buttons when editing
//                           <>
//                             <Button
//                               mt={3}
//                               colorScheme="blue"
//                               size="md"
//                               type="submit"
//                             >
//                               Save
//                             </Button>
//                             <Button
//                               mt={3}
//                               colorScheme="gray"
//                               size="md"
//                               onClick={onCancel}
//                               ml={2}
//                             >
//                               Cancel
//                             </Button>
//                           </>
//                         ) : (
//                           <Button
//                             mt={3}
//                             colorScheme="blue"
//                             size="md"
//                             onClick={() => setIsEditing(true)}
//                           >
//                             Edit
//                           </Button>
//                         )}
//                       </Box>
//                     </Form>
//                   )}
//                 </Formik>
//               </TabPanel>
//               <TabPanel>
//                 <ResetPassowrd />
//               </TabPanel>
//             </TabPanels>
//           </Tabs>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// }

// export default Profile;
