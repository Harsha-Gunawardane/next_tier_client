import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Heading,
  Textarea,
  Select,useToast,
} from '@chakra-ui/react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const AddContent = ({ studypackId ,dynamicWeek, }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [files, setFiles] = useState('');
  const [type, setType] = useState('TUTE');
  const [subjectAreas, setSubjectAreas] = useState([]);
  const [status, setStatus] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const handleAddContent = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (title.trim() === '' || description.trim() === '' || subject === '' || type === '' || status === '') {
      return;
    }

    try {
const response = await axiosPrivate.post('/tutor/content', { 
  files, 
  title, 
  description, 
  subject, 
  type, 
  subject_areas: subjectAreas, 
  status 
}, {
  headers: { "Content-Type": "multipart/form-data" }
});

      const newContentId = response.data.id;
  
      const response2 = await axiosPrivate.get(`/tutor/weekstudypack/${studypackId}`);
      // console.log(response);
      const existingContentIds = response2.data.content_ids;
      const price = response2.data.price;
      const expire_date = response2.data.expire_date;

      // Find the content object for the dynamic week
      const dynamicWeekContent = existingContentIds.find(content => content[dynamicWeek]);

      if (dynamicWeekContent) {
        // Get the existing video IDs in the dynamic week
        const existingDynamicWeekVideoIds = dynamicWeekContent[dynamicWeek].tute_id;

        // Add selected content IDs to the existing video IDs
        const updatedVideoIds = [...existingDynamicWeekVideoIds, newContentId];


        // Update the dynamic week's video_id array
        dynamicWeekContent[dynamicWeek].tute_id = updatedVideoIds;
      }

      // Update the studypack with the modified content_ids structure and the price
      await axiosPrivate.put(`/tutor/weekstudypack/${studypackId}`, {
        content_ids: existingContentIds,
        price: price,
        expire_date:expire_date,
      });

      // onNewContentAdded(newContentInfo);
    //   onClose(); 
      // window.location.reload();
      toast({
        title: "Studypack Details Updated",
        description: "The Studypack details have been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          // Reload the page after the toast is manually closed
          window.location.reload();
        },
      });
   


    } catch (error) {
      console.error('Error adding new content:', error);
    }
  };

  return (
    <div>
      {/* <Button
        onClick={handleAddContent}
        width='60%'
        height='35px'
        mb='10px'
        ml='130px'
        mt='25px'
        fontSize='12px'
        colorScheme='blue'>
        Add Content
      </Button> */}

      <form onSubmit={handleAddContent}>
        <FormControl isRequired isInvalid={formSubmitted && title.trim().length === 0}>
          <FormLabel fontSize='15px'>Title</FormLabel>
          <Input
            fontSize='15px'
            height='40px'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {formSubmitted && title.trim().length === 0 && (
            <FormErrorMessage>Title is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={formSubmitted && description.trim().length === 0}>
          <FormLabel fontSize='15px'>Description</FormLabel>
          <Textarea
            fontSize='15px'
            height='80px'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {formSubmitted && description.trim().length === 0 && (
            <FormErrorMessage>Description is required</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize='15px'>Subject</FormLabel>
          <Input
            fontSize='15px'
            height='40px'
            placeholder='Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize='15px'>Add File</FormLabel>
      <Input
      fontSize='15px'
      height='40px'
      type='file'
      placeholder='Thumbnail URL'
      onChange={(e) => setFiles(e.target.files[0])}
    />
    
        </FormControl>



        <FormControl>
          <FormLabel fontSize='15px'>Subject Areas</FormLabel>
          <Input
            fontSize='15px'
            height='40px'
            placeholder='Subject Areas (comma-separated)'
            value={subjectAreas.join(',')}
            onChange={(e) => setSubjectAreas(e.target.value.split(','))}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize='15px'>Status</FormLabel>
          <Select
            fontSize='15px'
            height='40px'
            placeholder='Select Status'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value='PUBLIC'>PUBLIC</option>
            <option value='PRIVATE'>PRIVATE</option>
          </Select>
        </FormControl>

        <Button colorScheme='blue' mr={3} fontSize='14px' ml='820px' height='30px' type='submit' mt='20px'>
          Save
        </Button>
      </form>
    </div>
  );
};

export default AddContent;
