import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import api from "../../api/axios";


import McqView from "../../components/mcq/McqView";
import McqsSearchBar from "../../components/mcq/McqsSearchBar";

export default function McqPool() {

  const [mcqs, setMcqs] = useState([]);
  const [search, setSearch] = useState("");

   useEffect(() => {
     const getMcqs = async () => {
       try {
         const response = await api.get("/mcqs");
         setMcqs(response.data);
       } catch (error) {
         console.log(error.response.data);
       }
     };

     getMcqs();
   }, []);

  
  return (
    <div>
      <NavLink to="mcq/add">
        <Button
          colorScheme="whatsapp"
          variant="solid"
          position="relative"
          size="md"
          top="47px"
          width="160px"
          left={{ base: "120px", md: "250px", lg: "500px", xl: "1050px" }}
        >
          {/* <AddIcon boxSize={5} pr="8px" color="white" /> */}
          Add New Question
        </Button>
      </NavLink>

      <McqsSearchBar search={search} setSearch={setSearch} />

      <McqView
        mcqs={mcqs.filter((mcq) =>
          mcq.question.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </div>
  );
}
