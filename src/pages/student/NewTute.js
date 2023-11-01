import { useParams } from "react-router-dom";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import { Text, Flex, Box, Button, useToast } from "@chakra-ui/react";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const TUTE_URL = "/stu/tute";

function NewTute() {
  const axiosPrivate = useAxiosPrivate();
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const [tuteName, setTuteName] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Initial content for the editor
  const initialContent = "";

  // Create the editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextStyle,
      Color,
      Image.configure({ inline: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {},
  });

  // Fetch tute data when the component mounts
  useEffect(() => {
    const getContent = async () => {
      const queryString = new URLSearchParams({ id: id }).toString();
      try {
        const response = await axiosPrivate.get(`${TUTE_URL}?${queryString}`);
        const tute = response.data?.tute;
        // Set the initial content in the editor
        if (editor) {
          editor.commands.setContent(tute.content);
        }
        // Update other state variables
        setTuteName(tute.name);
      } catch (error) {
        console.error(error);
      }
    };

    getContent();
  }, [id, editor, axiosPrivate]);

  // Function to save the edited content
  const saveContent = async () => {
    if (editor) {
      setUploading(true);
      try {
        await axiosPrivate.put(TUTE_URL, {
          id,
          content: editor.getHTML(),
        });
        toast({
          title: "Successfully wrote on tute",
          status: "success",
          isClosable: true,
          position: "top-right",
        });
        navigate(`/stu/tutes/view/${id}`);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Please check tute id again!");
        } else {
          setErrMsg("Something went wrong");
        }
        toast({
          title: errMsg,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <>
      <Box bg={"#f2f2f2"}>
        <Flex w={"100%"} justifyContent={"center"}>
          <Text
            mt={5}
            mb={2}
            ml={10}
            color="#343434"
            fontStyle="Roboto"
            fontFamily="sans-serif"
            fontSize={20}
            fontWeight="bold"
          >
            {tuteName}
          </Text>
        </Flex>
        <Flex justifyContent="center" w="calc(100vw - 335px)">
          <RichTextEditor
            w="90%"
            editor={editor}
            style={{
              wordBreak: "break-all",
              minWidth: "500px",
              width: "900px",
              borderRadius: "5px",
              marginTop: "15px",
              border: "1px solid #E5E5E5",
            }}
          >
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ColorPicker
                colors={[
                  "#25262b",
                  "#868e96",
                  "#fa5252",
                  "#e64980",
                  "#be4bdb",
                  "#7950f2",
                  "#4c6ef5",
                  "#228be6",
                  "#15aabf",
                  "#12b886",
                  "#40c057",
                  "#82c91e",
                  "#fab005",
                  "#fd7e14",
                ]}
              />

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.Code />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content
              pl={100}
              pr={100}
              pt={75}
              pb={75}
              mih={580}
              id="pdf-element"
              style={{ position: "relative" }}
            >
              <Flex
                display={uploading ? "flex" : "none"}
                justifyContent={"center"}
                alignItems={"center"}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999,
                }}
              >
                <Loader variant="bars" size={"xl"} overlayBlur={2} />
              </Flex>
            </RichTextEditor.Content>
          </RichTextEditor>
        </Flex>
        <Flex justifyContent="right">
          <Button
            mr={40}
            mt={5}
            mb={5}
            _hover={{ bg: "#0074D9", color: "#FFFFFF" }}
            bg={"#0074D9"}
            color={"#FFFFFF"}
            w={120}
            h={10}
            fontWeight={"normal"}
            onClick={saveContent}
          >
            Save
          </Button>
        </Flex>
      </Box>
     
    </>
  );
}

export default NewTute;
