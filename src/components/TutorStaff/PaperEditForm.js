import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { DateInput } from "@mantine/dates";

export default function PaperEditForm({ paperId, paper, setPaper, onClose }) {
  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();

  const [subjectAreas, setSubjectAreas] = useState(paper.subject_areas);

  const [type, setType] = useState([
    { value: "MCQ Paper", label: "MCQ Paper" },
    { value: "Structured Paper", label: "Structured Paper" },
  ]);

  // Convert the date string to a Date object
  const dateObject = new Date(paper.date);

  const form = useForm({
    initialValues: {
      title: paper.title,
      type: paper.type,
      date: dateObject,
      subject_areas: subjectAreas,
    },

    validate: (values) => {
      return {
        title: !values.title ? "Paper title is required" : null,
        subject_areas: !values.subject_areas
          ? "Subject areas are required"
          : null,
      };
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        const response = await axiosPrivate.put(
          `/tutor/papers/${paperId}`,
          form.values
        );

        //Update data in state
        setPaper(response.data);

        //Close edit form
        onClose();

        toast({
          title: "Paper edited.",
          description: `Paper edited succesfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.log("Form data updated successfully!");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput required label="Title" {...form.getInputProps("title")} />
        <SimpleGrid cols={2} mt="md">
          <Select
            required
            data={type}
            label="Select type"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setType((current) => [...current, item]);
              return item;
            }}
            defaultValue={paper.type}
            {...form.getInputProps("type")}
          />
          <DateInput
            required
            clearable
            label="Conducting date"
            valueFormat="YYYY MM DD"
            {...form.getInputProps("date")}
          />
        </SimpleGrid>
        <MultiSelect
          required
          mt="md"
          label="Select Subject Areas"
          data={subjectAreas}
          searchable
          creatable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setSubjectAreas((current) => [...current, item]);
            return item;
          }}
          defaultValue={subjectAreas}
          {...form.getInputProps("subject_areas")}
        />
        <Group position="right" mt="md">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
