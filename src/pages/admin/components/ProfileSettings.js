import { Box, Flex, Button, useToast } from "@chakra-ui/react";
import { TextInput, Textarea, MultiSelect, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { useProfile } from "../../../store/admin/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ADMIN_URL = "/admin";
const roles = [
  { value: "System", label: "System" },
  { value: "Network", label: "Network" },
  { value: "Database", label: "Database" },
  { value: "Cloud", label: "Cloud" },
  { value: "Security", label: "Security" },
];

function ProfileSettings() {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const { profile, setProfile } = useProfile();
  const [profileData, setProfileData] = useState({});

  const [qualifications, setQualifications] = useState(profile.qualifications);
  const [editable, setEditable] = useState(false);

  const form = useForm({
    initialValues: {
      fName: profile?.first_name || "",
      lName: profile?.last_name || "",
      email: profile?.username || "",
      mobileNo: profile?.phone_number || "",
      emergencyContact: profile?.emergency_No || "",
      address: profile?.address || "",
      role: profile?.role || "",
      qualifications: profile?.qualifications || [],
    },

    validate: (values) => {
      return {
        lName:
          values.lName.length < 3
            ? "last name must include at least 3 characters"
            : null,
        email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",

        mobileNo: /^\+94\d{9}$/.test(values.mobileNo)
          ? null
          : "ex: +94701234567",
        emergencyContact: /^\+94\d{9}$/.test(values.emergencyContact)
          ? null
          : "ex: +94701234567",
        address:
          values.address.length < 8
            ? "Address should be at least 8 characters"
            : null,

        mobileNo: /^\+94\d{9}$/.test(values.mobileNo)
          ? null
          : "ex: +94701234567",
        address:
          values.address.length < 8
            ? "Address should be at least 8 characters"
            : null,

        role: roles.map((role) => role.value).includes(values.role)
          ? null
          : "Role should be one of the following",
      };
    },
  });

  const handleEdit = () => {
    setEditable(true);
  };
  const handleCancel = () => {
    form.reset();
    setEditable(false);
  };

  const handleSave = async () => {
    if (form.validate().hasErrors) {
      return;
    }
    console.log(profileData);

    try {
      const response = await axiosPrivate.patch(ADMIN_URL, profileData);

      setProfile(response?.data?.data)

      toast({
        title: response?.data?.success,
        status: "success",
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      let errMsg = "";
      console.log(error);
      if (!error?.response) {
        errMsg = "No Server Response";
      } else if (error.response?.status === 409) {
        errMsg = "Email is already exists";
      } else {
        errMsg = "Registration Failed";
      }

      toast({
        title: errMsg,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setProfileData(form.values);
  }, [form.values]);

  return (
    <Box w={"70%"}>
      <Flex justifyContent="right" mt={3} mr={5}>
        <Flex gap={3}>
          <Button
            cursor="pointer"
            w={85}
            h={35}
            mr={15}
            mb={5}
            bg="#E9E9E9"
            color="#666666"
            fontWeight="medium"
            justifyContent="center"
            alignItems="center"
            borderRadius={5}
            onClick={handleCancel}
            _hover={{ bg: "#E9E9E9", color: "#666666" }}
            display={editable ? "flex" : "none"}
          >
            Cancel
          </Button>
          <Button
            cursor="pointer"
            w={85}
            h={35}
            mr={15}
            mb={5}
            bg={!editable ? "#444444" : "#0074D9"}
            color="#ffffff"
            fontWeight="medium"
            justifyContent="center"
            alignItems="center"
            borderRadius={5}
            onClick={editable ? handleSave : handleEdit}
            type={editable ?? "submit"}
            _hover={
              editable
                ? { bg: "#0074D9", color: "#FFFFFF" }
                : { bg: "#444444", color: "#FFFFFF" }
            }
          >
            {editable ? "Save" : "Edit"}
          </Button>
        </Flex>
      </Flex>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex mt={"lg"} justify={"space-around"} gap={"5%"}>
          <TextInput
            disabled={!editable}
            w={"46%"}
            label="First name:"
            placeholder="Enter first name"
            {...form.getInputProps("fName")}
          />
          <TextInput
            disabled={!editable}
            w={"46%"}
            label="Last name:"
            placeholder="Enter last name"
            {...form.getInputProps("lName")}
          />
        </Flex>
        <TextInput
          disabled={!editable}
          w={"99%"}
          mt="md"
          label="Email:"
          placeholder="Enter email address"
          {...form.getInputProps("email")}
        />
        <Flex mt="md" justify={"space-around"} gap={"5%"}>
          <TextInput
            disabled={!editable}
            mt="md"
            w={"46%"}
            label="Mobile no:"
            placeholder="Enter mobile number"
            {...form.getInputProps("mobileNo")}
          />
          <TextInput
            disabled={!editable}
            mt="md"
            w={"46%"}
            label="Emergency contact:"
            placeholder="Enter emergency contact"
            {...form.getInputProps("emergencyContact")}
          />
        </Flex>
        <Textarea
          disabled={!editable}
          w={"99%"}
          mt="md"
          label="Address:"
          placeholder="Enter home address"
          {...form.getInputProps("address")}
        />
        <Select
          disabled={!editable}
          mt="md"
          label="Select the role"
          placeholder="Pick the role"
          data={roles}
          {...form.getInputProps("role")}
        />
        <MultiSelect
          disabled={!editable}
          mt="md"
          label="Enter qualifications"
          placeholder="Enter qualifications"
          creatable
          searchable
          data={qualifications || []}
          getCreateLabel={(query) => `+ Add ${query}`}
          onCreate={(query) => {
            const newQualification = { value: query, label: query };
            setQualifications((current) => [...current, newQualification]);
            return newQualification;
          }}
          {...form.getInputProps("qualifications")}
        />
      </form>
    </Box>
  );
}

export default ProfileSettings;
