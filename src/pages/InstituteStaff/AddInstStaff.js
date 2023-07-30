import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Stack,
  Alert,
  AlertIcon,
  Box,
  useBreakpointValue,
  FormErrorMessage,
  Textarea,
  Flex,
  Center,
  Text,
  Avatar
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';

const steps = [
  { title: 'Personal Info', fields: ['firstName', 'lastName', 'email', 'phoneNumber', 'role'] },
  { title: 'Account Info', fields: ['username', 'password', 'repeatPassword'] },
  { title: 'Additional Info', fields: ['qualification', 'experience'] },
];

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().required('E-mail is required').email('Invalid e-mail format'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^(?:\+94)?[0-9]{9}$/, 'Invalid phone number. Must be 10 digits (include +94 for Sri Lanka)'),
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(15, 'Password should not exceed 15 characters')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, 'Invalid password format'),
  repeatPassword: yup
    .string()
    .required('Repeat Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegistrationForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [activeStep, setActiveStep] = useState(0);
 
  const onSubmit = (values) => {
    setIsFormSubmitted(true);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setIsFormSubmitted(false);
      navigate('/staff/staff-list');
    }, 3000);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '+94',
      username: '',
      password: '',
      repeatPassword: '',
      role: '',
      qualification: '',
      experience: '',
      avatar: '',
    },
    validationSchema,
    onSubmit,
  });

  const formWidth = useBreakpointValue({ base: '100%', sm: '400px', md: '500px', lg: '600px' });

  const handleNextClick = () => {
    const isLastStep = activeStep === steps.length - 1;
    if (!isLastStep) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      formik.handleSubmit();
    }
  };

  const handlePrevClick = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <Box width={formWidth} maxWidth="100%" margin="0 auto">
      {isFormSubmitted && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Form submitted successfully!
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
          <Box display={activeStep === 0 ? 'block' : 'none'}>
            {/* First step fields */}
            <Text fontSize={15} fontWeight="bold" mb={2}>Personal Information</Text>
             {/* Avatar Component */}
             <FormControl>
              
              <Avatar
                name={`${formik.values.firstName} ${formik.values.lastName}`}
                src={formik.values.avatar} // Transparent pixel as a fallback
                
                size="2xl"
              />
               <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      formik.setFieldValue('avatar', reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </FormControl>

            <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input
                id="firstName"
                {...formik.getFieldProps('firstName')}
                placeholder="First Name"
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.lastName && formik.errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input
                id="lastName"
                {...formik.getFieldProps('lastName')}
                placeholder="Last Name"
              />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.email && formik.errors.email}>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input id="email" {...formik.getFieldProps('email')} placeholder="E-mail" />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Input
                id="phoneNumber"
                {...formik.getFieldProps('phoneNumber')}
                placeholder="Phone Number"
              />
              <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.role && formik.errors.role}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select id="role" {...formik.getFieldProps('role')} placeholder="Select Role">
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
              </Select>
              <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box display={activeStep === 1 ? 'block' : 'none'}>
            {/* Second step fields */}
            <FormControl isInvalid={formik.touched.username && formik.errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                {...formik.getFieldProps('username')}
                placeholder="Username"
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.touched.password && formik.errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                {...formik.getFieldProps('password')}
                type="password"
                placeholder="Password"
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={formik.touched.repeatPassword && formik.errors.repeatPassword}
            >
              <FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>
              <Input
                id="repeatPassword"
                {...formik.getFieldProps('repeatPassword')}
                type="password"
                placeholder="Repeat Password"
              />
              <FormErrorMessage>{formik.errors.repeatPassword}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box display={activeStep === 2 ? 'block' : 'none'}>
            {/* Third step fields */}
            <FormControl>
              <FormLabel htmlFor="qualification">Qualification (Optional)</FormLabel>
              <Textarea
                id="qualification"
                {...formik.getFieldProps('qualification')}
                placeholder="Qualification"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="experience">Previous Job Experience (Optional)</FormLabel>
              <Textarea
                id="experience"
                {...formik.getFieldProps('experience')}
                placeholder="Previous Job Experience"
              />
            </FormControl>
          </Box>

          {/* Navigation buttons */}
          <Flex justify={activeStep === 0 ? 'flex-end' : 'space-between'}>
            {activeStep > 0 && (
              <Button colorScheme="blue" onClick={handlePrevClick}>
                Previous
              </Button>
            )}
            <Button colorScheme="blue" onClick={handleNextClick}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;


