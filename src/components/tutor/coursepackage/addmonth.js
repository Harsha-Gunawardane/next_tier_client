import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {

    Button,FormControl,
    FormLabel,Input, IconButton,Box, Heading
  } from '@chakra-ui/react'
  import React from "react";
  import { useDisclosure,Text } from '@chakra-ui/react'

  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,VisuallyHiddenInput
  } from '@chakra-ui/react'

const Addmonth = () => {


  const[id,idchange]=useState("");
  const[month,monthchange]=useState("");
  const[week1,week1change]=useState("");
  const[week2,week2change]=useState("");
  const[week3,week3change]=useState("");
  const[week4,week4change]=useState("");


    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const content={month,week1,week2,week3,week4};
   
      

      fetch("http://localhost:8000/content",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(content)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/course/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }



    return (

        <>

<Accordion allowToggle>
  <AccordionItem bg='white' height='30px' width={{base:300,xl:400}}>
    <h2>
      <AccordionButton bg='white' border='2px dashed grey' height='35px' fontSize='15px'>
        <Box as="span" flex='1' textAlign='left'>
         <Text ml={{base:120,xl:280}}> + Add Content</Text>
        </Box>

      </AccordionButton>
    </h2>
    <form onSubmit={handlesubmit}>
    <AccordionPanel pb={4} boxShadow='0 3px 10px rgb(0 0 0 / 0.2)'  borderRadius='10px'>
        <Heading fontSize='20px' mb='10px'>Add Content</Heading>
    <Input fontSize='15px' height='30px' onMouseDown={e=>valchange(true)} onChange={e=>monthchange(e.target.value)} className="form-control" placeholder='' />


    <Button type='submit' height='30px' mt='20px' colorScheme="blue" fontSize='12px'> Add</Button>
    </AccordionPanel>
    </form>
  </AccordionItem>


</Accordion>



</>
    );
}



export default Addmonth;