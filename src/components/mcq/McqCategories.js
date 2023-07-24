import {
  SimpleGrid,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { McqCategoryCards } from "./McqCategoryCards";

export default function McqCategories({ categories }) {
  return (
    <SimpleGrid
      spacing={6}
      minChildWidth="240px"
      maxChildWidth="170px"
      margin="20px"
      maxH="480px"
      overflowY="auto"
    >
      {categories.map((category) => (
        <NavLink to={`${category.id}`}>
          <McqCategoryCards category={category}/>
        </NavLink>
      ))}
    </SimpleGrid>
  );
}
