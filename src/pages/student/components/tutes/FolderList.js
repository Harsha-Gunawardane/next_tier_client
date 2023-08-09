import React from "react";
import { Accordion } from "@mantine/core";
import PageNameCard from "../cards/PageNameCard";
import { Box } from "@chakra-ui/react";

import "../../../../assets/css/accordion.css"

function FolderList({ folders }) {
  return (
    <Box w={220} pl={8}>
      <Accordion
        variant="filled"
        radius="md"
        chevronPosition="left"
      >
        {folders.map((folder) => {
          return (
            <Accordion.Item value={folder.name}>
              <Accordion.Control>{folder.name}</Accordion.Control>
              <Accordion.Panel>
                {folder.pages.map((page) => {
                  return <PageNameCard name={page} ml={8}/>;
                })}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Box>
  );
}

export default FolderList;
