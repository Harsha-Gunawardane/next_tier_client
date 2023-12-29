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
import { TimeInput } from "@mantine/dates";

export default function QuizEditForm({ quizId, quiz, setQuiz, onClose }) {
  const axiosPrivate = useAxiosPrivate();

  const toast = useToast()

  const [subjectAreas, setSubjectAreas] = useState(quiz.subject_areas);

  const [subject, setSubject] = useState([
    { value: quiz.subject, label: quiz.subject },
  ]);

  const form = useForm({
    initialValues: {
      title: quiz.title,
      subject: quiz.subject,
      subject_areas: subjectAreas,
      number_of_questions: quiz.number_of_questions,
      question_ids: quiz.question_ids,
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        const response = await axiosPrivate.put(
          `/tutor/quizzes/${quizId}`,
          form.values
        );

        //Update data in state

        setQuiz(response.data);

        //Close edit form
        onClose();

        toast({
          title: "Quiz edited.",
          description: `Quiz edited succesfully.`,
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
            {...form.getInputProps("subject")}
          />
          <NumberInput
            readOnly
            label="Number of questions"
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
          defaultValue={subjectAreas}
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
