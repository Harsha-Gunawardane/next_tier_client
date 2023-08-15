import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Box,
  useBreakpointValue,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import  useAxiosPrivate  from '../../hooks/useAxiosPrivate'

// Validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
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
    phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+94\d{9}$/, 'Invalid phone number format. Please enter +94 followed by 9 digits'),
});

const RegistrationForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const axiosPrivate = useAxiosPrivate();
 

  const onSubmit = async (values) => {
    setIsFormSubmitted(true);

    try {
      // Make API call to register staff member
      

       // Log API response to the console

      setIsFormSubmitted(false);
      const response = await axiosPrivate.post('/staff/register', values);
      console.log('Form data submitted:', response.data);
      navigate('/staff/staff-list');
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsFormSubmitted(false);
    }
  };

 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      repeatPassword: '',
      phoneNumber: '+94',
    },
    validationSchema,
    onSubmit,
  });

  const formWidth = useBreakpointValue({ base: '100%', sm: '400px', md: '500px', lg: '600px' });

  return (
    <Box width={formWidth} maxWidth="100%" margin="0 auto">
      {isFormSubmitted && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Form submitted successfully!
        </Alert>
      )}
      <Box mt={100}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={4}>
            <FormLabel>First Name</FormLabel>
            <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
              <Input
                name="firstName"
                {...formik.getFieldProps('firstName')}
                placeholder="First Name"
              />
              <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box mb={4}>
            <FormLabel>Last Name</FormLabel>
            <FormControl isInvalid={formik.touched.lastName && formik.errors.lastName}>
              <Input name="lastName" {...formik.getFieldProps('lastName')} placeholder="Last Name" />
              <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box mb={4}>
    <FormLabel>Phone Number</FormLabel>
    <FormControl isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}>
      <InputGroup>
      
        <Input
          name="phoneNumber"
          {...formik.getFieldProps('phoneNumber')}
          placeholder="9-digit phone number"
        />
      </InputGroup>
      <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
    </FormControl>
  </Box>

          <Box mb={4}>
            <FormLabel>Username</FormLabel>
            <FormControl isInvalid={formik.touched.username && formik.errors.username}>
              <Input name="username" {...formik.getFieldProps('username')} placeholder="Username" />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box mb={4}>
            <FormLabel>Password</FormLabel>
            <FormControl isInvalid={formik.touched.password && formik.errors.password}>
              <Input
                name="password"
                {...formik.getFieldProps('password')}
                type="password"
                placeholder="Password"
              />
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
          </Box>

          <Box mb={4}>
            <FormLabel>Repeat Password</FormLabel>
            <FormControl
              isInvalid={formik.touched.repeatPassword && formik.errors.repeatPassword}
            >
              <Input
                name="repeatPassword"
                {...formik.getFieldProps('repeatPassword')}
                type="password"
                placeholder="Repeat Password"
              />
              <FormErrorMessage>{formik.errors.repeatPassword}</FormErrorMessage>
            </FormControl>
          </Box>

          {/* Submit button */}
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
