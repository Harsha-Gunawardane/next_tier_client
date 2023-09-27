import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  extendTheme,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Checkbox,
  CheckboxGroup,
  Textarea,
  Avatar,
  AvatarBadge,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import * as yup from "yup";
import { useFormik } from "formik";

// Create a custom text input style
const customTextInputStyle = {
  variants: {
    styledInput: {
      field: {
        borderRadius: "md",
        borderWidth: "1px",
        borderColor: "gray.500",
        _hover: {
          borderColor: "gray.400",
        },
        _focus: {
          borderColor: "blue.500",
          boxShadow: "0 0 0 1px blue.600",
        },
      },
    },
  },
};

// Extend the default Chakra theme with the custom input style
const theme = extendTheme({
  components: {
    Input: customTextInputStyle,
  },
});

const REGISTER_URL = "/staff/tutor";

function AddTeacher() {
  const toast = useToast();
  const axiosPrivate = useAxiosPrivate();

  // Define validation schema using yup
  const validationSchema = yup.object().shape({
    image: yup.mixed().required("Image is required"),
    fName: yup.string().required("First Name is required"),
    lName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    nic: yup.string().required("NIC Number is required"),
    dob: yup.string().required("DOB Number is required"),
    phoneNo: yup.string().required("Phone Number is required"),   
    address: yup.string().required("Address is required"),
  });                                                               

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");           
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const formik = useFormik({
    initialValues: {
      image: "",
      fName: "",
      lName: "",
      email: "",
      nic: "",
      dob: "",
      phoneNo: "",
      address: "",
      subjects: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        values.subjects = selectedSubjects;
    
        const addTutor = await axiosPrivate.post(
          REGISTER_URL,
          JSON.stringify(values),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(JSON.stringify(addTutor?.data));
    
        // Pass the toast message as a query parameter
        navigate("/staff/tutors-list?success=true");
       
      } catch (err) {
        if (!err?.response) {
          toast({
            title: "Error",
            description: "No Server Response",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        } else if (err.response?.status === 409) {
          toast({
            title: "Error",
            description: "Username already exists",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "Registration Failed",
            status: "error",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
        }
        
      }
    },
  });

  const location = useLocation();
const queryParams = new URLSearchParams(location.search);

// Check if the "success" query parameter is present
const isSuccess = queryParams.get("success");

// Display the toast message if isSuccess is true
useEffect(() => {
  if (isSuccess) {
    toast({
      title: "Tutor Registered Successfully",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  }
}, [isSuccess]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelClick = () => {
    formik.resetForm(); // Reset the formik form values
    setSelectedImage(""); // Clear the selected image
    setSelectedSubjects(""); // Clear the selected subjects
  };

  return (
    <Box mx={5} width="100%">
      <Box display="flex" alignItems="center">
        <Link to="/staff/tutors-list">
          <BiArrowBack style={{ marginRight: "20px", cursor: "pointer" }} />
        </Link>
        <Box fontSize="18px" fontWeight="bold" padding="10px 25px 15px 0">
          Tutor Registration
        </Box>
      </Box>
      <ChakraProvider theme={theme}>
        <Box
          maxW="1150px"
          mx={{ base: "10px", md: "auto" }}
          ml={10}
          p={15}
          borderWidth="1px"
          borderRadius="md"
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 0, md: 20 }}
            >
              <GridItem width={{ base: "80%", md: "auto" }} mx={10}>
                <FormControl mb={7}>
                  <FormLabel mb="5px">ProfilePicture:</FormLabel>
                  <Avatar
                    width="140px"
                    height="140px"
                    src={formik.values.image ||  "https://bit.ly/code-beast"}
                    ml="50px"
                  >
                    <AvatarBadge width="3em" height="3em" bg="gray.400">
                      {/* <EditIcon w={15} h={10} /> */}
                      <label htmlFor="file-upload">
                        <IconButton
                          as="span"
                          borderRadius="30px"
                          width="3em"
                          height="3em"
                          aria-label="Change Image"
                          bg="gray.400"
                          icon={<EditIcon boxSize="20px" />}
                        />
                      </label>
                    </AvatarBadge>
                  </Avatar>
                  {/* input to allow image selection */}
                  <Input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={(e) => {
                      formik.setFieldValue("image", e.target.files[0]);
                      handleImageChange(e);
                    }}
                    onBlur={formik.handleBlur("image")}
                    style={{ display: "none" }}
                  />
                    {formik.touched.image && formik.errors.image ? (
                  <div style={{ color: "red" }}>{formik.errors.image}</div>
                ) : null}
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.fName && formik.touched.fName}
                  mb={5}
                >
                  <FormLabel>First Name:</FormLabel>
                  <Input
                    type="text"
                    id="fName"
                    {...formik.getFieldProps("fName")}
                    placeholder="Enter the First Name."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.fName}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.lName && formik.touched.lName}
                  mb={5}
                >
                  <FormLabel>Last Name:</FormLabel>
                  <Input
                    type="text"
                    id="lName"
                    {...formik.getFieldProps("lName")}
                    placeholder="Enter the Last Name."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.lName}</FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={formik.errors.email && formik.touched.email}
                  mb={5}
                >
                  <FormLabel>Email:</FormLabel>
                  <Input
                    type="text"
                    id="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Enter the Email Address."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem width={{ base: "80%", md: "auto" }} mx={10}>
                <FormControl
                  isInvalid={formik.errors.nic && formik.touched.nic}
                  mb={5}
                >
                  <FormLabel>NIC:</FormLabel>
                  <Input
                    type="text"
                    id="nic"
                    {...formik.getFieldProps("nic")}
                    placeholder="Enter the NIC Number."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.nic}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.dob && formik.touched.dob}
                  mb={5}
                >
                  <FormLabel>Date of Birth:</FormLabel>
                  <Input
                    type="date"
                    id="dob"
                    {...formik.getFieldProps("dob")}
                    placeholder="Enter the DOB."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.dob}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.phoneNo && formik.touched.phoneNo}
                  mb={5}
                >
                  <FormLabel>Phone Number:</FormLabel>
                  <Input
                    type="text"
                    {...formik.getFieldProps("phoneNo")}
                    placeholder="Enter the Phone Number."
                    variant="styledInput"
                  />
                  <FormErrorMessage>{formik.errors.phoneNo}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.address && formik.touched.address}
                  mb={5}
                >
                  <FormLabel>Address:</FormLabel>
                  <Textarea
                    {...formik.getFieldProps("address")}
                    placeholder="Enter the Address."
                  />
                  <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl mb={5}>
                  <FormLabel>Teaching Subjects:</FormLabel>
                  <CheckboxGroup
                    colorScheme="blue"
                    value={selectedSubjects}
                    onChange={(values) => setSelectedSubjects(values)}
                  >
                    <Stack spacing={[1, 5]} direction={["column", "row"]}>
                      <Checkbox value="physics">Physics</Checkbox>
                      <Checkbox value="chemistry">Chemistry</Checkbox>
                      <Checkbox value="maths">Maths</Checkbox>
                      <Checkbox value="biology">Biology</Checkbox>
                      <Checkbox value="ict">ICT</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </FormControl>

                <Flex justifyContent="center" alignItems="center" mt={1}>
                  <Button type="submit" colorScheme="blue">
                    Submit
                  </Button>
                  <Box ml={10}>
                    <Button colorScheme="blue" onClick={handleCancelClick}>
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          </form>
        </Box>
      </ChakraProvider>
    </Box>
  );
}

export default AddTeacher;