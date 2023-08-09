import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import  capitalizeFirstLetter  from "../../utils/capitalizeFirstLetter"; // Import the capitalizeFirstLetter function

export default function BreadCrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((crumb) => crumb !== "");

  let currentLink = "";

  const crumbs = paths.map((crumb, index, array) => {
    currentLink += `/${crumb}`;
    const capitalizedCrumb = capitalizeFirstLetter(crumb); // Capitalize the first letter

    // Check if the current crumb's path matches the current route's path
    const isActive = index === array.length - 1;

    return (
      <BreadcrumbItem key={crumb} fontSize="16px">
        <BreadcrumbLink
          as={Link}
          to={currentLink}
          color={isActive ? "blue.500" : "gray.500"}
        >
          {capitalizedCrumb}
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb
      marginLeft="10px"
      marginTop="10px"
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {crumbs}
    </Breadcrumb>
  );
}
