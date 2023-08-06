import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  SimpleGrid,
  Radio,
  createStyles,
  rem,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

// regex patterns
const NAMING_REGEX = /^[a-zA-Z]{3,18}$/;
const PHONENO_REGEX = /^\d{9}$/;

export default function NewStaffStepper() {
  const [active, setActive] = useState(0);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      NIC: "",
      DOB: "",
      address: "",
      phone_number: "",
      email: "",
      staff_title: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          first_name:
            values.first_name.trim().length < 2
              ? "Name must include at least 2 characters"
              : NAMING_REGEX.test(values.first_name)
              ? null
              : "Invalid Name",
          // last_name:
          //   values.last_name.trim().length < 2
          //     ? "Name must include at least 2 characters"
          //     : NAMING_REGEX.test(values.last_name)
          //     ? null
          //     : "Invalid Name",
        };
      }

      if (active === 1) {
        return {
          // email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
        };
      }

      return {};
    },
  });

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
        const updatedFormValues = {
          ...form.values,
          joined_date: new Date().toLocaleDateString(),
        };

        console.log(updatedFormValues);

        //   const response = await axiosPrivate.post(
        //     "tutor/staffs",
        //     updatedFormValues
        //   );

        console.log("Form data submitted successfully!");

        window.location.reload();
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
          <Stepper.Step label="First step" description="Personal info">
            <SimpleGrid cols={2} mt="sm" >
              <TextInput
                required
                label="First name"
                placeholder="First name"
                {...form.getInputProps("first_name")}
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Last Name"
                {...form.getInputProps("last_name")}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} mt="sm">
              <TextInput
                required
                label="NIC"
                placeholder="NIC"
                {...form.getInputProps("NIC")}
              />
              <DateInput
                required
                label="Birthday"
                placeholder="Birthday"
                {...form.getInputProps("DOB")}
              />
            </SimpleGrid>
          </Stepper.Step>

          <Stepper.Step label="Second step" description="Contact info">
            <SimpleGrid cols={2} mt="sm">
              <TextInput
                required
                label="Address"
                placeholder="Address"
                {...form.getInputProps("address")}
              />
              <TextInput
                required
                label="Contact"
                placeholder="Contact"
                {...form.getInputProps("phone_number")}
              />
            </SimpleGrid>
            <TextInput
              required
              mt="sm"
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
          </Stepper.Step>

          <Stepper.Step label="Final step" description="System information">
            <Radio.Group
              required
              name="staff_title"
              label="Choose Staff Title"
              mt="md"
              {...form.getInputProps("staff_title")}
            >
              <Group mt="xs">
                <Radio
                  value="classSupportingStaff"
                  label="Class Supporting Staff"
                />
                <Radio value="paperMarkingStaff" label="Paper Marking Staff" />
              </Group>
            </Radio.Group>
          </Stepper.Step>
          <Stepper.Completed>
            Completed! Form values:
            <Card>
              <SimpleGrid cols={2}>
                <TextInput
                  disabled
                  label="First Name"
                  defaultValue={form.values.first_name}
                />
                <TextInput
                  disabled
                  label="Last Name"
                  defaultValue={form.values.last_name}
                />
              </SimpleGrid>
              <SimpleGrid cols={2} mt="sm">
                <TextInput
                  disabled
                  label="NIC"
                  placeholder="NIC"
                  {...form.getInputProps("NIC")}
                />
                <DateInput
                  disabled
                  label="Birthday"
                  placeholder="Birthday"
                  {...form.getInputProps("DOB")}
                />
              </SimpleGrid>
              <SimpleGrid cols={2} mt="sm">
                <TextInput
                  disabled
                  label="Address"
                  placeholder="Address"
                  {...form.getInputProps("address")}
                />
                <TextInput
                  disabled
                  label="Contact"
                  placeholder="Contact"
                  {...form.getInputProps("phone_number")}
                />
              </SimpleGrid>
              <TextInput
                disabled
                mt="sm"
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
              <Radio.Group
                disabled
                name="staff_title"
                label="Choose Staff Title"
                mt="md"
                {...form.getInputProps("staff_title")}
              >
                <Group mt="xs">
                  <Radio
                    disabled
                    value="classSupportingStaff"
                    label="Class Supporting Staff"
                  />
                  <Radio
                    disabled
                    value="paperMarkingStaff"
                    label="Paper Marking Staff"
                  />
                </Group>
              </Radio.Group>
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
