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

import { IconPencil, IconTrash } from "@tabler/icons-react";



export default function StaffTable({ staffs }) {

  const theme = useMantineTheme();
  const rows = staffs.map((staff) => (
    <tr key={staff.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} src={staff.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {staff.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={staff.job === "Paper Marking Staff" ? "blue" : "pink"}
          variant={theme.colorScheme === "dark" ? "light" : "outline"}
        >
          {staff.job}
        </Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {staff.email}
        </Anchor>
      </td>
      <td>
        <Text fz="sm" c="dimmed">
          {staff.phone}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <IconPencil size="1rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon style={{ color: "red" }}>
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800}} verticalSpacing="sm" horizontalSpacing="50px" >
        <thead>
          <tr>
            <th>Employee</th>
            <th>Job title</th>
            <th>Email</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
