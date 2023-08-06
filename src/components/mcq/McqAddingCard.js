import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function McqAddingCard({ handleDrawer, onOpen }) {
  return (
    <Card variant="outline" padding="20px">
      <Grid templateColumns="repeat(3,1fr)" gap={{ base: 3, md: 10 }}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <FormLabel fontSize={{ base: "14px", md: "16px" }}>
            Teleport from the Quiz Library
          </FormLabel>
          <FormControl>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement
                pointerEvents="none"
                fontSize="12px" // Decrease the font size to make the icon mdaller
                children={<IconSearch size="1.3rem" color="gray" />}
              />

              <Input
                variant="outline"
                placeholder="Search from question library"
                h={"40px"}
                size="sm"
                fontSize={{ base: "14px", md: "16px" }}
                // bg="gray.50"
                borderRadius={"5px"}
                onClick={handleDrawer}
              />
            </InputGroup>
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }} margin="0.2px auto">
          <FormLabel fontSize={{ base: "14px", md: "16px" }}>
            Create a New Question
          </FormLabel>
            <Button
              colorScheme="messenger"
              variant="solid"
              size="md"
              width="160px"
              onClick={onOpen}
            >
              <IoIosAddCircleOutline
                size="20px"
                color="white"
                style={{ marginRight: "6px" }}
              />
              New mcq
            </Button>
        </GridItem>
      </Grid>
    </Card>
  );
}
