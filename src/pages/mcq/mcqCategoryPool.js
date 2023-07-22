import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import McqCategories from "../../components/mcq/McqCategories";

import api from "../../api/axios";
import CategoriesHeaderhBar from "../../components/mcq/CategoriesHeaderBar";
import { StatsGroup } from "../../components/mcq/StatsGroup";

export default function McqCategoryPool() {
  // const API_URL = "http://localhost:3500/categories";
  

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");



  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getCategories();
  }, []);

  

  return (
    <Box w="100%">
      <StatsGroup />

      <CategoriesHeaderhBar search={search} setSearch={setSearch} />

      <McqCategories
        categories={categories.filter((category) =>
          category.title.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Box>
  );
}
