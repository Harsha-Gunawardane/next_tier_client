import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import { IconCheck, IconX } from "@tabler/icons-react";
import { Switch, useMantineTheme } from "@mantine/core";

import SearchArea from "./SearchArea";
import StepperForm from "./StepperForm";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ModalLayout from "../../../components/ModalLayout";

const STAFF_URL = "/admin/staff";
const USER_URL = "/admin/user";

function searchUsers(query, users) {
  query = query.toLowerCase();
  return users.filter((user) =>
    ["username", "fName", "lName"].some((field) =>
      user[field].toLowerCase().includes(query)
    )
  );
}

function getRole(role) {
  if (typeof role !== "undefined") {
    return Object.keys(role).find((key) => key !== "User");
  }
  return "User";
}

function UsersTableLayout() {
  const theme = useMantineTheme();
  const axiosPrivate = useAxiosPrivate();

  const [term, setTerm] = useState(0);
  const [focusedTab, setFocusedTab] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [isOpened, setIsOpened] = useState(false);
  const [body, setBody] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const MemoizedUsersTable = React.memo(UsersTable);

  const handleClosedModal = () => {
    setIsOpened(false);
  };
  const handleOpenedModal = (user) => {
    setSelectedUser(user);
    if (user.active) {
      setBody(`Are you sure to block ${user.first_name} ${user.last_name} ?`);
    } else {
      setBody(`Are you sure to active ${user.first_name} ${user.last_name} ?`);
    }
    setIsOpened(true);
  };

  const handleActiveUser = async () => {
    try {
      const response = await axiosPrivate.patch(
        `${USER_URL}/${selectedUser.username}`,
        {
          state: !selectedUser.active,
        }
      );
      console.log(response);

      const user = allUsers.find(
        (user) => user.username === selectedUser.username
      );
      if (user) {
        user.active = !selectedUser.active;
      } else {
        console.log(`User with username ${selectedUser.username} not found.`);
      }
      handleClosedModal();
      setSelectedUser({});
    } catch (error) {
      console.error(error);
    }
  };

  const title = "Are you sure ?";
  const footer = (
    <Flex justifyContent={"right"}>
      <Flex gap={2.5}>
        <Button
          style={{
            background: "#383838",
            color: "#FFFFFF",
            _hover: {
              bg: "#383838",
              color: "#FFFFFF",
            },
            fontWeight: "normal",
          }}
          onClick={handleClosedModal}
        >
          Cancel
        </Button>
        <Button
          style={{
            background: "#D93400",
            color: "#FFFFFF",
            _hover: {
              bg: "#D93400",
              color: "#FFFFFF",
            },
            fontWeight: "normal",
          }}
          onClick={handleActiveUser}
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const getStructuredUsers = (users) => {
    const structuredUsers = [];
    users.map((user) => {
      const structuredUser = {
        key: user.username,
        profile: (
          <Image
            objectFit="cover"
            w={12}
            h={12}
            borderRadius={50}
            src={user.profile_picture}
          />
        ),
        username: user.username,
        fName: user.first_name,
        lName: user.last_name,
        lLogin: user.last_login,
        role: (
          <Box>
            <Flex
              justifyContent={"center"}
              bg={
                getRole(user.roles) === "Admin"
                  ? "#EBD2FF"
                  : getRole(user.roles) === "Tutor"
                  ? "#D3FFD2"
                  : getRole(user.roles) === "Staff"
                  ? "#F5D6D3"
                  : "#CEE8FE"
              }
              borderRadius={3}
              pt={1}
              pb={1}
              // pl={3}
              // pr={3}
              w={20}
            >
              <Text
                fontSize={14}
                color={
                  getRole(user.roles) === "Admin"
                    ? "#8719DD"
                    : getRole(user.roles) === "Tutor"
                    ? "#15BD66"
                    : getRole(user.roles) === "Staff"
                    ? "#D93400"
                    : "#0074D9"
                }
                fontWeight={"semibold"}
              >
                {getRole(user.roles)}
              </Text>
            </Flex>
          </Box>
        ),
        active: (
          <Switch
            checked={user.active}
            onChange={() => handleOpenedModal(user)}
            color="teal"
            size="md"
            thumbIcon={
              user.active ? (
                <IconCheck
                  size="0.8rem"
                  color={theme.colors.teal[theme.fn.primaryShade()]}
                  stroke={3}
                />
              ) : (
                <IconX
                  size="0.8rem"
                  color={theme.colors.red[theme.fn.primaryShade()]}
                  stroke={3}
                />
              )
            }
          />
        ),
      };
      structuredUsers.push(structuredUser);
    });

    return structuredUsers;
  };

  const handleTabFocused = (tab) => {
    setFocusedTab(tab);
  };

  const fetchUsers = async (isMerge = true) => {
    console.log("term ->", term);
    const queryString = new URLSearchParams({
      role: selectedRole,
      query: searchQuery,
      term: term,
    }).toString();

    try {
      const response = await axiosPrivate.get(`${STAFF_URL}?${queryString}`);
      console.log(response.data?.data);

      let newUsers = response.data?.data;
      if (isMerge) {
        newUsers = allUsers.concat(newUsers);
      }
      setAllUsers(newUsers);

      if (focusedTab === "all") {
        setUsers(newUsers);
      }
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [term]);

  useEffect(() => {
    fetchUsers(false);
    setTerm(0);
  }, [searchQuery, selectedRole]);

  useEffect(() => {
    console.log("tab");
    switch (focusedTab) {
      case "all":
        setUsers(allUsers);
        break;
      case "active":
        setUsers(allUsers.filter((user) => user.active === true));
        break;
      case "pending":
        setUsers(allUsers.filter((user) => user.verified === false));
        break;
      case "blocked":
        setUsers(allUsers.filter((user) => user.active === false));
        break;
    }
  }, [focusedTab, term, allUsers]);

  const roles = [
    { value: "All", label: "All" },
    { value: "Student", label: "Student" },
    { value: "Tutor", label: "Tutor" },
    { value: "Staff", label: "Staff" },
    { value: "Parent", label: "Parent" },
    { value: "Admin", label: "Admin" },
  ];

  console.log(focusedTab);
  return (
    <>
      <Box w={"70%"} mt={6}>
        <Text
          fontWeight={"semibold"}
          fontStyle={"Roboto"}
          fontSize={20}
          color={"#444444"}
          ml={10}
        >
          Users Info
        </Text>
        <Tabs pl={5} pr={5} mt={2} ml={2}>
          <TabList style={{ borderBottom: "none" }}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
              pr={9}
            >
              <Flex>
                <Tab onClick={() => handleTabFocused("all")}>All</Tab>
                <Tab onClick={() => handleTabFocused("active")}>Active</Tab>
                <Tab onClick={() => handleTabFocused("pending")}>Pending</Tab>
                <Tab onClick={() => handleTabFocused("blocked")}>Blocked</Tab>
              </Flex>
              <Button
                style={{
                  background: "#0074D9",
                  color: "#FFFFFF",
                  _hover: {
                    bg: "#0074D9",
                    color: "#FFFFFF",
                  },
                  fontWeight: "normal",
                }}
                onClick={handleOpenModal}
              >
                New institute staff
              </Button>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box>
                <SearchArea
                  query={searchQuery}
                  setQuery={setSearchQuery}
                  roles={roles}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
                <MemoizedUsersTable
                  users={searchUsers(searchQuery, getStructuredUsers(users))}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <SearchArea
                  query={searchQuery}
                  setQuery={setSearchQuery}
                  roles={roles}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
                <MemoizedUsersTable
                  users={searchUsers(searchQuery, getStructuredUsers(users))}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <SearchArea
                  query={searchQuery}
                  setQuery={setSearchQuery}
                  roles={roles}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
                <MemoizedUsersTable
                  users={searchUsers(searchQuery, getStructuredUsers(users))}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box>
                <SearchArea
                  query={searchQuery}
                  setQuery={setSearchQuery}
                  roles={roles}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                />
                <MemoizedUsersTable
                  users={searchUsers(searchQuery, getStructuredUsers(users))}
                />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Flex justifyContent={"center"}>
          <Button
            style={{
              background: "#383838",
              color: "#FFFFFF",
              _hover: {
                bg: "#383838",
                color: "#FFFFFF",
              },
              fontWeight: "normal",
            }}
            // display={focusedTab === 'all' ? 'block' : 'none'}
            onClick={() => setTerm(term + 1)}
          >
            + more
          </Button>
        </Flex>
      </Box>
      <StepperForm
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
        actor="Staff"
      />
      <ModalLayout
        isOpen={isOpened}
        handleCloseModal={handleClosedModal}
        title={title}
        body={body}
        footer={footer}
      />
    </>
  );
}

export default UsersTableLayout;
