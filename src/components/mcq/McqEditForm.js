import { useEffect, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  SimpleGrid,
  Card,
  MultiSelect,
  Select,
  Textarea,
  NumberInput,
  Code,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useToast } from "@chakra-ui/react";

export default function McqEditForm({ mcq, mcqId, onClose, mcqs, setMcqs }) {
  const [active, setActive] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  const toast = useToast();

  const [options, setOptions] = useState(mcq.options);

  //Used to display answer Options in seperately
  const [selectedOptionsForDisplay, setSelectedOptionsForDisplay] = useState(
    mcq.options
  );

  const [subjectAreas, setSubjectAreas] = useState(mcq.subject_areas);

  const [subject, setSubject] = useState([
    { value: mcq.subject, label: mcq.subject },
  ]);

  const form = useForm({
    initialValues: {
      question: "",
      points: "",
      difficulty_level: "",
      subject: "",
      subject_areas: "",
      options: [],
      correct_answer: "",
      explanation: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          question:
            values.question.trim().length < 6
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
    // Update selected Options for display when Options change
    setSelectedOptionsForDisplay(form.values.options);
    setOptions(form.values.options);
  }, [form.values.options]);

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // Update the form values when mcq data changes (in case mcq is fetched after form mount)
  useEffect(() => {
    if (mcq) {
      form.setValues({
        question: mcq.question || "",
        points: mcq.points || "",
        difficulty_level: mcq.difficulty_level || "",
        subject: mcq.subject || "",
        subject_areas: subjectAreas,
        options: options,
        correct_answer: mcq.options[mcq.correct_answer] || "",
        explanation: mcq.explanation || "",
      });
    }
  }, [mcq]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        const updatedFormValues = {
          question: form.values.question,
          points: form.values.points,
          difficulty_level: form.values.difficulty_level,
          subject: form.values.subject,
          subject_areas: form.values.subject_areas,
          options: form.values.options,
          correct_answer: form.values.options.findIndex(
            (option) => option === form.values.correct_answer
          ),
          explanation: form.values.explanation,
        };

        const response = await axiosPrivate.put(
          `/tutor/mcqs/${mcqId}`,
          updatedFormValues
        );

        //Update data in state
        const updatedmcqList = mcqs.map((mcq) => {
          if (mcq.id === mcqId) {
            return {
              ...mcq, // Copy all the properties of mcq object
              question: form.values.question,
              points: form.values.points,
              difficulty_level: form.values.difficulty_level,
              subject: form.values.subject,
              subject_areas: form.values.subject_areas,
              options: form.values.options,
              correct_answer: form.values.options.findIndex(
                (option) => option === form.values.correct_answer
              ),
              explanation: form.values.explanation, // Overwrite those values
            };
          }
          return mcq;
        });

        setMcqs(updatedmcqList);

        //Close edit form
        onClose();

        toast({
          title: "Mcq edited.",
          description: `Mcq edited succesfully.`,
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
                return item;
              }}
              defaultValue={options}
              {...form.getInputProps("options")}
            />
            <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs" m="8px">
              {selectedOptionsForDisplay.map((option) => (
                <Card p="5px" fz="xs" withBorder key={option}>
                  {option}
                </Card>
              ))}
            </SimpleGrid>

            <Select
              required
              mt="md"
              label="Correct Option"
              placeholder="Select correct option"
              data={options}
              {...form.getInputProps("correct_answer")}
            />
          </Stepper.Step>

          <Stepper.Step label="Second step" description="More Info">
            <Textarea
              required
              mt="md"
              autosize
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
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
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
              defaultValue={mcq.subject}
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
              defaultValue={subjectAreas}
              {...form.getInputProps("subject_areas")}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed! Form values:
            <Card padding="10px">
              <TextInput
                readOnly
                label="Question"
                defaultValue={form.values.question}
              />
              <MultiSelect
                readOnly
                label="Define Options"
                data={options}
                placeholder="Define Options"
                getCreateLabel={(query) => `+ Create ${query}`}
                defaultValue={form.values.options}
              />
              <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs" m="8px">
                {selectedOptionsForDisplay ? (
                  selectedOptionsForDisplay.map((option) => (
                    <Card
                      p="5px"
                      fontSize="12px"
                      fz="12px"
                      withBorder
                      key={option}
                    >
                      {option}
                    </Card>
                  ))
                ) : (
                  <></>
                )}
              </SimpleGrid>
              <Textarea
                readOnly
                autosize
                label="Answer Explanation"
                defaultValue={form.values.explanation}
              />
              <SimpleGrid cols={2} mt="md">
                <Select
                  readOnly
                  label="Difficulty Level"
                  data={[
                    { value: "Medium", label: "Medium" },
                    { value: "Hard", label: "Hard" },
                  ]}
                  defaultValue={form.values.difficulty_level}
                />
                <NumberInput
                  readOnly
                  label="Points"
                  defaultValue={form.values.points}
                />
              </SimpleGrid>
              <SimpleGrid cols={2}>
                <Select
                  readOnly
                  label="Select Subject"
                  data={subject}
                  defaultValue={form.values.subject}
                />
                <MultiSelect
                  readOnly
                  label="Select Subject Areas"
                  data={subjectAreas}
                  defaultValue={form.values.subject_areas}
                />
              </SimpleGrid>
            </Card>
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
