import { Box, Flex, Button, useToast } from "@chakra-ui/react";
import { TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import { useProfile } from "../../../store/parent/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const PARENT_PROFILE_URL = "/parent/profile";

function ProfileSettings() {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();

  const { parentProfile, setParentProfile } = useProfile();
  const [profileData, setProfileData] = useState({});

  const [editable, setEditable] = useState(false);

  const form = useForm({
    initialValues: {
      fName: parentProfile?.first_name || "",
      lName: parentProfile?.last_name || "",
      email: parentProfile?.email || "",
      mobileNo: parentProfile?.phone_number || "",
      address: parentProfile?.address || "",
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
      const response = await axiosPrivate.patch(
        PARENT_PROFILE_URL,
        profileData
      );
      setParentProfile(response?.data?.data);
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
            label="First name:"
            placeholder="Enter first name"
            {...form.getInputProps("fName")}
          />
          <TextInput
            disabled={!editable}
            // w={"46%"}
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

        <TextInput
          disabled={!editable}
          mt="md"
          label="Mobile no:"
          placeholder="Enter mobile number"
          {...form.getInputProps("mobileNo")}
        />

        <Textarea
          disabled={!editable}
          w={"99%"}
          mt="md"
          label="Address:"
          placeholder="Enter home address"
          {...form.getInputProps("address")}
        />
      </form>
    </Box>
  );
}

export default ProfileSettings;
