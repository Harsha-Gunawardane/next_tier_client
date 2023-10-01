import React, { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ScrollArea,
  useMantineTheme,
  MultiSelect,
  NumberInput,
} from "@mantine/core";
import { Button, Card, useToast } from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function TableRow({
  students,
  student,
  paper,
  setMarksAddedStudents,
  marksAddedStudents,
}) {
  const theme = useMantineTheme();

  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();

  console.log(student.marks);

  const [marks, setMarks] = useState(student.marks[0]);
  const [weakAreas, setWeakAreas] = useState(
    student.weak_areas ? student.weak_areas : paper.subject_areas
  );

  useEffect(() => {
    setMarks(student.marks[0]);
    setWeakAreas(student.weak_areas ? student.weak_areas : paper);
    console.log("changed");
    console.log(student);
  }, [students]);

  const handleSubmit = async (studentId, event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/stu/students/addMarks/${studentId}/${paper.paper_id}`,
        {
          subject: paper.subject,
          marks: marks,
          weak_areas: weakAreas,
        }
      );

      console.log(response?.data);

      var newStudent = student;
      newStudent.marks = [marks];
      newStudent.weak_areas = weakAreas;

      const updatedStudent = marksAddedStudents.map((marksAddedStudent) => {
        if (marksAddedStudent.id === student.id) {
          return {
            ...marksAddedStudent,
            marks: [marks],
            weak_areas: weakAreas,
          };
        }
        return marksAddedStudent;
      });

      setMarksAddedStudents(updatedStudent);

      toast({
        title: "Marks added.",
        description: `Marks added succesfully.`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      console.log("Form data submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

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
        {/* {Math.random() > 0.5 ? ( */}
        <Badge fullWidth>Attend</Badge>
        {/* ) : (
          <Badge color="red" fullWidth>
            Unattend
          </Badge>
        )} */}
      </td>

      <td style={{ fontSize: "14px" }}>
        <NumberInput
          value={marks}
          onChange={(newValue) => {
            setMarks(newValue);
          }}
          min={0}
          max={100}
        />
      </td>
      <td style={{ fontSize: "14px" }}>
        <MultiSelect
          data={paper.subject_areas}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setWeakAreas((current) => [...current, item]);
            return item;
          }}
          value={weakAreas}
          onChange={(selectedItems) => {
            setWeakAreas(selectedItems);
          }}
        />
      </td>
      <td style={{ fontSize: "14px" }}>
        <Button
          colorScheme="messenger"
          variant="solid"
          size="md"
          width="100px"
          type="submit"
          marginLeft="10px"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit(student.id, event);
          }}
        >
          Save
        </Button>
      </td>
    </tr>
  );
}

export default function PaperMarkingMarksAdded({
  students,
  paper,
  setMarksAddedStudents,
  marksAddedStudents,
}) {
  const rows = students.map((student) => (
    <TableRow
      key={student.id}
      students={students}
      student={student}
      paper={paper}
      marksAddedStudents={marksAddedStudents}
      setMarksAddedStudents={setMarksAddedStudents}
    />
  ));

  return (
    <Card margin="5px" variant="outline">
      <ScrollArea h={410}>
        <Table
          sx={{ minWidth: 810 }}
          verticalSpacing="sm"
          horizontalSpacing="xl"
          highlightOnHover
          fontSize="md"
        >
          <thead>
            <tr>
              <th style={{ fontSize: "14px" }}>Name</th>
              <th style={{ fontSize: "14px" }}>Status</th>
              <th style={{ fontSize: "14px" }}>Marks</th>
              <th style={{ fontSize: "14px" }}>Weak Area(s)</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}
