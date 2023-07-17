import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";


import api from '../../api/axios';

//Staff Components
import StaffTable from "../../components/staff/StaffTable.js";
import StaffSearchBar from "../../components/staff/StaffSearchBar";

const StaffList = () => {

  const [staffs , setStaffs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() =>{

    const getStaffs = async () => {
      try {
        const response = await api.get("/staffs");
        if(!response){
          setStaffs([]);
        }
        setStaffs(response.data)
      } catch (error) {
        console.log(error.response.data);
      }
    }

    getStaffs();
  },[])


  return (
    <div>
      
      <NavLink to="add">
        <Button
          colorScheme="whatsapp"
          variant="solid"
          position="relative"
          top="47px"
          size="md"
          width="160px"
          left={{ base: "120px", md: "250px", lg: "500px", xl: "1050px" }}
        >
          {/* <AddIcon boxSize={5} pr="8px" color="white" /> */}
          Add Staff
        </Button>
      </NavLink>

      <StaffSearchBar search={search} setSearch={setSearch} />
      <StaffTable staffs = {staffs.filter((staff) => staff.name.toLowerCase().includes(search.toLowerCase()))}
      />
    </div>
  );
};

export default StaffList;
