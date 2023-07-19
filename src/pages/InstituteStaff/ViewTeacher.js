import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Image, Heading, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import data from './data/data';

function ViewTeacher() {
  
  const ButtonStyles = {
    backgroundColor: 'blue.400',
    color: 'white',
    borderRadius: '5px',
    _hover: {
      backgroundColor: 'blue.300',
    },
  };

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleViewClick(teacher) {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <TableContainer width="1500px" height="500px" px="120px" py="60px">
      <Flex justify="space-between" align="center" mb="4">
        <Heading as="h1" size="lg" mb="10">Registered Teachers</Heading>
        <NavLink to="add">
          <Button size="md" sx={ButtonStyles} mb="4"> Add Teacher </Button>
        </NavLink>
      </Flex>

      <Table variant='striped'>
        <Thead>
          <Tr>
            <Th fontSize='md' fontWeight='bold'>ID</Th>
            <Th fontSize='md' fontWeight='bold'>Full Name</Th>
            <Th fontSize='md' fontWeight='bold'>Subject</Th>
            <Th fontSize='md' fontWeight='bold'>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.viewTeacher.map((teacher) => (
            <Tr key={teacher.id}>
              <Td>{teacher.id}</Td>
              <Td>{teacher.fullName}</Td>
              <Td>{teacher.subject}</Td>
              <Td>
                <Button size='md' sx={ButtonStyles} onClick={() => handleViewClick(teacher)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
          <ModalOverlay />
          <ModalContent  padding="20px" border="2px solid" borderColor="gray.300">
            <ModalHeader>Teacher Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody sx={{ background: 'gray.100', padding: '20px' }}>
            <Flex alignItems="center" mb="4">
                <Image src={selectedTeacher.profileImage} alt="Profile Image" boxSize="100px" objectFit="cover" mr="4" />
                <div>
                  <p style={{ marginBottom: '10px' }}>ID Number: {selectedTeacher.id}</p>
                  <p style={{ marginBottom: '10px' }}>Name: {selectedTeacher.fullName}</p>
                  <p style={{ marginBottom: '10px' }}>Email Address: {selectedTeacher.email}</p>
                  <p style={{ marginBottom: '10px' }}>Subject: {selectedTeacher.subject}</p>
                </div>
              </Flex>

            </ModalBody>
            <ModalFooter>
            <Button ml="2" onClick={closeModal}> Cancel </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </TableContainer>
  );
}

export default ViewTeacher;
