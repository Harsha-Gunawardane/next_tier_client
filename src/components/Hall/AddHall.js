import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Avatar,
  AvatarBadge,
  IconButton,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, SmallAddIcon } from "@chakra-ui/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const ButtonStyles = {
  backgroundColor: "green.400",
  color: "white",
  borderRadius: "5px",
  _hover: {
    backgroundColor: "green.300",
  },
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
  hall_no: Yup.string().required("Hall Number is required"),
  capacity: Yup.number()
    .required("Student Capacity is required")
    .positive("Student capacity must be a positive number")
    .integer("Student capacity must be an integer"),
  details: Yup.string().required("Facilities Available are required"),
});

function AddHall({ onAddHall }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //Hall registartion from submission
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  const toast = useToast(); // Initialize useToast
  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      image: "",
      hall_no: "",
      capacity: "",
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsFormSubmitted(true);

      try {
        // Make API call to register hall
        const response = await axiosPrivate.post("/staff/hall", values);
        console.log("Form data submitted:", response.data);
        setIsFormSubmitted(false);
        // Display success toast
      toast({
        title: "Success",
        description: "Hall Added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position:"top"
      });
        onAddHall(response.data); // Notify parent component about the new hall
        onClose(); // Close the modal

        
      } catch (error) {
        console.error("Error submitting form:", error);
        toast({
          title: "Error",
          description: "An error occurred while adding a hall.",
          status: "error",
          duration: 5000, 
          isClosable: true,
          position: "top",
        });
        setIsFormSubmitted(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const modalSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <>
      <Button size={buttonSize} sx={ButtonStyles} onClick={onOpen}>
        <SmallAddIcon boxSize={5} />
        Add Hall
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Hall</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={formik.handleSubmit}>
              <FormControl mb="4">
                <FormLabel>Hall Image</FormLabel>
                <Avatar
                  value={formik.values.image}
                  width="120px"
                  height="120px"
                  src={
                    formik.values.image ||
                    "https://s40123.pcdn.co/wp-content/uploads/2020/05/empty-college-lecture-hall.jpg.optimal.jpg"
                  }
                  ml={{ base: "auto", md: "50px" }}
                >
                  <AvatarBadge boxSize="1.25em" bg="gray.400">
                    <label htmlFor="file-upload">
                      <IconButton
                        as="span"
                        borderRadius="30px"
                        width="2.5em"
                        height="2.5em"
                        aria-label="Change Image"
                        bg="gray.400"
                        icon={<EditIcon boxSize="20px" />}
                      />
                    </label>
                  </AvatarBadge>
                </Avatar>
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={(e) => {
                    formik.setFieldValue("image", e.target.files[0]);
                    handleImageChange(e);
                  }}
                  onBlur={formik.handleBlur("image")}
                  style={{ display: "none" }}
                />
                {formik.touched.image && formik.errors.image ? (
                  <div style={{ color: "red" }}>{formik.errors.image}</div>
                ) : null}
              </FormControl>
              <FormControl mb="3">
                <FormLabel>Hall Number</FormLabel>
                <Input
                  value={formik.values.hall_no}
                  onChange={formik.handleChange("hall_no")}
                  onBlur={formik.handleBlur("hall_no")}
                />
                {formik.touched.hall_no && formik.errors.hall_no ? (
                  <div style={{ color: "red" }}>{formik.errors.hall_no}</div>
                ) : null}
              </FormControl>
              <FormControl mb="3">
                <FormLabel>Student Capacity</FormLabel>
                <Input
                  value={formik.values.capacity}
                  onChange={formik.handleChange("capacity")}
                  onBlur={formik.handleBlur("capacity")}
                  defaultValue={15}
                />
                {formik.touched.capacity && formik.errors.capacity ? (
                  <div style={{ color: "red" }}>{formik.errors.capacity}</div>
                ) : null}
              </FormControl>
              <FormControl mb="3">
                <FormLabel>Facilities Available</FormLabel>
                <Textarea
                  placeholder="Provide Details"
                  value={formik.values.details}
                  onChange={formik.handleChange("details")}
                  onBlur={formik.handleBlur("details")}
                />
                {formik.touched.details && formik.errors.details ? (
                  <div style={{ color: "red" }}>{formik.errors.details}</div>
                ) : null}
              </FormControl>
              <ModalFooter>
                <Button
                  size={buttonSize}
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                >
                  Add
                </Button>
                <Button
                  size={buttonSize}
                  colorScheme="blue"
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  Clear
                </Button>
                <Button size={buttonSize} ml="2" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddHall;
