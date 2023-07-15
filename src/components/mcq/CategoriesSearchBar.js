import { Container, FormControl, Input } from "@chakra-ui/react";

export default function CategoriesSearchBar({ search , setSearch }) {
  return (
    <Container
      marginBottom="40px"
      maxWidth="500px"
      padding="10px"
      position="fixed"
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <Input
            placeholder="Search MCQ Category"
            id="searchMember"
            maxWidth="500px"
            bg="gray.200"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </FormControl>
      </form>
    </Container>
  );
}
