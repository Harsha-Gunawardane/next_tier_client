import {
  Button,
  Group,
  MultiSelect,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { DateInput } from "@mantine/dates";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function PaperAddForm({ onClose, papers, setPapers, courseId }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();


  const toast = useToast();

  const [subjectAreas, setSubjectAreas] = useState([
    { value: "Mechanics", label: "Mechanics" },
    { value: "Electromagnetism", label: "Electromagnetism" },
    { value: "Particle Physics", label: "Particle Physics" },
  ]);

  const [type, setType] = useState([
    { value: "MCQ Paper", label: "MCQ Paper" },
    { value: "Structured Paper", label: "Structured Paper" },
  ]);

  const [subject, setSubject] = useState([
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Physics", label: "Physics" },
  ]);

  const form = useForm({
    initialValues: {
      title: "",
      type: "",
      date: "",
      subject: "",
      subject_areas: [],
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

    console.log(form.values);

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        const response = await axiosPrivate.post(
          "/tutor/papers",
          JSON.stringify({
            course_id: courseId,
            title: form.values.title,
            type: form.values.type,
            date: form.values.date,
            subject: form.values.subject,
            subject_areas: form.values.subject_areas,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log(JSON.stringify(response?.data));

        //Added to state
        setPapers([...papers, form.values]);

        toast({
          title: "Paper added.",
          description: `Paper added succesfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });

        console.log("Form data submitted successfully!");

        navigate(`/tutor/papers/paper/${response.data.paper_id}`);

        onClose();
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput required label="Title" {...form.getInputProps("title")} />
        <SimpleGrid cols={2}>
          <Select
            required
            data={type}
            label="Select paper type"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setType((current) => [...current, item]);
              return item;
            }}
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
        <SimpleGrid cols={2}>
          <Select
            required
            data={subject}
            label="Select subject"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setSubject((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("subject")}
          />
          <MultiSelect
            required
            label="Select or create subject areas"
            data={subjectAreas}
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setSubjectAreas((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("subject_areas")}
          />
        </SimpleGrid>

        <Group position="right" mt="md">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
