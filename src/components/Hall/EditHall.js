import React, { useState } from "react";
import { useFormik } from "formik"; 
import * as Yup from "yup"; 
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Avatar,
  AvatarBadge,
  IconButton,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function EditHall({ isOpen, onClose, hallData, onSave }) {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast(); 

  const [hall_profile, setHallProfile] = useState(hallData.hall_profile);

  const validationSchema = Yup.object({
    name: Yup.string().required("Hall No is required"),
    capacity: Yup.number()
      .required("Capacity is required")
      .positive("Capacity must be a positive number")
      .integer("Capacity must be an integer"),
    facilities: Yup.string().required("Facilities are required"),
  });

  const formik = useFormik({
    initialValues: {
      name: hallData.name,
      capacity: hallData.capacity,
      facilities: hallData.facilities,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const editedHall = {
          id: hallData.id,
          name: values.name,
          capacity: values.capacity,
          facilities: values.facilities,
          hall_profile,
        };

        // Make a PUT request to update the hall details
        const response = await axiosPrivate.put("/staff/hall", editedHall);
        toast({
          title: "Success",
          description: "Hall Details Updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        onSave(response.data); // Update the UI with the edited data
        onClose();
      } catch (error) {
        console.error("Error editing hall details:", error);
        toast({
          title: "Error",
          description: (
            <>
              An error occurred while updating hall details.
              <br />
              {error.response && error.response.data && (
                <code>{JSON.stringify(error.response.data, null, 2)}</code>
              )}
            </>
          ),
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHallProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawerSize = useBreakpointValue({ base: "xs", md: "sm", lg: "sm" });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={drawerSize}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Hall Details</DrawerHeader>
        <DrawerBody>
          <form onSubmit={formik.handleSubmit}>
            {" "}
            {/* Wrap the form */}
            <FormControl mt={4}>
              <FormLabel>Profile Image</FormLabel>
              <Avatar width="140px" height="140px" src={hall_profile} ml="50px">
                <AvatarBadge boxSize="1.25em" bg="gray.400">
                  <label htmlFor="file-upload">
                    <IconButton
                      as="span"
                      borderRadius="30px"
                      width="3em"
                      height="3em"
                      aria-label="Change Image"
                      bg="gray.400"
                      icon={<EditIcon boxSize="20px" />}
                    />
                  </label>
                </AvatarBadge>
              </Avatar>
              {/* Input for image selection */}
              <Input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Hall No</FormLabel>
              <Input type="text" id="name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Capacity</FormLabel>
              <Input
                type="number"
                id="capacity"
                {...formik.getFieldProps("capacity")}
              />
              {formik.touched.capacity && formik.errors.capacity ? (
                <div style={{ color: "red" }}>{formik.errors.capacity}</div>
              ) : null}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Facilities</FormLabel>
              <Textarea
                id="facilities"
                {...formik.getFieldProps("facilities")}
              />
              {formik.touched.facilities && formik.errors.facilities ? (
                <div style={{ color: "red" }}>{formik.errors.facilities}</div>
              ) : null}
            </FormControl>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button
            type="submit"
            colorScheme="blue"
            mr={3}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default EditHall;
