import {
  Button,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { TimeInput } from "@mantine/dates";


export default function QuizCreateForm({ onClose, quizzes, setQuizzes }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [subjectAreas, setSubjectAreas] = useState([
    { value: "Inorganic", label: "Inorganic" },
    { value: "Calculation", label: "Calculation" },
  ]);

  const [subject, setSubject] = useState([
    { value: "Mathematics", label: "Mathematics" },
    { value: "Chemistry", label: "Chemistry" },
  ]);

  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      subject_areas: [],
      question_ids: [],
      number_of_questions: 0,
    },

    validate: (values) => {
      return {
        title: !values.title ? "Quiz title is required" : null,
        subject:
          values.subject.trim().length < 3
            ? "Subject must include at least 3 characters"
            : null,
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
        console.log("here");

        console.log(form.values);

        const response = await axiosPrivate.post(
          "/tutor/quizzes",
          JSON.stringify({
            title: form.values.title,
            subject: form.values.subject,
            subject_areas: form.values.subject_areas,
            number_of_questions: form.values.question_ids.length,
            question_ids: form.values.question_ids,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log(JSON.stringify(response?.data));

        //Added to state
        setQuizzes([...quizzes, form.values]);

        console.log("Form data submitted successfully!");
        console.log(response.data.id)

        navigate(`/tutor/quizzes/${response.data.id}`);

        onClose();


      } catch (error) {
        console.error("Error sending data:", error);
      }
    }


  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput required label="Title" {...form.getInputProps("title")} />
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
          {...form.getInputProps("subject")}
        />
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
          {...form.getInputProps("subject_areas")}
        />
        <TimeInput
          {...form.getInputProps("start_time")}
          label="Start Time"
          withAsterisk
        />

        <TimeInput
          {...form.getInputProps("end_time")}
          label="End Time"
          withAsterisk
          description="Add 1 for A.M. and 2 for P.M."
        />
        <Group position="right" mt="md">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
