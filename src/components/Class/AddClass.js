import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Select, Textarea, Checkbox, CheckboxGroup, Stack, Radio, RadioGroup } from '@chakra-ui/react';
import data from '../../pages/InstituteStaff/data/data'; 


const { viewTeacher } = data;
const { halls } = data;

const ButtonStyles = {
  backgroundColor: 'blue.400',
  color: 'white',
  borderRadius: '5px',
  _hover: {
    backgroundColor: 'blue.300',
  },
};

function AddClass({ onAddClass }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [subject, setSubject] = useState('');
  const [stream, setStream] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [payment, setPayment] = useState('');
  const [hall, setHall] = useState('');
  const [details, setDetails] = useState('');


  const handleSubmit = () => {
    // Validate and submit form data
    if (name && title &&medium && subject && stream && price && date && payment && hall && details) {
      // Call the onAddClass function with the form data
      onAddClass({ name, title, subject, stream, price, date, payment, hall, details });

      // Reset form fields
      setName('');
      setTitle('');
      setMedium('');
      setSubject('');
      setStream('');
      setPrice('');
      setDate('');
      setPayment('');
      setHall('');
      setDetails('');

      // Close the modal
      onClose();
    } else {
      // Show validation error message if form data is incomplete
      alert('Please fill in all the fields');
    }
  };

  return (
    <>
      <Button size="md" sx={ButtonStyles} mb="4" onClick={onOpen}>
        Add a New Class
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}  centerContent>
        <ModalOverlay />
        <ModalContent style={{ width: '100%', maxWidth: '800px' }}>
          <ModalHeader>Add Class</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box border="1px solid" borderColor="gray.300" borderRadius="md" p="4">
          <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
          <FormControl mb="4">
          <FormLabel>Teacher Name</FormLabel>
            <Select value={name} onChange={(e) => setName(e.target.value)}>
                <option value="">Select a Teacher</option>
                    {viewTeacher.map((teacher) => (
                        <option key={teacher.id} value={teacher.fullName}>
                    {teacher.fullName}
                </option>
             ))}
            </Select>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Medium</FormLabel>
              <CheckboxGroup value={medium} onChange={(e) => setMedium(e.target.value)} colorScheme='blue'>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox value='sinhala'>Sinhala</Checkbox>
                    <Checkbox value='english'>English</Checkbox>
                    <Checkbox value='tamil'>Tamil</Checkbox>
                    </Stack>
                </CheckboxGroup>
            </FormControl>
             <FormControl mb="4">
              <FormLabel>Subject</FormLabel>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Stream</FormLabel>
              <Select  value={stream} onChange={(e) => setStream(e.target.value)}>
                    <option value='option1'>Biological Science</option>
                    <option value='option2'>Physical Science</option>
                    <option value='option3'>Art</option>
                    <option value='option3'>Commerce</option>
                    <option value='option3'>Technology</option>
                </Select>
            </FormControl>
            </div>

            <div style={{ flex: 1 }}>
             <FormControl mb="4">
              <FormLabel>Price</FormLabel>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Start Date</FormLabel>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </FormControl>
            <FormControl mb="4">
  <FormLabel>Payment Method</FormLabel>
  
  <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
    <Stack spacing={15} direction="row">
      <Radio value="1">Online</Radio>
      <Radio value="2">Physical</Radio>
      <Radio value="3">Both</Radio>
    </Stack>
  </RadioGroup>
</FormControl>
            <FormControl mb="4">
          <FormLabel>Hall No</FormLabel>
            <Select value={hall} onChange={(e) => setHall(e.target.value)}>
                <option value=""></option>
                    {halls.map((hall) => (
                        <option  value={hall.hallNo}>
                    {hall.hallNo}
                </option>
             ))}
            </Select>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Textarea placeholder='Provide Additional Details'value={details} onChange={(e) => setDetails(e.target.value)} />
            </FormControl>
            </div>
            </div>
            </Box>
          </ModalBody>
          <ModalFooter >
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
            <Button ml="2" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddClass;
