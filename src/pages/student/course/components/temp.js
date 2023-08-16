import { useState } from "react";
import {
    Stepper,
    Button,
    Group,
    TextInput,
    Textarea,
    Select,
    MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ModalLayout from "../../../components/ModalLayout";
import { Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAdminsInfo } from "../../../store/admin/useAdminsInfo";

const ADMIN_URL = "/admin";
const STAFF_URL = "/admin/staff";

function StepperForm({ isOpen, handleCloseModal, actor = "Admin" }) {
    const axiosPrivate = useAxiosPrivate();
    const toast = useToast();

    const { setPushAdmin } = useAdminsInfo();

    const [active, setActive] = useState(0);
    const [qualifications, setQualifications] = useState([]);
    const [adminData, setAdminData] = useState({});
    const [staffData, setStaffData] = useState({});

    const roles = [
        { value: "System", label: "System" },
        { value: "Network", label: "Network" },
        { value: "Database", label: "Database" },
        { value: "Cloud", label: "Cloud" },
        { value: "Security", label: "Security" },
    ];

    const form = useForm({
        initialValues:
            actor === "Admin"
                ? {
                    fName: "",
                    lName: "",
                    email: "",
                    mobileNo: "",
                    emergencyContact: "",
                    address: "",
                    role: "",
                    qualifications: [],
                }
                : actor === "Staff"
                    ? {
                        fName: "",
                        lName: "",
                        email: "",
                        mobileNo: "",
                        emergencyContact: "",
                        address: "",
                        qualifications: [],
                    }
                    : {},

        validate: (values) => {
            if (active === 0) {
                return {
                    fName:
                        values.fName.trim().length < 3
                            ? "first name must include at least 3 characters"
                            : null,
                    lName:
                        values.lName.length < 3
                            ? "last name must include at least 3 characters"
                            : null,
                    email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
                };
            }

            if (active === 1 && actor === "Admin") {
                return {
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
                };
            }
            if (active === 1 && actor === "Staff") {
                return {
                    mobileNo: /^\+94\d{9}$/.test(values.mobileNo)
                        ? null
                        : "ex: +94701234567",
                    address:
                        values.address.length < 8
                            ? "Address should be at least 8 characters"
                            : null,
                };
            }

            if (active === 2 && actor === "Admin") {
                return {
                    role: roles.map((role) => role.value).includes(values.role)
                        ? null
                        : "Role should be one of the following",
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

    const handleSubmit = async () => {
        try {
            const url = actor === "Admin" ? ADMIN_URL : STAFF_URL;
            const data =
                actor === "Admin" ? adminData : actor === "Staff" ? staffData : null;

            console.log(data);

            const response = await axiosPrivate.post(url, data);
            console.log(response?.data);

            actor === "Admin" && setPushAdmin(response?.data?.data);

            toast({
                title: response?.data?.success,
                status: "success",
                isClosable: true,
                position: "top-right",
            });

            form.reset();
            handleCloseModal();
        } catch (error) {
            let errMsg = "";
            console.log(error);
            if (!error?.response) {
                errMsg = "No Server Response";
            } else if (error.response?.status === 409) {
                errMsg = "Username is already exists";
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
        if (actor === "Admin") {
            setAdminData(form.values);
        } else if (actor === "Staff") {
            setStaffData(form.values);
        }
    }, [form.values]);

    const body = (
        <Stepper active={active} breakpoint="md" size="lg">
            <Stepper.Step label="First step" description="Profile info">
                <Flex mt={"lg"} justify={"space-around"} gap={"5%"}>
                    <TextInput
                        w={"45%"}
                        label="First name:"
                        placeholder="Enter first name"
                        {...form.getInputProps("fName")}
                    />
                    <TextInput
                        w={"45%"}
                        label="Last name:"
                        placeholder="Enter last name"
                        {...form.getInputProps("lName")}
                    />
                </Flex>
                <TextInput
                    w={"99%"}
                    mt="md"
                    label="Email:"
                    placeholder="Enter email address"
                    {...form.getInputProps("email")}
                />
            </Stepper.Step>

            <Stepper.Step label="Second step" description="Contact info">
                <Flex mt="md" justify={"space-around"} gap={"5%"}>
                    <TextInput
                        w={"45%"}
                        label="Mobile no:"
                        placeholder="Enter mobile number"
                        {...form.getInputProps("mobileNo")}
                    />
                    <TextInput
                        w={"45%"}
                        label="Emergency contact:"
                        placeholder="Enter emergency contact"
                        {...form.getInputProps("emergencyContact")}
                    />
                </Flex>
                <Textarea
                    w={"99%"}
                    mt="md"
                    label="Address:"
                    placeholder="Enter home address"
                    {...form.getInputProps("address")}
                />
            </Stepper.Step>

            <Stepper.Step label="Final step" description="Qualifications">
                {actor === "Admin" && (
                    <Select
                        label="Select the role"
                        placeholder="Pick the role"
                        data={roles}
                        {...form.getInputProps("role")}
                    />
                )}
                <MultiSelect
                    label="Enter qualifications"
                    placeholder="Enter qualifications"
                    creatable
                    searchable
                    data={qualifications}
                    getCreateLabel={(query) => `+ Add ${query}`}
                    onCreate={(query) => {
                        const newQualification = { value: query, label: query };
                        setQualifications((current) => [...current, newQualification]);
                        return newQualification;
                    }}
                    {...form.getInputProps("qualifications")}
                />
            </Stepper.Step>
            <Stepper.Completed></Stepper.Completed>
        </Stepper>
    );

    const footer = (
        <Group position="right" mt="xl">
            {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                    Back
                </Button>
            )}
            {active !== 3 ? (
                <Button onClick={nextStep}>Next step</Button>
            ) : (
                <Button onClick={handleSubmit}>Register</Button>
            )}
        </Group>
    );
    return (
        <ModalLayout
            title={
                actor === "Admin"
                    ? "Register new admin"
                    : "Register new institute staff"
            }
            body={body}
            footer={footer}
            isOpen={isOpen}
            handleCloseModal={handleCloseModal}
            size="4xl"
        />
    );
}

export default StepperForm;