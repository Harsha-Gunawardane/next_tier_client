import React from "react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Text
} from '@chakra-ui/react'
import  {useState} from 'react';



import {
  
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  ChakraProvider,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';



import { useToast } from '@chakra-ui/react';

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

 


  return (
    <Box mt='-150px'>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" fontSize='20px'>
        Course Registration
      </Heading>
      
        <FormControl mr="5%" ml='20%'>
          <FormLabel htmlFor="first-name" fontWeight={'normal'} fontSize='20px'>
            First name
          </FormLabel>
          <Input id="firstname" placeholder="First name" width='70%' p={2} />
        </FormControl>

        <FormControl mr="5%" ml='20%' mt='5%'>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="first-name" placeholder="First name" width='70%' p={5} />
        </FormControl>
      

  

  

    </Box>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Details
      </Heading>
      <FormControl mr="5%" ml='20%' mt='5%'>
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input id="email" type="email" width='70%' height='80%' p={10}  />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

   

  

  


    </>
  );
};

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Social Handles
      </Heading>
     
      <FormControl mr="5%" ml='20%' mt='5%'>
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input id="email" type="email" width='70%' height='80%' p={10}  />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

     

   
     
    </>
  );
};




const steps = [
  { title: 'First', description: 'Contact Info' },
  { title: 'Second', description: 'Date & Time' },
  { title: 'Third', description: 'Select Rooms' },
]

const Stepp = () =>  {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  })

  return (
    <Stepper size='lg' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}





export default function Multistep() {
  const toast =  useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);


  
  return (
    
<Box overflow='scroll'>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        height={1000}
        p={5}
        m="30px auto"
        as="form">







    <Heading mb='20px' fontSize='30px' mt='-100px'>Course Registration</Heading>
          
          <Box bg='white' width='100%' mt='-100px'><Stepp></Stepp> </Box>
          <br></br>
         
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%" ml='32%'>
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="5rem"
              
                mr="5%"
                
                >
                <Text fontSize='20px'>  Back</Text>  
              
              </Button>
               
              {step === 1 || step===2 ? (
              <Button
                w="8rem"
                bg='blue'
                
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
                 ) : null}

            </Flex>
            {step === 3 ? (
              <Button
                w="8rem"
                mr='70%'
                color="red"
                bg='blue'
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
   
      </Box>

  );
}






