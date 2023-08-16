import {
  Button,
  Group,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useToast } from "@chakra-ui/react";


export default function CategoryCreateForm({ onClose, categories, setCategories }) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const toast = useToast()


  const form = useForm({
    initialValues: {
      title: "",
      question_ids: [],
      number_of_questions: 0,
    },

    validate: (values) => {
      return {
        title: !values.title ? "Quiz title is required" : null,
  
      };
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(form.values);

    if (!form.validate().hasErrors) {
      try {

        const response = await axiosPrivate.post(
          "/tutor/categories",
          JSON.stringify({
            title: form.values.title,
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
        setCategories([...categories, form.values]);

        console.log("Form data submitted successfully!");
        console.log(response.data.id);

        navigate(`/tutor/quizzes/category/${response.data.id}`);

        onClose();

        toast({
          title: "Category added.",
          description: `Category added succesfully.`,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
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
