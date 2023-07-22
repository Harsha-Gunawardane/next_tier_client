import { Box, Button, FormControl, FormLabel, Heading, Input, Radio, RadioGroup, Stack, extendTheme, ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup, Select, Textarea, Avatar, AvatarBadge,IconButton, } from '@chakra-ui/react'
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

const handleSubmit = (event) => {
  event.preventDefault();
  // Handle form submission
};

function AddTeacher() {
  return (
    <ChakraProvider theme={theme}>
      <Box maxW="1200px" mx="auto" mt={5} p={5} borderWidth="2px" borderRadius="md" >
      <Heading as="h1" size="lg" mb="10" textAlign="center">Teacher Registration</Heading>
        
        <form onSubmit={handleSubmit}>
          <Grid templateColumns="repeat(3, 1fr)" gap={20}>
            <GridItem>
            <FormControl isRequired>
                <FormLabel mb="5px">ProfilePicture:</FormLabel>
                <Avatar width="140px" height="140px" src="https://bit.ly/code-beast"  ml="50px">
                  <AvatarBadge width="3em" height="3em" bg="gray.400">
                    {/* <EditIcon w={15} h={10} /> */}
                    <IconButton
                      borderRadius="30px"
                      width="3em"
                      height="3em"
                      aria-label="Insert Image"
                      bg="gray.400"
                      icon={<EditIcon boxSize="20px" />}
                      // onClick={handleImageClick}
                    />
                  </AvatarBadge>
                </Avatar>
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>First Name:</FormLabel>
                <Input type="text" name="fname" placeholder="Enter the First Name." variant="styledInput" />
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Last Name:</FormLabel>
                <Input type="text" name="lname" placeholder="Enter the Last Name." variant="styledInput" />
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>NIC:</FormLabel>
                <Input type="text" name="nic" placeholder="Enter the NIC Number." variant="styledInput" />
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Date of Birth:</FormLabel>
                <Input type="date" name="dob" placeholder="Enter the DOB." variant="styledInput" />
              </FormControl>
              
            </GridItem>

            <GridItem>
            
            <FormControl isRequired mb={7}>
                <FormLabel>Gender:</FormLabel>
                <RadioGroup mb={17} defaultValue="1">
                  <Stack spacing={20} direction="row">
                    <Radio value="1">Male</Radio>
                    <Radio value="2">Female</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired mb={6}>
                <FormLabel>Prefered Language:</FormLabel>
                <Select placeholder='Select the Prefered Language.' >
                    <option value='option1'>Sinhala</option>
                    <option value='option2'>English</option>
                    <option value='option3'>Tamil</option>
                </Select>
              </FormControl>

                <FormControl isRequired mb={7}>
                <FormLabel>Phone Number:</FormLabel>
                <Input type="text" name="phone" placeholder="Enter the Phone Number." variant="styledInput" />
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Address:</FormLabel>
                <Input type="text" name="address" placeholder="Enter the Address." variant="styledInput" />
              </FormControl>             

              <FormControl isRequired mb={7}>
                <FormLabel>Password:</FormLabel>
                <Input type="text" name="password" placeholder="Enter a Password." variant="styledInput" />
              </FormControl>

            </GridItem>

            <GridItem>
            <FormControl isRequired mb={7}>
                <FormLabel>Stream:</FormLabel>
                <Select placeholder='Select a Stream'>
                    <option value='option1'>Biological Science</option>
                    <option value='option2'>Physical Science</option>
                    <option value='option3'>Art</option>
                    <option value='option3'>Commerce</option>
                    <option value='option3'>Technology</option>
                </Select>
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Subject:</FormLabel>
                <Input type="text" name="subject" placeholder="Enter the Subject." variant="styledInput" />
              </FormControl>

              <FormControl mb={7}>
                <FormLabel>Teaching Medium:</FormLabel>
                <CheckboxGroup colorScheme='blue'>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value='sinhala'>Sinhala</Checkbox>
                    <Checkbox value='english'>English</Checkbox>
                    <Checkbox value='tamil'>Tamil</Checkbox>
                    </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Teaching School:</FormLabel>
                <Input type="text" name="school" placeholder="Enter the Teaching School." variant="styledInput" />
              </FormControl>

              <FormControl isRequired mb={7}>
                <FormLabel>Qualifications:</FormLabel>
                <Textarea placeholder='Provide the Qualifications' />
              </FormControl> 

              <Flex justifyContent="center" alignItems="center" mt={1}>
            <Button type="submit" colorScheme="blue">Submit</Button>
              <Box ml={10}>
               <Button type="submit" colorScheme="blue">Cancel</Button>
               </Box>
              </Flex>
            </GridItem>
            
          </Grid>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default AddTeacher;
