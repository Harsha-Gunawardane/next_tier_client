import React from "react";
import {


  Text,



  HStack,
  Heading,Flex,Image,Card

} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import {

  Box,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import rulesImg from "../../../assests/images/forum.png"

// const navigate = useNavigate();

// const navigateToForum = () => {
//     navigate(`/stu/mycourses/${courseId}/forum`)
// }


const Forum = (props) => {


  return (
    <ChakraProvider>

      {/* <Box bg='#F0F8FF' height='220px' p={4} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'>
        <Heading fontSize='20px' mb='10px'>Class Forum</Heading>

        <HStack spacing='10px'>
          <Box w='50%' h='80px' bg='#F0F8FF'>
            <Text fontSize='15px'>Introducing Class Forums.Discuss your matters with your Friends and Tutor </Text>

          </Box>
          <Box w='50%' h='80px' bg='#F0F8FF' >

          </Box>

        </HStack>
        <Link to='forum'>
          <Button colorScheme='blue' height='30px' mt='30px'><Text fontSize='12px'>Visit Forum</Text></Button>
        </Link>

    
      </Box> */}

<Card
                    width={"100%"}
                    // height={"200px"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    direction={"column"}
                    p="10px"
                    gap="10px"
                    boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 5px;"}
                    bgGradient="linear-gradient(317deg, rgba(244,240,255,0.8951913529083508) 14%, rgba(234,247,255,1) 63%) "
                    mt={"20px"}
                // bg = "green.200"
                >
                    <Flex w="100%" p="15px" position={"relative"}>
                        <Flex direction={"column"} width={"70%"} gap="16px" zIndex={1} justifyContent={"space-between"}>
                            <Flex direction={"column"} gap={"5px"}>
                                <Text fontWeight={"semibold"} fontSize={"18px"} color="gray.700" textAlign={"left"}>Class Forum</Text>
                                <Text fontWeight={"medium"} fontSize={"14px"} color="gray.600" textAlign={"left"}>Introducing Class Forums. Discuss the subject with your Friends and Tutor</Text>
                            </Flex>
                            <Button variant="solid" bg={"accent"} color={"white"} size="sm" width={"max-content"} >Visit Forum</Button>
                        </Flex>
                        {/* <Flex width={"40%"} overflow={"visible"} position={"relative"}> */}
                        <Image src={rulesImg} alt="Segun Adebayo" position={"absolute"} width={"50%"} bottom={0} right={0} objectFit={"cover"} zIndex={0} />
                        {/* </Flex> */}
                    </Flex>
                </Card>

    </ChakraProvider>
  );
};

export default Forum;
