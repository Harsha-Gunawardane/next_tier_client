import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumbs() {
    const location = useLocation();

    let currentLink = "";

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== "")
        .map(crumb => {
            // Replace hyphens with spaces
            const crumbWithSpaces = crumb.replace(/-/g, ' ');

            // Check if the crumb contains any digits (numbers)
            const containsDigits = /\d/.test(crumbWithSpaces);

            // Add "#" in front of the number or use the crumb with spaces
            const crumbWithHash = containsDigits ? `#${crumbWithSpaces}` : crumbWithSpaces;

            currentLink += `/${crumb}`;

            return (
                <BreadcrumbItem key={crumb} fontSize="16px">
                    <Link to={currentLink}>{crumbWithHash}</Link>
                </BreadcrumbItem>
            );
        });

    return (
        <Breadcrumb ml={10} mt={5} spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            {crumbs}
        </Breadcrumb>
    );
}
