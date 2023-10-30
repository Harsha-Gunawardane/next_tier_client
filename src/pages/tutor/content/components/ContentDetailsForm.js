import {
    AspectRatio,
    Button,
    Flex, Text, useToast,

} from '@chakra-ui/react'
import { FileButton, FileInput, Header, MultiSelect, Select, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form';
import React, { useEffect } from 'react'
import { useState } from 'react';
//import Button from mantine core as MantineButton;
import { Button as MantineButton } from '@mantine/core';

//icons
import { GrUpdate } from 'react-icons/gr';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { sub } from 'date-fns';



function ContentDetailsForm({ contentDetails, setContentDetails }) {

    const [subject, setSubject] = useState([
        { value: "Mathematics", label: "Mathematics" },
        { value: "Chemistry", label: "Chemistry" },
    ]);

    const [subjectAreas, setSubjectAreas] = useState([
        { value: "Inorganic", label: "Inorganic" },
        { value: "Calculation", label: "Calculation" },
    ]);

    const [status, setStatus] = useState([
        { value: "PUBLIC", label: "PUBLIC" },
        { value: "PAID", label: "PAID" },
        { value: "HOLD", label: "PRIVATE" },
    ]);

    const axiosPrivate = useAxiosPrivate();
    const toast = useToast();



    const [editing, setEditing] = useState(false);
    const [editingAccess, setEditingAccess] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(contentDetails.thumbnail);
    const [thumbnailDirty, setThumbnailDirty] = useState(false);
    const [thumbnailUploading, setThumbnailUploading] = useState(false);
    const [thumbnailUpdating, setThumbnailUpdating] = useState(false);

    useEffect(() => {
        setThumbnail(contentDetails.thumbnail);
    }, [contentDetails])



    const form = useForm({
        initialValues: {
            title: contentDetails.title,
            description: contentDetails.description,
            subject: contentDetails.subject,
            subject_areas: [...contentDetails.subject_areas],
            thumbnail: contentDetails.thumbnail,
            status: contentDetails.status,
        },
        validate: (values) => {
            if (!values.title) {
                return { title: "Please enter a title" };
            }

            if (!values.description) {
                return { description: "Please enter a description" };
            }

            if (!values.subject) {
                return { subject: "Please select a subject" };
            }

            if (values.subject_areas.length === 0) {
                return { subject_areas: "Please select at least one subject area" };
            }
        }
    });

    useEffect(() => {
        setSubject(
            (prevState) => {
                return [...prevState, { value: contentDetails.subject, label: contentDetails.subject }]
            }
        )

        setSubjectAreas(
            (prevState) => {
                return [...prevState, ...contentDetails.subject_areas.map((subject_area) => {
                    return { value: subject_area, label: subject_area }
                })]
            }
        )


    }, [])

    useEffect(() => {
        if (form.isDirty()) {
            setDirty(true);
        } else {
            setDirty(false);
        }

    }, [form.values])

    useEffect(() => {
        console.log(dirty)
    }, [dirty])

    useEffect(() => {
        //update the form value
        if (thumbnailFile) {
            const url = URL.createObjectURL(thumbnailFile);
            form.setValues({ ...form.values, thumbnail: thumbnailFile });
            setThumbnail(url);
        }

    }, [thumbnailFile])

    useEffect(() => {
        console.log(form.values.thumbnail)
        if (form.isDirty("thumbnail")) {
            console.log("here")
            setThumbnailDirty(true);
        } else {
            setThumbnailDirty(false);
        }
    }, [form.values.thumbnail])



    const submitUpdatedContentInfo = async () => {
        if (!form.isDirty()) {
            //nothing to update. show toast
            toast({
                title: "Nothing to update",
                description: "Please make some changes before saving",
                status: "info",
                duration: 2000,
                isClosable: true,
            });

            return;
        }

        if (!form.validate()) {
            toast({
                title: "Invalid form",
                description: "Please fill all the required fields",
                status: "error",
                duration: 2000,
                isClosable: true,
            });

            return;
        }




        const controller = new AbortController();

        //add only dirty values to form data
        const formData = new FormData();

        console.log(form.values.thumbnail)
        // return;

        formData.append("content_id", contentDetails.id);
        if (form.isDirty("title")) {
            formData.append("title", form.values.title);
        }
        if (form.isDirty("description")) {
            formData.append("description", form.values.description);
        }
        if (form.isDirty("subject")) {
            formData.append("subject", form.values.subject);
        }
        if (form.isDirty("subject_areas")) {
            formData.append("subject_areas", form.values.subject_areas);
        }
        if (form.isDirty("thumbnail")) {
            formData.append("thumbnail", form.values.thumbnail);
        }
        if (form.isDirty("status")) {
            formData.append("status", form.values.status);
        }

        //send request
        try {

            const response = await axiosPrivate.put(`/content`, formData, {
                signal: controller.signal,
                Headers: { 'Content-Type': 'multipart/form-data' }
            });
            const data = response.data;

            if (data.status === 201) {
                setContentDetails(data.data);
            } else {
                form.resetDirty();
            }


        } catch (error) {
            console.log(error);
        }
    }



    return (
        <>
            <Flex direction={"column"} gap={2} >
                <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                    <Text fontWeight={"semibold"} fontSize={"1.2rem"} color="gray.800">Basic Details</Text>
                    <Flex direction={"row"} gap={2} alignItems={"center"}>
                        <Button colorScheme="blue" variant="outline" size="sm" onClick={() => { setEditing(!editing) }}>{editing ? (form.isDirty() ? "Reset" : "Cancel") : "Edit"}</Button>
                        {editing ? <Button colorScheme="blue" variant="solid" size="sm" onClick={() => { setEditing(!editing); submitUpdatedContentInfo() }} isDisabled={!dirty}>Save</Button> : null}
                    </Flex>
                </Flex>
                <TextInput
                    required
                    label="Title"
                    placeholder="Title"
                    {...form.getInputProps('title')}
                    disabled={!editing}
                />
                <Textarea
                    required
                    label="Description"
                    placeholder="Description"
                    {...form.getInputProps('description')}
                    disabled={!editing}
                />
                <Select
                    required
                    data={subject}
                    label="Select or create subject"
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
                    disabled={!editing}
                />

                <MultiSelect
                    required
                    label="Select or create subject areas"
                    data={subjectAreas}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                        const item = { value: query, label: query };
                        setSubjectAreas((current) => [...current, item]);
                        return item;
                    }}
                    {...form.getInputProps("subject_areas")}
                    disabled={!editing}
                />

                <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} mt={2} mb={2}>
                    <Text fontWeight={"semibold"} fontSize={"1.2rem"} color="gray.800">Thumbnail</Text>
                </Flex>
                <Flex direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} mb={2} gap={3} h="max-content">
                    <AspectRatio ratio={16 / 9} minw={"30%"} w={"30%"} borderRadius={"10px"} overflow={"hidden"}>
                        <img src={thumbnail} alt="" />
                    </AspectRatio>
                    <Flex direction={"column"} justifyContent={"flex-start"} alignItems={"flex-start"} gap={2} h="100%" color={"white"}>
                        <FileButton
                            // style
                            onChange={setThumbnailFile}
                            accept="image/png,image/jpeg"
                        >
                            {(props) => <MantineButton size='md' leftIcon={<GrUpdate color={'blue'} />} {...props} variant={"outline"} color='blue'>Update Image</MantineButton>}
                        </FileButton>
                        <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={2} h="max-content">
                            {thumbnailDirty ? <MantineButton variant={"filled"} colorScheme={"green"} onClick={() => { submitUpdatedContentInfo() }} >Save</MantineButton> : null}
                            {thumbnailDirty ? <MantineButton variant={"light"} colorScheme={"red"} onClick={() => { form.resetDirty("thumbnail") }} >Cancel</MantineButton> : null}
                        </Flex>
                    </Flex>
                </Flex>

                <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"} mt={2} mb={2}>
                    <Text fontWeight={"semibold"} fontSize={"1.2rem"} color="gray.800">Access Control</Text>
                    <Flex direction={"row"} gap={2} alignItems={"center"}>
                        <Button colorScheme="blue" variant="outline" size="sm" onClick={() => { setEditingAccess(!editingAccess) }}>{editingAccess ? (form.isDirty("status") ? "Reset" : "Cancel") : "Edit"}</Button>
                        {editingAccess ? <Button colorScheme="blue" variant="solid" size="sm" onClick={() => { setEditing(!editingAccess); submitUpdatedContentInfo() }} isDisabled={!dirty}>Save</Button> : null}
                    </Flex>
                </Flex>
                <Flex direction={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} mb={2} gap={2} h="max-content">
                    <Select
                        required
                        data={status}
                        label="Accessibility Status"
                        description="Select the accessibility status of this content. Public content is accessible to all users. Paid content is accessible to users who have paid for it. Private content is accessible to users who have paid for it but is not yet released."
                        nothingFound="Nothing found"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Create ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setSubject((current) => [...current, item]);
                            return item;
                        }}
                        {...form.getInputProps("status")}
                        disabled={!editingAccess}
                    />
                </Flex>

            </Flex>
        </>
    )
}

export default ContentDetailsForm
