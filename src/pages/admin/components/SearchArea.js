import React from "react";
import { Flex } from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { Input, Select } from "@mantine/core";

function SearchArea({ query, setQuery, roles, selectedRole, setSelectedRole }) {
  return (
    <Flex pl={5} pr={5} mt={1} mb={3} justifyContent={"space-between"}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={<IconSearch />}
        placeholder="Search"
      />
      <Select
        placeholder="Select role"
        value={selectedRole}
        onChange={(value) => setSelectedRole(value)}
        data={roles}
      />
    </Flex>
  );
}

export default SearchArea;
