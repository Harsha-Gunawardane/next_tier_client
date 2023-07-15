import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CategoriesSearchBar from "../../components/mcq/CategoriesSearchBar";
import McqCategories from "../../components/mcq/McqCategories";

import api from "../../api/axios";

export default function McqCategoryPool() {
  // const API_URL = "http://localhost:3500/categories";
  

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await fetch(API_URL);
  //     const listCategories = await response.json();
  //     setCategories(listCategories);
  //   };

  //   fetchCategories();
  // }, []);

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
      <NavLink to="add">
        <Button
          colorScheme="whatsapp"
          variant="solid"
          position="relative"
          size="md"
          width="160px"
          top="47px"
          left={{ base: "120px", md: "250px", lg: "500px", xl: "1050px" }}
        >
          {/* <AddIcon boxSize={5} pr="8px" color="white" /> */}
          Add New Category
        </Button>
      </NavLink>

      <CategoriesSearchBar search={search} setSearch={setSearch} />

      <McqCategories
        categories={categories.filter((category) =>
          category.title.toLowerCase().includes(search.toLowerCase())
        )}
      />
    </Box>
  );
}
