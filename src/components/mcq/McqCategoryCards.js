import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";
import backgroundTemplate from "../mcq/assests/backgroundTemplate.jpg";
import backgroundTemplate2 from "../mcq/assests/backgroundTemplate2.jpg";
import backgroundTemplate3 from "../mcq/assests/backgroundTemplate3.jpg";
import backgroundTemplate4 from "../mcq/assests/backgroundTemplate4.jpg";
import backgroundTemplate5 from "../mcq/assests/backgroundTemplate5.jpg";

export function McqCategoryCards({ category }) {
  return (
    <Card variant="outline" height="190px" key={category.id}>
      <CardBody>
        <Image
          src={
            category.title === "Calculation Questions"
              ? backgroundTemplate2
              : category.title === "Revision Questions"
              ? backgroundTemplate3
              : category.title === "Inorganic Questions"
              ? backgroundTemplate
              : backgroundTemplate4
          }
          borderRadius="lg"
          width="300px"
          height="90px"
        />
        <Stack mt="4" spacing="1">
          <Heading fontSize="16px">{category.title}</Heading>
          <Text fontSize="13px" color="gray">
            Number of MCQs : {category.number_of_questions}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
