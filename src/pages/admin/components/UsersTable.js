import { Box } from "@chakra-ui/react";
import { Table } from "@mantine/core";

import "../../../assets/css/mantineTable.css";

function UsersTable({ users }) {
  const thStyle = {
    fontFamily: "Roboto, sans-serif",
    letterSpacing: "0.5px",
    color: "#555555",
    fontSize: "15px",
    fontWeight: "medium",
  };

  const rows = users.map((user) => (
    <tr className="tr" key={user.username}>
      <td>{user.profile}</td>
      <td className="center-align" style={{ fontSize: "14px" }}>
        {user.username}
      </td>
      <td className="center-align" style={{ fontSize: "14px" }}>
        {user.fName}
      </td>
      <td className="center-align" style={{ fontSize: "14px" }}>
        {user.lName}
      </td>
      <td
        className="center-align"
        style={{ fontSize: "14px", color: "#444444" }}
      >
        {user.lLogin}
      </td>
      <td className="center-align" style={{ fontSize: "14px" }}>
        {user.role}
      </td>
      <td>{user.active}</td>
    </tr>
  ));

  return (
    <Box
      w={"100%"}
      minW={500}
      borderRadius={8}
      p={5}
      border={"1px solid #E2E2E2"}
      // maxH={300}
      // overflowY={"scroll"}
    >
      <Table highlightOnHover className="tr">
        <thead>
          <tr
            className="tr"
            style={{
              height: "40px",
              marginBottom: "5px",
              borderRadius: "10px",
            }}
          >
            <th></th>
            <th style={thStyle}>User name</th>
            <th style={thStyle}>First name</th>
            <th style={thStyle}>Last name</th>
            <th style={thStyle}>Last login</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Active</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
}

export default UsersTable;
