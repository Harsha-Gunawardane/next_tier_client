import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  SimpleGrid,
  Radio,
  Card,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import dayjs from "dayjs";

// regex patterns
const NAMING_REGEX = /^[a-zA-Z]{3,18}$/;
const PHONENO_REGEX = /^\d{9}$/;
const NIC_REGEX = /^(?:\d{9}[Vv]|\d{11}(?![Vv]))$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



export default function NewStaffStepper({ setStaffs, staffs, onClose }) {
  const [active, setActive] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  // Calculate birthdate ranges for age 20 and 60
  const today = new Date();
  const minBirthdate = dayjs(today).subtract(60, "year").toDate();
  const maxBirthdate = dayjs(today).subtract(18, "year").toDate();

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
            values.first_name.trim().length < 3
              ? "Name must include at least 3 characters"
              : NAMING_REGEX.test(values.first_name)
              ? null
              : "Invalid Name",
          last_name:
            values.last_name.trim().length < 3
              ? "Name must include at least 3 characters"
              : NAMING_REGEX.test(values.last_name)
              ? null
              : "Invalid Name",
          NIC:
            values.NIC.trim().length < 10
              ? "NIC must include at least 10 characters"
              : NIC_REGEX.test(values.NIC)
              ? null
              : "Invalid NIC",
          DOB: !values.DOB ? "DOB is required" : null,
        };
      }

      if (active === 1) {
        return {
          address:
            values.address.trim().length < 5
              ? "Address must include at least 5 characters"
              : null,
          phone_number:
            values.phone_number.trim().length < 9
              ? "Phone number must include at least 9 characters"
              : PHONENO_REGEX.test(values.phone_number)
              ? null
              : "Invalid Phone number",
          email:
            !values.email
              ? "Email is required"
              : EMAIL_REGEX.test(values.email)
              ? null
              : "Invalid Email",
        };
      }
      if (active === 2) {
        return {
          staff_title:
            !values.staff_title
              ? "Staff title is required"
              : null,
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

        const response = await axiosPrivate.post(
          "/tutor/staffs",
          JSON.stringify({
            first_name: form.values.first_name,
            last_name: form.values.last_name,
            NIC: form.values.NIC,
            DOB: form.values.DOB,
            address: form.values.address,
            phone_number: "+94" + form.values.phone_number,
            email: form.values.email,
            staff_title: form.values.staff_title,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log(JSON.stringify(response?.data));


        //Added to state
        const newStaff = {
          id: staffs.length + 1,
          first_name: form.values.first_name,
          last_name: form.values.last_name,
          NIC: form.values.NIC,
          DOB: form.values.DOB,
          address: form.values.address,
          phone_number: "+94 " + form.values.phone_number,
          email: form.values.email,
          staff_title: form.values.staff_title,
        };
        setStaffs([...staffs, newStaff]);


        onClose();

        console.log("Form data submitted successfully!");
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
            <SimpleGrid cols={2} mt="sm">
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
                clearable
                label="Birthday"
                placeholder="Birthday"
                valueFormat="YYYY MM DD"
                minDate={minBirthdate}
                maxDate={maxBirthdate}
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
                icon={<span style={{ fontSize: "13px" }}>+94</span>}
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

          <Stepper.Step label="Final step" description="System info">
            <Radio.Group
              required
              name="staff_title"
              label="Choose Staff Title"
              mt="md"
              {...form.getInputProps("staff_title")}
            >
              <Group mt="xs">
                <Radio
                  value="Cls Supporting Staff"
                  label="Class Supporting Staff"
                />
                <Radio
                  value="Paper Marking Staff"
                  label="Paper Marking Staff"
                />
              </Group>
            </Radio.Group>
          </Stepper.Step>
          <Stepper.Completed>
            Completed! Form values:
            <Card>
              <SimpleGrid cols={2}>
                <TextInput
                  readOnly
                  label="First Name"
                  defaultValue={form.values.first_name}
                />
                <TextInput
                  readOnly
                  label="Last Name"
                  defaultValue={form.values.last_name}
                />
              </SimpleGrid>
              <SimpleGrid cols={2} mt="sm">
                <TextInput
                  readOnly
                  label="NIC"
                  placeholder="NIC"
                  defaultValue={form.values.NIC}
                />
                <DateInput
                  readOnly
                  clearable
                  label="Birthday"
                  placeholder="Birthday"
                  valueFormat="YYYY MMM DD"
                  defaultValue={form.values.DOB}
                />
              </SimpleGrid>
              <SimpleGrid cols={2} mt="sm">
                <TextInput
                  readOnly
                  label="Address"
                  placeholder="Address"
                  defaultValue={form.values.address}
                />
                <TextInput
                  readOnly
                  label="Contact"
                  placeholder="Contact"
                  defaultValue={form.values.phone_number}
                />
              </SimpleGrid>
              <TextInput
                readOnly
                mt="sm"
                label="Email"
                placeholder="Email"
                defaultValue={form.values.email}
              />
              <Radio.Group
                name="staff_title"
                label="Choose Staff Title"
                mt="md"
                defaultValue={form.values.staff_title}
              >
                <Group mt="xs">
                  <Radio
                    disabled
                    value="Cls Supporting Staff"
                    label="Class Supporting Staff"
                  />
                  <Radio
                    disabled
                    value="Paper Marking Staff"
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
