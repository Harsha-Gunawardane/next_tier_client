import { Card } from "@chakra-ui/react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";

import { IconEdit, IconPencil, IconTrash } from "@tabler/icons-react";
import { FaPen } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function StaffTable({ staffs, handleDelete }) {
  const theme = useMantineTheme();
  const rows = staffs.map((staff) => (
    <tr key={staff.name}>
      <td style={{ fontSize: "14px" }}>
        <Group spacing="sm">
          <Avatar size={30} src={staff.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {staff.name}
          </Text>
        </Group>
      </td>

      <td style={{ fontSize: "14px" }}>
        <Badge
          color={staff.job === "Paper Marking Staff" ? "blue" : "pink"}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {staff.job}
        </Badge>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Anchor component="button" size="sm">
          {staff.email}
        </Anchor>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Text fz="sm" c="dimmed">
          {staff.phone}
        </Text>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Group spacing={0} position="right">
          <NavLink to={`edit/${staff.id}`}>
            <ActionIcon>
              <IconPencil size="1rem" stroke={1.5} />
            </ActionIcon>
          </NavLink>
          <ActionIcon
            style={{ color: "red" }}
            onClick={() => handleDelete(staff.id)}
          >
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Card padding="10px" margin="20px" variant="outline">
      <ScrollArea h={500}>
        <Table
          sx={{ minWidth: 800 }}
          verticalSpacing="sm"
          horizontalSpacing="xl"
          striped
          highlightOnHover
        >
          <thead>
            <tr>
              <th style={{ fontSize: "16px" }}>Employee</th>
              <th style={{ fontSize: "16px" }}>Job title</th>
              <th style={{ fontSize: "16px" }}>Email</th>
              <th style={{ fontSize: "16px" }}>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
