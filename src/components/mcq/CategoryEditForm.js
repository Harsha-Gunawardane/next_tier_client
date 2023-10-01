import {
  Button,
  Group,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useToast } from "@chakra-ui/react";

export default function CategoryEditForm({
  categoryId,
  category,
  setCategory,
  onClose,
}) {
  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();

  const form = useForm({
    initialValues: {
      title: category.title,
      number_of_questions: category.number_of_questions,
      question_ids: category.question_ids,
    },

    validate: (values) => {
      return {
        title:
          values.title.trim().length < 2
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
          `/tutor/categories/${categoryId}`,
          form.values
        );

        //Update data in state

        setCategory(response.data);

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
  
        <Group position="right" mt="md">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
