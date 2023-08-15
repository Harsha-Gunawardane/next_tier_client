import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchCourse = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <Box width="30%" mb="1em" ml='20px'>
      <Input
        type="text"
        placeholder="Search by course title..."
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchCourse;