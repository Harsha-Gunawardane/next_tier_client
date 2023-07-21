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
    AccordionIcon,
  } from '@chakra-ui/react'

const Addmonth = () => {


  const[id,idchange]=useState("");
    const[month,monthchange]=useState("");

    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const content={month};
      

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
  <AccordionItem bg='white' height='30px'>
    <h2>
      <AccordionButton bg='white' border='2px dashed black' height='35px' fontSize='15px'>
        <Box as="span" flex='1' textAlign='left'>
         <Text ml='300px'> + Add Month</Text>
        </Box>

      </AccordionButton>
    </h2>
    <form onSubmit={handlesubmit}>
    <AccordionPanel pb={4}>
        <Heading fontSize='20px' mb='10px'>Add Month</Heading>
    <Input fontSize='15px'  onMouseDown={e=>valchange(true)} onChange={e=>monthchange(e.target.value)} className="form-control" placeholder='' />
    <Button type='submit'> Add</Button>
    </AccordionPanel>
    </form>
  </AccordionItem>


</Accordion>



</>
    );
}



export default Addmonth;