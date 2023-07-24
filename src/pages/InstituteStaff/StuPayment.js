import { Box, Heading, SimpleGrid, Grid, GridItem, Text, Flex, Avatar, Button, Stack, Badge } from '@chakra-ui/react';
import React from 'react';
import profileImage from './avtr3.jpg';
import { Card, CardHeader, CardBody, CardFooter, Divider, Input } from '@chakra-ui/react';
import Courseimg from './CourseImage.png';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import data from "./data/data.json";
const payments = data.Payments;

function StuPayment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  // Filter the payments based on the payment status
  const onlinePayments = payments.filter(payment => payment.payment_status === "Paid" && payment.payment_type === "Online");
  const physicalPayments = payments.filter(payment => payment.payment_status === "Paid" && payment.payment_type === "Physical");
  const pendingPayments = payments.filter(payment => payment.payment_status === "Pending");
  const expiredPayments = payments.filter(payment => payment.payment_status === "Expired");

  return (
    <div style={{ 'backgroundColor': '#F9F9F9', 'width': '100%' }}>
      <Flex align="center" justify="space-between" p={4}>
        <Heading fontSize={20} color="#242424" mb={4}>
          Student Class Payment
        </Heading>
        <Button size="sm" mr={4} mt={4} colorScheme='blue'>
          View Payment History
        </Button>
      </Flex>

      <Grid templateColumns="repeat(8, 1fr)" gap={6} marginBottom={5}>
        {/** Left Panel */}
        <GridItem
          w="100%"
          h={{ base: '78vh', lg: '78vh' }}
          as="aside"
          colSpan={{ base: 8, lg: 2, xl: 2 }}
          marginLeft={4}
          borderRadius={15}
        >
          <Flex justify="space-between" border="0.05px solid #DAE6F0" bg="#ffffff" borderRadius={15} height={200}>
            <Box>
              <Avatar width={120} height={120} marginLeft={5} marginTop={5} src={profileImage}></Avatar>
              <Button marginLeft={8} marginTop={2} size="sm" >
                View Profile
              </Button>
            </Box>
            <Box marginRight={6} marginTop={5} width={180}>
              <Box>
                <Text fontSize={13} fontWeight="bold">
                  Full Name
                </Text>
                <Text fontSize={13}>Dinesh Khan</Text>
              </Box>
              <Box marginTop={1.5}>
                <Text fontSize={13} fontWeight="bold">
                  Batch
                </Text>
                <Text fontSize={13}>2023 A/L</Text>
              </Box>
              <Box marginTop={1.5}>
                <Text fontSize={13} fontWeight="bold">
                  Stream
                </Text>
                <Text fontSize={13}>Biology</Text>
              </Box>
            </Box>
          </Flex>
          <Box width="100%" borderRadius={15} minHeight={{ lg: '28vh' }} mt={5} >
            <Box backgroundColor='##F9F9F9'>
              <Text fontSize={13} fontWeight="bold" marginTop={1.5} marginLeft={3}>
                Recent payments
              </Text>
            </Box>
            <Tabs colorScheme="blue" backgroundColor="#ffffff" border="0.05px solid #DAE6F0" borderRadius={15} height='48vh' overflowY='scroll' css={scrollbarStyles}>
              <TabList gap={10} marginLeft={5}>
                <Tab fontSize={13} fontWeight='medium'>Physical</Tab>
                <Tab fontSize={13} fontWeight='medium'>Online</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {physicalPayments.map(payment => (
                    <Box key={payment.payment_id} width="95%" borderRadius={5} minHeight="12vh" marginTop={2} border="0.05px solid #DAE6F0" bg="green.100" marginLeft={3}>
                      <Flex>
                        <Box width={1} height="11.5vh" bg="green" marginTop={1.5} marginLeft={1.5} borderRadius={10}></Box>
                        <Box>
                          <Box marginLeft={2} paddingTop={1.5}>
                            <Text fontSize={15} fontWeight="bold" marginBottom={1.5}>
                              {payment.course}
                            </Text>
                          </Box>
                          <Box>
                            <Box marginLeft={2}>
                              <Badge variant='solid' colorScheme='green'>{payment.purchased_date}</Badge>
                            </Box>
                            <Box marginLeft={2} marginTop={1}>
                              <Text fontSize={10}>
                                Paid amount: {payment.amount}
                              </Text>
                            </Box>
                            <Box marginLeft={2} marginTop={1} marginBottom={1}>
                              <Text fontSize={10}>{payment.tutor}</Text>
                            </Box>
                          </Box>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </TabPanel>
                <TabPanel>
                  {onlinePayments.map(payment => (
                    <Box key={payment.payment_id} width="95%" borderRadius={5} minHeight="12vh" marginTop={2} border="0.05px solid #DAE6F0" bg="green.100" marginLeft={3}>
                      <Flex>
                        <Box width={1} height="11.5vh" bg="green" marginTop={1.5} marginLeft={1.5} borderRadius={10}></Box>
                        <Box>
                          <Box marginLeft={2} paddingTop={1.5}>
                            <Text fontSize={15} fontWeight="bold" marginBottom={1.5}>
                              {payment.course}
                            </Text>
                          </Box>
                          <Box>
                            <Box marginLeft={2}>
                              <Badge variant='solid' colorScheme='green'>{payment.purchased_date}</Badge>
                            </Box>
                            <Box marginLeft={2} marginTop={1}>
                              <Text fontSize={10}>
                                Paid amount:{payment.amount}
                              </Text>
                            </Box>
                            <Box marginLeft={2} marginTop={1} marginBottom={1}>
                              <Text fontSize={10}>{payment.tutor}</Text>
                            </Box>
                          </Box>
                        </Box>
                      </Flex>
                    </Box>
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>

        {/** Right Panel */}
        <GridItem
          colSpan={{ base: 8, lg: 6, xl: 6 }}
          h={{ base: '78vh', lg: '78vh' }}
        >
          <Input width={300} placeholder="Search for Courses" backgroundColor='#ffffff' marginLeft={4} marginBottom={5} />
          {/* <Text fontSize={13} fontWeight="bold" marginLeft={5} marginBottom={1}>Due payments</Text> */}
          <Tabs colorScheme="blue" backgroundColor="#ffffff" marginRight={5} border="0.05px solid #DAE6F0" borderRadius={15} marginLeft={4} height='73vh' overflowY='scroll' css={scrollbarStyles}>
                        <TabList gap={10} marginLeft={5}>
                            <Tab fontSize={13} fontWeight='medium'>Pending</Tab>
                            <Tab fontSize={13} fontWeight='medium'>Expired</Tab>

                        </TabList>
            <TabPanels>
                <TabPanel>
                
        
            <SimpleGrid p="10px" columns={4} spacing={10} minChildWidth="250px">
              {pendingPayments.map(payment => (
                <Card key={payment.payment_id} width={270}>
                  <CardBody padding={0}>
                    <img
                      src={Courseimg}
                      alt='Green double couch with wooden legs'
                      borderRadius='15'
                    />

                    <Stack mt='6' spacing='3'>
                      <Text size='md' fontSize={20} paddingLeft={4} fontWeight="bold">{payment.course}</Text>
                      <Divider></Divider>
                      <Flex gap={3} marginLeft={4}>
                        <Box>
                          <Avatar src={payment.ProfileImageTutor}></Avatar>
                        </Box>
                        <Box>
                          <Text fontSize={13} fontWeight='bold'>{payment.tutor}</Text>
                          <Text fontSize={10} color="#555555">{payment.description}</Text>
                          <Text fontSize={10} color="#555555"> {payment.monthly_fee} per month</Text>
                          <Badge variant='solid' colorScheme='green'>{payment.purchased_date}</Badge>
                        </Box>
                      </Flex>
                    </Stack>
                  </CardBody>

                  <CardFooter padding={0} paddingTop={3}>
                    <Button width='100%' colorScheme='blue' borderTopRightRadius={0} borderTopLeftRadius={0} onClick={onOpen}>Make Payment</Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody marginTop={4} marginBottom={2}>
                          <Text fontSize={15}>Are you sure you want to make the payment?</Text>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="gray" mr={3} onClick={onClose} size="sm">
                            Close
                          </Button>
                          <Button colorScheme="blue" mr={3} onClick={onClose} type='submit' size="sm">
                            Yes
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          
          </TabPanel>
          <TabPanel>
          <SimpleGrid p="10px" columns={4} spacing={10} minChildWidth="250px">
              {expiredPayments.map(payment => (
                <Card key={payment.payment_id} width={270}>
                  <CardBody padding={0}>
                    <img
                      src={Courseimg}
                      alt='Green double couch with wooden legs'
                      borderRadius='15'
                    />

                    <Stack mt='6' spacing='3'>
                      <Text size='md' fontSize={20} paddingLeft={4} fontWeight="bold">{payment.course}</Text>
                      <Divider></Divider>
                      <Flex gap={3} marginLeft={4}>
                        <Box>
                          <Avatar src={payment.ProfileImageTutor}></Avatar>
                        </Box>
                        <Box>
                          <Text fontSize={13} fontWeight='bold'>{payment.tutor}</Text>
                          <Text fontSize={10} color="#555555">{payment.description}</Text>
                          <Text fontSize={10} color="#555555"> {payment.monthly_fee} per month</Text>
                          <Badge variant='solid' colorScheme='gray'>Expired date:{payment.expire_at}</Badge>
                        </Box>
                      </Flex>
                    </Stack>
                  </CardBody>

                  <CardFooter padding={0} paddingTop={3}>
                    <Button width='100%' colorScheme='blue' borderTopRightRadius={0} borderTopLeftRadius={0} onClick={onOpen}>Purchase</Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody marginTop={4} marginBottom={2}>
                          <Text fontSize={15}>Are you sure you want to make the payment?</Text>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme="gray" mr={3} onClick={onClose} size="sm">
                            Close
                          </Button>
                          <Button colorScheme="blue" mr={3} onClick={onClose} type='submit' size="sm">
                            Yes
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </TabPanel>
          </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </div>
  );
}

export default StuPayment;
