import React from "react";
import {

  AccordionPanel,
  Text,

  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,

  HStack,
  Heading,

} from "@chakra-ui/react";

import { ChakraProvider } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import  "../../../Student.css";


const CourseContent = (props) => {
  const { month, week1 } = props.item;

  return (
    <ChakraProvider>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton
              bg="#eee"
              border="2px solid white"
              borderRadius="5px"
              height="40px"
            >
              <Box as="span" flex="1" textAlign="left" height="30px">
                <Heading p={1} ml="20px" fontSize="15px">
                  {month}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} bg="white">
            <br></br>
            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList>
                <Tab height="15px">
                  <Text fontSize="12px">Week1</Text>
                </Tab>
                <Tab height="15px">
                  <Text fontSize="12px">Week 2</Text>
                </Tab>
                <Tab height="15px">
                  <Text fontSize="12px">Week 3</Text>
                </Tab>
                <Tab height="15px">
                  <Text fontSize="12px">Week 4</Text>
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <HStack>
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" mt='5px' className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px" className="box2">{week1.video}</Text>
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
 
                  
                  <HStack mt="10px">
                    <Text fontSize="15px">Document Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>

                  <HStack spacing="520px" mt="10px">
                    <Text fontSize="15px">Quiz Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <HStack spacing="510px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>

                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <HStack spacing="510px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>
                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>

                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px"className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                </TabPanel>

                <TabPanel>
                  <HStack spacing="510px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>

                  <HStack spacing="510px" mt="10px">
                    <Text fontSize="15px">Video Content</Text>
                  </HStack>

                  <Box bg="#F0F8FF" borderRadius="10px" className="box1">
                    <HStack spacing="50px">
                      <Box p={2} width="500px">
                        <Text fontSize="15px">{week1.video}</Text>{" "}
                      </Box>
                      <Button
                        width="60px"
                        height="20px"
                        fontSize="12px"
                        colorScheme="green"
                        mt="-2px"
                      >
                        Play
                      </Button>
                    </HStack>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </ChakraProvider>
  );
};

export default CourseContent;
