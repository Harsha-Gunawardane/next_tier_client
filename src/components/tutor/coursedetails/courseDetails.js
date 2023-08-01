import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Text } from '@chakra-ui/react'
import { ListItem,UnorderedList,Button,ButtonGroupStackDivider,Stack,Input } from '@chakra-ui/react'

const Coursedetails = () => {

  const[itemdata,itemdatachange]=useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/data").then((res) => {
        return res.json();
    }).then((resp) => {
        itemdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])



  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
        fetch("http://localhost:8000/data/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}



  const[name,namechange]=useState("");
  const[validation,valchange]=useState(false);

  const handlesubmit=(e)=>{
    e.preventDefault();
    const empdata={name};
    

    fetch("http://localhost:8000/data",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(empdata)
    }).then((res)=>{
      alert('Saved successfully.')
    }).catch((err)=>{
      console.log(err.message)
    })

  }

  return (
    <div>


<UnorderedList p={2} spacing='10px'>
    {itemdata &&
        itemdata.map(item => (

        
       <ListItem key={item.id}>
      <Text fontSize='15px'> {item.name}   <button onClick={() => Removefunction(item.id)}>
      <FaMinus />
    </button>
      </Text>
      </ListItem>
 

))}

</UnorderedList>
      <form onSubmit={handlesubmit}>
        <Input
          type="text"
          fontSize='15px'
          width='300px'
          value={name}
          onChange={(e) => namechange(e.target.value)}
          placeholder="New Detail"
           onMouseDown={e=>valchange(true)} 
        />
        <button type="submit">
         <FaPlus />
        </button>
      </form>
  
    </div>
  );
};

export default Coursedetails;
