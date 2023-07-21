import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  Image,
} from "@chakra-ui/react";
import { Divider } from "@mantine/core";
import mcqCommon from "./assests/mcqcommon.png";
import { NavLink } from "react-router-dom";

export default function McqCategories({ categories }) {
  return (
    <SimpleGrid spacing={6} minChildWidth="250px" maxChildWidth="170px" margin="20px">
      {categories.map((category) => (
        <NavLink to={`${category.id}`}>
          <Card
            key={category.id}
            borderTop="8px"
            borderColor="blue.400"
            borderRadius="10px"
            display="flex"
            alignItems="center"
          >
            <CardHeader>
              <Heading size="md">{category.title}</Heading>
            </CardHeader>
            <CardBody>
              <Image src={mcqCommon} width="255px" height="170px" mt="-30px" />
            </CardBody>
            <Divider borderColor="gray.200" />
            <CardFooter>
              <Text>Number of MCQs : {category.noofmcqs}</Text>
            </CardFooter>
          </Card>
        </NavLink>
      ))}
    </SimpleGrid>
  );
}
