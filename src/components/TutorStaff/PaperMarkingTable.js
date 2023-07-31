import { AddIcon } from "@chakra-ui/icons";
import { Button, Checkbox, SimpleGrid, Stack } from "@chakra-ui/react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Input,
} from "@mantine/core";

import { NavLink } from "react-router-dom";

export default function PaperMarkingTable({ staffs }) {
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

      <td>
        {Math.random() > 0.5 ? (
          <Badge fullWidth>Attend</Badge>
        ) : (
          <Badge color="gray" fullWidth>
            Unattend
          </Badge>
        )}
      </td>

      <td style={{ fontSize: "14px" }}>
        <Text fz="sm">
          <form action="">
            <Input type="text" placeholder="Marks (Ex: 78)" />
          </form>
        </Text>
      </td>
      <td style={{ fontSize: "14px" }}>
        <form action="">
          <SimpleGrid spacing={5} columns={3}>
            <Checkbox colorScheme="red">Calculations</Checkbox>
            <Checkbox colorScheme="red">Inorganic</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
          </SimpleGrid>
        </form>
      </td>
      <td style={{ fontSize: "14px" }}>
        <NavLink to="add">
          <Button
            colorScheme="messenger"
            variant="solid"
            size="md"
            width="120px"
          >
            Save
          </Button>
        </NavLink>
      </td>
    </tr>
  ));

  return (
    <ScrollArea h={500}>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        horizontalSpacing="30px"
      >
        <thead>
          <tr>
            <th style={{ fontSize: "16px" }}>Student Name</th>
            <th style={{ fontSize: "16px" }}>Status</th>
            <th style={{ fontSize: "16px" }}>Marks</th>
            <th style={{ fontSize: "16px" }}>Weak Area(s)</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
