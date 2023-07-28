import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Text } from '@chakra-ui/react'

const MyComponent = () => {
  const [dataList, setDataList] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      const newItemId = dataList.length > 0 ? dataList[dataList.length - 1].id + 1 : 1;
      const newItem = {
        id: newItemId,
        name: inputValue.trim(),
      };
      setDataList([...dataList, newItem]);
      setInputValue(""); // Clear the input field after adding the item
    }
  };

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


  
    {itemdata &&
        itemdata.map(item => (



      <Text> {item.name}   <button onClick={() => Removefunction(item.id)}>
      <FaMinus />
    </button>
      </Text>
 

))}


      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => namechange(e.target.value)}
          placeholder="Enter new data item"
           onMouseDown={e=>valchange(true)} 
        />
        <button type="submit">
          Add Item <FaPlus />
        </button>
      </form>
      <ul>
        {dataList.map((item) => (
          <li key={item.id}>
            {item.name}
           
              <FaMinus />
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
