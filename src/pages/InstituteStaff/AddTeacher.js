import { useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  extendTheme,
  ChakraProvider,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, Select, Textarea, Avatar, AvatarBadge, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

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

function AddTeacher() {
  const initialFormData = {
    profilePicture: "",
    fname: "",
    lname: "",
    nic: "",
    dob: "",
    gender: "1",
    preferedLanguage: "",
    phone: "",
    address: "",
    password: "",
    stream: "",
    subject: "",
    teachingMedium: [],
    teachingSchool: "",
    qualifications: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the server with the form data
      const response = await axios.post("/staff/teachers", {
        ...formData,
        profilePicture: selectedImage, // Attach the selected image to the form data
      });
      console.log("Teacher registration successful!", response.data);

      // Reset the form after successful submission (optional)
      setFormData(initialFormData);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error registering teacher:", error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Text fontSize="20px" fontWeight="bold" padding="10px 5px 3px 10px">
        {" "}
        Teacher Registration{" "}
      </Text>
      <ChakraProvider theme={theme}>
        <Box width="1150px" mx="auto" mt={5} ml={10} p={5} borderWidth="1px" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={20}>
              <GridItem width={{ base: "50%", md: "auto" }}>
              <FormControl>
                  <FormLabel mb="5px">Profile Picture:</FormLabel>
                  <Avatar
                    width="140px"
                    height="140px"
                    src={selectedImage ? URL.createObjectURL(selectedImage) : "https://bit.ly/code-beast"}
                    ml="50px"
                  >
                    <AvatarBadge width="3em" height="3em" bg="gray.400">
                      <IconButton
                        borderRadius="30px"
                        width="3em"
                        height="3em"
                        aria-label="Insert Image"
                        bg="gray.400"
                        icon={<EditIcon boxSize="20px" />}
                        onClick={handleImageClick}
                      />
                    </AvatarBadge>
                  </Avatar>
                  {/* Input to allow image selection */}
                  <Input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    display="none"
                    onChange={(event) => setSelectedImage(event.target.files[0])}
                  />
                </FormControl>

                <FormControl mb={7}>
                  <FormLabel>First Name:</FormLabel>
                  <Input
                    type="text"
                    name="fname"
                    placeholder="Enter the First Name."
                    variant="styledInput"
                    value={formData.fname}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={7}>
                  <FormLabel>Last Name:</FormLabel>
                  <Input
                    type="text"
                    name="lname"
                    placeholder="Enter the Last Name."
                    variant="styledInput"
                    value={formData.lname}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={7}>
                  <FormLabel>NIC:</FormLabel>
                  <Input
                    type="text"
                    name="nic"
                    placeholder="Enter the NIC Number."
                    variant="styledInput"
                    value={formData.nic}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired mb={7}>
                  <FormLabel>Date of Birth:</FormLabel>
                  <Input
                    type="date"
                    name="dob"
                    placeholder="Enter the DOB."
                    variant="styledInput"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </FormControl>
              </GridItem>

              <GridItem width={{ base: "50%", md: "auto" }}>
                <FormControl mb={7}>
                  <FormLabel>Gender:</FormLabel>
                  <RadioGroup mb={17} defaultValue="1">
                    <Stack spacing={20} direction="row">
                      <Radio value="1" name="gender" onChange={handleChange} isChecked={formData.gender === "1"}>
                        Male
                      </Radio>
                      <Radio value="2" name="gender" onChange={handleChange} isChecked={formData.gender === "2"}>
                        Female
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>

                <FormControl mb={6}>
                  <FormLabel>Prefered Language:</FormLabel>
                  <Select
                    name="preferedLanguage"
                    placeholder="Select the Prefered Language."
                    value={formData.preferedLanguage}
                    onChange={handleChange}
                  >
                    <option value="option1">Sinhala</option>
                    <option value="option2">English</option>
                    <option value="option3">Tamil</option>
                  </Select>
                </FormControl>

                <FormControl mb={7}>
                  <FormLabel>Phone Number:</FormLabel>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Enter the Phone Number."
                    variant="styledInput"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={7}>
                  <FormLabel>Address:</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Enter the Address."
                    variant="styledInput"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl mb={7}>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="text"
                  name="password"
                  placeholder="Enter a Password."
                  variant="styledInput"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
            </GridItem>

            <GridItem width={{ base: "50%", md: "auto" }}>
              <FormControl isRequired mb={7}>
                <FormLabel>Stream:</FormLabel>
                <Select name="stream" placeholder="Select a Stream" value={formData.stream} onChange={handleChange}>
                  <option value="option1">Biological Science</option>
                  <option value="option2">Physical Science</option>
                  <option value="option3">Art</option>
                  <option value="option4">Commerce</option>
                  <option value="option5">Technology</option>
                </Select>
              </FormControl>

              <FormControl mb={7}>
                <FormLabel>Subject:</FormLabel>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Enter the Subject."
                  variant="styledInput"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={7}>
                <FormLabel>Teaching Medium:</FormLabel>
                <CheckboxGroup colorScheme="blue" value={formData.teachingMedium} onChange={(val) => setFormData({ ...formData, teachingMedium: val })}>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    <Checkbox value="sinhala">Sinhala</Checkbox>
                    <Checkbox value="english">English</Checkbox>
                    <Checkbox value="tamil">Tamil</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl mb={7}>
                <FormLabel>Teaching School:</FormLabel>
                <Input
                  type="text"
                  name="school"
                  placeholder="Enter the Teaching School."
                  variant="styledInput"
                  value={formData.teachingSchool}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={7}>
                <FormLabel>Qualifications:</FormLabel>
                <Textarea name="qualifications" placeholder="Provide the Qualifications" value={formData.qualifications} onChange={handleChange} />
              </FormControl>

              <Flex justifyContent="center" alignItems="center" mt={1}>
                <Button type="submit" colorScheme="blue">
                  Submit
                </Button>
                <Box ml={10}>
                  <Button type="button" colorScheme="blue" onClick={() => setFormData(initialFormData)}>
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
