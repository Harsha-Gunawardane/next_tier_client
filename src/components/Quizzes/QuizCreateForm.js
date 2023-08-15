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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizCreateForm({ onClose }) {

  const navigate = useNavigate();

  const [subjectAreas, setSubjectAreas] = useState([
    { value: "inorganic", label: "Inorganic" },
    { value: "calculation", label: "Calculation" },
  ]);

  const [subject, setSubject] = useState([
    { value: "mathematics", label: "Mathematics" },
    { value: "chemistry", label: "Chemistry" },
  ]);
  


  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      subject_areas: "",
      number_of_questions:"",
    },

    validate: (values) => {
      return {
        title:
          values.title.trim().length < 2
            ? "Question must include at least 6 characters"
            : null,
        subject:
          values.subject.trim().length < 2
            ? "Question must include at least 6 characters"
            : null,
      };
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    //Post quiz logic
    //Here we get the id
    // navigate("/tutor/quizzes/quiz/create/id");
    

    navigate("/tutor/quizzes/quiz/create/1");
    // Access form values through form.values object
    console.log(form.values);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Title"
          {...form.getInputProps("title")}
        />
        <SimpleGrid cols={2} mt="md">
          <Select
            required
            data={subject}
            label="Select or create subject"
            nothingFound="Nothing found"
            searchable
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setSubject((current) => [...current, item]);
              return item;
            }}
          />
          <NumberInput
            required
            label="Number of questions"
            {...form.getInputProps("number_of_questions")}
          />
        </SimpleGrid>
        <MultiSelect
          required
          mt="md"
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
        />
        <Group position="right" mt="md">
          <Button
          onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
