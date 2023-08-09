import { useEffect, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  SimpleGrid,
  Radio,
  NumberInput,
  Select,
  MultiSelect,
  Textarea,
  Paper,
  CloseButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Card, HStack } from "@chakra-ui/react";


export default function NewMcqStepper() {
  const [active, setActive] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [options, setOptions] = useState([]);

  const handleOptionRemoval = (optionToRemove) => {
    setOptions((currentOptions) =>
      currentOptions.filter((option) => option.value !== optionToRemove.value)
    );
    setSelectedOptions((currentSelectedOptions) =>
      currentSelectedOptions.filter(
        (option) => option.value !== optionToRemove.value
      )
    );
  };

  


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
      question: "",
      points: "",
      difficulty_level: "",
      subject: "",
      subject_areas: "",
      options: "",
      correct_option: "",
      explanation: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          question:
            values.question.trim().length < 2
              ? "Question must include at least 6 characters"
              : null,
        };
      }

      if (active === 1) {
        return {};
      }

      return {};
    },
  });

  useEffect(() => {
    // Create a new array of option values from the updated options state
    const optionValues = options.map((option) => option.value);

    // Update the form values for "options" with the new array
    form.setFieldValue("options", optionValues);
  }, [options]);


  console.log(form.values.options);

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        //  Create a new object containing all form values and the added date
        // const updatedFormValues = {
        //   ...form.values,
        //   joined_date: new Date().toLocaleDateString(),
        // };

        // console.log(updatedFormValues);

        //   const response = await axiosPrivate.post(
        //     "tutor/staffs",
        //     updatedFormValues
        //   );

        console.log("Form data submitted successfully!");

        // window.location.reload();
        //   navigate("/tutor/staffs");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stepper active={active} breakpoint="sm">
          <Stepper.Step label="First step" description="Question Info">
            <TextInput
              required
              mt="md"
              label="Question"
              placeholder="Question"
              {...form.getInputProps("question")}
            />
            <MultiSelect
              required
              mt="md"
              label="Define Options"
              data={options}
              placeholder="Define Options"
              searchable
              creatable
              getCreateLabel={(query) => `+ Create ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setOptions((current) => [...current, item]);
                setSelectedOptions((current) => [...current, item]);
                return item;
              }}
              {...form.getInputProps("options")}
            />
            {selectedOptions.map((option) => (
              <HStack>
                <Paper
                  shadow="sm"
                  p="5px"
                  m="4px"
                  fz="sm"
                  withBorder
                  key={option.value}
                >
                  {option.label}
                  {/* <Button
                  size="xs"
                  style={{ marginLeft: "8px" }}
                  onClick={() => handleOptionRemoval(option)}
                >
                  Remove
                </Button> */}
                </Paper>
                <CloseButton
                  aria-label="Close modal"
                  variant="filled"
                  color="blue"
                  onClick={() => handleOptionRemoval(option)}
                />
              </HStack>
            ))}

            <Select
              required
              mt="md"
              label="Correct Option"
              placeholder="Select correct option"
              data={options}
              {...form.getInputProps("correct_option")}
            />
          </Stepper.Step>

          <Stepper.Step label="Second step" description="More Info">
            <Textarea
              required
              mt="md"
              placeholder="Answer Explanation"
              label="Answer Explanation"
              {...form.getInputProps("explanation")}
            />
            <SimpleGrid cols={2} mt="md">
              <Select
                required
                label="Difficulty Level"
                placeholder="Difficulty Level"
                data={[
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
                {...form.getInputProps("difficulty_level")}
              />
              <NumberInput
                required
                defaultValue={1}
                placeholder="Points"
                label="Points"
                {...form.getInputProps("points")}
              />
            </SimpleGrid>
          </Stepper.Step>

          <Stepper.Step label="Final step" description="Subject Info">
            <Select
              required
              mt="md"
              label="Select Subject"
              data={subject}
              placeholder="Select or create by typing subject"
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
              label="Select Subject Areas"
              data={subjectAreas}
              placeholder="Select or create by typing subject areas"
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
          </Stepper.Step>
          <Stepper.Completed>
            Completed! Form values:
            <Code block mt="xl">
              {JSON.stringify(form.values, null, 2)}
            </Code>
          </Stepper.Completed>
        </Stepper>

        <Group position="right" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
          {active === 3 && <Button type="submit">Submit</Button>}
        </Group>
      </form>
    </>
  );
}
