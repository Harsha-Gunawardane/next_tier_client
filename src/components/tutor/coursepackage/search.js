import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchStudypack = ({ onSearch }) => {
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);
  };

  return (
    <Box width="80%" mb="1em" ml='100px'>
      <Input
        type="text"
        placeholder="Search by course title..."
        onChange={handleSearchChange}
      />
    </Box>
  );
};

export default SearchStudypack;