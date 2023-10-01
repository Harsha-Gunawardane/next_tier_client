import {
  Card,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IconSearch } from "@tabler/icons-react";


export default function PaperMarkingHeaderBar({ search, setSearch, onOpen }) {
  return (
    <Card variant="outline" >
          <FormControl>
            <InputGroup borderColor="#E0E1E7">
              <InputLeftElement
                pointerEvents="none"
                fontSize="12px"
                pb="3px"
                children={<IconSearch size="1rem" color="gray"  />}
              />

              <Input
                variant="outline"
                placeholder="Search by name"
                paddingLeft="35px"
                h={"35px"}
                size="sm"
                fontSize={{ base: "14px", sm: "14px" }}
                borderRadius={"5px"}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <InputRightElement
                fontSize="22px"
                pb="6px"
                children={
                  <IoCloseCircleSharp h="40px" color="gray" cursor="pointer" />
                }
                h={"40px"}
                w={"40px"}
                onClick={() => {
                  setSearch("");
                }}
              />
            </InputGroup>
          </FormControl>
    </Card>
  );
}
