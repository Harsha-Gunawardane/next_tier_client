import { SimpleGrid, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { McqCategoryCards } from "./McqCategoryCards";

import CategoriesHeaderBar from "./CategoriesHeaderBar";

export default function McqCategoriesTab({ onOpen, categories, search, setSearch }) {
  return (
    <>
      <CategoriesHeaderBar
        search={search}
        setSearch={setSearch}
        onOpen={onOpen}
      />
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
            <NavLink key={category.id} to={`/tutor/quizzes/category/${category.id}`}>
              <McqCategoryCards category={category} />
            </NavLink>
          ))}
      </SimpleGrid>
    </>
  );
}
