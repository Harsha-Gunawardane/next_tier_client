import { Box, Button, Card, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import api from "../../api/axios";


import McqsView from "../../components/mcq/McqsView";
import McqsHeaderBar from "../../components/mcq/McqsHeaderBar";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import CategoryInsideCard from "../../components/mcq/CategoryInsideCard";
import DonutChartCategory from "../../components/mcq/DonutChartCategory";

export default function McqsByCategory() {

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
      <BreadCrumbs />
      <Grid
        margin={{ base: "10px 10px", sm: "20px auto" }}
        templateColumns="repeat(3, 1fr)"
        maxWidth="1180px"
        gap={{ base: 2, sm: 8 }}
      >
        <GridItem colSpan={{ base: 3, sm: 2 }}>
          <CategoryInsideCard />
        </GridItem>
        <GridItem colSpan={{ base: 3, sm: 1 }}>
          <Card variant="outline" height={{ base: "80px", sm: "150px" }} display={{base:"none" ,md:"block"}}>
            <DonutChartCategory />
          </Card>
        </GridItem>
      </Grid>
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
