import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,FormControl,
    FormLabel,Input
  } from '@chakra-ui/react'

  import React,{useState,useEffect} from "react";
  import { useDisclosure } from '@chakra-ui/react'
  import {  useNavigate, useParams } from "react-router-dom";
 




const Courseeditbutton = (props) => {



  const { courseid } = useParams();

  /*course Edit */

  useEffect(() => {
      fetch("http://localhost:8000/courses/" + courseid).then((res) => {
          return res.json();
      }).then((resp) => {
          idchange(resp.id);
          namechange(resp.name);
          descriptionchange(resp.description);
          timechange(resp.time);
          pricechange(resp.price);
          daychange(resp.day);
          imgUrlchange(resp.imgUrl)
      
      }).catch((err) => {
          console.log(err.message);
      })
  }, []);

  const[id,idchange]=useState("");
  const[name,namechange]=useState("");
  const[description,descriptionchange]=useState("");
  const[time,timechange]=useState("");
  const[day,daychange]=useState("");
  const[price,pricechange]=useState("");
  const[imgUrl,imgUrlchange]=useState("");

  const[validation,valchange]=useState(false);


  const navigate=useNavigate();

  const handlesubmit=(e)=>{
    e.preventDefault();
    const coursedata={id,name,description,price,day,time,imgUrl};
    

    fetch("http://localhost:8000/courses/"+courseid,{
      method:"PUT",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(coursedata)
    }).then((res)=>{
      alert('Saved successfully.')
      navigate('/course/detail/' +courseid);
    }).catch((err)=>{
      console.log(err.message)
    })

  }











  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button fontSize='12px' colorScheme='blue' height='30px' onClick={onOpen}>Edit</Button>
   

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
        <form  onSubmit={handlesubmit}>
          <ModalHeader>Update Course Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
        
            <FormControl>
              <FormLabel fontSize='15px'>Title</FormLabel>
              <Input fontSize='15px' value={name} height='40px' ref={initialRef} placeholder='Title'  onMouseDown={e=>valchange(true)}
               onChange={e=>namechange(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Discription</FormLabel>
              <Input fontSize='15px'  value={description} height='40px' ref={initialRef} placeholder='Title'  onMouseDown={e=>valchange(true)}
               onChange={e=>descriptionchange(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Date</FormLabel>
              <Input fontSize='15px'  value={day}  height='40px' ref={initialRef} placeholder='Title'  onMouseDown={e=>valchange(true)}
               onChange={e=>daychange(e.target.value)} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Time</FormLabel>
              <Input fontSize='15px'  value={time} height='40px' ref={initialRef} placeholder='Title'  onMouseDown={e=>valchange(true)}
               onChange={e=>timechange(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize='15px'>Price</FormLabel>
              <Input fontSize='15px' value={price} height='40px' ref={initialRef} placeholder='Title'  onMouseDown={e=>valchange(true)}
               onChange={e=>pricechange(e.target.value)}/>
            </FormControl>

         
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} fontSize='18px' height='30px' type="submit">
              Save
            </Button>
            <Button onClick={onClose} fontSize='18px' height='30px'>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
       
      </Modal>
    </>
  )
}



export default Courseeditbutton;