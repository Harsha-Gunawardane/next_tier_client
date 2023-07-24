import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Heading,
  Flex,
  Avatar,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Textarea,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import data from './data/data';

function ViewTeacher() {
  const getButtonStyles = (backgroundColor) => ({
    backgroundColor: `${backgroundColor}.500`,
    color: 'white',
    borderRadius: '4px',
    _hover: {
      backgroundColor: `${backgroundColor}.300`,
    },
  });

  const ButtonStyles = getButtonStyles('blue');
  const UpdateStyles = getButtonStyles('green');
  const DeleteStyles = getButtonStyles('red');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [stream, setStream] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');

  const openModal = (teacher) => {
    setFullName(teacher.fullName);
    setAddress(teacher.address);
    setPhoneNo(teacher.phoneNo);
    setStream(teacher.stream);
    setSubject(teacher.subject);
    setQualification(teacher.qualification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
   
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <TableContainer width="1500px" height="500px" px="40px" py="30px">
      <Flex justify="space-between" align="center" mb="5" mr="80px">
        <Heading marginLeft={13} fontSize={20} color="#242424">
          Registered Teachers
        </Heading>

        <NavLink to="add">
          <Button size="md" sx={ButtonStyles}>
            Add Teacher
          </Button>
        </NavLink>
      </Flex>

      <Table border="0.05px solid #DAE6F0">
        <Thead>
          <Tr>
            <Th fontSize="md" fontWeight="bold">
              ID
            </Th>
            <Th fontSize="md" fontWeight="bold">
              Profile
            </Th>
            <Th fontSize="md" fontWeight="bold">
              Stream
            </Th>
            <Th fontSize="md" fontWeight="bold">
              Subject
            </Th>
            <Th fontSize="md" fontWeight="bold" paddingLeft={20}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.viewTeacher.map((teacher) => (
            <Tr key={teacher.id}>
              <Td fontSize={13}>{teacher.id}</Td>
              <Td>
                <Flex gap={4}>
                  <Avatar src={teacher.profileImage} />
                  <Text fontSize={13} marginTop={4}>
                    {teacher.fullName}
                  </Text>
                </Flex>
              </Td>
              <Td fontSize={13}>{teacher.stream}</Td>
              <Td fontSize={13}>{teacher.subject}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="green"
                  sx={UpdateStyles}
                  onClick={() => openModal(teacher)}
                >
                  Update
                </Button>
                <Button size="sm" ml="5" sx={DeleteStyles}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for updating teacher profile */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Teacher Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="space-between">
              <Box flex="1" mr="4">
                <FormControl mb="4">
                  <FormLabel>Profile Name</FormLabel>
                  <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Address</FormLabel>
                  <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Phone</FormLabel>
                  <Input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                </FormControl>
              </Box>

              <Box flex="1" ml="4">
                <FormControl mb="4">
                  <FormLabel>Stream</FormLabel>
                  <Input value={stream} onChange={(e) => setStream(e.target.value)} />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Subject</FormLabel>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel>Qualification</FormLabel>
                  <Textarea value={qualification} onChange={(e) => setQualification(e.target.value)} />
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button colorScheme="blue" onClick={closeModal} mr={3}>
              Close 
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
}

export default ViewTeacher;