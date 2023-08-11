import { Box, Text, Flex } from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useCallback } from "react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import { AiOutlineCloudDownload } from "react-icons/ai";

import { toPng } from "html-to-image";

import "../../../../assests/css/textEditor.css";

function ScratchPad() {
  const ref = useRef(null);

  let content = "";
  const [data, setData] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link, Color],
    editable: true,
    onUpdate: ({ editor }) => {
      setData(editor.getHTML());
    },
    content,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDonwload = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "scratch-pad.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <Box
      id="scratchpad"
      mt={3}
      borderRadius={8}
      shadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      p={3}
      bg={"#F2F2F2"}
      h={420}
      overFlowY={"auto"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"} pr={3}>
        <Text
          fontSize={18}
          fontWeight="bold"
          color={"#333333"}
          fontStyle="Roboto"
        >
          Scratch pad
        </Text>
        <AiOutlineCloudDownload
          onClick={handleDonwload}
          cursor={"pointer"}
          color="#444444"
          fontWeight={"bold"}
          size={24}
        />
      </Flex>

      <Flex justifyContent="center">
        <RichTextEditor
          editor={editor}
          style={{
            wordBreak: "break-all",
            minWidth: "360px",
            width: "370px",
            height: "180px",
            borderRadius: "5px",
            marginTop: "15px",
            border: "1px solid #E5E5E5",
          }}
          sx={{ maxHeight: 180, minHeight: 180 }}
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
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content mih={320} ref={ref} id="pdf-element" />
        </RichTextEditor>
      </Flex>
    </Box>
  );
}

export default ScratchPad;
