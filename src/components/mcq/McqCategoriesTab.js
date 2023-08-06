import { SimpleGrid, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { McqCategoryCards } from "./McqCategoryCards";
import { useEffect, useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CategoriesHeaderBar from "./CategoriesHeaderBar";

export default function McqCategoriesTab() {

  const axiosPrivate = useAxiosPrivate();
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axiosPrivate.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    getCategories();
  }, []);

  // setCategories(categories.filter((category) =>
  //   category.title.toLowerCase().includes(search.toLowerCase())
  // ));
  
  return (
    <>
      <CategoriesHeaderBar search={search} setSearch={setSearch} />
      <Text
        fontSize={"16px"}
        fontWeight={"600"}
        paddingLeft="20px"
        paddingBottom="10px"
      >
        Created Categories
      </Text>
      <SimpleGrid
        spacing={6}
        minChildWidth="240px"
        maxChildWidth="150px"
        margin="10px"
        maxH={{ base: "230px", sm: "240px" }}
        overflowY="auto"
      >
        {categories
          .filter((category) =>
            category.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((category) => (
            <NavLink to={`category/${category.id}`}>
              <McqCategoryCards category={category} />
            </NavLink>
          ))}
      </SimpleGrid>
    </>
  );
}
