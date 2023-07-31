import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom"

export default function BreadCrumbs() {

    const location = useLocation()

    let currentLink = "";

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== "")
        .map(crumb => {
            currentLink += `/${crumb}`

            return(
                <BreadcrumbItem key={crumb} fontSize="16px">
                    <Link to={currentLink}>{crumb}</Link>
                </BreadcrumbItem>
            )
        })
     
  return (
    <Breadcrumb marginLeft="10px" spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      {crumbs}
    </Breadcrumb>
  );
}
