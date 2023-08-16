import { useEffect, useState } from "react";
import {
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



export default function EditStaffForm({ staffId, onClose, staffs, setStaffs }) {
  const axiosPrivate = useAxiosPrivate();

  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await axiosPrivate.get(`/tutor/staffs/${staffId}`);
        setStaff(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    };

    getStaff();
  }, []);

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
      return {
        first_name:
          values.first_name.trim().length < 2
            ? "Question must include at least 6 characters"
            : null,
        last_name:
          values.last_name.trim().length < 2
            ? "Question must include at least 6 characters"
            : null,
      };
    },
  });

  // Update the form values when staff data changes (in case staff is fetched after form mount)
  useEffect(() => {
    if (staff) {
      // Convert the date string to a Date object
      const dateObject = new Date(staff.DOB);

      form.setValues({
        first_name: staff.first_name || "",
        last_name: staff.last_name || "",
        NIC: staff.NIC || "",
        DOB: dateObject || "",
        address: staff.address || "",
        phone_number: staff.phone_number || "",
        email: staff.email || "",
        staff_title: staff.staff_title || "",
      });
    }
  }, [staff]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.validate().hasErrors) {
      try {
        console.log(form.values);

        const updatedFormValues = {
          profile_picture: staff.profile_picture,
          ...form.values,
        };

        const response = await axiosPrivate.put(
          `/tutor/staffs/${staffId}`,
          updatedFormValues
        );

        //Update data in state
        const updatedStaffList = staffs.map((staff) => {
          if (staff.id === staffId) {
            return {
              ...staff,
              profile_picture: staff.profile_picture,
              ...form.values,
            };
          }
          return staff;
        });

        setStaffs(updatedStaffList);

        //Close edit form 
        onClose()

        console.log("Form data updated successfully!");

      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <SimpleGrid cols={2}>
            <TextInput
              required
              label="First Name"
              {...form.getInputProps("first_name")}
            />
            <TextInput
              required
              label="Last Name"
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
                valueFormat="YYYY MMM DD"
                {...form.getInputProps("DOB")}
              />
          </SimpleGrid>
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
          <Radio.Group
            required
            name="staff_title"
            label="Choose Staff Title"
            mt="md"
            {...form.getInputProps("staff_title")}
          >
            <Group mt="xs">
              <Radio
                required
                value="Cls Supporting Staff"
                label="Class Supporting Staff"
              />
              <Radio
                required
                value="Paper Marking Staff"
                label="Paper Marking Staff"
              />
            </Group>
          </Radio.Group>
        </Card>

        <Group position="right" mt="md">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </>
  );
}
