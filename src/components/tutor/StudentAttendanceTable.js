import { Avatar, Badge, Table, Group, Text, ScrollArea } from "@mantine/core";
import { Card } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";


function TableRow({ student }) {
  return (
    <tr key={student.id}>
      <td style={{ fontSize: "14px" }}>
        <Group spacing="sm">
          <Avatar size={20} src={student.profile_picture} radius={30} />
          <Text fz="sm" fw={500}>
            {`${student.first_name} ${student.last_name}`}
          </Text>
        </Group>
      </td>

      <td>
        {student.status[0] ? (
          <Badge fullWidth>Present</Badge>
        ) : (
          <Badge color="red" fullWidth>
            Absent
          </Badge>
        )}
      </td>
    </tr>
  );
}

export default function StudentAttendanceTable({ students }) {


  const rows = students.map((student) => (
    <TableRow key={student.id} student={student} />
  ));

  return (
    <Card margin="5px" variant="outline" padding="10px">
      <ScrollArea h={400}>
        <Table
          sx={{ minWidth: 500 }}
          verticalSpacing="sm"
          horizontalSpacing="xl"
          highlightOnHover
          fontSize="md"
        >
          <thead>
            <tr>
              <th style={{ fontSize: "14px" }}>Student Name</th>
              <th style={{ fontSize: "14px" }}>Status</th>

              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
