import ProfileCard from "./cards/ProfileCard";
import { Box, Text, SimpleGrid, Flex, Button } from "@chakra-ui/react";
import SearchArea from "./SearchArea";
import { useState } from "react";
import StepperForm from "./StepperForm";

const roles = [
  { value: "", label: "All" },
  { value: "System", label: "System" },
  { value: "Network", label: "Network" },
  { value: "Database", label: "Database" },
  { value: "Cloud", label: "Cloud" },
  { value: "Security", label: "Security" },
];

function searchAdmins(searchString, data) {
  searchString = searchString.toLowerCase();

  return data.filter(
    (item) =>
      item.first_name.toLowerCase().includes(searchString) ||
      item.last_name.toLowerCase().includes(searchString) ||
      item.username.toLowerCase().includes(searchString)
  );
}

function selectRoles(role, data) {
  role = role.toLowerCase();

  return data.filter(
    (item) => item.admin_role.toLowerCase().includes(role)
  );
}

function AdminProfiles({ profiles }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState("");

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Box w={"calc(100vw - 600px)"} p={6}>
        <Flex justifyContent={"space-between"} pr={10}>
          <Text
            fontWeight={"semibold"}
            fontStyle={"Roboto"}
            fontSize={20}
            color={"#444444"}
            mb={5}
          >
            Administrators Info
          </Text>
          <Button
            bg={"#0074D9"}
            color={"#FFFFFF"}
            _hover={{
              bg: "#0074D9",
              color: "#FFFFFF",
            }}
            fontWeight="normal"
            mr="12px"
            h={9}
            w={20}
            onClick={handleOpenModal}
          >
            new
          </Button>
        </Flex>
        <SearchArea
          roles={roles}
          query={searchQuery}
          setQuery={setSearchQuery}
          selectedRole={role}
          setSelectedRole={setRole}
        />
        <Box p={5}>
          <SimpleGrid minChildWidth="220px">
            {searchAdmins(searchQuery, selectRoles(role, profiles)).map((profile) => {
              return <ProfileCard profile={profile} />;
            })}
          </SimpleGrid>
        </Box>
      </Box>
      <StepperForm handleCloseModal={handleCloseModal} isOpen={isOpen} />
    </>
  );
}

export default AdminProfiles;
