import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import api from "../../../api/axios";


import McqsView from "../../../components/mcq/McqsView";
import McqsHeaderBar from "../../../components/mcq/McqsHeaderBar";

export default function Mcqs() {

  const { id } = useParams();

  const handleDeleteMcq = (id) =>{

  }

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
    <Box width="100%">
      
      <McqsHeaderBar search={search} setSearch={setSearch} />

      <McqsView
        mcqs={mcqs.filter((mcq) =>
          mcq.question.toLowerCase().includes(search.toLowerCase())
        )}
        handleDeleteMcq={handleDeleteMcq}
      />
    </Box>
  );
}
