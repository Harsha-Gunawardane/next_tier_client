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

export default function StaffTable({ staffs, handleDelete, handleEdit }) {
  const theme = useMantineTheme();
  const rows = staffs.map((staff) => (
    <tr key={staff.id}>
      <td style={{ fontSize: "14px" }}>
        <Group spacing="sm">
          <Avatar size={20} src={staff.profile_picture} radius={30} />
          <Text fz="sm" fw={500}>
            {`${staff.first_name} ${staff.last_name}`}
          </Text>
        </Group>
      </td>

      <td style={{ fontSize: "14px" }}>
        <Badge
          color={staff.staff_title === "Paper Marking Staff" ? "blue" : "pink"}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {staff.staff_title}
        </Badge>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Anchor component="button" size="sm">
          {staff.email}
        </Anchor>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Text fz="sm" c="dimmed">
          {staff.phone_number}
        </Text>
      </td>
      <td style={{ fontSize: "14px" }}>
        <Group spacing={0} position="right">
          <ActionIcon onClick={() => handleEdit(staff.id)}>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
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
