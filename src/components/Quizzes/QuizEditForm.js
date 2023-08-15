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

export default function QuizEditForm({ quiz, onClose }) {
  const axiosPrivate = useAxiosPrivate();

  // console.log(quiz.subject_areas);
  // console.log(quiz.subject);

  //Convert subject area array to lowercase
  const subject_areas = quiz.subject_areas.map((element) =>
    element.toLowerCase()
  );

  const subjectAreasData = quiz.subject_areas.map((subject_area) => ({
    value: subject_area.toLowerCase(),
    label: subject_area,
  }));
  const [subjectAreas, setSubjectAreas] = useState(subjectAreasData);


  const [subject, setSubject] = useState([
    { value: quiz.subject, label: quiz.subject },
  ]);


  const form = useForm({
    initialValues: {
      title: quiz.title,
      subject: "",
      subject_areas: "",
      number_of_questions: quiz.number_of_questions,
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

    // Access form values through form.values object
    console.log(form.values);
    // ... other logic to handle form submission ...
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
            defaultValue={quiz.subject}
          />
          <NumberInput
            required
            label="Points"
            {...form.getInputProps("number_of_questions")}
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
          defaultValue={subject_areas}
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