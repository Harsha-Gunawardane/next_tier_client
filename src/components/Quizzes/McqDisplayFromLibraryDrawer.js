import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  InputLeftElement,
  InputGroup,
  FormControl,
  Select,
  HStack,
} from "@chakra-ui/react";
import { IconSearch } from "@tabler/icons-react";
import { useRef } from "react";
import McqsAddingViewInDrawer from "./McqsAddingViewInDrawer";
import { BiBook } from "react-icons/bi";

export default function McqDisplayFromLibraryDrawer({
  quizId,
  allMcqs,
  setAllMcqs,
  quizMcqs,
  setQuizMcqs,
  search,
  setSearch,
  quiz,
  setQuiz,
  isOpen,
  onOpen,
  onClose,
}) {
  const firstField = useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Select Questions</DrawerHeader>

          <DrawerBody>
            <HStack spacing="24px" pt="10px">
              <FormControl>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="12px" // Decrease the font size to make the icon mdaller
                    children={<IconSearch size="1.3rem" color="gray" />}
                  />

                  <Input
                    variant="outline"
                    placeholder="Search"
                    h={"40px"}
                    size="sm"
                    fontSize={{ base: "14px", md: "16px" }}
                    borderRadius={"5px"}
                    paddingLeft="35px"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup borderColor="#E0E1E7">
                  <InputLeftElement
                    pointerEvents="none"
                    fontSize="12px"
                    children={<BiBook size="1.3rem" color="gray" />}
                  />

                  <Input
                    as={Select}
                    placeholder="All Subject Area(s)"
                    variant="outline"
                    color="gray"
                    fontSize={{ base: "14px", sm: "16px" }}
                    h={"40px"}
                    size="sm"
                    borderRadius={"5px"}
                    paddingLeft="35px"
                  >
                    <option value="option1">Inorganic</option>
                    <option value="option2">Organic</option>
                    <option value="option2">Calculation</option>
                    <option value="option2">Atomicity</option>
                  </Input>
                </InputGroup>
              </FormControl>
            </HStack>
            <McqsAddingViewInDrawer
              mcqs={allMcqs.filter((mcq) =>
                mcq.question.toLowerCase().includes(search.toLowerCase())
              )}
              quizId={quizId}
              setAllMcqs={setAllMcqs}
              allMcqs={allMcqs}
              quizMcqs={quizMcqs}
              setQuizMcqs={setQuizMcqs}
              quiz={quiz}
              setQuiz={setQuiz}
            />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
